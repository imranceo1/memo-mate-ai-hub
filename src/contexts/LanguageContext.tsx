
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'ko';

export interface Translations {
  // Navigation
  dashboard: string;
  chat: string;
  reminders: string;
  taskSharing: string;
  settings: string;
  expandSidebar: string;
  collapseSidebar: string;
  
  // Theme
  light: string;
  dark: string;
  
  // Auth
  signIn: string;
  signUp: string;
  back: string;
  enterEmail: string;
  enterPassword: string;
  signingIn: string;
  continueWith: string;
  continueWithGoogle: string;
  noAccount: string;
  
  // Landing
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  watchDemo: string;
  
  // Dashboard
  goodMorning: string;
  tasksToday: string;
  tasksCompleted: string;
  pendingTasks: string;
  productivityScore: string;
  streakDays: string;
  quickActions: string;
  addNewTask: string;
  setReminder: string;
  viewAnalytics: string;
  viewAllTasks: string;
  upcomingTasks: string;
  aiInsights: string;
  productivityTip: string;
  productivityTipText: string;
  weeklySummary: string;
  weeklySummaryText: string;
  
  // Reminders
  smartReminders: string;
  neverMiss: string;
  notificationSettings: string;
  oneHourBefore: string;
  defaultReminder: string;
  emailAlerts: string;
  highPriorityTasks: string;
  pushNotifications: string;
  allReminders: string;
  activeStreak: string;
  thisWeek: string;
  today: string;
  tomorrow: string;
  thisMonth: string;
  dueToday: string;
  dueTomorrow: string;
  
  // Sharing
  collaborateWithTeam: string;
  tasksShared: string;
  tasksReceived: string;
  activeCollaborators: string;
  sharedByMe: string;
  receivedByMe: string;
  noSharedTasks: string;
  startSharingTasks: string;
  shareFirstTask: string;
  noReceivedTasks: string;
  waitingForTasks: string;
  shareNewTask: string;
  assignTo: string;
  enterEmailAddress: string;
  role: string;
  viewer: string;
  editor: string;
  admin: string;
  viewerDesc: string;
  editorDesc: string;
  adminDesc: string;
  shareTask: string;
  assignedTo: string;
  assignedBy: string;
  accepted: string;
  acceptTask: string;
  markComplete: string;
  markIncomplete: string;
  deleteTask: string;
  showLess: string;
  showMore: string;
  created: string;
  accept: string;
  complete: string;
  selectTaskToShare: string;
  shareDetails: string;
  all: string;
  createTasksToShare: string;
  
  // Chat
  chatWithMemoMate: string;
  
  // AI Assistant
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
  
  // Timeline
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
  searchTasks: string;
  noTasksFound: string;
  noUpcomingTasks: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    chat: 'Chat',
    reminders: 'Reminders',
    taskSharing: 'Task Sharing',
    settings: 'Settings',
    expandSidebar: 'Expand sidebar',
    collapseSidebar: 'Collapse sidebar',
    
    // Theme
    light: 'Light',
    dark: 'Dark',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    back: 'Back',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    signingIn: 'Signing in...',
    continueWith: 'Or continue with',
    continueWithGoogle: 'Continue with Google',
    noAccount: "Don't have an account?",
    
    // Landing
    heroTitle: 'Your Second Brain for Everything',
    heroSubtitle: 'AI-powered task management that learns from your habits and keeps you organized across all platforms.',
    getStarted: 'Get Started',
    watchDemo: 'Watch Demo',
    
    // Dashboard
    goodMorning: 'Good morning! Ready to tackle today?',
    tasksToday: 'You have 8 tasks scheduled for today.',
    tasksCompleted: 'Tasks Completed',
    pendingTasks: 'Pending Tasks',
    productivityScore: 'Productivity Score',
    streakDays: 'Days Streak',
    quickActions: 'Quick Actions',
    addNewTask: 'Add New Task',
    setReminder: 'Set Reminder',
    viewAnalytics: 'View Analytics',
    viewAllTasks: 'View All Tasks',
    upcomingTasks: 'Upcoming Tasks',
    aiInsights: 'AI Insights',
    productivityTip: 'Productivity Tip',
    productivityTipText: 'Your peak productivity hours are 9-11 AM. Schedule your most important tasks during this time.',
    weeklySummary: 'Weekly Summary',
    weeklySummaryText: 'You completed 85% of your tasks this week. Great job staying consistent!',
    
    // Reminders
    smartReminders: 'Smart Reminders',
    neverMiss: 'Never miss an important task again with intelligent notifications.',
    notificationSettings: 'Notification Settings',
    oneHourBefore: '1 Hour Before',
    defaultReminder: 'Default reminder for all tasks',
    emailAlerts: 'Email Alerts',
    highPriorityTasks: 'For high priority tasks only',
    pushNotifications: 'Push Notifications',
    allReminders: 'For all reminders and updates',
    activeStreak: 'Active Streak',
    thisWeek: 'This Week',
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisMonth: 'This Month',
    dueToday: 'Due Today',
    dueTomorrow: 'Due Tomorrow',
    
    // Sharing
    collaborateWithTeam: 'Collaborate with your team and share tasks seamlessly.',
    tasksShared: 'Tasks Shared',
    tasksReceived: 'Tasks Received',
    activeCollaborators: 'Active Collaborators',
    sharedByMe: 'Shared by Me',
    receivedByMe: 'Received by Me',
    noSharedTasks: 'No shared tasks yet',
    startSharingTasks: 'Start sharing tasks with your team to collaborate effectively.',
    shareFirstTask: 'Share Your First Task',
    noReceivedTasks: 'No received tasks',
    waitingForTasks: 'Waiting for team members to share tasks with you.',
    shareNewTask: 'Share New Task',
    assignTo: 'Assign To',
    enterEmailAddress: 'Enter email address',
    role: 'Role',
    viewer: 'Viewer',
    editor: 'Editor',
    admin: 'Admin',
    viewerDesc: 'Can view only',
    editorDesc: 'Can edit and complete',
    adminDesc: 'Full access',
    shareTask: 'Share Task',
    assignedTo: 'Assigned to',
    assignedBy: 'Assigned by',
    accepted: 'Accepted',
    acceptTask: 'Accept Task',
    markComplete: 'Mark Complete',
    markIncomplete: 'Mark Incomplete',
    deleteTask: 'Delete Task',
    showLess: 'Show less',
    showMore: 'Show more',
    created: 'Created',
    accept: 'Accept',
    complete: 'Complete',
    selectTaskToShare: 'Select Task to Share',
    shareDetails: 'Share Details',
    all: 'All',
    createTasksToShare: 'Create tasks to share with your team',
    
    // Chat
    chatWithMemoMate: 'Chat with MemoMate',
    
    // AI Assistant
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
    
    // Timeline
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
    searchTasks: "Search tasks...",
    noTasksFound: "No tasks found",
    noUpcomingTasks: "No upcoming tasks",
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    chat: 'चैट',
    reminders: 'अनुस्मारक',
    taskSharing: 'कार्य साझाकरण',
    settings: 'सेटिंग्स',
    expandSidebar: 'साइडबार विस्तृत करें',
    collapseSidebar: 'साइडबार संकुचित करें',
    
    // Theme
    light: 'प्रकाश',
    dark: 'अंधेरा',
    
    // Auth
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    back: 'वापस',
    enterEmail: 'अपना ईमेल दर्ज करें',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    signingIn: 'साइन इन हो रहे हैं...',
    continueWith: 'या इसके साथ जारी रखें',
    continueWithGoogle: 'Google के साथ जारी रखें',
    noAccount: 'खाता नहीं है?',
    
    // Landing
    heroTitle: 'हर चीज के लिए आपका दूसरा दिमाग',
    heroSubtitle: 'AI-संचालित कार्य प्रबंधन जो आपकी आदतों से सीखता है और आपको सभी प्लेटफॉर्म पर व्यवस्थित रखता है।',
    getStarted: 'शुरू करें',
    watchDemo: 'डेमो देखें',
    
    // Dashboard
    goodMorning: 'सुप्रभात! आज से निपटने के लिए तैयार?',
    tasksToday: 'आज आपके पास 8 कार्य निर्धारित हैं।',
    tasksCompleted: 'पूर्ण कार्य',
    pendingTasks: 'लंबित कार्य',
    productivityScore: 'उत्पादकता स्कोर',
    streakDays: 'दिन की लकीर',
    quickActions: 'त्वरित क्रियाएं',
    addNewTask: 'नया कार्य जोड़ें',
    setReminder: 'अनुस्मारक सेट करें',
    viewAnalytics: 'एनालिटिक्स देखें',
    viewAllTasks: 'सभी कार्य देखें',
    upcomingTasks: 'आगामी कार्य',
    aiInsights: 'AI अंतर्दृष्टि',
    productivityTip: 'उत्पादकता टिप',
    productivityTipText: 'आपके शिखर उत्पादकता घंटे सुबह 9-11 बजे हैं। इस समय अपने सबसे महत्वपूर्ण कार्य निर्धारित करें।',
    weeklySummary: 'साप्ताहिक सारांश',
    weeklySummaryText: 'आपने इस सप्ताह अपने 85% कार्य पूरे किए। निरंतर रहने के लिए बहुत बढ़िया!',
    
    // Reminders
    smartReminders: 'स्मार्ट अनुस्मारक',
    neverMiss: 'बुद्धिमान सूचनाओं के साथ फिर कभी महत्वपूर्ण कार्य न चूकें।',
    notificationSettings: 'सूचना सेटिंग्स',
    oneHourBefore: '1 घंटे पहले',
    defaultReminder: 'सभी कार्यों के लिए डिफ़ॉल्ट अनुस्मारक',
    emailAlerts: 'ईमेल अलर्ट',
    highPriorityTasks: 'केवल उच्च प्राथमिकता कार्यों के लिए',
    pushNotifications: 'पुश सूचनाएं',
    allReminders: 'सभी अनुस्मारक और अपडेट के लिए',
    activeStreak: 'सक्रिय लकीर',
    thisWeek: 'यह सप्ताह',
    today: 'आज',
    tomorrow: 'कल',
    thisMonth: 'यह महीना',
    dueToday: 'आज देय',
    dueTomorrow: 'कल देय',
    
    // Sharing
    collaborateWithTeam: 'अपनी टीम के साथ सहयोग करें और कार्यों को सहजता से साझा करें।',
    tasksShared: 'साझा किए गए कार्य',
    tasksReceived: 'प्राप्त कार्य',
    activeCollaborators: 'सक्रिय सहयोगी',
    sharedByMe: 'मेरे द्वारा साझा',
    receivedByMe: 'मेरे द्वारा प्राप्त',
    noSharedTasks: 'अभी तक कोई साझा कार्य नहीं',
    startSharingTasks: 'प्रभावी रूप से सहयोग करने के लिए अपनी टीम के साथ कार्य साझा करना शुरू करें।',
    shareFirstTask: 'अपना पहला कार्य साझा करें',
    noReceivedTasks: 'कोई प्राप्त कार्य नहीं',
    waitingForTasks: 'टीम के सदस्यों के साथ कार्य साझा करने की प्रतीक्षा कर रहे हैं।',
    shareNewTask: 'नया कार्य साझा करें',
    assignTo: 'असाइन करें',
    enterEmailAddress: 'ईमेल पता दर्ज करें',
    role: 'भूमिका',
    viewer: 'दर्शक',
    editor: 'संपादक',
    admin: 'व्यवस्थापक',
    viewerDesc: 'केवल देख सकते हैं',
    editorDesc: 'संपादित और पूर्ण कर सकते हैं',
    adminDesc: 'पूर्ण पहुंच',
    shareTask: 'कार्य साझा करें',
    assignedTo: 'को सौंपा गया',
    assignedBy: 'द्वारा सौंपा गया',
    accepted: 'स्वीकृत',
    acceptTask: 'कार्य स्वीकार करें',
    markComplete: 'पूर्ण चिह्नित करें',
    markIncomplete: 'अपूर्ण चिह्नित करें',
    deleteTask: 'कार्य हटाएं',
    showLess: 'कम दिखाएं',
    showMore: 'और दिखाएं',
    created: 'बनाया गया',
    accept: 'स्वीकार करें',
    complete: 'पूर्ण',
    selectTaskToShare: 'साझा करने के लिए कार्य चुनें',
    shareDetails: 'साझा करने का विवरण',
    all: 'सभी',
    createTasksToShare: 'अपनी टीम के साथ साझा करने के लिए कार्य बनाएं',
    
    // Chat
    chatWithMemoMate: 'मेमोमेट के साथ चैट करें',
    
    // AI Assistant
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
    
    // Timeline
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
    searchTasks: "कार्य खोजें...",
    noTasksFound: "कोई कार्य नहीं मिला",
    noUpcomingTasks: "कोई आगामी कार्य नहीं",
  },
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    chat: 'அரட்டை',
    reminders: 'நினைவூட்டல்கள்',
    taskSharing: 'பணி பகிர்வு',
    settings: 'அமைப்புகள்',
    expandSidebar: 'பக்கப்பட்டியை விரிவாக்கு',
    collapseSidebar: 'பக்கப்பட்டியை சுருக்கு',
    
    // Theme
    light: 'ஒளி',
    dark: 'இருள்',
    
    // Auth
    signIn: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    back: 'பின்னர்',
    enterEmail: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    enterPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    signingIn: 'உள்நுழைகிறது...',
    continueWith: 'அல்லது இதைக் கொண்டு தொடரவும்',
    continueWithGoogle: 'Google உடன் தொடரவும்',
    noAccount: 'கணக்கு இல்லையா?',
    
    // Landing
    heroTitle: 'எல்லாவற்றிற்கும் உங்கள் இரண்டாவது மூளை',
    heroSubtitle: 'உங்கள் பழக்கவழக்கங்களில் இருந்து கற்றுக்கொள்ளும் மற்றும் அனைத்து தளங்களிலும் உங்களை ஒழுங்கமைக்கும் AI-இயக்கப்படும் பணி மேலாண்மை.',
    getStarted: 'தொடங்குக',
    watchDemo: 'டெமோ பார்க்கவும்',
    
    // Dashboard
    goodMorning: 'காலை வணக்கம்! இன்று சமாளிக்க தயாரா?',
    tasksToday: 'இன்று உங்களுக்கு 8 பணிகள் திட்டமிடப்பட்டுள்ளன.',
    tasksCompleted: 'முடிக்கப்பட்ட பணிகள்',
    pendingTasks: 'நிலுவையில் உள்ள பணிகள்',
    productivityScore: 'உற்பத்தித்திறன் மதிப்பெண்',
    streakDays: 'நாட்கள் வரிசை',
    quickActions: 'விரைவான செயல்கள்',
    addNewTask: 'புதிய பணி சேர்க்கவும்',
    setReminder: 'நினைவூட்டல் அமைக்கவும்',
    viewAnalytics: 'பகுப்பாய்வு பார்க்கவும்',
    viewAllTasks: 'அனைத்து பணிகளையும் பார்க்கவும்',
    upcomingTasks: 'வரவிருக்கும் பணிகள்',
    aiInsights: 'AI நுண்ணறிவுகள்',
    productivityTip: 'உற்பத்தித்திறன் குறிப்பு',
    productivityTipText: 'உங்கள் உச்ச உற்பத்தித்திறன் நேரங்கள் காலை 9-11 மணி. இந்த நேரத்தில் உங்கள் மிக முக்கியமான பணிகளை திட்டமிடுங்கள்.',
    weeklySummary: 'வாராந்திர சுருக்கம்',
    weeklySummaryText: 'இந்த வாரம் உங்கள் பணிகளில் 85% முடித்தீர்கள். நிலையானதாக இருப்பதற்கு சிறந்த வேலை!',
    
    // Reminders
    smartReminders: 'புத்திசாலி நினைவூட்டல்கள்',
    neverMiss: 'புத்திசாலித்தனமான அறிவிப்புகளுடன் மீண்டும் ஒரு முக்கியமான பணியை தவறவிடாதீர்கள்.',
    notificationSettings: 'அறிவிப்பு அமைப்புகள்',
    oneHourBefore: '1 மணி நேரம் முன்பு',
    defaultReminder: 'அனைத்து பணிகளுக்கும் இயல்புநிலை நினைவூட்டல்',
    emailAlerts: 'மின்னஞ்சல் அலெர்ட்கள்',
    highPriorityTasks: 'உயர் முன்னுரிமை பணிகளுக்கு மட்டும்',
    pushNotifications: 'புஷ் அறிவிப்புகள்',
    allReminders: 'அனைத்து நினைவூட்டல்கள் மற்றும் புதுப்பிப்புகளுக்கு',
    activeStreak: 'செயலில் உள்ள வரிசை',
    thisWeek: 'இந்த வாரம்',
    today: 'இன்று',
    tomorrow: 'நாளை',
    thisMonth: 'இந்த மாதம்',
    dueToday: 'இன்று உரிய',
    dueTomorrow: 'நாளை உரிய',
    
    // Sharing
    collaborateWithTeam: 'உங்கள் குழுவுடன் ஒத்துழைத்து பணிகளை சீராக பகிர்ந்து கொள்ளுங்கள்.',
    tasksShared: 'பகிரப்பட்ட பணிகள்',
    tasksReceived: 'பெறப்பட்ட பணிகள்',
    activeCollaborators: 'செயலில் உள்ள ஒத்துழைப்பாளர்கள்',
    sharedByMe: 'என்னால் பகிரப்பட்டது',
    receivedByMe: 'என்னால் பெறப்பட்டது',
    noSharedTasks: 'இன்னும் பகிரப்பட்ட பணிகள் இல்லை',
    startSharingTasks: 'திறம்பட ஒத்துழைக்க உங்கள் குழுவுடன் பணிகளை பகிர்ந்து கொள்ளத் தொடங்குங்கள்.',
    shareFirstTask: 'உங்கள் முதல் பணியை பகிர்ந்து கொள்ளுங்கள்',
    noReceivedTasks: 'பெறப்பட்ட பணிகள் இல்லை',
    waitingForTasks: 'குழு உறுப்பினர்கள் உங்களுடன் பணிகளை பகிர்ந்து கொள்ள காத்திருக்கிறது.',
    shareNewTask: 'புதிய பணியை பகிர்ந்து கொள்ளுங்கள்',
    assignTo: 'இதற்கு ஒதுக்குங்கள்',
    enterEmailAddress: 'மின்னஞ்சல் முகவரியை உள்ளிடவும்',
    role: 'பங்கு',
    viewer: 'பார்வையாளர்',
    editor: 'ஆசிரியர்',
    admin: 'நிர்வாகி',
    viewerDesc: 'பார்க்க மட்டுமே முடியும்',
    editorDesc: 'திருத்த மற்றும் முடிக்க முடியும்',
    adminDesc: 'முழு அணுகல்',
    shareTask: 'பணியை பகிர்ந்து கொள்ளுங்கள்',
    assignedTo: 'இதற்கு ஒதுக்கப்பட்டது',
    assignedBy: 'இவரால் ஒதுக்கப்பட்டது',
    accepted: 'ஏற்கப்பட்டது',
    acceptTask: 'பணியை ஏற்றுக்கொள்ளுங்கள்',
    markComplete: 'முடிந்ததாக குறிக்கவும்',
    markIncomplete: 'முடிக்காததாக குறிக்கவும்',
    deleteTask: 'பணியை நீக்கவும்',
    showLess: 'குறைவாக காட்டு',
    showMore: 'மேலும் காட்டு',
    created: 'உருவாக்கப்பட்டது',
    accept: 'ஏற்றுக்கொள்',
    complete: 'முடி',
    selectTaskToShare: 'பகிர பணியைத் தேர்ந்தெடுக்கவும்',
    shareDetails: 'பகிர்வு விவரங்கள்',
    all: 'அனைத்தும்',
    createTasksToShare: 'உங்கள் குழுவுடன் பகிர பணிகளை உருவாக்கவும்',
    
    // Chat
    chatWithMemoMate: 'மெமோமேட்டுடன் அரட்டை அடிக்கவும்',
    
    // AI Assistant
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
    
    // Timeline
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
    searchTasks: "பணிகளைத் தேடுங்கள்...",
    noTasksFound: "பணிகள் எதுவும் கிடைக்கவில்லை",
    noUpcomingTasks: "வரவிருக்கும் பணிகள் இல்லை",
  },
  te: {
    // Navigation
    dashboard: 'డ్యాష్‌బోర్డ్',
    chat: 'చాట్',
    reminders: 'రిమైండర్‌లు',
    taskSharing: 'టాస్క్ షేరింగ్',
    settings: 'సెట్టింగ్‌లు',
    expandSidebar: 'సైడ్‌బార్‌ను విస్తరించండి',
    collapseSidebar: 'సైడ్‌బార్‌ను కుదించండి',
    
    // Theme
    light: 'వెలుగు',
    dark: 'చీకటి',
    
    // Auth
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    back: 'వెనుకకు',
    enterEmail: 'మీ ఇమెయిల్ నమోదు చేయండి',
    enterPassword: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
    signingIn: 'సైన్ ఇన్ అవుతున్నది...',
    continueWith: 'లేదా దీనితో కొనసాగండి',
    continueWithGoogle: 'Google తో కొనసాగండి',
    noAccount: 'ఖాతా లేదా?',
    
    // Landing
    heroTitle: 'ప్రతిదానికీ మీ రెండవ మెదడు',
    heroSubtitle: 'మీ అలవాట్ల నుండి నేర్చుకుని, అన్ని ప్లాట్‌ఫామ్‌లలో మిమ్మల్ని వ్యవస్థీకృతంగా ఉంచే AI-శక్తితో కూడిన టాస్క్ మేనేజ్‌మెంట్.',
    getStarted: 'ప్రారంభించండి',
    watchDemo: 'డెమో చూడండి',
    
    // Dashboard
    goodMorning: 'శుభోదయం! ఈ రోజు పరిష్కరించడానికి సిద్ధంగా ఉన్నారా?',
    tasksToday: 'ఈ రోజు మీకు 8 టాస్క్‌లు షెడ్యూల్ చేయబడ్డాయి.',
    tasksCompleted: 'పూర్తైన టాస్క్‌లు',
    pendingTasks: 'పెండింగ్ టాస్క్‌లు',
    productivityScore: 'ఉత్పాదకత స్కోర్',
    streakDays: 'రోజుల వరుస',
    quickActions: 'త్వరిత చర్యలు',
    addNewTask: 'కొత్త టాస్క్ జోడించండి',
    setReminder: 'రిమైండర్ సెట్ చేయండి',
    viewAnalytics: 'అనలిటిక్స్ చూడండి',
    viewAllTasks: 'అన్ని టాస్క్‌లను చూడండి',
    upcomingTasks: 'రాబోయే టాస్క్‌లు',
    aiInsights: 'AI అంతర్దృష్టులు',
    productivityTip: 'ఉత్పాదకత చిట్కా',
    productivityTipText: 'మీ పీక్ ఉత్పాదకత సమయాలు ఉదయం 9-11 గంటలు. ఈ సమయంలో మీ అత్యంత ముఖ్యమైన టాస్క్‌లను షెడ్యూల్ చేయండి.',
    weeklySummary: 'వారపు సారాంశం',
    weeklySummaryText: 'మీరు ఈ వారం మీ టాస్క్‌లలో 85% పూర్తి చేశారు. స్థిరంగా ఉండటానికి గొప్ప పని!',
    
    // Reminders
    smartReminders: 'స్మార్ట్ రిమైండర్‌లు',
    neverMiss: 'తెలివైన నోటిఫికేషన్‌లతో మళ్లీ ముఖ్యమైన టాస్క్‌ను మిస్ చేయవద్దు.',
    notificationSettings: 'నోటిఫికేషన్ సెట్టింగ్‌లు',
    oneHourBefore: '1 గంట ముందు',
    defaultReminder: 'అన్ని టాస్క్‌లకు డిఫాల్ట్ రిమైండర్',
    emailAlerts: 'ఇమెయిల్ అలర్ట్‌లు',
    highPriorityTasks: 'అధిక ప్రాధాన్యత టాస్క్‌లకు మాత్రమే',
    pushNotifications: 'పుష్ నోటిఫికేషన్‌లు',
    allReminders: 'అన్ని రిమైండర్‌లు మరియు అప్‌డేట్‌లకు',
    activeStreak: 'యాక్టివ్ స్ట్రీక్',
    thisWeek: 'ఈ వారం',
    today: 'ఈ రోజు',
    tomorrow: 'రేపు',
    thisMonth: 'ఈ నెల',
    dueToday: 'ఈ రోజు చెల్లించవలసిన',
    dueTomorrow: 'రేపు చెల్లించవలసిన',
    
    // Sharing
    collaborateWithTeam: 'మీ టీమ్‌తో సహకరించండి మరియు టాస్క్‌లను సజావుగా షేర్ చేయండి.',
    tasksShared: 'షేర్ చేసిన టాస్క్‌లు',
    tasksReceived: 'స్వీకరించిన టాస్క్‌లు',
    activeCollaborators: 'యాక్టివ్ కలబోరేటర్‌లు',
    sharedByMe: 'నేను షేర్ చేసినవి',
    receivedByMe: 'నేను స్వీకరించినవి',
    noSharedTasks: 'ఇంకా షేర్ చేసిన టాస్క్‌లు లేవు',
    startSharingTasks: 'ప్రభావవంతంగా సహకరించడానికి మీ టీమ్‌తో టాస్క్‌లను షేర్ చేయడం ప్రారంభించండి.',
    shareFirstTask: 'మీ మొదటి టాస్క్‌ను షేర్ చేయండి',
    noReceivedTasks: 'స్వీకరించిన టాస్క్‌లు లేవు',
    waitingForTasks: 'టీమ్ మెంబర్‌లు మీతో టాస్క్‌లను షేర్ చేయడానికి వేచి ఉన్నారు.',
    shareNewTask: 'కొత్త టాస్క్‌ను షేర్ చేయండి',
    assignTo: 'కు కేటాయించండి',
    enterEmailAddress: 'ఇమెయిల్ చిరునామా నమోదు చేయండి',
    role: 'పాత్ర',
    viewer: 'వీక్షకుడు',
    editor: 'ఎడిటర్',
    admin: 'అడ్మిన్',
    viewerDesc: 'చూడటం మాత్రమే',
    editorDesc: 'ఎడిట్ మరియు పూర్తి చేయవచ్చు',
    adminDesc: 'పూర్తి యాక్సెస్',
    shareTask: 'టాస్క్ షేర్ చేయండి',
    assignedTo: 'కు కేటాయించబడింది',
    assignedBy: 'చేత కేటాయించబడింది',
    accepted: 'అంగీకరించబడింది',
    acceptTask: 'టాస్క్‌ను అంగీకరించండి',
    markComplete: 'పూర్తిగా మార్క్ చేయండి',
    markIncomplete: 'అసంపూర్ణంగా మార్క్ చేయండి',
    deleteTask: 'టాస్క్‌ను తొలగించండి',
    showLess: 'తక్కువ చూపించు',
    showMore: 'మరింత చూపించు',
    created: 'సృష్టించబడింది',
    accept: 'అంగీకరించు',
    complete: 'పూర్తి',
    selectTaskToShare: 'షేర్ చేయడానికి టాస్క్‌ని ఎంచుకోండి',
    shareDetails: 'షేర్ వివరాలు',
    all: 'అన్నీ',
    createTasksToShare: 'మీ జట్టుతో షేర్ చేయడానికి టాస్క్‌లను సృష్టించండి',
    
    // Chat
    chatWithMemoMate: 'మెమోమేట్‌తో చాట్ చేయండి',
    
    // AI Assistant
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
    
    // Timeline
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
    searchTasks: "టాస్క్‌లను శోధించండి...",
    noTasksFound: "టాస్క్‌లు కనుగొనబడలేదు",
    noUpcomingTasks: "రాబోయే టాస్క్‌లు లేవు",
  },
  ko: {
    // Navigation
    dashboard: '대시보드',
    chat: '채팅',
    reminders: '알림',
    taskSharing: '작업 공유',
    settings: '설정',
    expandSidebar: '사이드바 확장',
    collapseSidebar: '사이드바 축소',
    
    // Theme
    light: '밝음',
    dark: '어둠',
    
    // Auth
    signIn: '로그인',
    signUp: '회원가입',
    back: '뒤로',
    enterEmail: '이메일 입력',
    enterPassword: '비밀번호 입력',
    signingIn: '로그인 중...',
    continueWith: '또는 계속하기',
    continueWithGoogle: 'Google로 계속하기',
    noAccount: '계정이 없으신가요?',
    
    // Landing
    heroTitle: '모든 것을 위한 두 번째 두뇌',
    heroSubtitle: '당신의 습관에서 학습하고 모든 플랫폼에서 체계적으로 유지하는 AI 기반 작업 관리.',
    getStarted: '시작하기',
    watchDemo: '데모 보기',
    
    // Dashboard
    goodMorning: '좋은 아침입니다! 오늘을 시작할 준비가 되셨나요?',
    tasksToday: '오늘 8개의 작업이 예정되어 있습니다.',
    tasksCompleted: '완료된 작업',
    pendingTasks: '대기 중인 작업',
    productivityScore: '생산성 점수',
    streakDays: '연속 일수',
    quickActions: '빠른 작업',
    addNewTask: '새 작업 추가',
    setReminder: '알림 설정',
    viewAnalytics: '분석 보기',
    viewAllTasks: '모든 작업 보기',
    upcomingTasks: '예정된 작업',
    aiInsights: 'AI 인사이트',
    productivityTip: '생산성 팁',
    productivityTipText: '당신의 최고 생산성 시간은 오전 9-11시입니다. 이 시간에 가장 중요한 작업을 예약하세요.',
    weeklySummary: '주간 요약',
    weeklySummaryText: '이번 주에 작업의 85%를 완료했습니다. 꾸준히 유지하는 훌륭한 일입니다!',
    
    // Reminders
    smartReminders: '스마트 알림',
    neverMiss: '지능적인 알림으로 중요한 작업을 다시는 놓치지 마세요.',
    notificationSettings: '알림 설정',
    oneHourBefore: '1시간 전',
    defaultReminder: '모든 작업의 기본 알림',
    emailAlerts: '이메일 알림',
    highPriorityTasks: '높은 우선순위 작업만',
    pushNotifications: '푸시 알림',
    allReminders: '모든 알림 및 업데이트',
    activeStreak: '활성 연속',
    thisWeek: '이번 주',
    today: '오늘',
    tomorrow: '내일',
    thisMonth: '이번 달',
    dueToday: '오늘 마감',
    dueTomorrow: '내일 마감',
    
    // Sharing
    collaborateWithTeam: '팀과 협업하고 작업을 원활하게 공유하세요.',
    tasksShared: '공유한 작업',
    tasksReceived: '받은 작업',
    activeCollaborators: '활성 협력자',
    sharedByMe: '내가 공유한 것',
    receivedByMe: '내가 받은 것',
    noSharedTasks: '아직 공유된 작업이 없습니다',
    startSharingTasks: '효과적으로 협업하기 위해 팀과 작업 공유를 시작하세요.',
    shareFirstTask: '첫 번째 작업 공유하기',
    noReceivedTasks: '받은 작업이 없습니다',
    waitingForTasks: '팀 멤버가 작업을 공유하기를 기다리고 있습니다.',
    shareNewTask: '새 작업 공유',
    assignTo: '할당 대상',
    enterEmailAddress: '이메일 주소 입력',
    role: '역할',
    viewer: '뷰어',
    editor: '편집자',
    admin: '관리자',
    viewerDesc: '보기만 가능',
    editorDesc: '편집 및 완료 가능',
    adminDesc: '모든 권한',
    shareTask: '작업 공유',
    assignedTo: '할당 대상',
    assignedBy: '할당자',
    accepted: '수락됨',
    acceptTask: '작업 수락',
    markComplete: '완료 표시',
    markIncomplete: '미완료 표시',
    deleteTask: '작업 삭제',
    showLess: '적게 보기',
    showMore: '더 보기',
    created: '생성됨',
    accept: '수락',
    complete: '완료',
    selectTaskToShare: '공유할 작업 선택',
    shareDetails: '공유 세부사항',
    all: '모든',
    createTasksToShare: '팀과 공유할 작업을 만드세요',
    
    // Chat
    chatWithMemoMate: '메모메이트와 채팅',
    
    // AI Assistant
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
    
    // Timeline
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
    searchTasks: "작업 검색...",
    noTasksFound: "작업을 찾을 수 없습니다",
    noUpcomingTasks: "예정된 작업이 없습니다",
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
