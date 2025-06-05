
import React, { useState, useEffect } from 'react';
import { TrendingUp, Code, Users, Target, Brain, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductivityStats = () => {
  const { t } = useLanguage();
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    {
      icon: <Code className="w-12 h-12 sm:w-16 sm:h-16" />,
      category: t('stats.software.developers'),
      stat: t('stats.productivity.88'),
      description: t('stats.productivity.88.desc'),
      source: "GitHub Studie",
      url: "https://thebusinessdive.com/ai-productivity-statistics",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16" />,
      category: t('stats.software.developers'),
      stat: t('stats.projects.126'),
      description: t('stats.projects.126.desc'),
      source: "Nielsen Norman Group",
      url: "https://hatchworks.com/blog/gen-ai/generative-ai-statistics/",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Brain className="w-12 h-12 sm:w-16 sm:h-16" />,
      category: t('stats.software.developers'),
      stat: t('stats.ai.code.41'),
      description: t('stats.ai.code.41.desc'),
      source: "Elite Brains",
      url: "https://www.elitebrains.com/blog/aI-generated-code-statistics-2025",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-12 h-12 sm:w-16 sm:h-16" />,
      category: t('stats.project.management'),
      stat: t('stats.pm.usage'),
      description: t('stats.pm.usage.desc'),
      source: "Monday.com",
      url: "https://monday.com/blog/project-management/project-management-statistics/",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Target className="w-12 h-12 sm:w-16 sm:h-16" />,
      category: t('stats.project.management'),
      stat: t('stats.tasks.eliminated'),
      description: t('stats.tasks.eliminated.desc'),
      source: "Gartner",
      url: "https://www.gartner.com/en/newsroom/press-releases/2019-03-20-gartner-says-80-percent-of-today-s-project-management",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Zap className="w-12 h-12 sm:w-16 sm:h-16" />,
      category: t('stats.business.analysts'),
      stat: t('stats.documents.59'),
      description: t('stats.documents.59.desc'),
      source: "Nielsen Norman Group",
      url: "https://hatchworks.com/blog/gen-ai/generative-ai-statistics/",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="section min-h-screen bg-gradient-to-br from-black via-blue-900 to-black py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-yellow-400 mb-6 sm:mb-8 animate-pulse leading-tight">
            {t('stats.title')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-400 leading-relaxed">
            {t('stats.subtitle')}
          </p>
        </div>

        {/* Main Featured Stat */}
        <div className="mb-12 sm:mb-16">
          <div className={`bg-gradient-to-r ${stats[currentStat].color} p-1 rounded-2xl`}>
            <div className="bg-black rounded-xl p-6 sm:p-8 lg:p-12 text-center">
              <div className="text-cyan-400 mb-4 flex justify-center">
                {stats[currentStat].icon}
              </div>
              
              <div className="text-sm sm:text-lg text-cyan-400 mb-3 sm:mb-4 tracking-wider">
                {stats[currentStat].category}
              </div>
              
              <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-yellow-400 mb-4 sm:mb-6 animate-pulse leading-tight">
                {stats[currentStat].stat}
              </div>
              
              <p className="text-base sm:text-xl md:text-2xl text-white mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed">
                {stats[currentStat].description}
              </p>
              
              <a 
                href={stats[currentStat].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-yellow-400 transition-colors underline text-sm sm:text-lg"
              >
                {t('stats.source')}: {stats[currentStat].source}
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`border-2 border-yellow-400 rounded-lg p-4 sm:p-6 bg-black bg-opacity-70 transition-all duration-500 hover:scale-105 cursor-pointer ${
                index === currentStat ? 'ring-4 ring-cyan-400 scale-105' : ''
              }`}
              onClick={() => setCurrentStat(index)}
            >
              <div className="text-cyan-400 mb-3 sm:mb-4 flex justify-center">
                {stat.icon}
              </div>
              
              <div className="text-xs sm:text-sm text-cyan-400 mb-2 tracking-wider text-center">
                {stat.category}
              </div>
              
              <div className="text-lg sm:text-2xl font-bold text-yellow-400 mb-2 sm:mb-3 text-center">
                {stat.stat}
              </div>
              
              <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed text-center">
                {stat.description}
              </p>
              
              <div className="text-xs text-cyan-400 text-center">
                {stat.source}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8 sm:mt-12 space-x-2">
          {stats.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentStat ? 'bg-yellow-400 scale-125' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductivityStats;
