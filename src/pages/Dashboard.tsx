
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bell, BarChart3, Calendar, Sparkles, TrendingUp, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'addTask':
        navigate('/timeline', { state: { openAddTask: true } });
        break;
      case 'setReminder':
        navigate('/reminders');
        break;
      case 'viewAnalytics':
        // For now, scroll to analytics section on dashboard
        document.getElementById('analytics-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'viewAllTasks':
        navigate('/timeline');
        break;
    }
  };

  const stats = [
    { icon: Target, label: t('tasksCompleted'), value: '24', color: 'text-green-600', bgColor: 'bg-green-100' },
    { icon: Clock, label: t('pendingTasks'), value: '8', color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { icon: TrendingUp, label: t('productivityScore'), value: '87%', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { icon: Calendar, label: t('streakDays'), value: '15', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const upcomingTasks = [
    { title: "Review quarterly reports", time: "2:00 PM", priority: "high" },
    { title: "Team standup meeting", time: "3:30 PM", priority: "medium" },
    { title: "Update project documentation", time: "5:00 PM", priority: "low" },
    { title: "Client feedback review", time: "Tomorrow 9:00 AM", priority: "high" },
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
          <h1 className="text-3xl font-bold mb-2 text-foreground">{t('goodMorning')}</h1>
          <p className="text-muted-foreground">{t('tasksToday')}</p>
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
