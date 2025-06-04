
import { z } from 'zod';

// Sanitization helper functions
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Basic XSS protection
    .substring(0, 1000); // Max length protection
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase().substring(0, 254);
};

export const sanitizePhone = (phone: string): string => {
  return phone
    .trim()
    .replace(/[^\d\s\-\+\(\)]/g, '') // Only allow digits, spaces, hyphens, plus, parentheses
    .substring(0, 50);
};

// Validation schemas
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name muss mindestens 2 Zeichen lang sein')
    .max(100, 'Name darf maximal 100 Zeichen lang sein')
    .regex(/^[a-zA-ZäöüÄÖÜß\s\-'\.]+$/, 'Name enthält ungültige Zeichen'),
  
  email: z.string()
    .email('Ungültige E-Mail-Adresse')
    .max(254, 'E-Mail-Adresse ist zu lang'),
  
  phone: z.string()
    .min(5, 'Telefonnummer muss mindestens 5 Zeichen lang sein')
    .max(50, 'Telefonnummer ist zu lang')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Telefonnummer enthält ungültige Zeichen'),
  
  role: z.string()
    .max(50, 'Rolle ist zu lang')
    .optional(),
  
  message: z.string()
    .max(2000, 'Nachricht darf maximal 2000 Zeichen lang sein')
    .optional(),
  
  quizResults: z.string()
    .max(5000, 'Quiz-Ergebnisse sind zu lang')
    .optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
