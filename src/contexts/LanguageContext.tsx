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
    'hero.title.ai': 'KI',
    'hero.title.revolution': 'REVOLUTION',
    'hero.ready': 'BEREIT',
    'hero.left.behind': 'ABGEHÄNGT',
    'hero.question': 'BIST DU',
    'hero.or': 'ODER WIRST DU',
    'hero.subtitle': 'Wir MÜSSEN viel ändern, damit alles so bleibt wie es JEZTZ ist!',
    
    // Productivity Stats Section
    'stats.title': 'HARDCORE FAKTEN',
    'stats.subtitle': 'Während DU noch überlegst, überholt dich die KONKURRENZ!',
    'stats.source': 'Quelle',
    'stats.software.developers': 'SOFTWARE DEVELOPERS',
    'stats.project.management': 'PROJECT MANAGEMENT',
    'stats.business.analysts': 'BUSINESS ANALYSTEN',
    'stats.productivity.88': '88% produktiver',
    'stats.productivity.88.desc': 'Entwickler mit AI-Tools sind 88% produktiver als ohne AI.',
    'stats.projects.126': '126% mehr Projekte',
    'stats.projects.126.desc': '126% mehr Projekte pro Woche durch AI-Unterstützung bei Programmierern.',
    'stats.ai.code.41': '41% AI-generierter Code',
    'stats.ai.code.41.desc': '41% des gesamten Codes wird bereits von AI generiert.',
    'stats.pm.usage': 'Jeder 5. nutzt AI',
    'stats.pm.usage.desc': 'Jeder 5. Projektmanager nutzt generative AI in über 50% seiner Projekte.',
    'stats.tasks.eliminated': '80% Aufgaben eliminiert',
    'stats.tasks.eliminated.desc': '80% der heutigen Projektmanagement-Aufgaben werden bis 2030 durch AI eliminiert.',
    'stats.documents.59': '59% mehr Dokumente',
    'stats.documents.59.desc': '59% mehr Geschäftsdokumente pro Stunde mit generativer AI.',
    
    // Role Quiz Section
    'quiz.title': '🔥 KI-REVOLUTION QUIZ',
    'quiz.subtitle': 'BIST DU BEREIT ODER WIRST DU ABGEHÄNGT?',
    'quiz.click.assessment': 'Klicken für dein persönliches KI-Assessment',
    'quiz.question': 'Frage',
    'quiz.of': 'von',
    'quiz.next.question': 'NÄCHSTE FRAGE',
    'quiz.show.results': 'ERGEBNISSE ZEIGEN!',
    'quiz.play.again': 'NOCHMAL SPIELEN',
    'quiz.start.training': 'KI-TRAINING STARTEN!',
    'quiz.your.score': 'Dein Score',
    'quiz.points': 'Punkten',
    'quiz.result.ready.title': '🔥 KI-REVOLUTION READY!',
    'quiz.result.ready.message': 'Du bist BEREIT für die totale KI-Transformation! Zeit für Action!',
    'quiz.result.almost.title': '⚡ FAST BEREIT!',
    'quiz.result.almost.message': 'Du spürst bereits die KI-Power! Ein kleiner Schub und du dominierst!',
    'quiz.result.wake.title': '⚠️ AUFWACHEN!',
    'quiz.result.wake.message': 'Die KI-Revolution läuft! Zeit aufzuholen, bevor es zu spät ist!',
    'quiz.final.question': 'FINALE MACHTFRAGE FÜR ALLE: In 18 Monaten führen KI-trainierte Teams den Markt an. Dein Team? Kämpft noch mit Grundlagen. AUFWACHEN oder ABDANKEN?',
    'quiz.final.a': '18 Monate sind lange hin',
    'quiz.final.b': 'Abwarten und beobachten',
    'quiz.final.c': 'AUFWACHEN! Revolution starts NOW!',
    
    // Training Section
    'training.title': 'LEVEL UP YOUR SKILLS!',
    'training.subtitle': 'Während deine Konkurrenz SCHLÄFT, wirst DU zum KI-MASTER!',
    'training.bootcamp.title': 'AI Developer Bootcamp',
    'training.bootcamp.duration': '3 Monate Intensiv',
    'training.bootcamp.description': 'Werden Sie zum KI-Enhanced Developer mit umfassender Transformation. Erlernen Sie Advanced Prompting Engineering, GitHub Copilot Mastery und vieles mehr!',
    'training.requirements.title': 'AI im Requirements Engineering',
    'training.requirements.duration': '1 Tag Intensiv',
    'training.requirements.description': 'Revolutionieren Sie Ihre Anforderungen mit KI-Innovation. Entdecken Sie automatisierte Anforderungsermittlung und KI-gestützte Stakeholder-Analyse.',
    'training.product.title': 'Product Owner 2.0: AI Superpower',
    'training.product.duration': '1 Tag Strategisch',
    'training.product.description': 'Entwickeln Sie KI-Enhanced Produktmanagement-Kompetenzen. Nutzen Sie Automatisierte Marktanalyse und Intelligente Backlog-Optimierung.',
    'training.generative.title': 'Generative AI für Softwareentwicklung',
    'training.generative.duration': '1 Tag Foundation',
    'training.generative.description': 'Erhalten Sie das Fundament für erfolgreiche KI-Integration mit LLM-Technologien und Effective Prompting Strategies.',
    'training.type.intensive': 'Intensiv',
    'training.type.strategic': 'Strategisch',
    'training.type.foundation': 'Foundation',
    'training.what.you.learn': '🔥 WAS DU LERNST:',
    'training.more.details': 'MEHR DETAILS',
    'training.less.details': 'WENIGER DETAILS',
    'training.book.now': 'ZUR BUCHUNG',
    'training.ready.dominate': '🚀 READY TO DOMINATE?',
    'training.weeks.transform': 'In 12 Wochen vom KI-Neuling zum INDUSTRY LEADER!',
    'training.graduates': '500+ Absolventen',
    'training.graduates.desc': 'Bereits KI-Experten',
    'training.success.rate': '95% Erfolgsrate',
    'training.success.desc': 'Produktivitätssteigerung',
    'training.immediately.applicable': 'Sofort anwendbar',
    'training.job.ready': 'Direkt im Job nutzbar',
    'training.start.now': 'JETZT DURCHSTARTEN!',
    
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
    'hero.title.ai': 'AI',
    'hero.title.revolution': 'REVOLUTION',
    'hero.ready': 'READY',
    'hero.left.behind': 'LEFT BEHIND',
    'hero.question': 'ARE YOU',
    'hero.or': 'OR WILL YOU BE',
    'hero.subtitle': 'While your competition increases productivity by 88% with AI tools, you\'re still working in the stone age. Time for the GAME CHANGER!',
    
    // Productivity Stats Section
    'stats.title': 'HARDCORE FACTS',
    'stats.subtitle': 'While YOU are still thinking, your COMPETITION is overtaking you!',
    'stats.source': 'Source',
    'stats.software.developers': 'SOFTWARE DEVELOPERS',
    'stats.project.management': 'PROJECT MANAGEMENT',
    'stats.business.analysts': 'BUSINESS ANALYSTS',
    'stats.productivity.88': '88% more productive',
    'stats.productivity.88.desc': 'Developers with AI tools are 88% more productive than without AI.',
    'stats.projects.126': '126% more projects',
    'stats.projects.126.desc': '126% more projects per week through AI support for programmers.',
    'stats.ai.code.41': '41% AI-generated code',
    'stats.ai.code.41.desc': '41% of all code is already generated by AI.',
    'stats.pm.usage': 'Every 5th uses AI',
    'stats.pm.usage.desc': 'Every 5th project manager uses generative AI in over 50% of their projects.',
    'stats.tasks.eliminated': '80% tasks eliminated',
    'stats.tasks.eliminated.desc': '80% of today\'s project management tasks will be eliminated by AI by 2030.',
    'stats.documents.59': '59% more documents',
    'stats.documents.59.desc': '59% more business documents per hour with generative AI.',
    
    // Role Quiz Section
    'quiz.title': '🔥 AI REVOLUTION QUIZ',
    'quiz.subtitle': 'ARE YOU READY OR WILL YOU BE LEFT BEHIND?',
    'quiz.click.assessment': 'Click for your personal AI assessment',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.next.question': 'NEXT QUESTION',
    'quiz.show.results': 'SHOW RESULTS!',
    'quiz.play.again': 'PLAY AGAIN',
    'quiz.start.training': 'START AI TRAINING!',
    'quiz.your.score': 'Your Score',
    'quiz.points': 'points',
    'quiz.result.ready.title': '🔥 AI REVOLUTION READY!',
    'quiz.result.ready.message': 'You are READY for total AI transformation! Time for action!',
    'quiz.result.almost.title': '⚡ ALMOST READY!',
    'quiz.result.almost.message': 'You already feel the AI power! A small push and you dominate!',
    'quiz.result.wake.title': '⚠️ WAKE UP!',
    'quiz.result.wake.message': 'The AI revolution is running! Time to catch up before it\'s too late!',
    'quiz.final.question': 'FINAL POWER QUESTION FOR ALL: In 18 months, AI-trained teams lead the market. Your team? Still struggling with basics. WAKE UP or STEP DOWN?',
    'quiz.final.a': '18 months is a long way off',
    'quiz.final.b': 'Wait and observe',
    'quiz.final.c': 'WAKE UP! Revolution starts NOW!',
    
    // Training Section
    'training.title': 'LEVEL UP YOUR SKILLS!',
    'training.subtitle': 'While your competition SLEEPS, YOU become the AI MASTER!',
    'training.bootcamp.title': 'AI Developer Bootcamp',
    'training.bootcamp.duration': '3 Months Intensive',
    'training.bootcamp.description': 'Become an AI-Enhanced Developer with comprehensive transformation. Learn Advanced Prompting Engineering, GitHub Copilot Mastery, and much more!',
    'training.requirements.title': 'AI in Requirements Engineering',
    'training.requirements.duration': '1 Day Intensive',
    'training.requirements.description': 'Revolutionize your requirements with AI innovation. Discover automated requirements gathering and AI-supported stakeholder analysis.',
    'training.product.title': 'Product Owner 2.0: AI Superpower',
    'training.product.duration': '1 Day Strategic',
    'training.product.description': 'Develop AI-Enhanced product management skills. Use automated market analysis and intelligent backlog optimization.',
    'training.generative.title': 'Generative AI for Software Development',
    'training.generative.duration': '1 Day Foundation',
    'training.generative.description': 'Get the foundation for successful AI integration with LLM technologies and effective prompting strategies.',
    'training.type.intensive': 'Intensive',
    'training.type.strategic': 'Strategic',
    'training.type.foundation': 'Foundation',
    'training.what.you.learn': '🔥 WHAT YOU\'LL LEARN:',
    'training.more.details': 'MORE DETAILS',
    'training.less.details': 'LESS DETAILS',
    'training.book.now': 'BOOK NOW',
    'training.ready.dominate': '🚀 READY TO DOMINATE?',
    'training.weeks.transform': 'From AI novice to INDUSTRY LEADER in 12 weeks!',
    'training.graduates': '500+ graduates',
    'training.graduates.desc': 'Already AI experts',
    'training.success.rate': '95% success rate',
    'training.success.desc': 'Productivity increase',
    'training.immediately.applicable': 'Immediately applicable',
    'training.job.ready': 'Directly usable in your job',
    'training.start.now': 'START NOW!',
    
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

export default LanguageProvider;
