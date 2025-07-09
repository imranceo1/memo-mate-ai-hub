
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'ko';

interface Translations {
  // Navigation
  dashboard: string;
  timeline: string;
  chat: string;
  reminders: string;
  taskSharing: string;
  settings: string;
  
  // Auth
  login: string;
  logout: string;
  signIn: string;
  signUp: string;
  signingIn: string;
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
  
  // Sidebar
  expandSidebar: string;
  collapseSidebar: string;
  
  // Landing page
  heroTitle: string;
  heroSubtitle: string;
  getStarted: string;
  watchDemo: string;
  
  // Login page
  back: string;
  enterEmail: string;
  enterPassword: string;
  continueWith: string;
  continueWithGoogle: string;
  noAccount: string;
  
  // Common
  light: string;
  dark: string;
  
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
  
  // Timeline
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
  urgent: string;
  cancel: string;
  
  // Chat
  aiAssistant: string;
  chatWithAI: string;
  chatWithMemoMate: string;
  askAnything: string;
  quickQuestions: string;
  aiFeatures: string;
  aiWelcomeMessage: string;
  whatTasksDueToday: string;
  howToSetReminder: string;
  showProductivityStats: string;
  howDataProtection: string;
  aiResponseTasksDue: string;
  aiResponseReminder: string;
  aiResponseProductivity: string;
  aiResponseDataProtection: string;
  aiResponseDefault: string;
  aiResponseDefaultEnd: string;
  aiFeature1: string;
  aiFeature2: string;
  aiFeature3: string;
  aiFeature4: string;
  
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
  
  // Task Sharing
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
  collaborateWithTeam: string;
  assignedTo: string;
  assignedBy: string;
  pending: string;
  accepted: string;
  completed: string;
  acceptTask: string;
  markComplete: string;
  markIncomplete: string;
  deleteTask: string;
  showLess: string;
  showMore: string;
  created: string;
  accept: string;
  complete: string;
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
      // Navigation
      dashboard: 'Dashboard',
      timeline: 'Timeline',
      chat: 'Chat',
      reminders: 'Reminders',
      taskSharing: 'Task Sharing',
      settings: 'Settings',
      
      // Auth
      login: 'Login',
      logout: 'Logout',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signingIn: 'Signing In...',
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
      
      // Sidebar
      expandSidebar: 'Expand Sidebar',
      collapseSidebar: 'Collapse Sidebar',
      
      // Landing page
      heroTitle: 'Your AI-Powered Second Brain',
      heroSubtitle: 'Transform how you manage tasks with intelligent automation and seamless integration.',
      getStarted: 'Get Started',
      watchDemo: 'Watch Demo',
      
      // Login page
      back: 'Back',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      continueWith: 'Or continue with',
      continueWithGoogle: 'Continue with Google',
      noAccount: "Don't have an account?",
      
      // Common
      light: 'Light',
      dark: 'Dark',
      
      // Dashboard
      goodMorning: 'Good Morning!',
      tasksToday: 'You have 8 tasks to complete today',
      tasksCompleted: 'Tasks Completed',
      pendingTasks: 'Pending Tasks',
      productivityScore: 'Productivity Score',
      streakDays: 'Streak Days',
      quickActions: 'Quick Actions',
      addNewTask: 'Add New Task',
      setReminder: 'Set Reminder',
      viewAnalytics: 'View Analytics',
      viewAllTasks: 'View All Tasks',
      upcomingTasks: 'Upcoming Tasks',
      aiInsights: 'AI Insights',
      productivityTip: 'Productivity Tip',
      productivityTipText: 'Focus on high-priority tasks during your most productive hours.',
      weeklySummary: 'Weekly Summary',
      weeklySummaryText: 'You completed 85% of your tasks this week. Great job!',
      
      // Timeline
      manageYourTasks: 'Manage your tasks and stay organized',
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
      urgent: 'Urgent',
      cancel: 'Cancel',
      
      // Chat
      aiAssistant: 'AI Assistant',
      chatWithAI: 'Chat with your AI assistant for productivity insights',
      chatWithMemoMate: 'Chat with MemoMate',
      askAnything: 'Ask anything...',
      quickQuestions: 'Quick Questions',
      aiFeatures: 'AI Features',
      aiWelcomeMessage: 'Hello! I\'m your AI assistant. How can I help you manage your tasks today?',
      whatTasksDueToday: 'What tasks are due today?',
      howToSetReminder: 'How do I set a reminder?',
      showProductivityStats: 'Show my productivity stats',
      howDataProtection: 'How is my data protected?',
      aiResponseTasksDue: 'You have 3 tasks due today: Review quarterly reports, Team standup meeting, and Update project documentation.',
      aiResponseReminder: 'To set a reminder, go to your timeline, select a task, and click the reminder icon. You can set custom times and frequencies.',
      aiResponseProductivity: 'Your productivity score is 87%! You\'ve completed 24 tasks this week with a 15-day streak.',
      aiResponseDataProtection: 'Your data is protected with AES-256 encryption and stored locally on your device. You have full control over your privacy settings.',
      aiResponseDefault: 'I understand you\'re asking about "',
      aiResponseDefaultEnd: '". Could you provide more details so I can help you better?',
      aiFeature1: 'Smart task extraction from emails and messages',
      aiFeature2: 'Intelligent priority suggestions based on your patterns',
      aiFeature3: 'Automated scheduling and conflict detection',
      aiFeature4: 'Personalized productivity insights and recommendations',
      
      // Reminders
      smartReminders: 'Smart Reminders',
      neverMiss: 'Never miss a deadline with intelligent notifications',
      notificationSettings: 'Notification Settings',
      oneHourBefore: '1 Hour Before',
      defaultReminder: 'Default reminder time',
      emailAlerts: 'Email Alerts',
      highPriorityTasks: 'For high priority tasks only',
      pushNotifications: 'Push Notifications',
      allReminders: 'All reminders and updates',
      activeStreak: 'Active Streak',
      thisWeek: 'This Week',
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisMonth: 'This Month',
      dueToday: 'Due Today',
      dueTomorrow: 'Due Tomorrow',
      
      // Task Sharing
      shareNewTask: 'Share New Task',
      assignTo: 'Assign To',
      enterEmailAddress: 'Enter email address',
      role: 'Role',
      viewer: 'Viewer',
      editor: 'Editor',
      admin: 'Admin',
      viewerDesc: 'Can view task details only',
      editorDesc: 'Can edit and update task status',
      adminDesc: 'Full access including delete permissions',
      shareTask: 'Share Task',
      tasksShared: 'Tasks Shared',
      tasksReceived: 'Tasks Received',
      activeCollaborators: 'Active Collaborators',
      sharedByMe: 'Shared by Me',
      receivedByMe: 'Received by Me',
      noSharedTasks: 'No shared tasks yet',
      startSharingTasks: 'Start sharing tasks with your team to collaborate effectively',
      shareFirstTask: 'Share Your First Task',
      noReceivedTasks: 'No received tasks yet',
      waitingForTasks: 'Waiting for tasks to be shared with you',
      collaborateWithTeam: 'Collaborate with your team members',
      assignedTo: 'Assigned to',
      assignedBy: 'Assigned by',
      pending: 'Pending',
      accepted: 'Accepted',
      completed: 'Completed',
      acceptTask: 'Accept Task',
      markComplete: 'Mark Complete',
      markIncomplete: 'Mark Incomplete',
      deleteTask: 'Delete Task',
      showLess: 'Show Less',
      showMore: 'Show More',
      created: 'Created',
      accept: 'Accept',
      complete: 'Complete',
    },
    hi: {
      // Navigation
      dashboard: 'डैशबोर्ड',
      timeline: 'टाइमलाइन',
      chat: 'चैट',
      reminders: 'रिमाइंडर',
      taskSharing: 'कार्य साझा करना',
      settings: 'सेटिंग्स',
      
      // Auth
      login: 'लॉगिन',
      logout: 'लॉग आउट',
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      signingIn: 'साइन इन हो रहा है...',
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
      
      // Sidebar
      expandSidebar: 'साइडबार विस्तार करें',
      collapseSidebar: 'साइडबार संकुचित करें',
      
      // Landing page
      heroTitle: 'आपका AI-संचालित दूसरा दिमाग',
      heroSubtitle: 'बुद्धिमान स्वचालन और निर्बाध एकीकरण के साथ कार्य प्रबंधन को बदलें।',
      getStarted: 'शुरू करें',
      watchDemo: 'डेमो देखें',
      
      // Login page
      back: 'वापस',
      enterEmail: 'अपना ईमेल दर्ज करें',
      enterPassword: 'अपना पासवर्ड दर्ज करें',
      continueWith: 'या जारी रखें',
      continueWithGoogle: 'Google के साथ जारी रखें',
      noAccount: 'कोई खाता नहीं है?',
      
      // Common
      light: 'हल्का',
      dark: 'गहरा',
      
      // Dashboard
      goodMorning: 'सुप्रभात!',
      tasksToday: 'आज आपके पास पूरे करने के लिए 8 कार्य हैं',
      tasksCompleted: 'पूरे किए गए कार्य',
      pendingTasks: 'लंबित कार्य',
      productivityScore: 'उत्पादकता स्कोर',
      streakDays: 'स्ट्रीक दिन',
      quickActions: 'त्वरित क्रियाएं',
      addNewTask: 'नया कार्य जोड़ें',
      setReminder: 'रिमाइंडर सेट करें',
      viewAnalytics: 'विश्लेषण देखें',
      viewAllTasks: 'सभी कार्य देखें',
      upcomingTasks: 'आगामी कार्य',
      aiInsights: 'AI अंतर्दृष्टि',
      productivityTip: 'उत्पादकता टिप',
      productivityTipText: 'अपने सबसे उत्पादक घंटों में उच्च प्राथमिकता वाले कार्यों पर ध्यान दें।',
      weeklySummary: 'साप्ताहिक सारांश',
      weeklySummaryText: 'इस सप्ताह आपने अपने 85% कार्य पूरे किए। बढ़िया काम!',
      
      // Timeline
      manageYourTasks: 'अपने कार्यों का प्रबंधन करें और संगठित रहें',
      addTask: 'कार्य जोड़ें',
      taskTitle: 'कार्य शीर्षक',
      enterTaskTitle: 'कार्य शीर्षक दर्ज करें',
      description: 'विवरण',
      enterDescription: 'विवरण दर्ज करें',
      dueDate: 'नियत तारीख',
      dueTime: 'नियत समय',
      priority: 'प्राथमिकता',
      urgency: 'तात्कालिकता',
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      urgent: 'तत्काल',
      cancel: 'रद्द करें',
      
      // Chat
      aiAssistant: 'AI सहायक',
      chatWithAI: 'उत्पादकता अंतर्दृष्टि के लिए अपने AI सहायक से चैट करें',
      chatWithMemoMate: 'MemoMate के साथ चैट करें',
      askAnything: 'कुछ भी पूछें...',
      quickQuestions: 'त्वरित प्रश्न',
      aiFeatures: 'AI सुविधाएं',
      aiWelcomeMessage: 'नमस्ते! मैं आपका AI सहायक हूँ। आज आपके कार्यों के प्रबंधन में मैं कैसे मदद कर सकता हूँ?',
      whatTasksDueToday: 'आज कौन से कार्य देय हैं?',
      howToSetReminder: 'मैं रिमाइंडर कैसे सेट करूं?',
      showProductivityStats: 'मेरे उत्पादकता आंकड़े दिखाएं',
      howDataProtection: 'मेरा डेटा कैसे सुरक्षित है?',
      aiResponseTasksDue: 'आज आपके पास 3 कार्य देय हैं: त्रैमासिक रिपोर्ट समीक्षा, टीम स्टैंडअप मीटिंग, और प्रोजेक्ट दस्तावेज़ अपडेट।',
      aiResponseReminder: 'रिमाइंडर सेट करने के लिए, अपनी टाइमलाइन पर जाएं, कार्य चुनें, और रिमाइंडर आइकन पर क्लिक करें।',
      aiResponseProductivity: 'आपका उत्पादकता स्कोर 87% है! आपने 15-दिन स्ट्रीक के साथ इस सप्ताह 24 कार्य पूरे किए हैं।',
      aiResponseDataProtection: 'आपका डेटा AES-256 एन्क्रिप्शन से सुरक्षित है और आपके डिवाइस पर स्थानीय रूप से संग्रहीत है।',
      aiResponseDefault: 'मैं समझता हूँ कि आप "',
      aiResponseDefaultEnd: '" के बारे में पूछ रहे हैं। क्या आप और विवरण दे सकते हैं?',
      aiFeature1: 'ईमेल और संदेशों से स्मार्ट कार्य निकासी',
      aiFeature2: 'आपके पैटर्न के आधार पर बुद्धिमान प्राथमिकता सुझाव',
      aiFeature3: 'स्वचालित शेड्यूलिंग और संघर्ष पहचान',
      aiFeature4: 'व्यक्तिगत उत्पादकता अंतर्दृष्टि और सिफारिशें',
      
      // Reminders
      smartReminders: 'स्मार्ट रिमाइंडर',
      neverMiss: 'बुद्धिमान सूचनाओं के साथ कभी भी डेडलाइन न चूकें',
      notificationSettings: 'सूचना सेटिंग्स',
      oneHourBefore: '1 घंटे पहले',
      defaultReminder: 'डिफ़ॉल्ट रिमाइंडर समय',
      emailAlerts: 'ईमेल अलर्ट',
      highPriorityTasks: 'केवल उच्च प्राथमिकता वाले कार्यों के लिए',
      pushNotifications: 'पुश नोटिफिकेशन',
      allReminders: 'सभी रिमाइंडर और अपडेट',
      activeStreak: 'सक्रिय स्ट्रीक',
      thisWeek: 'इस सप्ताह',
      today: 'आज',
      tomorrow: 'कल',
      thisMonth: 'इस महीने',
      dueToday: 'आज देय',
      dueTomorrow: 'कल देय',
      
      // Task Sharing
      shareNewTask: 'नया कार्य साझा करें',
      assignTo: 'को सौंपें',
      enterEmailAddress: 'ईमेल पता दर्ज करें',
      role: 'भूमिका',
      viewer: 'दर्शक',
      editor: 'संपादक',
      admin: 'प्रशासक',
      viewerDesc: 'केवल कार्य विवरण देख सकते हैं',
      editorDesc: 'कार्य संपादित कर सकते हैं और स्थिति अपडेट कर सकते हैं',
      adminDesc: 'डिलीट अनुमतियों सहित पूर्ण पहुंच',
      shareTask: 'कार्य साझा करें',
      tasksShared: 'साझा किए गए कार्य',
      tasksReceived: 'प्राप्त कार्य',
      activeCollaborators: 'सक्रिय सहयोगी',
      sharedByMe: 'मेरे द्वारा साझा किया गया',
      receivedByMe: 'मेरे द्वारा प्राप्त',
      noSharedTasks: 'अभी तक कोई साझा कार्य नहीं',
      startSharingTasks: 'प्रभावी रूप से सहयोग करने के लिए अपनी टीम के साथ कार्य साझा करना शुरू करें',
      shareFirstTask: 'अपना पहला कार्य साझा करें',
      noReceivedTasks: 'अभी तक कोई प्राप्त कार्य नहीं',
      waitingForTasks: 'आपके साथ साझा किए जाने वाले कार्यों की प्रतीक्षा में',
      collaborateWithTeam: 'अपनी टीम के सदस्यों के साथ सहयोग करें',
      assignedTo: 'को सौंपा गया',
      assignedBy: 'द्वारा सौंपा गया',
      pending: 'लंबित',
      accepted: 'स्वीकृत',
      completed: 'पूर्ण',
      acceptTask: 'कार्य स्वीकार करें',
      markComplete: 'पूर्ण चिह्नित करें',
      markIncomplete: 'अपूर्ण चिह्नित करें',
      deleteTask: 'कार्य हटाएं',
      showLess: 'कम दिखाएं',
      showMore: 'अधिक दिखाएं',
      created: 'बनाया गया',
      accept: 'स्वीकार करें',
      complete: 'पूर्ण करें',
    },
    ta: {
      // Navigation
      dashboard: 'டாஷ்போர்டு',
      timeline: 'காலவரிசை',
      chat: 'உரையாடல்',
      reminders: 'நினைவூட்டல்கள்',
      taskSharing: 'பணி பகிர்வு',
      settings: 'அமைப்புகள்',
      
      // Auth
      login: 'உள்நுழை',
      logout: 'வெளியேறு',
      signIn: 'உள்நுழை',
      signUp: 'பதிவு செய்யுங்கள்',
      signingIn: 'உள்நுழைகிறது...',
      username: 'பயனர் பெயர்',
      password: 'கடவுச்சொல்',
      confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      rememberMe: 'என்னை நினைவில் கொள்ளுங்கள்',
      loginButton: 'உள்நுழை',
      createAccount: 'கணக்கை உருவாக்கு',
      welcome: 'வரவேற்பு',
      invalidCredentials: 'தவறான சான்றுகள்',
      passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
      somethingWentWrong: 'ஏதோ தவறு நடந்தது',
      
      // Sidebar
      expandSidebar: 'பக்கப்பட்டியை விரிவுபடுத்து',
      collapseSidebar: 'பக்கப்பட்டியை சுருக்கு',
      
      // Landing page
      heroTitle: 'உங்கள் AI-இயங்கும் இரண்டாம் மூளை',
      heroSubtitle: 'அறிவார்ந்த தானியக்கம் மற்றும் தடையற்ற ஒருங்கிணைப்புடன் பணி மேலாண்மையை மாற்றுங்கள்।',
      getStarted: 'தொடங்குங்கள்',
      watchDemo: 'டெமோ பார்க்க',
      
      // Login page
      back: 'பின்',
      enterEmail: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      enterPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      continueWith: 'அல்லது தொடர்ந்து',
      continueWithGoogle: 'Google உடன் தொடர்ந்து',
      noAccount: 'கணக்கு இல்லையா?',
      
      // Common
      light: 'ஒளி',
      dark: 'இருள்',
      
      // Dashboard
      goodMorning: 'காலை வணக்கம்!',
      tasksToday: 'இன்று உங்களிடம் முடிக்க 8 பணிகள் உள்ளன',
      tasksCompleted: 'முடிக்கப்பட்ட பணிகள்',
      pendingTasks: 'நிலுவையில் உள்ள பணிகள்',
      productivityScore: 'உற்பத்தித்திறன் மதிப்பெண்',
      streakDays: 'தொடர் நாட்கள்',
      quickActions: 'விரைவு செயல்கள்',
      addNewTask: 'புதிய பணியை சேர்',
      setReminder: 'நினைவூட்டல் அமைக்க',
      viewAnalytics: 'பகுப்பாய்வு பார்க்க',
      viewAllTasks: 'அனைத்து பணிகளையும் பார்க்க',
      upcomingTasks: 'வரவிருக்கும் பணிகள்',
      aiInsights: 'AI நுண்ணறிவு',
      productivityTip: 'உற்பத்தித்திறன் குறிப்பு',
      productivityTipText: 'உங்கள் மிகவும் உற்பத்தித்திறன் மிக்க நேரங்களில் உயர் முன்னுரிமை பணிகளில் கவனம் செலுத்துங்கள்.',
      weeklySummary: 'வாராந்திர சுருக்கம்',
      weeklySummaryText: 'இந்த வாரம் உங்கள் பணிகளில் 85% முடித்துள்ளீர்கள். பெரிய வேலை!',
      
      // Timeline
      manageYourTasks: 'உங்கள் பணிகளை நிர்வகிக்கவும் மற்றும் ஒழுங்கமைக்கவும்',
      addTask: 'பணி சேர்',
      taskTitle: 'பணி தலைப்பு',
      enterTaskTitle: 'பணி தலைப்பை உள்ளிடவும்',
      description: 'விவரம்',
      enterDescription: 'விவரத்தை உள்ளிடவும்',
      dueDate: 'நிறைவேற்ற தேதி',
      dueTime: 'நிறைவேற்ற நேரம்',
      priority: 'முன்னுரிமை',
      urgency: 'அவசரம்',
      low: 'குறைந்த',
      medium: 'நடுத்தர',
      high: 'அதிக',
      urgent: 'அவசர',
      cancel: 'ரத்து',
      
      // Chat
      aiAssistant: 'AI உதவியாளர்',
      chatWithAI: 'உற்பத்தித்திறன் நுண்ணறிவுகளுக்கு உங்கள் AI உதவியாளருடன் அரட்டை',
      chatWithMemoMate: 'MemoMate உடன் அரட்டை',
      askAnything: 'எதையும் கேளுங்கள்...',
      quickQuestions: 'விரைவு கேள்விகள்',
      aiFeatures: 'AI அம்சங்கள்',
      aiWelcomeMessage: 'வணக்கம்! நான் உங்கள் AI உதவியாளர். இன்று உங்கள் பணிகளை நிர்வகிக்க நான் எவ்வாறு உதவ முடியும்?',
      whatTasksDueToday: 'இன்று எந்த பணிகள் முடிக்க வேண்டும்?',
      howToSetReminder: 'நான் எப்படி நினைவூட்டல் அமைக்க முடியும்?',
      showProductivityStats: 'எனது உற்பத்தித்திறன் புள்ளிவிவரங்களை காட்டு',
      howDataProtection: 'எனது தரவு எவ்வாறு பாதுகாக்கப்படுகிறது?',
      aiResponseTasksDue: 'இன்று உங்களிடம் 3 பணிகள் உள்ளன: காலாண்டு அறிக்கை மறுஆய்வு, குழு ஸ்டாண்டப் கூட்டம், மற்றும் திட்ட ஆவணங்கள் புதுப்பிப்பு.',
      aiResponseReminder: 'நினைவூட்டல் அமைக்க, உங்கள் காலவரிசைக்கு சென்று, பணியை தேர்ந்தெடுத்து, நினைவூட்டல் ஐகானை கிளிக் செய்யவும்.',
      aiResponseProductivity: 'உங்கள் உற்பத்தித்திறன் மதிப்பெண் 87%! 15 நாள் தொடர்ச்சியுடன் இந்த வாரம் 24 பணிகளை முடித்துள்ளீர்கள்.',
      aiResponseDataProtection: 'உங்கள் தரவு AES-256 குறியாக்கத்துடன் பாதுகாக்கப்பட்டு உங்கள் சாதனத்தில் உள்ளூர் சேமிக்கப்பட்டுள்ளது.',
      aiResponseDefault: 'நீங்கள் "',
      aiResponseDefaultEnd: '" பற்றி கேட்கிறீர்கள் என்று புரிகிறது. மேலும் விவரங்களை தர முடியுமா?',
      aiFeature1: 'மின்னஞ்சல் மற்றும் செய்திகளிலிருந்து ஸ்மார்ட் பணி பிரித்தெடுத்தல்',
      aiFeature2: 'உங்கள் வடிவங்களின் அடிப்படையில் அறிவார்ந்த முன்னுரிமை பரிந்துரைகள்',
      aiFeature3: 'தானியங்கி திட்டமிடல் மற்றும் மோதல் கண்டறிதல்',
      aiFeature4: 'தனிப்பட்ட உற்பத்தித்திறன் நுண்ணறிவுகள் மற்றும் பரிந்துரைகள்',
      
      // Reminders
      smartReminders: 'ஸ்மார்ட் நினைவூட்டல்கள்',
      neverMiss: 'அறிவார்ந்த அறிவிப்புகளுடன் எந்த காலக்கெடுவையும் தவறவிடாதீர்கள்',
      notificationSettings: 'அறிவிப்பு அமைப்புகள்',
      oneHourBefore: '1 மணி நேரம் முன்',
      defaultReminder: 'இயல்புநிலை நினைவூட்டல் நேரம்',
      emailAlerts: 'மின்னஞ்சல் எச்சரிக்கைகள்',
      highPriorityTasks: 'உயர் முன்னுரிமை பணிகளுக்கு மட்டும்',
      pushNotifications: 'புஷ் அறிவிப்புகள்',
      allReminders: 'அனைத்து நினைவூட்டல்கள் மற்றும் புதுப்பிப்புகள்',
      activeStreak: 'செயலில் உள்ள தொடர்ச்சி',
      thisWeek: 'இந்த வாரம்',
      today: 'இன்று',
      tomorrow: 'நாளை',
      thisMonth: 'இந்த மாதம்',
      dueToday: 'இன்று முடிக்க வேண்டும்',
      dueTomorrow: 'நாளை முடிக்க வேண்டும்',
      
      // Task Sharing
      shareNewTask: 'புதிய பணி பகிர்',
      assignTo: 'ஒதுக்கு',
      enterEmailAddress: 'மின்னஞ்சல் முகவரியை உள்ளிடவும்',
      role: 'பங்கு',
      viewer: 'பார்வையாளர்',
      editor: 'தொகுப்பாளர்',
      admin: 'நிர்வாகி',
      viewerDesc: 'பணி விவரங்களை மட்டும் பார்க்க முடியும்',
      editorDesc: 'பணியை தொகுக்க மற்றும் நிலையை புதுப்பிக்க முடியும்',
      adminDesc: 'நீக்கும் அனுமதிகள் உட்பட முழு அணுகல்',
      shareTask: 'பணி பகிர்',
      tasksShared: 'பகிர்ந்த பணிகள்',
      tasksReceived: 'பெறப்பட்ட பணிகள்',
      activeCollaborators: 'செயலில் உள்ள ஒத்துழைப்பாளர்கள்',
      sharedByMe: 'எனால் பகிர்ந்தவை',
      receivedByMe: 'எனால் பெறப்பட்டவை',
      noSharedTasks: 'இன்னும் பகிர்ந்த பணிகள் இல்லை',
      startSharingTasks: 'திறம்பட ஒத்துழைக்க உங்கள் குழுவுடன் பணிகளைப் பகிர்ந்து கொள்ளத் தொடங்குங்கள்',
      shareFirstTask: 'உங்கள் முதல் பணியை பகிர்ந்து கொள்ளுங்கள்',
      noReceivedTasks: 'இன்னும் பெறப்பட்ட பணிகள் இல்லை',
      waitingForTasks: 'உங்களுடன் பகிர்ந்து கொள்ளப்படும் பணிகளுக்காக காத்திருக்கிறது',
      collaborateWithTeam: 'உங்கள் குழு உறுப்பினர்களுடன் ஒத்துழைக்கவும்',
      assignedTo: 'ஒதுக்கப்பட்டவர்',
      assignedBy: 'ஒதுக்கியவர்',
      pending: 'நிலுவையில்',
      accepted: 'ஏற்றுக்கொள்ளப்பட்டது',
      completed: 'முடிக்கப்பட்டது',
      acceptTask: 'பணி ஏற்க',
      markComplete: 'முடிக்கப்பட்டதாக குறிக்க',
      markIncomplete: 'முடிக்கப்படாததாக குறிக்க',
      deleteTask: 'பணி நீக்க',
      showLess: 'குறைவாக காட்டு',
      showMore: 'மேலும் காட்டு',
      created: 'உருவாக்கப்பட்டது',
      accept: 'ஏற்க',
      complete: 'முடிக்க',
    },
    te: {
      // Navigation
      dashboard: 'డాష్‌బోర్డ్',
      timeline: 'కాలక్రమం',
      chat: 'చాట్',
      reminders: 'రిమైండర్‌లు',
      taskSharing: 'టాస్క్ షేరింగ్',
      settings: 'సెట్టింగ్‌లు',
      
      // Auth
      login: 'లాగిన్',
      logout: 'నిష్క్రమించు',
      signIn: 'సైన్ ఇన్',
      signUp: 'సైన్ అప్',
      signingIn: 'సైన్ ఇన్ చేస్తోంది...',
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
      
      // Sidebar
      expandSidebar: 'సైడ్‌బార్ విస్తరించు',
      collapseSidebar: 'సైడ్‌బార్ కుదించు',
      
      // Landing page
      heroTitle: 'మీ AI-శక్తితో కూడిన రెండవ మెదడు',
      heroSubtitle: 'తెలివైన ఆటోమేషన్ మరియు అతుకులు లేని ఇంటిగ్రేషన్‌తో టాస్క్ మేనేజ్‌మెంట్‌ను మార్చండి.',
      getStarted: 'ప్రారంభించండి',
      watchDemo: 'డెమో చూడండి',
      
      // Login page
      back: 'వెనుకకు',
      enterEmail: 'మీ ఇమెయిల్ అందిం చండి',
      enterPassword: 'మీ పాస్‌వర్డ్ అందించండి',
      continueWith: 'లేదా కొనసాగించండి',
      continueWithGoogle: 'Google తో కొనసాగించండి',
      noAccount: 'ఖాతా లేదా?',
      
      // Common
      light: 'లైట్',
      dark: 'డార్క్',
      
      // Dashboard
      goodMorning: 'శుభోదయం!',
      tasksToday: 'ఈ రోజు మీరు పూర్తి చేయాల్సిన 8 టాస్క్‌లు ఉన్నాయి',
      tasksCompleted: 'పూర్తయిన టాస్క్‌లు',
      pendingTasks: 'పెండింగ్ టాస్క్‌లు',
      productivityScore: 'ఉత్పాదకత స్కోర్',
      streakDays: 'స్ట్రీక్ రోజులు',
      quickActions: 'త్వరిత చర్యలు',
      addNewTask: 'కొత్త టాస్క్ జోడించు',
      setReminder: 'రిమైండర్ సెట్ చేయి',
      viewAnalytics: 'విశ్లేషణలు చూడండి',
      viewAllTasks: 'అన్ని టాస్క్‌లు చూడండి',
      upcomingTasks: 'రాబోయే టాస్క్‌లు',
      aiInsights: 'AI అంతర్దృష్టులు',
      productivityTip: 'ఉత్పాదకత చిట్కా',
      productivityTipText: 'మీ అత్యంత ఉత్పాదక గంటలలో అధిక ప్రాధాన్యత టాస్క్‌లపై దృష్టి సారించండి.',
      weeklySummary: 'వారపు సారాంశం',
      weeklySummaryText: 'ఈ వారం మీరు మీ టాస్క్‌లలో 85% పూర్తి చేశారు. గొప్ప పని!',
      
      // Timeline
      manageYourTasks: 'మీ టాస్క్‌లను నిర్వహించండి మరియు క్రమబద్ధంగా ఉంచండి',
      addTask: 'టాస్క్ జోడించు',
      taskTitle: 'టాస్క్ టైటిల్',
      enterTaskTitle: 'టాస్క్ టైటిల్ అందించండి',
      description: 'వివరణ',
      enterDescription: 'వివరణ అందించండి',
      dueDate: 'గడువు తేదీ',
      dueTime: 'గడువు సమయం',
      priority: 'ప్రాధాన్యత',
      urgency: 'అత్యవసరత',
      low: 'తక్కువ',
      medium: 'మధ్యమ',
      high: 'అధిక',
      urgent: 'అత్యవసర',
      cancel: 'రద్దు',
      
      // Chat
      aiAssistant: 'AI అసిస్టెంట్',
      chatWithAI: 'ఉత్పాదకత అంతర్దృష్టుల కోసం మీ AI అసిస్టెంట్‌తో చాట్ చేయండి',
      chatWithMemoMate: 'MemoMate తో చాట్ చేయండి',
      askAnything: 'ఏదైనా అడగండి...',
      quickQuestions: 'త్వరిత ప్రశ్నలు',
      aiFeatures: 'AI లక్షణాలు',
      aiWelcomeMessage: 'హలో! నేను మీ AI అసిస్టెంట్. ఈ రోజు మీ టాస్క్‌లను నిర్వహించడంలో నేను ఎలా సహాయపడగలను?',
      whatTasksDueToday: 'ఈ రోజు ఏ టాస్క్‌లు గడువు?',
      howToSetReminder: 'నేను రిమైండర్ ఎలా సెట్ చేయాలి?',
      showProductivityStats: 'నా ఉత్పాదకత గణాంకాలు చూపించు',
      howDataProtection: 'నా డేటా ఎలా రక్షించబడుతుంది?',
      aiResponseTasksDue: 'ఈ రోజు మీకు 3 టాస్క్‌లు గడువు: త్రైమాసిక నివేదికల సమీక్ష, టీమ్ స్టాండప్ మీటింగ్, మరియు ప్రాజెక్ట్ డాక్యుమెంటేషన్ అప్‌డేట్.',
      aiResponseReminder: 'రిమైండర్ సెట్ చేయడానికి, మీ టైమ్‌లైన్‌కు వెళ్లి, టాస్క్ ఎంచుకుని, రిమైండర్ ఐకాన్ క్లిక్ చేయండి.',
      aiResponseProductivity: 'మీ ఉత్పాదకత స్కోర్ 87%! మీరు 15-రోజుల స్ట్రీక్‌తో ఈ వారం 24 టాస్క్‌లు పూర్తి చేశారు.',
      aiResponseDataProtection: 'మీ డేటా AES-256 ఎన్క్రిప్షన్‌తో రక్షించబడుతుంది మరియు మీ పరికరంలో స్థానికంగా నిల్వ చేయబడుతుంది.',
      aiResponseDefault: 'మీరు "',
      aiResponseDefaultEnd: '" గురించి అడుగుతున్నారని నాకు అర్థమైంది. మరిన్ని వివరాలు అందించగలరా?',
      aiFeature1: 'ఇమెయిల్ మరియు సందేశాల నుండి స్మార్ట్ టాస్క్ వెలికితీత',
      aiFeature2: 'మీ పెట్టర్న్‌ల ఆధారంగా తెలివైన ప్రాధాన్యత సూచనలు',
      aiFeature3: 'ఆటోమేటిక్ షెడ్యూలింగ్ మరియు కాన్ఫ్లిక్ట్ గుర్తింపు',
      aiFeature4: 'వ్యక్తిగత ఉత్పాదకత అంతర్దృష్టులు మరియు సిఫార్సులు',
      
      // Reminders
      smartReminders: 'స్మార్ట్ రిమైండర్‌లు',
      neverMiss: 'తెలివైన నోటిఫికేషన్‌లతో ఎప్పుడూ డెడ్‌లైన్ మిస్ చేయకండి',
      notificationSettings: 'నోటిఫికేషన్ సెట్టింగ్‌లు',
      oneHourBefore: '1 గంట ముందు',
      defaultReminder: 'డిఫాల్ట్ రిమైండర్ సమయం',
      emailAlerts: 'ఇమెయిల్ అలర్ట్‌లు',
      highPriorityTasks: 'అధిక ప్రాధాన్యత టాస్క్‌లకు మాత్రమే',
      pushNotifications: 'పుష్ నోటిఫికేషన్‌లు',
      allReminders: 'అన్ని రిమైండర్‌లు మరియు అప్‌డేట్‌లు',
      activeStreak: 'యాక్టివ్ స్ట్రీక్',
      thisWeek: 'ఈ వారం',
      today: 'ఈ రోజు',
      tomorrow: 'రేపు',
      thisMonth: 'ఈ నెల',
      dueToday: 'ఈ రోజు గడువు',
      dueTomorrow: 'రేపు గడువు',
      
      // Task Sharing
      shareNewTask: 'కొత్త టాస్క్ షేర్ చేయి',
      assignTo: 'కేటాయించు',
      enterEmailAddress: 'ఇమెయిల్ చిరునామా అందించండి',
      role: 'పాత్ర',
      viewer: 'వీవర్',
      editor: 'ఎడిటర్',
      admin: 'అడ్మిన్',
      viewerDesc: 'టాస్క్ వివరాలను మాత్రమే చూడగలరు',
      editorDesc: 'టాస్క్ ఎడిట్ చేయగలరు మరియు స్టేటస్ అప్‌డేట్ చేయగలరు',
      adminDesc: 'డిలీట్ అనుమతులతో సహా పూర్తి యాక్సెస్',
      shareTask: 'టాస్క్ షేర్ చేయి',
      tasksShared: 'షేర్ చేసిన టాస్క్‌లు',
      tasksReceived: 'అందుకున్న టాస్క్‌లు',
      activeCollaborators: 'యాక్టివ్ కోలాబరేటర్లు',
      sharedByMe: 'నేను షేర్ చేసినవి',
      receivedByMe: 'నేను అందుకున్నవి',
      noSharedTasks: 'ఇంకా షేర్ చేసిన టాస్క్‌లు లేవు',
      startSharingTasks: 'సమర్థవంతంగా సహకరించడానికి మీ టీమ్‌తో టాస్క్‌లు షేర్ చేయడం ప్రారంభించండి',
      shareFirstTask: 'మీ మొదటి టాస్క్ షేర్ చేయండి',
      noReceivedTasks: 'ఇంకా అందుకున్న టాస్క్‌లు లేవు',
      waitingForTasks: 'మీతో షేర్ చేయబడే టాస్క్‌ల కోసం వేచి ఉంది',
      collaborateWithTeam: 'మీ టీమ్ మెంబర్లతో సహకరించండి',
      assignedTo: 'కేటాయించబడింది',
      assignedBy: 'కేటాయించిన వారు',
      pending: 'పెండింగ్',
      accepted: 'అంగీకరించబడింది',
      completed: 'పూర్తయింది',
      acceptTask: 'టాస్క్ అంగీకరించు',
      markComplete: 'పూర్తయినట్లు గుర్తించు',
      markIncomplete: 'అసంపూర్ణంగా గుర్తించు',
      deleteTask: 'టాస్క్ డిలీట్ చేయి',
      showLess: 'తక్కువ చూపించు',
      showMore: 'మరిన్ని చూపించు',
      created: 'సృష్టించబడింది',
      accept: 'అంగీకరించు',
      complete: 'పూర్తి చేయి',
    },
    ko: {
      // Navigation
      dashboard: '대시보드',
      timeline: '타임라인',
      chat: '채팅',
      reminders: '알림',
      taskSharing: '작업 공유',
      settings: '설정',
      
      // Auth
      login: '로그인',
      logout: '로그아웃',
      signIn: '로그인',
      signUp: '회원가입',
      signingIn: '로그인 중...',
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
      
      // Sidebar
      expandSidebar: '사이드바 확장',
      collapseSidebar: '사이드바 축소',
      
      // Landing page
      heroTitle: '당신의 AI 기반 제2의 뇌',
      heroSubtitle: '지능적인 자동화와 원활한 통합으로 작업 관리를 혁신하세요.',
      getStarted: '시작하기',
      watchDemo: '데모 보기',
      
      // Login page
      back: '뒤로',
      enterEmail: '이메일을 입력하세요',
      enterPassword: '비밀번호를 입력하세요',
      continueWith: '또는 계속하기',
      continueWithGoogle: 'Google로 계속하기',
      noAccount: '계정이 없으신가요?',
      
      // Common
      light: '라이트',
      dark: '다크',
      
      // Dashboard
      goodMorning: '좋은 아침!',
      tasksToday: '오늘 완료해야 할 작업이 8개 있습니다',
      tasksCompleted: '완료된 작업',
      pendingTasks: '대기 중인 작업',
      productivityScore: '생산성 점수',
      streakDays: '연속 일수',
      quickActions: '빠른 작업',
      addNewTask: '새 작업 추가',
      setReminder: '알림 설정',
      viewAnalytics: '분석 보기',
      viewAllTasks: '모든 작업 보기',
      upcomingTasks: '다가오는 작업',
      aiInsights: 'AI 인사이트',
      productivityTip: '생산성 팁',
      productivityTipText: '가장 생산적인 시간대에 높은 우선순위 작업에 집중하세요.',
      weeklySummary: '주간 요약',
      weeklySummaryText: '이번 주에 작업의 85%를 완료했습니다. 잘했어요!',
      
      // Timeline
      manageYourTasks: '작업을 관리하고 체계적으로 유지하세요',
      addTask: '작업 추가',
      taskTitle: '작업 제목',
      enterTaskTitle: '작업 제목 입력',
      description: '설명',
      enterDescription: '설명 입력',
      dueDate: '마감일',
      dueTime: '마감 시간',
      priority: '우선순위',
      urgency: '긴급성',
      low: '낮음',
      medium: '보통',
      high: '높음',
      urgent: '긴급',
      cancel: '취소',
      
      // Chat
      aiAssistant: 'AI 어시스턴트',
      chatWithAI: '생산성 인사이트를 위해 AI 어시스턴트와 채팅하세요',
      chatWithMemoMate: 'MemoMate와 채팅',
      askAnything: '무엇이든 물어보세요...',
      quickQuestions: '빠른 질문',
      aiFeatures: 'AI 기능',
      aiWelcomeMessage: '안녕하세요! 저는 당신의 AI 어시스턴트입니다. 오늘 작업 관리를 어떻게 도와드릴까요?',
      whatTasksDueToday: '오늘 마감인 작업은 무엇인가요?',
      howToSetReminder: '알림을 어떻게 설정하나요?',
      showProductivityStats: '내 생산성 통계를 보여주세요',
      howDataProtection: '내 데이터는 어떻게 보호되나요?',
      aiResponseTasksDue: '오늘 3개의 작업이 마감입니다: 분기 보고서 검토, 팀 스탠드업 미팅, 프로젝트 문서 업데이트.',
      aiResponseReminder: '알림을 설정하려면 타임라인으로 가서 작업을 선택하고 알림 아이콘을 클릭하세요.',
      aiResponseProductivity: '당신의 생산성 점수는 87%입니다! 15일 연속으로 이번 주에 24개의 작업을 완료했습니다.',
      aiResponseDataProtection: '당신의 데이터는 AES-256 암호화로 보호되며 기기에 로컬로 저장됩니다.',
      aiResponseDefault: '"',
      aiResponseDefaultEnd: '"에 대해 묻고 계신다는 것을 이해합니다. 더 자세한 내용을 알려주실 수 있나요?',
      aiFeature1: '이메일과 메시지에서 스마트 작업 추출',
      aiFeature2: '패턴 기반 지능적 우선순위 제안',
      aiFeature3: '자동 일정 관리 및 충돌 감지',
      aiFeature4: '개인화된 생산성 인사이트 및 권장사항',
      
      // Reminders
      smartReminders: '스마트 알림',
      neverMiss: '지능적인 알림으로 마감일을 놓치지 마세요',
      notificationSettings: '알림 설정',
      oneHourBefore: '1시간 전',
      defaultReminder: '기본 알림 시간',
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
      
      // Task Sharing
      shareNewTask: '새 작업 공유',
      assignTo: '할당',
      enterEmailAddress: '이메일 주소 입력',
      role: '역할',
      viewer: '뷰어',
      editor: '편집자',
      admin: '관리자',
      viewerDesc: '작업 세부사항만 볼 수 있음',
      editorDesc: '작업 편집 및 상태 업데이트 가능',
      adminDesc: '삭제 권한을 포함한 전체 액세스',
      shareTask: '작업 공유',
      tasksShared: '공유된 작업',
      tasksReceived: '받은 작업',
      activeCollaborators: '활성 협업자',
      sharedByMe: '내가 공유한 작업',
      receivedByMe: '내가 받은 작업',
      noSharedTasks: '아직 공유된 작업이 없습니다',
      startSharingTasks: '효과적으로 협업하기 위해 팀과 작업 공유를 시작하세요',
      shareFirstTask: '첫 번째 작업 공유',
      noReceivedTasks: '아직 받은 작업이 없습니다',
      waitingForTasks: '공유될 작업을 기다리고 있습니다',
      collaborateWithTeam: '팀 멤버와 협업하세요',
      assignedTo: '할당됨',
      assignedBy: '할당한 사람',
      pending: '대기 중',
      accepted: '수락됨',
      completed: '완료됨',
      acceptTask: '작업 수락',
      markComplete: '완료 표시',
      markIncomplete: '미완료 표시',
      deleteTask: '작업 삭제',
      showLess: '접기',
      showMore: '더 보기',
      created: '생성됨',
      accept: '수락',
      complete: '완료',
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
