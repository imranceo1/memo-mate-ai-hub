import { useState, useEffect } from 'react';
import { Plus, Users, Share2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useTaskStore } from '@/stores/useTaskStore';
import Navbar from '@/components/Navbar';
import TaskShareModal from '@/components/TaskShareModal';
import SharedTaskCard from '@/components/SharedTaskCard';

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

const Sharing = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { tasks } = useTaskStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedTasks, setSharedTasks] = useState<SharedTask[]>([]);
  const [activeTab, setActiveTab] = useState<'shared' | 'received' | 'upcoming'>('shared');

  // Load shared tasks from localStorage on component mount
  useEffect(() => {
    const savedSharedTasks = localStorage.getItem('memomate-shared-tasks');
    if (savedSharedTasks) {
      try {
        setSharedTasks(JSON.parse(savedSharedTasks));
      } catch (error) {
        console.error('Error loading shared tasks:', error);
      }
    }
  }, []);

  // Save shared tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('memomate-shared-tasks', JSON.stringify(sharedTasks));
  }, [sharedTasks]);

  const sharedByMe = sharedTasks.filter(task => task.assignedBy === 'me');
  const receivedByMe = sharedTasks.filter(task => task.assignedBy !== 'me');
  
  // Get upcoming tasks from timeline
  const upcomingTasks = tasks
    .filter(task => task.status === 'pending' && task.dueDate)
    .sort((a, b) => {
      const dateA = new Date(`${a.dueDate}T${a.dueTime || '00:00'}`);
      const dateB = new Date(`${b.dueDate}T${b.dueTime || '00:00'}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5); // Show top 5 upcoming tasks

  const handleTaskUpdate = (taskId: string, updates: Partial<SharedTask>) => {
    setSharedTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleTaskDelete = (taskId: string) => {
    setSharedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleNewTaskShare = (taskData: {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    role: 'viewer' | 'editor' | 'admin';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    dueDate?: string;
    dueTime?: string;
    status: string;
  }) => {
    const newTask: SharedTask = {
      id: Date.now().toString(),
      ...taskData,
      assignedBy: 'me',
      status: 'pending' as const,
      dueDate: taskData.dueDate || '',
      dueTime: taskData.dueTime || '',
      createdAt: new Date().toISOString()
    };
    setSharedTasks(prev => [...prev, newTask]);
    setIsShareModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-accent/10 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-secondary/10 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-muted/10 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-18 h-18 bg-primary/10 rounded-full animate-bounce opacity-45" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Share2 className="h-8 w-8 text-primary" />
                {t('taskSharing')}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t('collaborateWithTeam')}
              </p>
            </div>
            <Button 
              onClick={() => setIsShareModalOpen(true)}
              className="btn-enhanced transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('shareNewTask')}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('tasksShared')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{sharedByMe.length}</div>
              </CardContent>
            </Card>
            
            <Card className="transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('tasksReceived')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{receivedByMe.length}</div>
              </CardContent>
            </Card>
            
            <Card className="transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('activeCollaborators')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {new Set([...sharedByMe.map(t => t.assignedTo), ...receivedByMe.map(t => t.assignedBy)]).size}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('shared')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                activeTab === 'shared'
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('sharedByMe')} ({sharedByMe.length})
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                activeTab === 'received'
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('receivedByMe')} ({receivedByMe.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                activeTab === 'upcoming'
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('upcomingTasks')} ({upcomingTasks.length})
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {activeTab === 'shared' && (
              <div className="grid gap-4">
                {sharedByMe.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Share2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t('noSharedTasks')}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t('startSharingTasks')}
                    </p>
                    <Button onClick={() => setIsShareModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      {t('shareFirstTask')}
                    </Button>
                  </Card>
                ) : (
                  sharedByMe.map((task) => (
                    <SharedTaskCard
                      key={task.id}
                      task={task}
                      onUpdate={handleTaskUpdate}
                      onDelete={handleTaskDelete}
                      currentUserRole="admin"
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === 'received' && (
              <div className="grid gap-4">
                {receivedByMe.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t('noReceivedTasks')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('waitingForTasks')}
                    </p>
                  </Card>
                ) : (
                  receivedByMe.map((task) => (
                    <SharedTaskCard
                      key={task.id}
                      task={task}
                      onUpdate={handleTaskUpdate}
                      onDelete={handleTaskDelete}
                      currentUserRole={task.role}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div className="grid gap-4">
                {upcomingTasks.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t('noUpcomingTasks')}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t('createTasksToShare')}
                    </p>
                    <Button onClick={() => setIsShareModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      {t('shareNewTask')}
                    </Button>
                  </Card>
                ) : (
                  upcomingTasks.map((task) => (
                    <Card key={task.id} className="transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{task.title}</h4>
                              <Badge 
                                className={`${
                                  task.priority === 'high' ? 'bg-red-500 text-white' :
                                  task.priority === 'medium' ? 'bg-yellow-500 text-black' :
                                  'bg-green-500 text-white'
                                }`} 
                                variant="secondary"
                              >
                                {t(task.priority)}
                              </Badge>
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
                                  {new Date(task.dueDate).toLocaleDateString()}
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
                          <Button
                            size="sm"
                            onClick={() => {
                              // Pre-select this task in the share modal
                              setIsShareModalOpen(true);
                            }}
                            className="transform hover:scale-105 active:scale-95 transition-all duration-200"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            {t('shareTask')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Share Modal */}
      <TaskShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSubmit={handleNewTaskShare}
      />
    </div>
  );
};

export default Sharing;
