
import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { landingTranslations } from '@/i18n/translations/landing';
import { settingsTranslations } from '@/i18n/translations/settings';
import { remindersTranslations } from '@/i18n/translations/reminders';
import { commonTranslations } from '@/i18n/translations/common';

type TranslationModule = 'landing' | 'settings' | 'reminders' | 'common';

const translationModules = {
  landing: landingTranslations,
  settings: settingsTranslations,
  reminders: remindersTranslations,
  common: commonTranslations,
};

export const useTranslation = (module?: TranslationModule) => {
  const { language } = useLanguage();
  
  const translations = useMemo(() => {
    if (!module) return {};
    const moduleTranslations = translationModules[module];
    return moduleTranslations?.[language] || moduleTranslations?.en || {};
  }, [language, module]);
  
  const t = useCallback((key: string) => {
    return translations[key as keyof typeof translations] || key;
  }, [translations]);
  
  return { t, language };
};

// Specific hooks for each module
export const useLandingTranslation = () => {
  const { t, language } = useTranslation('landing');
  return { t, language };
};

export const useSettingsTranslation = () => {
  const { t, language } = useTranslation('settings');
  return { t, language };
};

export const useRemindersTranslation = () => {
  const { t, language } = useTranslation('reminders');
  return { t, language };
};

export const useCommonTranslation = () => {
  const { t, language } = useTranslation('common');
  return { t, language };
};
