
import React from 'react';
import { Bell, Calendar, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

const Reminders: React.FC = () => {
  const { t } = useLanguage();
  
  const reminderGroups = [
    {
      title: t('today'),
      icon: Clock,
      color: 'text-red-600',
      tasks: [
        { title: 'Review quarterly reports', time: '2:00 PM', urgent: true },
        { title: 'Team standup meeting', time: '9:30 AM', urgent: false },
      ]
    },
    {
      title: t('tomorrow'),
      icon: Calendar,
      color: 'text-orange-600',
      tasks: [
        { title: 'Client presentation prep', time: '10:00 AM', urgent: true },
        { title: 'Update project documentation', time: '5:00 PM', urgent: false },
      ]
    },
    {
      title: t('thisWeek'),
      icon: Calendar,
      color: 'text-blue-600',
      tasks: [
        { title: 'Code review session', time: 'Wed 3:00 PM', urgent: false },
        { title: 'Team building event', time: 'Fri 6:00 PM', urgent: false },
        { title: 'Sprint planning', time: 'Thu 11:00 AM', urgent: true },
      ]
    },
    {
      title: t('thisMonth'),
      icon: Star,
      color: 'text-purple-600',
      tasks: [
        { title: 'Performance reviews', time: 'Jan 25', urgent: false },
        { title: 'Budget planning', time: 'Jan 30', urgent: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
            <Bell className="w-8 h-8 text-primary" />
            {t('smartReminders')}
          </h1>
          <p className="text-muted-foreground">{t('neverMiss')}</p>
        </div>

        {/* Notification Settings */}
        <Card className="mb-8 animate-bounce-in bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Bell className="w-5 h-5" />
              {t('notificationSettings')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                <div>
                  <p className="font-medium text-foreground">{t('oneHourBefore')}</p>
                  <p className="text-sm text-muted-foreground">{t('defaultReminder')}</p>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                <div>
                  <p className="font-medium text-foreground">{t('emailAlerts')}</p>
                  <p className="text-sm text-muted-foreground">{t('highPriorityTasks')}</p>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                <div>
                  <p className="font-medium text-foreground">{t('pushNotifications')}</p>
                  <p className="text-sm text-muted-foreground">{t('allReminders')}</p>
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reminder Groups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reminderGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <Card 
                key={group.title} 
                className="animate-slide-in bg-card border-border"
                style={{ animationDelay: `${groupIndex * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${group.color}`}>
                    <Icon className="w-5 h-5" />
                    {group.title}
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full ml-auto">
                      {group.tasks.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {group.tasks.map((task, taskIndex) => (
                      <div 
                        key={taskIndex}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors bg-background"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {task.urgent && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                          <Button variant="ghost" size="sm">
                            <Bell className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {group.tasks.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>No reminders scheduled</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="animate-bounce-in bg-card border-border" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-muted-foreground">{t('dueToday')}</div>
            </CardContent>
          </Card>
          <Card className="animate-bounce-in bg-card border-border" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-muted-foreground">{t('dueTomorrow')}</div>
            </CardContent>
          </Card>
          <Card className="animate-bounce-in bg-card border-border" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-muted-foreground">{t('thisWeek')}</div>
            </CardContent>
          </Card>
          <Card className="animate-bounce-in bg-card border-border" style={{ animationDelay: '0.7s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-muted-foreground">{t('activeStreak')}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
