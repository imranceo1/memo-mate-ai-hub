
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  source: 'manual' | 'gmail' | 'whatsapp' | 'calendar' | 'sms';
  dueDate?: Date;
  createdAt: Date;
  assignedTo?: string;
  assignedBy?: string;
  role?: 'viewer' | 'editor' | 'admin';
}

interface AppState {
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // UI State
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // User preferences
  preferences: {
    theme: 'light' | 'dark' | 'blue';
    language: 'en' | 'hi' | 'ta' | 'te' | 'ko';
    notifications: boolean;
  };
  updatePreferences: (prefs: Partial<AppState['preferences']>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      tasks: [],
      sidebarCollapsed: false,
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
      },
      
      // Actions
      addTask: (taskData) => set((state) => ({
        tasks: [...state.tasks, {
          ...taskData,
          id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
        }]
      })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        )
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      updatePreferences: (prefs) => set((state) => ({
        preferences: { ...state.preferences, ...prefs }
      })),
    }),
    {
      name: 'memomate-storage',
      partialize: (state) => ({ 
        tasks: state.tasks, 
        preferences: state.preferences,
        sidebarCollapsed: state.sidebarCollapsed 
      }),
    }
  )
);
