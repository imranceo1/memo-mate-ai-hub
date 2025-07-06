
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Calendar, Clock, Flag, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  source: 'manual' | 'gmail' | 'whatsapp' | 'calendar';
  urgency: 'low' | 'medium' | 'high';
}

const Timeline: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Review quarterly reports',
      description: 'Go through Q4 financial reports and prepare summary',
      dueDate: '2024-01-15',
      dueTime: '14:00',
      priority: 'high',
      completed: false,
      source: 'gmail',
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Team standup meeting',
      description: 'Daily sync with development team',
      dueDate: '2024-01-15',
      dueTime: '09:30',
      priority: 'medium',
      completed: false,
      source: 'calendar',
      urgency: 'medium'
    },
    {
      id: 3,
      title: 'Update project documentation',
      description: 'Update README and API docs for v2.0',
      dueDate: '2024-01-16',
      dueTime: '17:00',
      priority: 'low',
      completed: false,
      source: 'manual',
      urgency: 'low'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium' as Task['priority'],
    urgency: 'medium' as Task['urgency']
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle navigation from dashboard
  useEffect(() => {
    if (location.state?.openAddTask) {
      setIsDialogOpen(true);
    }
  }, [location.state]);

  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.dueDate || !newTask.dueTime) {
      alert('Please fill in all required fields (Title, Due Date, and Due Time)');
      return;
    }

    const task: Task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      source: 'manual'
    };

    setTasks(prevTasks => [...prevTasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      priority: 'medium',
      urgency: 'medium'
    });
    setIsDialogOpen(false);
  };

  const toggleTaskComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-950/20 dark:border-red-400';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-400';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-400';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-950/20 dark:border-gray-400';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'gmail': return '📧';
      case 'whatsapp': return '💬';
      case 'calendar': return '📅';
      default: return '✏️';
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(`${a.dueDate}T${a.dueTime}`);
    const dateB = new Date(`${b.dueDate}T${b.dueTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
            <Calendar className="w-8 h-8 text-primary" />
            {t('timeline')}
          </h1>
          <p className="text-muted-foreground">Your tasks from all sources, organized by time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tasks List */}
          <div className="lg:col-span-3 space-y-4">
            {sortedTasks.map((task, index) => (
              <Card 
                key={task.id} 
                className={`
                  animate-slide-in border-l-4 transition-all duration-200 hover:shadow-md
                  ${getPriorityColor(task.priority)}
                  ${task.completed ? 'opacity-60' : ''}
                  bg-card text-card-foreground border-border
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getSourceIcon(task.source)}</span>
                        <h3 className={`text-lg font-semibold text-foreground ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full capitalize font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {t(task.priority)}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-3 leading-relaxed">{task.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {task.dueTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Flag className="w-4 h-4" />
                          {t(task.source)}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium">{t('urgency')}:</span>
                          <span className={`text-xs font-medium ${
                            task.urgency === 'high' ? 'text-red-600 dark:text-red-400' :
                            task.urgency === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-green-600 dark:text-green-400'
                          }`}>
                            {t(task.urgency)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTaskComplete(task.id)}
                      className={task.completed ? 'text-green-600' : 'text-muted-foreground hover:text-foreground'}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Task Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addTask')}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background border-border max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">{t('addTask')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-foreground">{t('taskTitle')} *</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder={t('taskTitle')}
                      className="bg-background text-foreground border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-foreground">{t('description')}</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder={t('description')}
                      className="bg-background text-foreground border-border"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate" className="text-sm font-medium text-foreground">{t('dueDate')} *</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="bg-background text-foreground border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueTime" className="text-sm font-medium text-foreground">{t('dueTime')} *</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-sm font-medium text-foreground">{t('priority')}</Label>
                      <select
                        id="priority"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                        className="w-full p-2 border rounded-md bg-background text-foreground border-border"
                      >
                        <option value="low">{t('low')}</option>
                        <option value="medium">{t('medium')}</option>
                        <option value="high">{t('high')}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-sm font-medium text-foreground">{t('urgency')}</Label>
                      <select
                        id="urgency"
                        value={newTask.urgency}
                        onChange={(e) => setNewTask({ ...newTask, urgency: e.target.value as Task['urgency'] })}
                        className="w-full p-2 border rounded-md bg-background text-foreground border-border"
                      >
                        <option value="low">{t('low')}</option>
                        <option value="medium">{t('medium')}</option>
                        <option value="high">{t('high')}</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button onClick={handleAddTask} className="w-full">
                    {t('addTask')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Task Stats */}
            <Card className="animate-bounce-in bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Task Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Tasks</span>
                  <span className="font-semibold text-foreground">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('complete')}</span>
                  <span className="font-semibold text-green-600">
                    {tasks.filter(t => t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('pending')}</span>
                  <span className="font-semibold text-orange-600">
                    {tasks.filter(t => !t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('high')} {t('priority')}</span>
                  <span className="font-semibold text-red-600">
                    {tasks.filter(t => t.priority === 'high' && !t.completed).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-bounce-in bg-card border-border" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">AI Extraction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">📧 {t('gmail')}</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">💬 {t('whatsapp')}</span>
                  <span className="text-yellow-600 font-medium">Setup</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">📅 {t('calendar')}</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">📱 {t('sms')}</span>
                  <span className="text-gray-600 font-medium">Disabled</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-background text-foreground border-border hover:bg-muted">
                  Configure Sources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
