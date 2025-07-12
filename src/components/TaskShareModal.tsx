
import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Shield, Check, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTaskStore, Task } from '@/stores/useTaskStore';

interface TaskShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    role: 'viewer' | 'editor' | 'admin';
    priority: string;
    dueDate?: string;
    dueTime?: string;
    status: string;
  }) => void;
}

type TimelineFilter = 'all' | 'today' | 'tomorrow' | 'thisWeek' | 'thisMonth';

const TaskShareModal = ({ isOpen, onClose, onSubmit }: TaskShareModalProps) => {
  const { t } = useLanguage();
  const { tasks } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    assignedTo: '',
    role: 'viewer' as 'viewer' | 'editor' | 'admin',
  });

  // Filter tasks based on timeline and search
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Timeline filter
    if (timelineFilter !== 'all' && task.dueDate) {
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      switch (timelineFilter) {
        case 'today':
          return taskDate.toDateString() === today.toDateString();
        case 'tomorrow':
          return taskDate.toDateString() === tomorrow.toDateString();
        case 'thisWeek':
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        case 'thisMonth':
          return taskDate >= startOfMonth && taskDate <= endOfMonth;
        default:
          return true;
      }
    }

    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !formData.assignedTo.trim()) return;

    const shareData = {
      ...selectedTask,
      assignedTo: formData.assignedTo,
      role: formData.role,
    };

    onSubmit(shareData);
    handleClose();
  };

  const handleClose = () => {
    setSelectedTask(null);
    setTimelineFilter('all');
    setSearchQuery('');
    setFormData({
      assignedTo: '',
      role: 'viewer',
    });
    onClose();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            {t('shareNewTask')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Step 1: Select Task */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                1
              </div>
              <h3 className="text-lg font-medium">{t('selectTaskToShare')}</h3>
            </div>

            {/* Timeline Filter */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'today', 'tomorrow', 'thisWeek', 'thisMonth'] as TimelineFilter[]).map((filter) => (
                <Button
                  key={filter}
                  variant={timelineFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimelineFilter(filter)}
                  className="transform hover:scale-105 transition-all duration-200"
                >
                  {t(filter)}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchTasks')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Task List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{t('noTasksFound')}</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`cursor-pointer transform hover:scale-[1.02] transition-all duration-200 ${
                      selectedTask?.id === task.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedTask(task)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {t(task.priority)}
                            </Badge>
                            {task.status === 'completed' && (
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                {t('completed')}
                              </Badge>
                            )}
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {task.dueDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                            {task.dueTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {task.dueTime}
                              </div>
                            )}
                          </div>
                        </div>
                        {selectedTask?.id === task.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Step 2: Share Details */}
          {selectedTask && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <h3 className="text-lg font-medium">{t('shareDetails')}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Assign To */}
                <div className="space-y-2">
                  <Label htmlFor="assignedTo" className="text-sm font-medium">
                    {t('assignTo')} *
                  </Label>
                  <Input
                    id="assignedTo"
                    type="email"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                    placeholder={t('enterEmailAddress')}
                    className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200"
                    required
                  />
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {t('role')}
                  </Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value: 'viewer' | 'editor' | 'admin') => 
                      setFormData(prev => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">{t('viewer')} - {t('viewerDesc')}</SelectItem>
                      <SelectItem value="editor">{t('editor')} - {t('editorDesc')}</SelectItem>
                      <SelectItem value="admin">{t('admin')} - {t('adminDesc')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="transform hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    type="submit"
                    className="transform hover:scale-105 active:scale-95 transition-all duration-200"
                    disabled={!formData.assignedTo.trim()}
                  >
                    {t('shareTask')}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskShareModal;
