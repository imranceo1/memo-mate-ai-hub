
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  urgency: 'normal' | 'urgent';
  source: 'manual' | 'gmail' | 'whatsapp' | 'calendar' | 'sms';
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTasksByStatus: (status: 'pending' | 'completed') => Task[];
  getUpcomingTasks: (limit?: number) => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },
      
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      toggleTaskStatus: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'pending' ? 'completed' : 'pending',
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },
      
      getTasksByStatus: (status) => {
        return get().tasks.filter((task) => task.status === status);
      },
      
      getUpcomingTasks: (limit = 4) => {
        const now = new Date();
        return get()
          .tasks.filter((task) => task.status === 'pending' && task.dueDate)
          .sort((a, b) => {
            const dateA = new Date(`${a.dueDate}T${a.dueTime || '00:00'}`);
            const dateB = new Date(`${b.dueDate}T${b.dueTime || '00:00'}`);
            return dateA.getTime() - dateB.getTime();
          })
          .slice(0, limit);
      },
    }),
    {
      name: 'memomate-tasks',
    }
  )
);
