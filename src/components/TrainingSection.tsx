
import React, { useState } from 'react';
import { Calendar, Clock, Zap, Target, Code, Users, BookOpen, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TrainingSection = () => {
  const { t } = useLanguage();
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);

  const trainings = [
    {
      id: 'bootcamp',
      title: t('training.bootcamp.title'),
      duration: t('training.bootcamp.duration'),
      description: t('training.bootcamp.description'),
      icon: <Code className="w-12 h-12" />,
      color: 'from-cyan-500 to-blue-500',
      features: [
        'Advanced Prompting Engineering',
        'GitHub Copilot Mastery',
        'AI-Assisted Code Review',
        'Automated Testing mit AI',
        'KI-gestützte Dokumentation'
      ],
      type: t('training.type.intensive'),
      bookingUrl: 'https://www.tickettailor.com/events/obviousworksgmbh?srch=ai+developer+bootcamp'
    },
    {
      id: 'requirements',
      title: t('training.requirements.title'),
      duration: t('training.requirements.duration'),
      description: t('training.requirements.description'),
      icon: <BookOpen className="w-12 h-12" />,
      color: 'from-green-500 to-emerald-500',
      features: [
        'Automatisierte Anforderungsermittlung',
        'KI-gestützte Stakeholder-Analyse',
        'Smart Requirements Documentation',
        'AI-basierte Risikoanalyse'
      ],
      type: t('training.type.intensive'),
      bookingUrl: 'https://www.tickettailor.com/events/obviousworksgmbh?srch=ai+im+requirements+engineering'
    },
    {
      id: 'product-owner',
      title: t('training.product.title'),
      duration: t('training.product.duration'),
      description: t('training.product.description'),
      icon: <Target className="w-12 h-12" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Automatisierte Marktanalyse',
        'Intelligente Backlog-Optimierung',
        'KI-gestützte User Story Creation',
        'Predictive Analytics für Produktentscheidungen'
      ],
      type: t('training.type.strategic'),
      bookingUrl: 'https://www.tickettailor.com/events/obviousworksgmbh?srch=owner'
    },
    {
      id: 'generative-ai',
      title: t('training.generative.title'),
      duration: t('training.generative.duration'),
      description: t('training.generative.description'),
      icon: <Zap className="w-12 h-12" />,
      color: 'from-yellow-500 to-orange-500',
      features: [
        'LLM-Technologien verstehen',
        'Effective Prompting Strategies',
        'Code Generation Best Practices',
        'KI-Tool Integration'
      ],
      type: t('training.type.foundation'),
      bookingUrl: 'https://www.tickettailor.com/events/obviousworksgmbh?srch=softwareent'
    }
  ];

  return (
    <section className="section min-h-screen bg-gradient-to-br from-black via-green-900 to-black py-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-8 animate-pulse">
            {t('training.title')}
          </h2>
          <p className="text-xl md:text-2xl text-cyan-400">
            {t('training.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {trainings.map((training) => (
            <div
              key={training.id}
              className={`bg-gradient-to-r ${training.color} p-1 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1`}
            >
              <div className="bg-black rounded-xl p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="text-cyan-400 mr-4">
                    {training.icon}
                  </div>
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-black mb-2 ${
                      training.type === t('training.type.intensive') ? 'bg-red-400' :
                      training.type === t('training.type.strategic') ? 'bg-purple-400' :
                      'bg-green-400'
                    }`}>
                      {training.type}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
                  {training.title}
                </h3>

                <div className="flex items-center text-cyan-400 mb-4">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-bold">{training.duration}</span>
                </div>

                <p className="text-white mb-6 leading-relaxed">
                  {training.description}
                </p>

                {selectedTraining === training.id && (
                  <div className="mt-6 space-y-3 animate-fade-in">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">
                      {t('training.what.you.learn')}
                    </h4>
                    {training.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-cyan-400">
                        <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3 mt-6">
                  <button 
                    onClick={() => setSelectedTraining(selectedTraining === training.id ? null : training.id)}
                    className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
                  >
                    {selectedTraining === training.id ? t('training.less.details') : t('training.more.details')}
                  </button>
                  
                  <a
                    href={training.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-cyan-400 transition-colors block text-center"
                  >
                    {t('training.book.now')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-center">
          <div className="border-4 border-yellow-400 rounded-2xl p-8 bg-black bg-opacity-70">
            <div className="text-4xl md:text-6xl font-bold text-yellow-400 mb-6 animate-pulse">
              {t('training.ready.dominate')}
            </div>
            
            <p className="text-xl md:text-2xl text-white mb-8">
              {t('training.weeks.transform')}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-yellow-400 font-bold">{t('training.graduates')}</div>
                <div className="text-white">{t('training.graduates.desc')}</div>
              </div>
              
              <div className="text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-yellow-400 font-bold">{t('training.success.rate')}</div>
                <div className="text-white">{t('training.success.desc')}</div>
              </div>
              
              <div className="text-center">
                <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-yellow-400 font-bold">{t('training.immediately.applicable')}</div>
                <div className="text-white">{t('training.job.ready')}</div>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-12 py-4 rounded-lg font-bold text-2xl hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105"
            >
              {t('training.start.now')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
