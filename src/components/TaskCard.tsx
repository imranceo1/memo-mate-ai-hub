
import { useState } from 'react';
import { Calendar, Clock, MoreVertical, Check, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTaskStore, type Task } from '@/stores/useTaskStore';
import { useCommonTranslation } from '@/hooks/useTranslation';

interface TaskCardProps {
  task: Task;
  compact?: boolean;
}

const TaskCard = ({ task, compact = false }: TaskCardProps) => {
  const { t } = useCommonTranslation();
  const { updateTask, deleteTask, toggleTaskStatus } = useTaskStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    return urgency === 'urgent' 
      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const formatDate = (dateString: string, timeString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    if (isToday) {
      return timeString ? `Today at ${timeString}` : 'Today';
    } else if (isTomorrow) {
      return timeString ? `Tomorrow at ${timeString}` : 'Tomorrow';
    } else {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };
      const formattedDate = date.toLocaleDateString(undefined, options);
      return timeString ? `${formattedDate} at ${timeString}` : formattedDate;
    }
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    const dueDate = new Date(`${task.dueDate}T${task.dueTime || '23:59'}`);
    return dueDate < new Date() && task.status === 'pending';
  };

  const handleToggleStatus = () => {
    toggleTaskStatus(task.id);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-sm leading-relaxed truncate ${
            task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'
          }`}>
            {task.title}
          </p>
          {task.dueDate && (
            <p className="text-xs text-muted-foreground">
              {formatDate(task.dueDate, task.dueTime)}
              {isOverdue() && (
                <span className="ml-2 text-destructive font-medium">Overdue</span>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-2">
          <div className={`w-2 h-2 rounded-full ${
            task.priority === 'high' ? 'bg-red-500' : 
            task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`} />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleStatus}
            className="h-6 w-6 p-0 hover:bg-primary/20"
          >
            <Check className={`h-3 w-3 ${task.status === 'completed' ? 'text-green-600' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className={`transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg ${
      task.status === 'completed' ? 'opacity-75' : ''
    } ${isOverdue() ? 'border-destructive/50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`font-semibold text-lg truncate ${
                task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}>
                {task.title}
              </h3>
              <Badge className={getPriorityColor(task.priority)} variant="secondary">
                {t(task.priority)}
              </Badge>
              {task.urgency === 'urgent' && (
                <Badge className={getUrgencyColor(task.urgency)} variant="outline">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {t('urgent')}
                </Badge>
              )}
            </div>
            
            {isOverdue() && (
              <div className="flex items-center gap-1 text-sm text-destructive mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Overdue</span>
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:scale-110 transition-transform duration-200">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={handleToggleStatus}
                className={`${task.status === 'completed' ? 'text-yellow-600' : 'text-green-600'} hover:bg-green-50 dark:hover:bg-green-900`}
              >
                <Check className="h-4 w-4 mr-2" />
                {task.status === 'completed' ? t('markIncomplete') : t('markComplete')}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t('deleteTask')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        {task.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {isExpanded ? task.description : 
             task.description.length > 100 ? 
             `${task.description.substring(0, 100)}...` : 
             task.description
            }
            {task.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-primary hover:underline font-medium"
              >
                {isExpanded ? t('showLess') : t('showMore')}
              </button>
            )}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(task.dueDate, task.dueTime)}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{t('created')} {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Quick Action */}
        {task.status === 'pending' && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-border">
            <Button
              size="sm"
              onClick={handleToggleStatus}
              className="transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Check className="h-4 w-4 mr-1" />
              {t('complete')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
