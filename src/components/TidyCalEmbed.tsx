
import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TidyCalEmbed = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Load TidyCal script
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="border-2 border-cyan-400 rounded-2xl p-8 bg-black bg-opacity-70">
      <div className="text-center mb-6">
        <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {t('contact.direct.access')}
        </h3>
        <p className="text-cyan-400">
          {t('contact.direct.subtitle')}
        </p>
      </div>

      <div className="tidycal-embed" data-path="matthias-herbert/15-minute-meeting"></div>
      
      <div className="mt-6 text-center">
        <div className="text-sm text-cyan-400 mb-2">
          {t('contact.warning')}
        </div>
        <div className="text-xs text-gray-400">
          {t('contact.candidates')}
        </div>
      </div>
    </div>
  );
};

export default TidyCalEmbed;
