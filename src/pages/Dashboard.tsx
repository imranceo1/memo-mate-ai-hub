import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bell, BarChart3, Calendar, Sparkles, TrendingUp, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useCommonTranslation } from '@/hooks/useTranslation';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
  urgency: 'normal' | 'urgent';
  source: 'manual' | 'gmail' | 'whatsapp' | 'calendar' | 'sms';
  status: 'pending' | 'completed';
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useCommonTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Get real-time greeting based on current hour
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  // Get username (placeholder for now, can be replaced with actual user data)
  const getUsername = () => {
    return 'User'; // This can be replaced with actual user data from context/store
  };

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('memomate_tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Get upcoming tasks (next 4 pending tasks with due dates)
  const getUpcomingTasks = () => {
    const now = new Date();
    const pendingTasks = tasks
      .filter(task => task.status === 'pending' && task.dueDate)
      .sort((a, b) => {
        const dateA = new Date(`${a.dueDate}T${a.dueTime || '00:00'}`);
        const dateB = new Date(`${b.dueDate}T${b.dueTime || '00:00'}`);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 4);

    return pendingTasks.map(task => {
      const taskDate = new Date(`${task.dueDate}T${task.dueTime || '00:00'}`);
      const isToday = taskDate.toDateString() === now.toDateString();
      const isTomorrow = taskDate.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
      
      let timeDisplay = '';
      if (isToday) {
        timeDisplay = task.dueTime || 'Today';
      } else if (isTomorrow) {
        timeDisplay = `Tomorrow ${task.dueTime || ''}`.trim();
      } else {
        timeDisplay = taskDate.toLocaleDateString();
      }

      return {
        title: task.title,
        time: timeDisplay,
        priority: task.priority
      };
    });
  };

  const upcomingTasks = getUpcomingTasks();

  // Calculate stats based on real data
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  // Calculate productivity score (completed tasks percentage)
  const totalTasks = tasks.length;
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate streak (consecutive days with completed tasks)
  const calculateStreak = () => {
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasCompletedTasksOnDate = tasks.some(task => 
        task.status === 'completed' && 
        task.createdAt && 
        task.createdAt.startsWith(dateStr)
      );
      
      if (hasCompletedTasksOnDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streakDays = calculateStreak();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'addTask':
        navigate('/timeline', { state: { openAddTask: true } });
        break;
      case 'setReminder':
        navigate('/reminders');
        break;
      case 'viewAnalytics':
        navigate('/analytics');
        break;
      case 'viewAllTasks':
        navigate('/timeline');
        break;
    }
  };

  const stats = [
    { icon: Target, label: t('tasksCompleted'), value: completedTasks.toString(), color: 'text-green-600', bgColor: 'bg-green-100' },
    { icon: Clock, label: t('pendingTasks'), value: pendingTasks.toString(), color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { icon: TrendingUp, label: t('productivityScore'), value: `${productivityScore}%`, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { icon: Calendar, label: t('streakDays'), value: streakDays.toString(), color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const quickActions = [
    { 
      action: 'addTask', 
      icon: Plus, 
      label: t('addNewTask'), 
      color: 'bg-primary hover:bg-primary/90',
      textColor: 'text-primary-foreground'
    },
    { 
      action: 'setReminder', 
      icon: Bell, 
      label: t('setReminder'), 
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    },
    { 
      action: 'viewAnalytics', 
      icon: BarChart3, 
      label: t('viewAnalytics'), 
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    { 
      action: 'viewAllTasks', 
      icon: Calendar, 
      label: t('viewAllTasks'), 
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20 animate-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-32 h-32 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-accent/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-10 w-28 h-28 bg-accent/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            {getTimeBasedGreeting()}, @{getUsername()}
          </h1>
          <p className="text-muted-foreground">
            {totalTasks > 0 ? t('tasksToday') : t('noTasks')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="animate-slide-in bg-card/95 backdrop-blur border-border transform hover:scale-105 transition-all duration-200" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="animate-bounce-in bg-card/95 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t('quickActions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className={`w-full justify-start gap-3 h-12 ${action.color} ${action.textColor} transform transition-all duration-150 hover:scale-105 active:scale-95`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="animate-bounce-in bg-card/95 backdrop-blur border-border" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-card-foreground">{t('upcomingTasks')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.length > 0 ? (
                <>
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm leading-relaxed">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' : 
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">{t('noUpcomingTasks')}</p>
                  <p className="text-sm text-muted-foreground">{t('allTasksCompleted')}</p>
                </div>
              )}
              <Button 
                variant="outline" 
                className="w-full mt-3 transform transition-all duration-150 hover:scale-105 active:scale-95" 
                onClick={() => navigate('/timeline')}
              >
                {t('viewAllTasks')}
              </Button>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="animate-bounce-in bg-card/95 backdrop-blur border-border" style={{ animationDelay: '0.4s' }} id="analytics-section">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                {t('aiInsights')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  {t('productivityTip')}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  {t('productivityTipText')}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                  {t('weeklySummary')}
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                  {t('weeklySummaryText')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
