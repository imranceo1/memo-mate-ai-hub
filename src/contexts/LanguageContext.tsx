import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'te' | 'ko';

interface Translations {
  dashboard: string;
  timeline: string;
  chat: string;
  reminders: string;
  taskSharing: string;
  settings: string;
  login: string;
  logout: string;
  username: string;
  password: string;
  confirmPassword: string;
  rememberMe: string;
  loginButton: string;
  createAccount: string;
  welcome: string;
  invalidCredentials: string;
  passwordMismatch: string;
  somethingWentWrong: string;
  expandSidebar: string;
  collapseSidebar: string;
}

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translations: Record<Language, Translations> = {
    en: {
      dashboard: 'Dashboard',
      timeline: 'Timeline',
      chat: 'Chat',
      reminders: 'Reminders',
      taskSharing: 'Task Sharing',
      settings: 'Settings',
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember Me',
      loginButton: 'Login',
      createAccount: 'Create Account',
      welcome: 'Welcome',
      invalidCredentials: 'Invalid credentials',
      passwordMismatch: 'Passwords do not match',
      somethingWentWrong: 'Something went wrong',
      expandSidebar: 'Expand Sidebar',
      collapseSidebar: 'Collapse Sidebar',
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      timeline: 'टाइमलाइन',
      chat: 'चैट',
      reminders: 'रिमाइंडर',
      taskSharing: 'कार्य साझा करना',
      settings: 'सेटिंग्स',
      login: 'लॉगिन',
      logout: 'लॉग आउट',
      username: 'उपयोगकर्ता नाम',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      rememberMe: 'मुझे याद रखें',
      loginButton: 'लॉगिन',
      createAccount: 'खाता बनाएं',
      welcome: 'स्वागत',
      invalidCredentials: 'अमान्य क्रेडेंशियल',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      somethingWentWrong: 'कुछ गलत हो गया',
      expandSidebar: 'साइडबार विस्तार करें',
      collapseSidebar: 'साइडबार संकुचित करें',
    },
    ta: {
      dashboard: 'டாஷ்போர்டு',
      timeline: 'காலவரிசை',
      chat: 'உரையாடல்',
      reminders: 'நினைவூட்டல்கள்',
      taskSharing: 'பணி பகிர்வு',
      settings: 'அமைப்புகள்',
      login: 'உள்நுழை',
      logout: 'வெளியேறு',
      username: 'பயனர் பெயர்',
      password: 'கடவுச்சொல்',
      confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      rememberMe: 'என்னை நினைவில் கொள்ளுங்கள்',
      loginButton: 'உள்நுழை',
      createAccount: 'கணக்கை உருவாக்கு',
      welcome: 'வரவேற்பு',
      invalidCredentials: 'தவறான சான்றுகள்',
      passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
      somethingWentWrong: 'ஏதோ தவறு நடந்தது',
      expandSidebar: 'பக்கப்பட்டியை விரிவுபடுத்து',
      collapseSidebar: 'பக்கப்பட்டியை சுருக்கு',
    },
    te: {
      dashboard: 'డాష్‌బోర్డ్',
      timeline: 'కాలక్రమం',
      chat: 'చాట్',
      reminders: 'రిమైండర్‌లు',
      taskSharing: 'టాస్క్ షేరింగ్',
      settings: 'సెట్టింగ్‌లు',
      login: 'లాగిన్',
      logout: 'నిష్క్రమించు',
      username: 'వినియోగదారు పేరు',
      password: 'పాస్‌వర్డ్',
      confirmPassword: 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
      rememberMe: 'నన్ను గుర్తుంచుకో',
      loginButton: 'లాగిన్',
      createAccount: 'ఖాతాను సృష్టించు',
      welcome: 'స్వాగతం',
      invalidCredentials: 'చెల్లని ఆధారాలు',
      passwordMismatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు',
      somethingWentWrong: 'ఏదో తప్పు జరిగింది',
      expandSidebar: 'సైడ్‌బార్ విస్తరించు',
      collapseSidebar: 'సైడ్‌బార్ కుదించు',
    },
    ko: {
      dashboard: '대시보드',
      timeline: '타임라인',
      chat: '채팅',
      reminders: '알림',
      taskSharing: '작업 공유',
      settings: '설정',
      login: '로그인',
      logout: '로그아웃',
      username: '사용자 이름',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      rememberMe: '나를 기억하십시오',
      loginButton: '로그인',
      createAccount: '계정 생성',
      welcome: '환영합니다',
      invalidCredentials: '잘못된 자격 증명',
      passwordMismatch: '비밀번호가 일치하지 않습니다',
      somethingWentWrong: '문제가 발생했습니다',
      expandSidebar: '사이드바 확장',
      collapseSidebar: '사이드바 축소',
    }
  };

  const t = (key: keyof Translations): string => {
    return translations[language][key] || `Missing translation for ${key} in ${language}`;
  };

  const value: LanguageContextProps = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
