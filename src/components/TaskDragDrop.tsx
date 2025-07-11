
import React, { useState } from 'react';
import { Task } from '@/stores/useTaskStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GripVertical } from 'lucide-react';

interface TaskDragDropProps {
  tasks: Task[];
  onTasksReorder: (tasks: Task[]) => void;
  className?: string;
}

const TaskDragDrop: React.FC<TaskDragDropProps> = ({
  tasks,
  onTasksReorder,
  className = ""
}) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const dragIndex = tasks.findIndex(task => task.id === draggedTask.id);
    if (dragIndex === dropIndex) return;

    const newTasks = [...tasks];
    const draggedItem = newTasks[dragIndex];
    
    newTasks.splice(dragIndex, 1);
    newTasks.splice(dropIndex, 0, draggedItem);
    
    onTasksReorder(newTasks);
    setDraggedTask(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverIndex(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {tasks.map((task, index) => (
        <Card
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`cursor-move transition-all duration-200 ${
            draggedTask?.id === task.id ? 'opacity-50 scale-95' : ''
          } ${
            dragOverIndex === index ? 'border-primary border-2' : ''
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </span>
                  <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                    {task.priority}
                  </Badge>
                  {task.urgency === 'urgent' && (
                    <Badge variant="outline" className="text-orange-500 border-orange-500">
                      Urgent
                    </Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskDragDrop;
