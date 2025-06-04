
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation object
const translations = {
  de: {
    // Hero Section
    'hero.ready': 'BEREIT',
    'hero.left.behind': 'ABGEHÄNGT',
    'hero.subtitle': 'Während deine Konkurrenz mit KI-Tools ihre Produktivität um 88% steigert, arbeitest du noch im Steinzeitalter. Zeit für den GAME CHANGER!',
    
    // Contact Section
    'contact.title': 'GAME OVER FÜR DEINE KONKURRENZ!',
    'contact.subtitle': 'Starte JETZT deine KI-Revolution und übernimm die Führung!',
    'contact.expert.title': 'DEIN KI-STRATEGIEEXPERTE',
    'contact.expert.role': 'Management Consultant & KI-Strategieexperte',
    'contact.direct.access': '⚡ DIRECT ACCESS',
    'contact.direct.subtitle': 'Buche direkt einen 15-Minuten Strategy Call!',
    'contact.warning': '🔥 WARNUNG: Limitierte Slots verfügbar!',
    'contact.candidates': 'Nur für KI-Revolution-Ready Candidates',
    
    // Contact Form
    'form.title': 'STARTE DEINE KI-REVOLUTION!',
    'form.subtitle': 'Sichere dir deinen Wettbewerbsvorteil - bevor es zu spät ist!',
    'form.name': 'Name',
    'form.name.placeholder': 'Dein Name',
    'form.email': 'E-Mail',
    'form.email.placeholder': 'deine@email.de',
    'form.phone': 'Telefon',
    'form.phone.placeholder': '+49...',
    'form.role': 'Deine Rolle',
    'form.role.placeholder': 'Wähle deine Rolle',
    'form.message': 'Nachricht',
    'form.message.placeholder': 'Beschreibe deine größten Herausforderungen...',
    'form.submit': 'KI-REVOLUTION STARTEN! 🚀',
    'form.submitting': 'REVOLUTION WIRD GESTARTET...',
    'form.success': 'KI-Revolution wurde gestartet! Checke deine E-Mails!',
    
    // Form Errors
    'form.error.name.required': 'Name ist erforderlich',
    'form.error.email.required': 'E-Mail ist erforderlich',
    'form.error.email.invalid': 'Ungültige E-Mail-Adresse',
    'form.error.message.required': 'Nachricht ist erforderlich',
    'form.error.submit': 'Fehler beim Senden. Bitte versuche es erneut.',
    
    // Roles
    'role.ceo': 'CEO/Geschäftsführer',
    'role.manager': 'Manager/Teamleiter',
    'role.entrepreneur': 'Unternehmer/Gründer',
    'role.freelancer': 'Freelancer/Berater',
    'role.employee': 'Angestellter',
    'role.other': 'Sonstiges',
    
    // Language
    'language.german': 'Deutsch',
    'language.english': 'English'
  },
  en: {
    // Hero Section
    'hero.ready': 'READY',
    'hero.left.behind': 'LEFT BEHIND',
    'hero.subtitle': 'While your competition increases productivity by 88% with AI tools, you\'re still working in the stone age. Time for the GAME CHANGER!',
    
    // Contact Section
    'contact.title': 'GAME OVER FOR YOUR COMPETITION!',
    'contact.subtitle': 'Start your AI Revolution NOW and take the lead!',
    'contact.expert.title': 'YOUR AI STRATEGY EXPERT',
    'contact.expert.role': 'Management Consultant & AI Strategy Expert',
    'contact.direct.access': '⚡ DIRECT ACCESS',
    'contact.direct.subtitle': 'Book a 15-minute Strategy Call directly!',
    'contact.warning': '🔥 WARNING: Limited slots available!',
    'contact.candidates': 'Only for AI-Revolution-Ready Candidates',
    
    // Contact Form
    'form.title': 'START YOUR AI REVOLUTION!',
    'form.subtitle': 'Secure your competitive advantage - before it\'s too late!',
    'form.name': 'Name',
    'form.name.placeholder': 'Your Name',
    'form.email': 'Email',
    'form.email.placeholder': 'your@email.com',
    'form.phone': 'Phone',
    'form.phone.placeholder': '+1...',
    'form.role': 'Your Role',
    'form.role.placeholder': 'Select your role',
    'form.message': 'Message',
    'form.message.placeholder': 'Describe your biggest challenges...',
    'form.submit': 'START AI REVOLUTION! 🚀',
    'form.submitting': 'STARTING REVOLUTION...',
    'form.success': 'AI Revolution started! Check your emails!',
    
    // Form Errors
    'form.error.name.required': 'Name is required',
    'form.error.email.required': 'Email is required',
    'form.error.email.invalid': 'Invalid email address',
    'form.error.message.required': 'Message is required',
    'form.error.submit': 'Failed to submit. Please try again.',
    
    // Roles
    'role.ceo': 'CEO/Managing Director',
    'role.manager': 'Manager/Team Leader',
    'role.entrepreneur': 'Entrepreneur/Founder',
    'role.freelancer': 'Freelancer/Consultant',
    'role.employee': 'Employee',
    'role.other': 'Other',
    
    // Language
    'language.german': 'Deutsch',
    'language.english': 'English'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
