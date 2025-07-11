
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Clock, Calendar, Brain, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    completedTasks: 0,
    totalTasks: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeklyData: [],
    categoryData: [],
    productivityScore: 0,
    suggestions: []
  });

  useEffect(() => {
    // Generate analytics data from localStorage
    const generateAnalytics = () => {
      // Get tasks from localStorage
      const tasks = JSON.parse(localStorage.getItem('memomate-tasks') || '[]');
      const reminders = JSON.parse(localStorage.getItem('memomate-reminders') || '[]');
      const sharedTasks = JSON.parse(localStorage.getItem('memomate-shared-tasks') || '[]');
      
      const allTasks = [...tasks, ...reminders, ...sharedTasks];
      const completedTasks = allTasks.filter(task => task.completed || task.status === 'completed').length;
      const totalTasks = allTasks.length;
      
      // Generate empty weekly data
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const weeklyData = weekDays.map(day => ({
        day,
        completed: 0,
        created: 0
      }));

      // Generate empty category data
      const categories = ['Work', 'Personal', 'Health', 'Learning', 'Social'];
      const categoryData = categories.map((name, index) => ({
        name,
        value: 0,
        color: `hsl(${index * 72}, 70%, 50%)`
      }));

      // Calculate productivity score (0 since no data)
      const productivityScore = 0;

      // Generate suggestions for getting started
      const suggestions = [
        "Start by creating your first task to begin tracking your productivity",
        "Set up reminders to stay on top of important deadlines",
        "Use the sharing feature to collaborate with your team",
        "Complete a few tasks to see your analytics come to life"
      ];

      setAnalyticsData({
        completedTasks,
        totalTasks,
        currentStreak: 0,
        longestStreak: 0,
        weeklyData,
        categoryData,
        productivityScore,
        suggestions
      });
    };

    generateAnalytics();
  }, []);

  const completionRate = 0;

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "hsl(var(--primary))",
    },
    created: {
      label: "Created", 
      color: "hsl(var(--muted-foreground))",
    },
  };

  const categoryChartConfig = {
    Work: {
      label: "Work",
      color: "hsl(0, 70%, 50%)",
    },
    Personal: {
      label: "Personal", 
      color: "hsl(72, 70%, 50%)",
    },
    Health: {
      label: "Health",
      color: "hsl(144, 70%, 50%)",
    },
    Learning: {
      label: "Learning",
      color: "hsl(216, 70%, 50%)",
    },
    Social: {
      label: "Social",
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
                Analytics & Insights
              </h1>
              <p className="text-muted-foreground mt-2">
                Track your productivity and get personalized suggestions
              </p>
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">0%</div>
                <Progress value={0} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Productivity Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">0</div>
                <Progress value={0} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">0 days</div>
                <p className="text-xs text-muted-foreground mt-1">Longest: 0 days</p>
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{analyticsData.completedTasks}</div>
                <p className="text-xs text-muted-foreground mt-1">of {analyticsData.totalTasks} total</p>
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
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData.weeklyData.length === 0 || analyticsData.weeklyData.every(d => d.completed === 0 && d.created === 0) ? (
                  <div className="h-[300px] flex items-center justify-center text-center">
                    <div>
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No activity data yet</p>
                      <p className="text-sm text-muted-foreground">Start creating and completing tasks to see your weekly progress</p>
                    </div>
                  </div>
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
                  Task Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analyticsData.categoryData.length === 0 || analyticsData.categoryData.every(c => c.value === 0) ? (
                  <div className="h-[300px] flex items-center justify-center text-center">
                    <div>
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No category data yet</p>
                      <p className="text-sm text-muted-foreground">Create tasks in different categories to see the distribution</p>
                    </div>
                  </div>
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
                Getting Started Tips
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
