
import React, { useState } from 'react';
import { Plus, Calendar, Clock, Flag, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  source: 'manual' | 'gmail' | 'whatsapp' | 'calendar';
}

const Timeline: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Review quarterly reports',
      description: 'Go through Q4 financial reports and prepare summary',
      dueDate: '2024-01-15',
      dueTime: '14:00',
      priority: 'high',
      completed: false,
      source: 'gmail'
    },
    {
      id: 2,
      title: 'Team standup meeting',
      description: 'Daily sync with development team',
      dueDate: '2024-01-15',
      dueTime: '09:30',
      priority: 'medium',
      completed: false,
      source: 'calendar'
    },
    {
      id: 3,
      title: 'Update project documentation',
      description: 'Update README and API docs for v2.0',
      dueDate: '2024-01-16',
      dueTime: '17:00',
      priority: 'low',
      completed: false,
      source: 'manual'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium' as Task['priority']
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate || !newTask.dueTime) return;

    const task: Task = {
      id: tasks.length + 1,
      ...newTask,
      completed: false,
      source: 'manual'
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      priority: 'medium'
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
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
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
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-primary" />
            Timeline
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
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getSourceIcon(task.source)}</span>
                        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{task.description}</p>
                      
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
                          {task.source}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTaskComplete(task.id)}
                      className={task.completed ? 'text-green-600' : 'text-muted-foreground'}
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
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Task Title</label>
                    <Input
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Enter task title"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Enter task description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Due Time</label>
                      <Input
                        type="time"
                        value={newTask.dueTime}
                        onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <Button onClick={handleAddTask} className="w-full">
                    Add Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Task Stats */}
            <Card className="animate-bounce-in">
              <CardHeader>
                <CardTitle className="text-lg">Task Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Tasks</span>
                  <span className="font-semibold">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Completed</span>
                  <span className="font-semibold text-green-600">
                    {tasks.filter(t => t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pending</span>
                  <span className="font-semibold text-orange-600">
                    {tasks.filter(t => !t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">High Priority</span>
                  <span className="font-semibold text-red-600">
                    {tasks.filter(t => t.priority === 'high' && !t.completed).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* AI Extraction Status */}
            <Card className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-lg">AI Extraction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>📧 Gmail</span>
                  <span className="text-green-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💬 WhatsApp</span>
                  <span className="text-yellow-600">Setup</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📅 Calendar</span>
                  <span className="text-green-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📱 SMS</span>
                  <span className="text-gray-600">Disabled</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
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
