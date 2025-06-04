
import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-black/80 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black backdrop-blur-sm"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="bg-black border-yellow-400 text-yellow-400"
          align="end"
        >
          <DropdownMenuItem
            onClick={() => setLanguage('de')}
            className={`hover:bg-yellow-400 hover:text-black cursor-pointer ${
              language === 'de' ? 'bg-yellow-400/20' : ''
            }`}
          >
            🇩🇪 {t('language.german')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage('en')}
            className={`hover:bg-yellow-400 hover:text-black cursor-pointer ${
              language === 'en' ? 'bg-yellow-400/20' : ''
            }`}
          >
            🇺🇸 {t('language.english')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageToggle;
