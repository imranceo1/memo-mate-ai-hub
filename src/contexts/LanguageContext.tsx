import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'ko';

export interface Translations {
  aiAssistant: string;
  chatWithAI: string;
  aiWelcomeMessage: string;
  askAnything: string;
  aiResponseTasksDue: string;
  aiResponseReminder: string;
  aiResponseProductivity: string;
  aiResponseDataProtection: string;
  aiResponseDefault: string;
  aiResponseDefaultEnd: string;
  quickQuestions: string;
  whatTasksDueToday: string;
  howToSetReminder: string;
  showProductivityStats: string;
  howDataProtection: string;
  aiFeatures: string;
  aiFeature1: string;
  aiFeature2: string;
  aiFeature3: string;
  aiFeature4: string;
  timeline: string;
  manageYourTasks: string;
  addTask: string;
  taskTitle: string;
  enterTaskTitle: string;
  description: string;
  enterDescription: string;
  dueDate: string;
  dueTime: string;
  priority: string;
  urgency: string;
  low: string;
  medium: string;
  high: string;
  normal: string;
  urgent: string;
  source: string;
  manual: string;
  gmail: string;
  whatsapp: string;
  calendar: string;
  sms: string;
  status: string;
  pending: string;
  completed: string;
  cancel: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    aiAssistant: 'AI Assistant',
    chatWithAI: 'Chat with our AI assistant for quick answers and assistance.',
    aiWelcomeMessage: "Hello! How can I help you today?",
    askAnything: 'Ask me anything...',
    aiResponseTasksDue: "You have 3 tasks due today: Meeting with John, Design review, and Report submission.",
    aiResponseReminder: "To set a reminder, just type 'Remind me to [task] at [time]'.",
    aiResponseProductivity: "Your productivity stats for this week are: 80% tasks completed, 10 hours of focused work.",
    aiResponseDataProtection: "We ensure your data is protected with end-to-end encryption and GDPR compliance.",
    aiResponseDefault: "I can help you with tasks, reminders, productivity stats, and data protection. Tell me more about ",
    aiResponseDefaultEnd: "?",
    quickQuestions: 'Quick Questions',
    whatTasksDueToday: 'What tasks are due today?',
    howToSetReminder: 'How do I set a reminder?',
    showProductivityStats: 'Show me my productivity stats.',
    howDataProtection: 'How is my data protected?',
    aiFeatures: 'AI Features',
    aiFeature1: 'Smart Task Management',
    aiFeature2: 'Automated Reminders',
    aiFeature3: 'Productivity Tracking',
    aiFeature4: 'Data Protection',
    timeline: 'Timeline',
    manageYourTasks: 'Manage your tasks and schedule.',
    addTask: 'Add Task',
    taskTitle: 'Task Title',
    enterTaskTitle: 'Enter task title',
    description: 'Description',
    enterDescription: 'Enter description',
    dueDate: 'Due Date',
    dueTime: 'Due Time',
    priority: 'Priority',
    urgency: 'Urgency',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    normal: "Normal",
    urgent: "Urgent",
    source: "Source",
    manual: "Manual",
    gmail: "Gmail",
    whatsapp: "WhatsApp",
    calendar: "Calendar",
    sms: "SMS",
    status: "Status",
    pending: "Pending",
    completed: "Completed",
    cancel: "Cancel",
  },
  hi: {
    aiAssistant: 'ऐआई असिस्टेंट',
    chatWithAI: 'त्वरित उत्तर और सहायता के लिए हमारे ऐआई असिस्टेंट के साथ चैट करें।',
    aiWelcomeMessage: "नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूँ?",
    askAnything: 'मुझसे कुछ भी पूछें...',
    aiResponseTasksDue: "आज आपके 3 कार्य हैं: जॉन के साथ मीटिंग, डिज़ाइन समीक्षा, और रिपोर्ट जमा करना।",
    aiResponseReminder: "एक अनुस्मारक सेट करने के लिए, बस 'मुझे [कार्य] [समय] पर याद दिलाएं' टाइप करें।",
    aiResponseProductivity: "इस सप्ताह के लिए आपके उत्पादकता आँकड़े हैं: 80% कार्य पूर्ण, 10 घंटे का केंद्रित कार्य।",
    aiResponseDataProtection: "हम सुनिश्चित करते हैं कि आपका डेटा एंड-टू-एंड एन्क्रिप्शन और जीडीपीआर अनुपालन के साथ सुरक्षित है।",
    aiResponseDefault: "मैं कार्यों, अनुस्मारकों, उत्पादकता आँकड़ों और डेटा सुरक्षा में आपकी सहायता कर सकता हूँ। मुझे इसके बारे में और बताएं ",
    aiResponseDefaultEnd: "?",
    quickQuestions: 'त्वरित प्रश्न',
    whatTasksDueToday: 'आज कौन से कार्य हैं?',
    howToSetReminder: 'मैं अनुस्मारक कैसे सेट करूं?',
    showProductivityStats: 'मुझे अपने उत्पादकता आँकड़े दिखाएँ।',
    howDataProtection: 'मेरा डेटा कैसे सुरक्षित है?',
    aiFeatures: 'ऐआई सुविधाएँ',
    aiFeature1: 'स्मार्ट कार्य प्रबंधन',
    aiFeature2: 'स्वचालित अनुस्मारक',
    aiFeature3: 'उत्पादकता ट्रैकिंग',
    aiFeature4: 'डेटा सुरक्षा',
    timeline: 'समयरेखा',
    manageYourTasks: 'अपने कार्यों और शेड्यूल का प्रबंधन करें।',
    addTask: 'कार्य जोड़ें',
    taskTitle: 'कार्य शीर्षक',
    enterTaskTitle: 'कार्य शीर्षक दर्ज करें',
    description: 'विवरण',
    enterDescription: 'विवरण दर्ज करें',
    dueDate: 'नियत तारीख',
    dueTime: 'नियत समय',
    priority: 'प्राथमिकता',
    urgency: 'तत्काल',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    normal: "सामान्य",
    urgent: "तत्काल",
    source: "स्रोत",
    manual: "मैनुअल",
    gmail: "जीमेल",
    whatsapp: "व्हाट्सएप",
    calendar: "कैलेंडर",
    sms: "एसएमएस",
    status: "स्थिति",
    pending: "लंबित",
    completed: "पूर्ण",
    cancel: "रद्द करें",
  },
  ta: {
    aiAssistant: 'AI உதவி',
    chatWithAI: 'விரைவான பதில்கள் மற்றும் உதவிக்கு எங்கள் AI உதவியாளருடன் அரட்டை அடிக்கவும்.',
    aiWelcomeMessage: "வணக்கம்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    askAnything: 'என்னிடம் எதையும் கேளுங்கள்...',
    aiResponseTasksDue: "இன்று உங்களுக்கு 3 பணிகள் உள்ளன: ஜானுடன் சந்திப்பு, வடிவமைப்பு ஆய்வு மற்றும் அறிக்கை சமர்ப்பிப்பு.",
    aiResponseReminder: "ஒரு நினைவூட்டலை அமைக்க, '[நேரம்] மணிக்கு [பணி] செய்ய எனக்கு நினைவூட்டு' என்று தட்டச்சு செய்க.",
    aiResponseProductivity: "இந்த வாரத்திற்கான உங்கள் உற்பத்தித்திறன் புள்ளிவிவரங்கள்: 80% பணிகள் முடிந்தது, 10 மணிநேர கவனம் செலுத்திய வேலை.",
    aiResponseDataProtection: "உங்கள் தரவு இறுதி முதல் இறுதி வரை குறியாக்கம் மற்றும் ஜிடிபிஆர் இணக்கத்துடன் பாதுகாக்கப்படுவதை நாங்கள் உறுதி செய்கிறோம்.",
    aiResponseDefault: "பணிகள், நினைவூட்டல்கள், உற்பத்தித்திறன் புள்ளிவிவரங்கள் மற்றும் தரவு பாதுகாப்பு ஆகியவற்றில் நான் உங்களுக்கு உதவ முடியும். பற்றி மேலும் சொல்லுங்கள் ",
    aiResponseDefaultEnd: "?",
    quickQuestions: 'விரைவான கேள்விகள்',
    whatTasksDueToday: 'இன்று என்ன பணிகள் உள்ளன?',
    howToSetReminder: 'நான் எப்படி ஒரு நினைவூட்டலை அமைப்பது?',
    showProductivityStats: 'எனது உற்பத்தித்திறன் புள்ளிவிவரங்களைக் காட்டுங்கள்.',
    howDataProtection: 'எனது தரவு எவ்வாறு பாதுகாக்கப்படுகிறது?',
    aiFeatures: 'AI அம்சங்கள்',
    aiFeature1: 'ஸ்மார்ட் பணி மேலாண்மை',
    aiFeature2: 'தானியங்கி நினைவூட்டல்கள்',
    aiFeature3: 'உற்பத்தித்திறன் கண்காணிப்பு',
    aiFeature4: 'தரவு பாதுகாப்பு',
    timeline: 'காலவரிசை',
    manageYourTasks: 'உங்கள் பணிகள் மற்றும் அட்டவணையை நிர்வகிக்கவும்.',
    addTask: 'பணி சேர்',
    taskTitle: 'பணி தலைப்பு',
    enterTaskTitle: 'பணி தலைப்பை உள்ளிடவும்',
    description: 'விளக்கம்',
    enterDescription: 'விளக்கம் உள்ளிடவும்',
    dueDate: 'முடியும் தேதி',
    dueTime: 'முடியும் நேரம்',
    priority: 'முன்னுரிமை',
    urgency: 'அவசரம்',
    low: 'குறைந்த',
    medium: 'நடுத்தர',
    high: 'உயர்',
    normal: "சாதாரண",
    urgent: "அவசரம்",
    source: "மூலம்",
    manual: "கையேடு",
    gmail: "ஜிமெயில்",
    whatsapp: "வாட்ஸ்அப்",
    calendar: "நாட்காட்டி",
    sms: "எஸ்எம்எஸ்",
    status: "நிலை",
    pending: "நிலுவையில் உள்ளது",
    completed: "முடிந்தது",
    cancel: "ரத்து செய்",
  },
  te: {
    aiAssistant: 'AI సహాయకుడు',
    chatWithAI: 'శీఘ్ర సమాధానాలు మరియు సహాయం కోసం మా AI సహాయకుడితో చాట్ చేయండి.',
    aiWelcomeMessage: "నమస్కారం! ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    askAnything: 'నన్ను ఏదైనా అడగండి...',
    aiResponseTasksDue: "ఈ రోజు మీకు 3 పనులు ఉన్నాయి: జాన్‌తో సమావేశం, డిజైన్ సమీక్ష మరియు నివేదిక సమర్పణ.",
    aiResponseReminder: "రిమైండర్‌ను సెట్ చేయడానికి, '[సమయం] వద్ద [పని] చేయమని నాకు గుర్తు చేయి' అని టైప్ చేయండి.",
    aiResponseProductivity: "ఈ వారం మీ ఉత్పాదకత గణాంకాలు: 80% పనులు పూర్తయ్యాయి, 10 గంటల దృష్టి కేంద్రీకరించిన పని.",
    aiResponseDataProtection: "మీ డేటా ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్షన్ మరియు జిడిపిఆర్ సమ్మతితో రక్షించబడిందని మేము నిర్ధారిస్తాము.",
    aiResponseDefault: "పనులు, రిమైండర్‌లు, ఉత్పాదకత గణాంకాలు మరియు డేటా రక్షణలో నేను మీకు సహాయం చేయగలను. గురించి నాకు మరింత చెప్పండి ",
    aiResponseDefaultEnd: "?",
    quickQuestions: 'శీఘ్ర ప్రశ్నలు',
    whatTasksDueToday: 'ఈ రోజు ఏ పనులు ఉన్నాయి?',
    howToSetReminder: 'నేను రిమైండర్‌ను ఎలా సెట్ చేయాలి?',
    showProductivityStats: 'నా ఉత్పాదకత గణాంకాలను నాకు చూపించు.',
    howDataProtection: 'నా డేటా ఎలా రక్షించబడుతుంది?',
    aiFeatures: 'AI లక్షణాలు',
    aiFeature1: 'స్మార్ట్ టాస్క్ మేనేజ్‌మెంట్',
    aiFeature2: 'ఆటోమేటెడ్ రిమైండర్‌లు',
    aiFeature3: 'ఉత్పాదకత ట్రాకింగ్',
    aiFeature4: 'డేటా రక్షణ',
    timeline: 'కాలక్రమం',
    manageYourTasks: 'మీ పనులు మరియు షెడ్యూల్‌ను నిర్వహించండి.',
    addTask: 'పనిని జోడించు',
    taskTitle: 'పని శీర్షిక',
    enterTaskTitle: 'పని శీర్షికను నమోదు చేయండి',
    description: 'వివరణ',
    enterDescription: 'వివరణను నమోదు చేయండి',
    dueDate: 'గడువు తేదీ',
    dueTime: 'గడువు సమయం',
    priority: 'ప్రాధాన్యత',
    urgency: 'అత్యవసరం',
    low: 'తక్కువ',
    medium: 'మీడియం',
    high: 'అధిక',
    normal: "సాధారణ",
    urgent: "అత్యవసరం",
    source: "మూలం",
    manual: "మాన్యువల్",
    gmail: "జిమెయిల్",
    whatsapp: "వాట్సాప్",
    calendar: "కేలెండర్",
    sms: "ఎస్ఎంఎస్",
    status: "స్థితి",
    pending: "పెండింగ్‌లో ఉంది",
    completed: "పూర్తయింది",
    cancel: "రద్దు చేయి",
  },
  ko: {
    aiAssistant: 'AI 도우미',
    chatWithAI: '빠른 답변과 지원을 위해 AI 도우미와 채팅하십시오.',
    aiWelcomeMessage: "안녕하세요! 오늘 무엇을 도와드릴까요?",
    askAnything: '무엇이든 물어보세요...',
    aiResponseTasksDue: "오늘 할 일 3가지가 있습니다: John과의 회의, 디자인 검토, 보고서 제출.",
    aiResponseReminder: "알림을 설정하려면 '나에게 [시간]에 [작업]을 상기시켜줘'라고 입력하세요.",
    aiResponseProductivity: "이번 주 생산성 통계는 다음과 같습니다: 작업 완료 80%, 집중 작업 10시간.",
    aiResponseDataProtection: "귀하의 데이터는 종단 간 암호화 및 GDPR 준수로 보호되도록 보장합니다.",
    aiResponseDefault: "작업, 알림, 생산성 통계 및 데이터 보호에 대해 도와드릴 수 있습니다. 에 대해 자세히 알려주세요 ",
    aiResponseDefaultEnd: "?",
    quickQuestions: '빠른 질문',
    whatTasksDueToday: '오늘 할 일은 무엇입니까?',
    howToSetReminder: '알림을 어떻게 설정합니까?',
    showProductivityStats: '생산성 통계를 보여주세요.',
    howDataProtection: '내 데이터는 어떻게 보호됩니까?',
    aiFeatures: 'AI 기능',
    aiFeature1: '스마트 작업 관리',
    aiFeature2: '자동 알림',
    aiFeature3: '생산성 추적',
    aiFeature4: '데이터 보호',
    timeline: '타임라인',
    manageYourTasks: '작업 및 일정을 관리하십시오.',
    addTask: '작업 추가',
    taskTitle: '작업 제목',
    enterTaskTitle: '작업 제목 입력',
    description: '설명',
    enterDescription: '설명 입력',
    dueDate: '마감일',
    dueTime: '마감 시간',
    priority: '우선 순위',
    urgency: '긴급',
    low: '낮음',
    medium: '중간',
    high: '높음',
    normal: "일반",
    urgent: "긴급",
    source: "출처",
    manual: "수동",
    gmail: "지메일",
    whatsapp: "왓츠앱",
    calendar: "캘린더",
    sms: "문자",
    status: "상태",
    pending: "보류 중",
    completed: "완료됨",
    cancel: "취소",
  },
};

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (key: keyof Translations) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback((key: keyof Translations): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
