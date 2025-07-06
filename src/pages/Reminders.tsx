
import React, { useState } from 'react';
import { Bell, Clock, Mail, Smartphone, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

const Reminders: React.FC = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState({
    oneHourBefore: true,
    emailAlerts: false,
    pushNotifications: true,
  });

  const upcomingReminders = [
    { 
      id: 1, 
      title: "Review quarterly reports", 
      time: "1 hour", 
      type: "high", 
      category: t('dueToday') 
    },
    { 
      id: 2, 
      title: "Team standup meeting", 
      time: "3 hours", 
      type: "medium", 
      category: t('dueToday') 
    },
    { 
      id: 3, 
      title: "Project planning session", 
      time: "Tomorrow 9:00 AM", 
      type: "high", 
      category: t('dueTomorrow') 
    },
    { 
      id: 4, 
      title: "Client presentation prep", 
      time: "Tomorrow 2:00 PM", 
      type: "medium", 
      category: t('dueTomorrow') 
    },
  ];

  const streakData = {
    current: 15,
    best: 28,
    thisWeek: 7
  };

  const handleToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20 animate-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-24 left-24 w-40 h-40 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-52 right-28 w-32 h-32 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-28 left-1/3 w-48 h-48 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-52 right-1/4 w-36 h-36 bg-accent/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-12 w-28 h-28 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
            <Bell className="w-8 h-8 text-primary" />
            {t('smartReminders')}
          </h1>
          <p className="text-muted-foreground">{t('neverMiss')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notification Settings */}
          <Card className="animate-slide-in bg-card/95 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t('notificationSettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="hour-before" className="text-foreground font-medium">
                    {t('oneHourBefore')}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t('defaultReminder')}</p>
                </div>
                <Switch
                  id="hour-before"
                  checked={notifications.oneHourBefore}
                  onCheckedChange={() => handleToggle('oneHourBefore')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-alerts" className="text-foreground font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('emailAlerts')}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t('highPriorityTasks')}</p>
                </div>
                <Switch
                  id="email-alerts"
                  checked={notifications.emailAlerts}
                  onCheckedChange={() => handleToggle('emailAlerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="push-notifications" className="text-foreground font-medium flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    {t('pushNotifications')}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t('allReminders')}</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.pushNotifications}
                  onCheckedChange={() => handleToggle('pushNotifications')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card className="animate-slide-in bg-card/95 backdrop-blur border-border" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t('upcomingTasks')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <div key={reminder.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm leading-relaxed">{reminder.title}</h4>
                    <div className={`w-2 h-2 rounded-full mt-1 ${
                      reminder.type === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {reminder.time}
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {reminder.category}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Streak & Analytics */}
          <Card className="animate-slide-in bg-card/95 backdrop-blur border-border" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {t('activeStreak')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{streakData.current}</div>
                <p className="text-sm text-muted-foreground">{t('streakDays')}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-foreground">{t('thisWeek')}</span>
                  <span className="font-medium text-foreground">{streakData.thisWeek} {t('streakDays')}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-foreground">Best Streak</span>
                  <span className="font-medium text-foreground">{streakData.best} {t('streakDays')}</span>
                </div>
              </div>

              <Button 
                className="w-full transform transition-all duration-150 hover:scale-105 active:scale-95" 
                variant="outline"
              >
                {t('viewAnalytics')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 animate-bounce-in">
          <Card className="bg-card/95 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t('quickActions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 transform transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm">{t('today')}</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 transform transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  <Clock className="w-6 h-6" />
                  <span className="text-sm">{t('tomorrow')}</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 transform transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  <Target className="w-6 h-6" />
                  <span className="text-sm">{t('thisWeek')}</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 transform transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  <Bell className="w-6 h-6" />
                  <span className="text-sm">{t('thisMonth')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
