
import { useLanguage } from '@/contexts/LanguageContext';
import { analyticsTranslations } from '@/i18n/translations/analytics';

export const useAnalyticsTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    return analyticsTranslations[language as keyof typeof analyticsTranslations]?.[key as keyof typeof analyticsTranslations.en] || key;
  };
  
  return { t };
};
