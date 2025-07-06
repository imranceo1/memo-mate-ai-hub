
import { useState } from 'react';
import { Calendar, Clock, User, Shield, MoreVertical, Check, X, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface SharedTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  role: 'viewer' | 'editor' | 'admin';
  status: 'pending' | 'accepted' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  dueTime: string;
  createdAt: string;
}

interface SharedTaskCardProps {
  task: SharedTask;
  onUpdate: (taskId: string, updates: Partial<SharedTask>) => void;
  onDelete: (taskId: string) => void;
  currentUserRole: 'viewer' | 'editor' | 'admin';
}

const SharedTaskCard = ({ task, onUpdate, onDelete, currentUserRole }: SharedTaskCardProps) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'editor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string, timeString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return timeString ? `${formattedDate} at ${timeString}` : formattedDate;
  };

  const handleStatusUpdate = (newStatus: 'pending' | 'accepted' | 'completed') => {
    onUpdate(task.id, { status: newStatus });
  };

  const canEdit = currentUserRole === 'editor' || currentUserRole === 'admin';
  const canDelete = currentUserRole === 'admin';

  return (
    <Card className="transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-foreground">{task.title}</h3>
              <Badge className={getPriorityColor(task.priority)} variant="secondary">
                {t(task.priority)}
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>
                  {task.assignedBy === 'me' 
                    ? `${t('assignedTo')}: ${task.assignedTo}`
                    : `${t('assignedBy')}: ${task.assignedBy}`
                  }
                </span>
              </div>
              
              <Badge className={getRoleColor(task.role)} variant="outline">
                <Shield className="h-3 w-3 mr-1" />
                {t(task.role)}
              </Badge>
              
              <Badge className={getStatusColor(task.status)} variant="outline">
                {t(task.status)}
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:scale-110 transition-transform duration-200">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {task.status === 'pending' && canEdit && (
                <DropdownMenuItem 
                  onClick={() => handleStatusUpdate('accepted')}
                  className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  <Check className="h-4 w-4 mr-2" />
                  {t('acceptTask')}
                </DropdownMenuItem>
              )}
              
              {task.status === 'accepted' && canEdit && (
                <DropdownMenuItem 
                  onClick={() => handleStatusUpdate('completed')}
                  className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                >
                  <Check className="h-4 w-4 mr-2" />
                  {t('markComplete')}
                </DropdownMenuItem>
              )}

              {task.status === 'completed' && canEdit && (
                <DropdownMenuItem 
                  onClick={() => handleStatusUpdate('accepted')}
                  className="text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900"
                >
                  <X className="h-4 w-4 mr-2" />
                  {t('markIncomplete')}
                </DropdownMenuItem>
              )}

              {canDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('deleteTask')}
                </DropdownMenuItem>
              )}
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

        {/* Quick Actions */}
        {canEdit && task.status !== 'completed' && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-border">
            {task.status === 'pending' && (
              <Button
                size="sm"
                onClick={() => handleStatusUpdate('accepted')}
                className="transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Check className="h-4 w-4 mr-1" />
                {t('accept')}
              </Button>
            )}
            
            {task.status === 'accepted' && (
              <Button
                size="sm"
                onClick={() => handleStatusUpdate('completed')}
                className="transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Check className="h-4 w-4 mr-1" />
                {t('complete')}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SharedTaskCard;
