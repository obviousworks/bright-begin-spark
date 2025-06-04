
import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { contactFormSchema, sanitizeInput, sanitizeEmail, sanitizePhone, type ContactFormData } from '@/lib/validation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  quizResults: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  message?: string;
  quizResults?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
    quizResults: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<number>(0);
  const [honeypot, setHoneypot] = useState(''); // Honeypot field

  const validateForm = (): boolean => {
    try {
      // Sanitize inputs before validation
      const sanitizedData: ContactFormData = {
        name: sanitizeInput(formData.name),
        email: sanitizeEmail(formData.email),
        phone: sanitizePhone(formData.phone),
        role: formData.role ? sanitizeInput(formData.role) : undefined,
        message: formData.message ? sanitizeInput(formData.message) : undefined,
        quizResults: formData.quizResults ? sanitizeInput(formData.quizResults) : undefined
      };

      contactFormSchema.parse(sanitizedData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const zodError = error as any;
        const newErrors: FormErrors = {};
        zodError.errors.forEach((err: any) => {
          if (err.path && err.path[0]) {
            newErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const checkSpamProtection = (): boolean => {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmission;
    
    // Honeypot check - if filled, it's spam
    if (honeypot !== '') {
      console.log('Spam detected via honeypot');
      toast.error('Spam erkannt. Bitte versuche es erneut.');
      return false;
    }

    // Rate limiting: minimum 10 seconds between submissions
    if (timeSinceLastSubmission < 10000) {
      toast.error('Bitte warte mindestens 10 Sekunden zwischen den Anfragen.');
      return false;
    }

    // Rate limiting via localStorage
    const lastSubmit = localStorage.getItem('lastEmailSubmit');
    if (lastSubmit && (now - parseInt(lastSubmit)) < 60000) { // 1 minute
      toast.error('Bitte warte eine Minute vor der nächsten Nachricht.');
      return false;
    }

    // Basic spam detection
    const suspiciousPatterns = [
      /(.)\1{10,}/, // Repeated characters
      /(http|www|\.com|\.org|\.net)/i, // URLs in form
      /[^\w\s\-äöüÄÖÜß@.,!?()]/g // Unusual characters
    ];

    const textToCheck = `${formData.name} ${formData.message}`.toLowerCase();
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(textToCheck));
    
    if (hasSuspiciousContent) {
      toast.error('Deine Nachricht enthält verdächtige Inhalte. Bitte überprüfe deine Eingabe.');
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Bitte korrigiere die Fehler im Formular.');
      return;
    }

    if (!checkSpamProtection()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize all inputs before sending
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeEmail(formData.email),
        phone: sanitizePhone(formData.phone),
        role: formData.role ? sanitizeInput(formData.role) : '',
        message: formData.message ? sanitizeInput(formData.message) : '',
        quizResults: formData.quizResults ? sanitizeInput(formData.quizResults) : ''
      };

      // Prepare email content with sanitized data
      const emailBody = `
Neue Kontaktanfrage von der KI-Revolution Website:

Name: ${sanitizedData.name}
E-Mail: ${sanitizedData.email}
Telefon: ${sanitizedData.phone}
Rolle: ${sanitizedData.role || 'Nicht angegeben'}

Nachricht:
${sanitizedData.message || 'Keine Nachricht'}

${sanitizedData.quizResults ? `Quiz-Ergebnisse: ${sanitizedData.quizResults}` : ''}

Gesendet am: ${new Date().toLocaleString('de-DE')}
      `;

      console.log('Sending email with data:', {
        to: 'matthias.herbert@obviousworks.com',
        subject: `Contact Form Message: KI Revolution - ${sanitizedData.name}`,
        body: emailBody,
        fromName: sanitizedData.name || 'Website Contact',
        token: 'legitimate-form-2024' // Add the token for spam prevention
      });

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: 'matthias.herbert@obviousworks.com',
          subject: `Contact Form Message: KI Revolution - ${sanitizedData.name}`,
          body: emailBody,
          fromName: sanitizedData.name || 'Website Contact',
          token: 'legitimate-form-2024' // Backend validation token
        }
      });

      if (error) {
        console.error('Error sending email:', error);
        throw error;
      }

      console.log('Email sent successfully:', data);
      
      toast.success('🔥 MISSION ACCOMPLISHED! Deine KI-Revolution startet JETZT!', {
        description: 'Wir melden uns innerhalb von 24 Stunden bei dir!'
      });
      
      // Update last submission time and store in localStorage
      const now = Date.now();
      setLastSubmission(now);
      localStorage.setItem('lastEmailSubmit', now.toString());
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        message: '',
        quizResults: ''
      });
      setHoneypot(''); // Reset honeypot
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Fehler beim Senden. Versuch es nochmal oder ruf direkt an!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact">
      <div className="border-2 border-yellow-400 rounded-2xl p-8 bg-black bg-opacity-70">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
            🚀 MISSION CONTROL
          </h3>
          <p className="text-cyan-400 text-lg">
            Starte JETZT deine KI-Transformation!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - invisible to users but visible to bots */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              opacity: 0,
              pointerEvents: 'none'
            }}
            aria-hidden="true"
            autoComplete="off"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-yellow-400 font-bold mb-2">
                <User className="w-5 h-5 inline mr-2" />
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full bg-gray-900 border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-300' 
                    : 'border-cyan-400 focus:border-yellow-400'
                }`}
                placeholder="Dein Name"
                maxLength={100}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-yellow-400 font-bold mb-2">
                <Mail className="w-5 h-5 inline mr-2" />
                E-Mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full bg-gray-900 border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-300' 
                    : 'border-cyan-400 focus:border-yellow-400'
                }`}
                placeholder="deine@email.com"
                maxLength={254}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-yellow-400 font-bold mb-2">
                <Phone className="w-5 h-5 inline mr-2" />
                Telefon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full bg-gray-900 border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  errors.phone 
                    ? 'border-red-400 focus:border-red-300' 
                    : 'border-cyan-400 focus:border-yellow-400'
                }`}
                placeholder="+49 XXX XXXXXXX"
                maxLength={50}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-yellow-400 font-bold mb-2">
                <Zap className="w-5 h-5 inline mr-2" />
                Deine Rolle
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full bg-gray-900 border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                  errors.role 
                    ? 'border-red-400 focus:border-red-300' 
                    : 'border-cyan-400 focus:border-yellow-400'
                }`}
              >
                <option value="">Rolle auswählen</option>
                <option value="developer">Developer</option>
                <option value="product-owner">Product Owner</option>
                <option value="project-manager">Projektmanager</option>
                <option value="requirements">Requirements Engineer</option>
                <option value="cto">CTO</option>
                <option value="c-level">C-Level</option>
                <option value="other">Andere</option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-sm mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-yellow-400 font-bold mb-2">
              <MessageSquare className="w-5 h-5 inline mr-2" />
              Deine KI-Mission
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full bg-gray-900 border-2 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors resize-none ${
                errors.message 
                  ? 'border-red-400 focus:border-red-300' 
                  : 'border-cyan-400 focus:border-yellow-400'
              }`}
              placeholder="Erzähl uns von deinen KI-Zielen und Herausforderungen..."
              maxLength={2000}
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message}</p>
            )}
            <div className="text-right text-gray-400 text-sm mt-1">
              {formData.message.length}/2000 Zeichen
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-4 px-8 rounded-lg font-bold text-xl hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                MISSION LÄUFT...
              </>
            ) : (
              <>
                <Send className="w-6 h-6 mr-3" />
                KI-REVOLUTION STARTEN!
              </>
            )}
          </button>
        </form>

        <div className="mt-8 p-6 border border-cyan-400 rounded-lg bg-cyan-900 bg-opacity-20">
          <div className="text-center text-cyan-400">
            <div className="text-lg font-bold mb-2">🎯 GARANTIE</div>
            <div className="text-sm">
              Innerhalb von 24 Stunden erhältst du eine maßgeschneiderte KI-Strategie für deine Rolle!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
