
import React from 'react';
import { BarChart3, TrendingUp, Target, Clock, Calendar, Brain, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import Navbar from '@/components/Navbar';

import EmptyState from '@/components/EmptyState';
import { useAnalyticsTranslation } from '@/hooks/useAnalyticsTranslation';
import { useTaskStore } from '@/stores/useTaskStore';

interface AnalyticsData {
  completedTasks: number;
  totalTasks: number;
  currentStreak: number;
  longestStreak: number;
  weeklyData: Array<{ day: string; completed: number; created: number }>;
  categoryData: Array<{ name: string; value: number; color: string }>;
  productivityScore: number;
  suggestions: string[];
}

const Analytics = () => {
  const { t } = useAnalyticsTranslation();
  const { tasks } = useTaskStore();

  // Generate analytics data directly without loading state
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  
  // Generate weekly data based on actual tasks
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = weekDays.map(day => {
    const dayTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      const dayIndex = weekDays.indexOf(day);
      return taskDate.getDay() === (dayIndex + 1) % 7;
    });
    
    return {
      day,
      completed: dayTasks.filter(task => task.status === 'completed').length,
      created: dayTasks.length
    };
  });

  // Generate category data based on task priorities
  const categories = [
    { name: t('work'), priority: 'high', color: 'hsl(0, 70%, 50%)' },
    { name: t('personal'), priority: 'medium', color: 'hsl(72, 70%, 50%)' },
    { name: t('health'), priority: 'low', color: 'hsl(144, 70%, 50%)' },
    { name: t('learning'), priority: 'medium', color: 'hsl(216, 70%, 50%)' },
    { name: t('social'), priority: 'low', color: 'hsl(288, 70%, 50%)' }
  ];
  
  const categoryData = categories.map(category => ({
    name: category.name,
    value: tasks.filter(task => task.priority === category.priority).length,
    color: category.color
  }));

  // Calculate productivity score
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

          // Generate suggestions based on data
        const suggestions = [
          totalTasks === 0 ? t('tipStartFirstTask') : null,
          completedTasks === 0 && totalTasks > 0 ? t('tipCompleteTasks') : null,
          productivityScore > 80 ? t('tipGreatJob') : null,
          productivityScore < 50 && totalTasks > 0 ? t('tipBreakDownTasks') : null,
          t('tipSetReminders'),
          t('tipUseSharing')
        ].filter(Boolean) as string[];

  // Calculate current streak based on completed tasks
  const calculateCurrentStreak = () => {
    const completedTasks = tasks.filter(task => task.status === 'completed');
    if (completedTasks.length === 0) return 0;
    
    // Sort by completion date (assuming we track when tasks were completed)
    const sortedTasks = completedTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate || a.createdAt || 0);
      const dateB = new Date(b.dueDate || b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Simple streak calculation - count consecutive days with completed tasks
    let streak = 1;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if we have tasks completed today and yesterday
    const hasTaskToday = completedTasks.some(task => {
      const taskDate = new Date(task.dueDate || task.createdAt || 0);
      return taskDate.toDateString() === today.toDateString();
    });
    
    const hasTaskYesterday = completedTasks.some(task => {
      const taskDate = new Date(task.dueDate || task.createdAt || 0);
      return taskDate.toDateString() === yesterday.toDateString();
    });
    
    if (hasTaskToday && hasTaskYesterday) {
      streak = 2; // Basic streak calculation
    } else if (hasTaskToday) {
      streak = 1;
    } else {
      streak = 0;
    }
    
    return streak;
  };

  const analyticsData = {
    completedTasks,
    totalTasks,
    currentStreak: calculateCurrentStreak(),
    longestStreak: Math.max(calculateCurrentStreak(), 0), // Simple implementation
    weeklyData,
    categoryData,
    productivityScore,
    suggestions: suggestions.slice(0, 4)
  };

  const completionRate = analyticsData.totalTasks > 0 
    ? Math.round((analyticsData.completedTasks / analyticsData.totalTasks) * 100) 
    : 0;

  const chartConfig = {
    completed: {
      label: t('completed'),
      color: "hsl(var(--primary))",
    },
    created: {
      label: t('created'),
      color: "hsl(var(--muted-foreground))",
    },
  };

  const categoryChartConfig = {
    [t('work')]: {
      label: t('work'),
      color: "hsl(0, 70%, 50%)",
    },
    [t('personal')]: {
      label: t('personal'),
      color: "hsl(72, 70%, 50%)",
    },
    [t('health')]: {
      label: t('health'),
      color: "hsl(144, 70%, 50%)",
    },
    [t('learning')]: {
      label: t('learning'),
      color: "hsl(216, 70%, 50%)",
    },
    [t('social')]: {
      label: t('social'),
      color: "hsl(288, 70%, 50%)",
    },
  };



  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-accent/10 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-secondary/10 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                {t('analyticsInsights')}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t('trackProductivity')}
              </p>
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {t('lastUpdated')}: {new Date().toLocaleDateString()}
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {t('completionRate')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{completionRate}%</div>
                <Progress value={completionRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {t('productivityScore')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{analyticsData.productivityScore}</div>
                <Progress value={analyticsData.productivityScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  {t('currentStreak')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{analyticsData.currentStreak} {t('days')}</div>
                <p className="text-xs text-muted-foreground mt-1">{t('longestStreak')}: {analyticsData.longestStreak} {t('days')}</p>
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t('tasksCompleted')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{analyticsData.completedTasks}</div>
                <p className="text-xs text-muted-foreground mt-1">of {analyticsData.totalTasks} {t('totalTasks')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('weeklyActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData.weeklyData.length === 0 || analyticsData.weeklyData.every(d => d.completed === 0 && d.created === 0) ? (
                  <EmptyState
                    icon={BarChart3}
                    title={t('noActivityData')}
                    description={t('startCreatingTasks')}
                    className="h-[300px]"
                  />
                ) : (
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={analyticsData.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                      <Bar dataKey="created" fill="var(--color-created)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>

            {/* Task Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {t('taskCategories')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData.categoryData.length === 0 || analyticsData.categoryData.every(c => c.value === 0) ? (
                  <EmptyState
                    icon={TrendingUp}
                    title={t('noCategoryData')}
                    description={t('createTasksCategories')}
                    className="h-[300px]"
                  />
                ) : (
                  <>
                    <ChartContainer config={categoryChartConfig} className="h-[300px]">
                      <PieChart>
                        <Pie
                          data={analyticsData.categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {analyticsData.categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {analyticsData.categoryData.map((category, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {t('gettingStartedTips')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
