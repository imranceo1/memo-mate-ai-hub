
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Clock, Calendar, Brain, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
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
      
      // Generate weekly data
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const weeklyData = weekDays.map(day => ({
        day,
        completed: Math.floor(Math.random() * 8) + 1,
        created: Math.floor(Math.random() * 12) + 2
      }));

      // Generate category data
      const categories = ['Work', 'Personal', 'Health', 'Learning', 'Social'];
      const categoryData = categories.map((name, index) => ({
        name,
        value: Math.floor(Math.random() * 20) + 5,
        color: `hsl(${index * 72}, 70%, 50%)`
      }));

      // Calculate productivity score
      const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const productivityScore = Math.min(Math.floor(completionRate + Math.random() * 20), 100);

      // Generate suggestions based on data
      const suggestions = [];
      if (completionRate < 50) {
        suggestions.push("Consider breaking down large tasks into smaller, manageable chunks");
      }
      if (productivityScore > 80) {
        suggestions.push("Great job! You're maintaining excellent productivity levels");
      } else if (productivityScore < 60) {
        suggestions.push("Try scheduling your most important tasks during peak energy hours");
      }
      
      suggestions.push("Review your completed tasks weekly to identify patterns");
      suggestions.push("Set realistic daily goals to maintain momentum");

      setAnalyticsData({
        completedTasks,
        totalTasks,
        currentStreak: Math.floor(Math.random() * 15) + 1,
        longestStreak: Math.floor(Math.random() * 30) + 10,
        weeklyData,
        categoryData,
        productivityScore,
        suggestions
      });
    };

    generateAnalytics();
  }, []);

  const completionRate = analyticsData.totalTasks > 0 
    ? Math.round((analyticsData.completedTasks / analyticsData.totalTasks) * 100) 
    : 0;

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
                <div className="text-2xl font-bold text-primary">{completionRate}%</div>
                <Progress value={completionRate} className="mt-2" />
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
                <div className="text-2xl font-bold text-accent">{analyticsData.productivityScore}</div>
                <Progress value={analyticsData.productivityScore} className="mt-2" />
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
                <div className="text-2xl font-bold text-secondary">{analyticsData.currentStreak} days</div>
                <p className="text-xs text-muted-foreground mt-1">Longest: {analyticsData.longestStreak} days</p>
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
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
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
                  </ResponsiveContainer>
                </div>
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
              </CardContent>
            </Card>
          </div>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Suggestions
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
