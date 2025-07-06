
import { useState } from 'react';
import { X, Calendar, Clock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface TaskShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => void;
}

const TaskShareModal = ({ isOpen, onClose, onSubmit }: TaskShareModalProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    role: 'viewer',
    priority: 'medium',
    dueDate: '',
    dueTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.assignedTo.trim()) return;

    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      role: 'viewer',
      priority: 'medium',
      dueDate: '',
      dueTime: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            {t('shareNewTask')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              {t('taskTitle')} *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={t('enterTaskTitle')}
              className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              {t('description')}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('enterDescription')}
              className="min-h-[80px] transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200"
            />
          </div>

          {/* Assign To */}
          <div className="space-y-2">
            <Label htmlFor="assignedTo" className="text-sm font-medium">
              {t('assignTo')} *
            </Label>
            <Input
              id="assignedTo"
              type="email"
              value={formData.assignedTo}
              onChange={(e) => handleInputChange('assignedTo', e.target.value)}
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
            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
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

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t('priority')}
            </Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{t('low')}</SelectItem>
                <SelectItem value="medium">{t('medium')}</SelectItem>
                <SelectItem value="high">{t('high')}</SelectItem>
                <SelectItem value="urgent">{t('urgent')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t('dueDate')}
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueTime" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t('dueTime')}
              </Label>
              <Input
                id="dueTime"
                type="time"
                value={formData.dueTime}
                onChange={(e) => handleInputChange('dueTime', e.target.value)}
                className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="transform hover:scale-105 active:scale-95 transition-all duration-200"
              disabled={!formData.title.trim() || !formData.assignedTo.trim()}
            >
              {t('shareTask')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskShareModal;
