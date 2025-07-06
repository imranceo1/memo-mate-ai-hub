
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    timeline: 'Timeline',
    chat: 'AI Chat',
    reminders: 'Reminders',
    settings: 'Settings',
    
    // Landing Page
    heroTitle: 'Your AI-Powered Second Brain',
    heroSubtitle: 'MemoMate intelligently extracts tasks from your daily communications, provides AI-powered assistance, and keeps you organized with smart reminders.',
    getStarted: 'Get Started Free',
    watchDemo: 'Watch Demo',
    
    // Login Page
    signIn: 'Sign In',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    signingIn: 'Signing in...',
    continueWith: 'or continue with',
    continueWithGoogle: 'Continue with Google',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
    back: 'Back',
    
    // Timeline
    addTask: 'Add Task',
    taskTitle: 'Task Title',
    description: 'Description',
    dueDate: 'Due Date',
    dueTime: 'Due Time',
    priority: 'Priority',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    source: 'Source',
    status: 'Status',
    
    // Languages
    english: 'English',
    hindi: 'हिंदी',
    tamil: 'தமிழ்',
    telugu: 'తెలుగు',
    korean: '한국어',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    timeline: 'समयरेखा',
    chat: 'AI चैट',
    reminders: 'रिमाइंडर',
    settings: 'सेटिंग्स',
    
    heroTitle: 'आपका AI-संचालित दूसरा मस्तिष्क',
    heroSubtitle: 'MemoMate आपकी दैनिक संचार से कार्यों को बुद्धिमानी से निकालता है, AI-संचालित सहायता प्रदान करता है, और स्मार्ट रिमाइंडर के साथ आपको व्यवस्थित रखता है।',
    getStarted: 'मुफ्त में शुरू करें',
    watchDemo: 'डेमो देखें',
    
    signIn: 'साइन इन करें',
    enterEmail: 'अपना ईमेल दर्ज करें',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    signingIn: 'साइन इन हो रहा है...',
    continueWith: 'या जारी रखें',
    continueWithGoogle: 'Google के साथ जारी रखें',
    noAccount: 'कोई खाता नहीं है?',
    signUp: 'साइन अप करें',
    back: 'वापस',
    
    addTask: 'कार्य जोड़ें',
    taskTitle: 'कार्य शीर्षक',
    description: 'विवरण',
    dueDate: 'नियत तारीख',
    dueTime: 'नियत समय',
    priority: 'प्राथमिकता',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    source: 'स्रोत',
    status: 'स्थिति',
    
    english: 'English',
    hindi: 'हिंदी',
    tamil: 'தமிழ்',
    telugu: 'తెలుగు',
    korean: '한국어',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    timeline: 'காலவரிசை',
    chat: 'AI அரட்டை',
    reminders: 'நினைவூட்டல்கள்',
    settings: 'அமைப்புகள்',
    
    heroTitle: 'உங்கள் AI-இயங்கும் இரண்டாவது மூளை',
    heroSubtitle: 'MemoMate உங்கள் தினசரி தகவல் பரிமாற்றங்களிலிருந்து பணிகளை புத்திசாலித்தனமாக எடுத்து, AI-இயங்கும் உதவியை வழங்கி, ஸ்மார்ட் அலர்ட்களுடன் உங்களை ஒழுங்கமைக்கிறது।',
    getStarted: 'இலவசமாக தொடங்குங்கள்',
    watchDemo: 'டெமோ பார்க்கவும்',
    
    signIn: 'உள்நுழைய',
    enterEmail: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    enterPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    signingIn: 'உள்நுழைகிறது...',
    continueWith: 'அல்லது தொடரவும்',
    continueWithGoogle: 'Google உடன் தொடரவும்',
    noAccount: 'கணக்கு இல்லையா?',
    signUp: 'பதிவு செய்யவும்',
    back: 'திரும்பு',
    
    addTask: 'பணி சேர்க்கவும்',
    taskTitle: 'பணி தலைப்பு',
    description: 'விளக்கம்',
    dueDate: 'நிர்ணய தேதி',
    dueTime: 'நிர்ணய நேரம்',
    priority: 'முன்னுரிமை',
    low: 'குறைவு',
    medium: 'நடுத்தர',
    high: 'அதிக',
    source: 'மூலம்',
    status: 'நிலை',
    
    english: 'English',
    hindi: 'हिंदी',
    tamil: 'தமிழ்',
    telugu: 'తెలుగు',
    korean: '한국어',
  },
  te: {
    dashboard: 'డాష్‌బోర్డ్',
    timeline: 'టైమ్‌లైన్',
    chat: 'AI చాట్',
    reminders: 'రిమైండర్లు',
    settings: 'సెట్టింగ్స్',
    
    heroTitle: 'మీ AI-శక్తితో కూడిన రెండవ మెదడు',
    heroSubtitle: 'MemoMate మీ రోజువారీ కమ్యూనికేషన్ల నుండి పనులను తెలివిగా వెలికితీసి, AI-శక్తితో కూడిన సహాయాన్ని అందిస్తుంది మరియు స్మార్ట్ రిమైండర్లతో మిమ్మల్ని వ్యవస్థీకృతంగా ఉంచుతుంది।',
    getStarted: 'ఉచితంగా ప్రారంభించండి',
    watchDemo: 'డెమో చూడండి',
    
    signIn: 'సైన్ ఇన్',
    enterEmail: 'మీ ఇమెయిల్ ఎంటర్ చేయండి',
    enterPassword: 'మీ పాస్‌వర్డ్ ఎంటర్ చేయండి',
    signingIn: 'సైన్ ఇన్ అవుతోంది...',
    continueWith: 'లేదా కొనసాగించండి',
    continueWithGoogle: 'Google తో కొనసాగించండి',
    noAccount: 'ఖాతా లేదా?',
    signUp: 'సైన్ అప్',
    back: 'వెనుకకు',
    
    addTask: 'టాస్క్ జోడించండి',
    taskTitle: 'టాస్క్ టైటిల్',
    description: 'వివరణ',
    dueDate: 'గడువు తేదీ',
    dueTime: 'గడువు సమయం',
    priority: 'ప్రాధాన్యత',
    low: 'తక్కువ',
    medium: 'మధ్యస్థ',
    high: 'అధిక',
    source: 'మూలం',
    status: 'స్థితి',
    
    english: 'English',
    hindi: 'हिंदी',
    tamil: 'தமிழ்',
    telugu: 'తెలుగు',
    korean: '한국어',
  },
  ko: {
    dashboard: '대시보드',
    timeline: '타임라인',
    chat: 'AI 채팅',
    reminders: '리마인더',
    settings: '설정',
    
    heroTitle: 'AI 기반 제2의 뇌',
    heroSubtitle: 'MemoMate는 일상의 커뮤니케이션에서 작업을 지능적으로 추출하고, AI 기반 도움을 제공하며, 스마트 리마인더로 체계적으로 관리합니다.',
    getStarted: '무료로 시작하기',
    watchDemo: '데모 보기',
    
    signIn: '로그인',
    enterEmail: '이메일을 입력하세요',
    enterPassword: '비밀번호를 입력하세요',
    signingIn: '로그인 중...',
    continueWith: '또는 계속하기',
    continueWithGoogle: 'Google로 계속하기',
    noAccount: '계정이 없으신가요?',
    signUp: '가입하기',
    back: '뒤로',
    
    addTask: '작업 추가',
    taskTitle: '작업 제목',
    description: '설명',
    dueDate: '마감일',
    dueTime: '마감시간',
    priority: '우선순위',
    low: '낮음',
    medium: '보통',
    high: '높음',
    source: '출처',
    status: '상태',
    
    english: 'English',
    hindi: 'हिंदी',
    tamil: 'தமிழ்',
    telugu: 'తెలుగు',
    korean: '한국어',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('memomate-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('memomate-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
