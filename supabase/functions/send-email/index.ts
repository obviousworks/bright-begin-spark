
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting storage (in-memory for this example)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  fromName: string;
  honeypot?: string; // Add honeypot field
}

const getRealIP = (req: Request): string => {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         req.headers.get('x-real-ip') ||
         'unknown';
};

const checkRateLimit = (ip: string): { allowed: boolean; resetTime?: number } => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 3; // 3 requests per minute
  
  const key = `rate_limit_${ip}`;
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    // New window or expired
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  if (current.count >= maxRequests) {
    return { allowed: false, resetTime: current.resetTime };
  }
  
  // Increment count
  current.count++;
  rateLimitStore.set(key, current);
  return { allowed: true };
};

const detectSpam = (data: EmailRequest): boolean => {
  // Honeypot check - if honeypot field is filled, it's spam
  if (data.honeypot && data.honeypot.trim() !== '') {
    console.log('Spam detected via honeypot field:', data.honeypot);
    return true;
  }

  const textToCheck = `${data.subject} ${data.body} ${data.fromName}`.toLowerCase();
  
  // Spam patterns
  const spamPatterns = [
    /(.)\1{15,}/, // Excessive repeated characters
    /(viagra|cialis|casino|lottery|winner|congratulations)/i,
    /\b(http|www|\.com|\.org|\.net)\b/i, // URLs
    /[^\w\s\-äöüÄÖÜß@.,!?()]/g, // Unusual characters (allowing German characters)
  ];
  
  // Check for suspicious patterns
  const hasSpamPattern = spamPatterns.some(pattern => pattern.test(textToCheck));
  
  // Check for excessive length
  const totalLength = textToCheck.length;
  if (totalLength > 10000) return true;
  
  // Check for repeated words
  const words = textToCheck.split(/\s+/);
  const wordCount = new Map();
  for (const word of words) {
    if (word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
      if (wordCount.get(word) > 10) return true; // Same word repeated more than 10 times
    }
  }
  
  return hasSpamPattern;
};

const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Basic XSS protection
    .substring(0, 5000); // Max length protection
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIP = getRealIP(req);
    console.log(`Request from IP: ${clientIP}`);
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime || Date.now();
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000);
      
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded",
          retryAfter: waitTime 
        }),
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": waitTime.toString(),
            ...corsHeaders 
          } 
        }
      );
    }

    const rawData: EmailRequest = await req.json();
    
    // Sanitize all inputs
    const sanitizedData: EmailRequest = {
      to: sanitizeInput(rawData.to),
      subject: sanitizeInput(rawData.subject),
      body: sanitizeInput(rawData.body),
      fromName: sanitizeInput(rawData.fromName),
      honeypot: rawData.honeypot || '' // Don't sanitize honeypot, we check it as-is
    };
    
    // Basic validation
    if (!sanitizedData.to || !sanitizedData.subject || !sanitizedData.body) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.to)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    // Spam detection (including honeypot)
    if (detectSpam(sanitizedData)) {
      console.log(`Spam detected from IP: ${clientIP}`, {
        honeypot: sanitizedData.honeypot,
        subject: sanitizedData.subject,
        fromName: sanitizedData.fromName
      });
      return new Response(
        JSON.stringify({ error: "Message flagged as spam" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    console.log('Sending email:', {
      to: sanitizedData.to,
      subject: sanitizedData.subject,
      fromName: sanitizedData.fromName
    });

    const emailResponse = await resend.emails.send({
      from: `${sanitizedData.fromName} <onboarding@resend.dev>`,
      to: [sanitizedData.to],
      subject: sanitizedData.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Neue Kontaktanfrage</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${sanitizedData.body}</pre>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Diese E-Mail wurde über das Kontaktformular der KI-Revolution Website gesendet.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: emailResponse.data?.id 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email",
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
