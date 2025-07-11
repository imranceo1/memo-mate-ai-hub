
import { useState, useMemo } from 'react';
import { Task } from '@/stores/useTaskStore';
import { TaskFilters } from '@/components/TaskFilters';

interface UseTaskFiltersProps {
  tasks: Task[];
  searchQuery?: string;
}

export const useTaskFilters = ({ tasks, searchQuery = '' }: UseTaskFiltersProps) => {
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    urgency: 'all'
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status !== 'all') {
        const taskStatus = task.status;
        if (taskStatus !== filters.status) return false;
      }

      // Priority filter
      if (filters.priority !== 'all') {
        if (task.priority !== filters.priority) return false;
      }

      // Urgency filter
      if (filters.urgency !== 'all') {
        if (task.urgency !== filters.urgency) return false;
      }

      return true;
    });
  }, [tasks, filters, searchQuery]);

  return {
    filters,
    setFilters,
    filteredTasks
  };
};
