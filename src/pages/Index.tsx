import React, { useState, useEffect } from 'react';
import { ArrowDown, Zap, Target, Code, Users, Brain, Phone, Mail } from 'lucide-react';
import ProductivityStats from '../components/ProductivityStats';
import RoleQuiz from '../components/RoleQuiz';
import ContactForm from '../components/ContactForm';
import TrainingSection from '../components/TrainingSection';
import TidyCalEmbed from '../components/TidyCalEmbed';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionBottom = sectionTop + element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-yellow-400 font-mono overflow-x-hidden">
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Hero Section */}
      <section className="section min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-black via-purple-900 to-black px-4">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl px-4 sm:px-8">
          <div className="inline-block text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 animate-pulse">
            <span className="text-yellow-400">{t('hero.title.ai')}</span>
            <span className="text-cyan-400">-</span>
            <span className="text-magenta-400">{t('hero.title.revolution')}</span>
          </div>
          
          <div className="text-lg sm:text-2xl md:text-4xl mb-8 sm:mb-12 text-white leading-tight">
            {t('hero.question')} <span className="text-yellow-400 animate-bounce">{t('hero.ready')}</span> {t('hero.or')}
            <span className="text-red-500 animate-pulse"> {t('hero.left.behind')}</span>?
          </div>
          
          <div className="text-base sm:text-lg md:text-xl mb-12 sm:mb-16 text-cyan-400 max-w-4xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </div>

          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-yellow-400" />
          </div>
        </div>

        {/* Pacman Animation - Hidden on small screens */}
        <div className="absolute bottom-10 left-0 w-full hidden sm:block">
          <div className="pacman-container">
            <div className="pacman"></div>
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Stats */}
      <ProductivityStats />

      {/* Role Quiz */}
      <RoleQuiz />

      {/* Training Section */}
      <TrainingSection />

      {/* Contact Section */}
      <section id="contact" className="section min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-yellow-400 mb-6 sm:mb-8 animate-pulse leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-cyan-400 leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="border-2 border-yellow-400 rounded-lg p-6 sm:p-8 bg-black bg-opacity-50">
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6">
                  {t('contact.expert.title')}
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-4">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />
                    <span className="text-lg sm:text-xl text-white">Matthias Herbert</span>
                  </div>
                  <div className="text-cyan-400 text-sm sm:text-base">{t('contact.expert.role')}</div>
                  
                  <div className="flex items-center space-x-4">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                    <span className="text-white text-sm sm:text-base">+49 151 171 13513</span>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-white text-sm sm:text-base break-all">matthias.herbert@obviousworks.ch</span>
                  </div>
                </div>
              </div>

              {/* TidyCal Embed */}
              <TidyCalEmbed />
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CSS for Pacman Animation */}
      <style>
        {`
        .pacman-container {
          position: relative;
          width: 100%;
          height: 60px;
          overflow: hidden;
        }

        .pacman {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: yellow;
          position: relative;
          animation: movePacman 8s linear infinite;
        }

        .pacman::before {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          width: 0;
          height: 0;
          border: 20px solid transparent;
          border-right: 20px solid black;
          transform: translateY(-50%);
          animation: munch 0.5s ease-in-out infinite alternate;
        }

        .dots {
          position: absolute;
          top: 50%;
          left: 100px;
          transform: translateY(-50%);
          display: flex;
          gap: 30px;
          animation: moveDots 8s linear infinite;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        @keyframes movePacman {
          0% { left: -50px; }
          100% { left: calc(100% + 50px); }
        }

        @keyframes moveDots {
          0% { left: 50px; }
          100% { left: calc(-200px); }
        }

        @keyframes munch {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(45deg); }
        }
        `}
      </style>
    </div>
  );
};

export default Index;
