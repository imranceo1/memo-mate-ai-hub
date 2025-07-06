
import React from 'react';
import { Calendar, CheckCircle, Clock, TrendingUp, Star, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: CheckCircle, label: 'Tasks Completed', value: '24', change: '+12%', color: 'text-green-600' },
    { icon: Clock, label: 'Pending Tasks', value: '8', change: '-5%', color: 'text-orange-600' },
    { icon: TrendingUp, label: 'Productivity Score', value: '87%', change: '+3%', color: 'text-blue-600' },
    { icon: Star, label: 'Streak Days', value: '15', change: '+1', color: 'text-purple-600' },
  ];

  const recentTasks = [
    { title: 'Review quarterly reports', due: '2 hours', priority: 'high' },
    { title: 'Team standup meeting', due: '4 hours', priority: 'medium' },
    { title: 'Update project documentation', due: '1 day', priority: 'low' },
    { title: 'Client presentation prep', due: '2 days', priority: 'high' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Good morning! 👋</h1>
          <p className="text-muted-foreground">You have 8 tasks due today. Let's get productive!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="animate-bounce-in bg-card text-card-foreground" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-xs ${stat.color}`}>{stat.change} from last week</p>
                    </div>
                    <div className={`p-3 rounded-full bg-primary/10`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-in bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Calendar className="w-5 h-5" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{task.title}</p>
                        <p className="text-sm text-muted-foreground">Due in {task.due}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <Button variant="ghost" size="sm">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="animate-slide-in bg-card text-card-foreground" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add New Task
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Reminder
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="animate-slide-in bg-card text-card-foreground" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-card-foreground">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <p className="text-sm font-medium text-foreground">💡 Productivity Tip</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You're most productive between 9-11 AM. Schedule important tasks during this window.
                    </p>
                  </div>
                  <div className="p-3 bg-accent/5 rounded-lg border-l-4 border-accent">
                    <p className="text-sm font-medium text-foreground">📊 Weekly Summary</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You completed 85% of tasks this week. Great job staying consistent!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
