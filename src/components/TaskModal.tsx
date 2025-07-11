
import { useState } from 'react';
import { Plus, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTaskStore } from '@/stores/useTaskStore';
import { useCommonTranslation } from '@/hooks/useCommonTranslation';

interface TaskModalProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface FormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  urgency: 'normal' | 'urgent';
  dueDate: string;
  dueTime: string;
  source: 'manual' | 'gmail' | 'whatsapp' | 'calendar' | 'sms';
}

interface FormErrors {
  title?: string;
  dueDate?: string;
}

const TaskModal = ({ trigger, isOpen, onOpenChange }: TaskModalProps) => {
  const { t } = useCommonTranslation();
  const { addTask } = useTaskStore();
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: 'medium',
    urgency: 'normal',
    dueDate: '',
    dueTime: '',
    source: 'manual',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setOpen(newOpen);
    }
    
    if (!newOpen) {
      // Reset form when closing
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        urgency: 'normal',
        dueDate: '',
        dueTime: '',
        source: 'manual',
      });
      setErrors({});
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = t('taskTitleRequired');
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = t('dueDateCannotBePast');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addTask({
        ...formData,
        status: 'pending',
      });
      
      handleOpenChange(false);
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const defaultTrigger = (
    <Button className="transform hover:scale-105 active:scale-95 transition-all duration-200">
      <Plus className="w-4 h-4 mr-2" />
      {t('addNewTask')}
    </Button>
  );

  return (
    <Dialog open={isOpen ?? open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plus className="h-5 w-5 text-primary" />
            {t('addNewTask')}
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
              className={`transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200 ${
                errors.title ? 'border-destructive' : ''
              }`}
              required
            />
            {errors.title && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.title}
              </div>
            )}
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

          {/* Priority and Urgency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t('priority')}
              </Label>
              <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => handleInputChange('priority', value)}>
                <SelectTrigger className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t('low')}</SelectItem>
                  <SelectItem value="medium">{t('medium')}</SelectItem>
                  <SelectItem value="high">{t('high')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t('urgency')}
              </Label>
              <Select value={formData.urgency} onValueChange={(value: 'normal' | 'urgent') => handleInputChange('urgency', value)}>
                <SelectTrigger className="transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">{t('normal')}</SelectItem>
                  <SelectItem value="urgent">{t('urgent')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                className={`transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-200 ${
                  errors.dueDate ? 'border-destructive' : ''
                }`}
              />
              {errors.dueDate && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.dueDate}
                </div>
              )}
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
              onClick={() => handleOpenChange(false)}
              className="transform hover:scale-105 active:scale-95 transition-all duration-200"
              disabled={isSubmitting}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="transform hover:scale-105 active:scale-95 transition-all duration-200"
              disabled={isSubmitting || !formData.title.trim()}
            >
              {isSubmitting ? t('creating') : t('createTask')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
