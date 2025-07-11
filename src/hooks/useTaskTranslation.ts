
import { useLanguage } from '@/contexts/LanguageContext';

// Temporary translation keys for tasks
const taskTranslations = {
  en: {
    taskTitleRequired: 'Task title is required',
    dueDateCannotBePast: 'Due date cannot be in the past',
    enterTaskTitle: 'Enter task title',
    enterDescription: 'Enter task description',
    taskTitle: 'Task Title',
    description: 'Description',
    priority: 'Priority',
    urgency: 'Urgency',
    dueDate: 'Due Date',
    dueTime: 'Due Time',
    normal: 'Normal',
    urgent: 'Urgent',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    cancel: 'Cancel',
    createTask: 'Create Task',
    creating: 'Creating...',
    addNewTask: 'Add New Task',
    markComplete: 'Mark Complete',
    markIncomplete: 'Mark Incomplete',
    deleteTask: 'Delete Task',
    complete: 'Complete',
    showMore: 'Show More',
    showLess: 'Show Less',
    created: 'Created',
    tasksCompleted: 'Tasks Completed',
    pendingTasks: 'Pending Tasks',
    productivityScore: 'Productivity Score',
    streakDays: 'Streak Days',
    quickActions: 'Quick Actions',
    upcomingTasks: 'Upcoming Tasks',
    noUpcomingTasks: 'No upcoming tasks',
    allTasksCompleted: 'All tasks completed!',
    viewAllTasks: 'View All Tasks',
    aiInsights: 'AI Insights',
    productivityTip: 'Productivity Tip',
    productivityTipText: 'Try breaking large tasks into smaller, manageable chunks to improve completion rates.',
    weeklySummary: 'Weekly Summary',
    weeklySummaryText: 'You\'re doing great! Keep maintaining your task completion streak.',
    setReminder: 'Set Reminder',
    viewAnalytics: 'View Analytics',
    tasksToday: 'Here are your tasks for today',
    noTasks: 'No tasks yet. Create your first task to get started!'
  }
};

export const useTaskTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    return taskTranslations[language as keyof typeof taskTranslations]?.[key as keyof typeof taskTranslations.en] || key;
  };
  
  return { t };
};
