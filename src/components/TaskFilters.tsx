
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, X } from 'lucide-react';
import { useCommonTranslation } from '@/hooks/useCommonTranslation';

export interface TaskFilters {
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  urgency: 'all' | 'normal' | 'urgent';
}

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  className?: string;
}

const TaskFiltersComponent: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  className = ""
}) => {
  const { t } = useCommonTranslation();

  const hasActiveFilters = filters.status !== 'all' || filters.priority !== 'all' || filters.urgency !== 'all';

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      priority: 'all',
      urgency: 'all'
    });
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                {Object.values(filters).filter(f => f !== 'all').length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, status: 'all'})}
            className={filters.status === 'all' ? 'bg-accent' : ''}
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, status: 'pending'})}
            className={filters.status === 'pending' ? 'bg-accent' : ''}
          >
            {t('pending')}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, status: 'completed'})}
            className={filters.status === 'completed' ? 'bg-accent' : ''}
          >
            {t('completed')}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t('priority')}</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, priority: 'all'})}
            className={filters.priority === 'all' ? 'bg-accent' : ''}
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, priority: 'low'})}
            className={filters.priority === 'low' ? 'bg-accent' : ''}
          >
            {t('low')}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, priority: 'medium'})}
            className={filters.priority === 'medium' ? 'bg-accent' : ''}
          >
            {t('medium')}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, priority: 'high'})}
            className={filters.priority === 'high' ? 'bg-accent' : ''}
          >
            {t('high')}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t('urgency')}</DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, urgency: 'all'})}
            className={filters.urgency === 'all' ? 'bg-accent' : ''}
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, urgency: 'normal'})}
            className={filters.urgency === 'normal' ? 'bg-accent' : ''}
          >
            {t('normal')}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFiltersChange({...filters, urgency: 'urgent'})}
            className={filters.urgency === 'urgent' ? 'bg-accent' : ''}
          >
            {t('urgent')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasActiveFilters && (
        <Button
          variant="ghost"  
          size="sm"
          onClick={clearFilters}
          className="h-8 px-2"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default TaskFiltersComponent;
