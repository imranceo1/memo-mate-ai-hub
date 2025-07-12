
import React, { useState, useMemo } from 'react';
import { Plus, Calendar, Filter, Search, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import TaskModal from '@/components/TaskModal';
import TaskCard from '@/components/TaskCard';
import SearchBar from '@/components/SearchBar';
import TaskFilters, { TaskFilters as TaskFiltersType } from '@/components/TaskFilters';
import TaskStats from '@/components/TaskStats';
import TaskDragDrop from '@/components/TaskDragDrop';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { useTaskStore, Task } from '@/stores/useTaskStore';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCommonTranslation } from '@/hooks/useCommonTranslation';

const Timeline = () => {
  const { t: tLang } = useLanguage();
  const { t } = useCommonTranslation();
  const { tasks } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'drag' | 'stats'>('list');
  const [isLoading, setIsLoading] = useState(false);

  const { filters, setFilters, filteredTasks } = useTaskFilters({ 
    tasks, 
    searchQuery 
  });

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Sort by due date first, then by priority
      if (a.dueDate && b.dueDate) {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }
      }
      
      // Priority order: high, medium, low
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [filteredTasks]);

  const handleTasksReorder = (reorderedTasks: Task[]) => {
    // Handle task reordering logic here
    console.log('Tasks reordered:', reorderedTasks);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              {tLang('timeline')}
            </h1>
            <p className="text-muted-foreground mt-2">
              {tLang('manageYourTasks')}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'stats' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('stats')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {t('stats')}
            </Button>
            <Button
              variant={viewMode === 'drag' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('drag')}
            >
              {t('dragAndDrop')}
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              {t('list')}
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('addNewTask')}
            </Button>
          </div>
        </div>

        {/* Stats View */}
        {viewMode === 'stats' && (
          <div className="mb-6">
            <TaskStats tasks={tasks} />
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('searchTasks')}
            />
          </div>
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Tasks Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {filteredTasks.length === tasks.length 
                  ? `${t('allTasks')} (${tasks.length})`
                  : `${t('filteredTasks')} (${filteredTasks.length} of ${tasks.length})`
                }
              </span>
              {isLoading && <LoadingSpinner size="sm" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sortedTasks.length === 0 ? (
              searchQuery || filters.status !== 'all' || filters.priority !== 'all' || filters.urgency !== 'all' ? (
                <EmptyState
                  icon={Search}
                  title={t('noTasksFound')}
                  description={t('tryAdjustingSearch')}
                  actionLabel={t('clearFilters')}
                  onAction={() => {
                    setSearchQuery('');
                    setFilters({ status: 'all', priority: 'all', urgency: 'all' });
                  }}
                />
              ) : (
                <EmptyState
                  icon={Calendar}
                  title={t('noTasks')}
                  description={t('getStartedByCreating')}
                  actionLabel={t('addNewTask')}
                  onAction={() => setIsModalOpen(true)}
                />
              )
            ) : (
              <div className="space-y-4">
                {viewMode === 'drag' ? (
                  <TaskDragDrop
                    tasks={sortedTasks}
                    onTasksReorder={handleTasksReorder}
                  />
                ) : (
                  <div className="grid gap-4">
                    {sortedTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default Timeline;
