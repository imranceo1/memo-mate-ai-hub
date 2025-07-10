
import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { landingTranslations } from '@/i18n/translations/landing';

type TranslationModule = 'landing';
type LandingKeys = keyof typeof landingTranslations.en;

export const useTranslation = (module?: TranslationModule) => {
  const { language } = useLanguage();
  
  const translations = useMemo(() => {
    switch (module) {
      case 'landing':
        return landingTranslations[language] || landingTranslations.en;
      default:
        return {};
    }
  }, [language, module]);
  
  const t = useCallback((key: string) => {
    return translations[key as keyof typeof translations] || key;
  }, [translations]);
  
  return { t, language };
};

// Specific hook for landing page
export const useLandingTranslation = () => {
  const { language } = useLanguage();
  
  const t = useCallback((key: LandingKeys) => {
    const translations = landingTranslations[language] || landingTranslations.en;
    return translations[key] || key;
  }, [language]);
  
  return { t, language };
};
