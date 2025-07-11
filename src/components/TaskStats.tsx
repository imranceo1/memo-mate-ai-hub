
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, TrendingUp, Zap } from 'lucide-react';
import { Task } from '@/stores/useTaskStore';
import { useCommonTranslation } from '@/hooks/useCommonTranslation';

interface TaskStatsProps {
  tasks: Task[];
  className?: string;
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks, className = "" }) => {
  const { t } = useCommonTranslation();

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tasksToday = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  }).length;

  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  const highPriorityTasks = tasks.filter(task => 
    task.priority === 'high' && task.status === 'pending'
  ).length;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      <Card className="transform hover:scale-105 transition-all duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {t('completionRate')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{completionRate}%</div>
          <Progress value={completionRate} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {completedTasks} of {totalTasks} tasks
          </p>
        </CardContent>
      </Card>

      <Card className="transform hover:scale-105 transition-all duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t('pendingTasks')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-500">{pendingTasks}</div>
          {tasksToday > 0 && (
            <Badge variant="secondary" className="mt-2">
              {tasksToday} {t('today')}
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card className="transform hover:scale-105 transition-all duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {t('high')} {t('priority')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">{highPriorityTasks}</div>
          <p className="text-xs text-muted-foreground mt-1">Active tasks</p>
        </CardContent>
      </Card>

      <Card className="transform hover:scale-105 transition-all duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{overdueTasks}</div>
          <p className="text-xs text-muted-foreground mt-1">Need attention</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStats;
