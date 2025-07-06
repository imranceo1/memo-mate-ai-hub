
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
  source: string;
  status: 'pending' | 'completed';
  urgency: 'normal' | 'urgent';
}

const Timeline: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(location.state?.openAddTask || false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review quarterly reports",
      description: "Analyze Q3 performance metrics and prepare summary",
      dueDate: "2024-01-15",
      dueTime: "14:00",
      priority: "high",
      source: "gmail",
      status: "pending",
      urgency: "urgent"
    },
    {
      id: 2,
      title: "Team standup meeting",
      description: "Weekly sync with development team",
      dueDate: "2024-01-15",
      dueTime: "15:30",
      priority: "medium",
      source: "calendar",
      status: "pending",
      urgency: "normal"
    },
    {
      id: 3,
      title: "Update project documentation",
      description: "Add new API endpoints to documentation",
      dueDate: "2024-01-15",
      dueTime: "17:00",
      priority: "low",
      source: "manual",
      status: "completed",
      urgency: "normal"
    }
  ]);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    source: 'manual',
    status: 'pending',
    urgency: 'normal'
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate && newTask.dueTime) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title!,
        description: newTask.description || '',
        dueDate: newTask.dueDate!,
        dueTime: newTask.dueTime!,
        priority: newTask.priority as 'low' | 'medium' | 'high',
        source: newTask.source!,
        status: 'pending',
        urgency: newTask.urgency as 'normal' | 'urgent'
      };
      
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        source: 'manual',
        status: 'pending',
        urgency: 'normal'
      });
      setIsDialogOpen(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'gmail': return '📧';
      case 'whatsapp': return '💬';
      case 'calendar': return '📅';
      case 'sms': return '📱';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20 animate-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-36 h-36 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-48 right-24 w-28 h-28 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-24 left-1/4 w-44 h-44 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-48 right-1/3 w-32 h-32 bg-accent/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">{t('timeline')}</h1>
            <p className="text-muted-foreground">{t('manageYourTasks')}</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 transform transition-all duration-150 hover:scale-105 active:scale-95">
                <Plus className="w-4 h-4" />
                {t('addTask')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">{t('addTask')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-foreground">{t('taskTitle')}</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder={t('enterTaskTitle')}
                    className="bg-background text-foreground border-border"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-foreground">{t('description')}</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder={t('enterDescription')}
                    className="bg-background text-foreground border-border"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dueDate" className="text-foreground">{t('dueDate')}</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="bg-background text-foreground border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueTime" className="text-foreground">{t('dueTime')}</Label>
                    <Input
                      id="dueTime"
                      type="time"
                      value={newTask.dueTime}
                      onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                      className="bg-background text-foreground border-border"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority" className="text-foreground">{t('priority')}</Label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value as 'low' | 'medium' | 'high' })}>
                      <SelectTrigger className="bg-background text-foreground border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="low">{t('low')}</SelectItem>
                        <SelectItem value="medium">{t('medium')}</SelectItem>
                        <SelectItem value="high">{t('high')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="urgency" className="text-foreground">{t('urgency')}</Label>
                    <Select value={newTask.urgency} onValueChange={(value) => setNewTask({ ...newTask, urgency: value as 'normal' | 'urgent' })}>
                      <SelectTrigger className="bg-background text-foreground border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="normal">{t('normal')}</SelectItem>
                        <SelectItem value="urgent">{t('urgent')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="source" className="text-foreground">{t('source')}</Label>
                  <Select value={newTask.source} onValueChange={(value) => setNewTask({ ...newTask, source: value })}>
                    <SelectTrigger className="bg-background text-foreground border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="manual">{t('manual')}</SelectItem>
                      <SelectItem value="gmail">{t('gmail')}</SelectItem>
                      <SelectItem value="whatsapp">{t('whatsapp')}</SelectItem>
                      <SelectItem value="calendar">{t('calendar')}</SelectItem>
                      <SelectItem value="sms">{t('sms')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleAddTask} 
                    className="flex-1 transform transition-all duration-150 hover:scale-105 active:scale-95"
                  >
                    {t('addTask')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="transform transition-all duration-150 hover:scale-105 active:scale-95"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Card key={task.id} className={`border-l-4 ${getPriorityColor(task.priority)} animate-slide-in bg-card/95 backdrop-blur border-border`} style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">{task.title}</h3>
                    {task.description && (
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{task.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-lg">{getSourceIcon(task.source)}</span>
                    {task.urgency === 'urgent' && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {t('urgent')}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{task.dueTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="capitalize">{t(task.source)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' :
                      'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                    }`}>
                      {t(task.priority)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
                    }`}>
                      {t(task.status)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
