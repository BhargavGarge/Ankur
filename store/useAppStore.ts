import { create } from 'zustand';

interface UserProfile {
  name?: string;
  purpose?: string;
  university?: string;
  city?: string;
  visaType?: string;
  arrivalStatus?: string;
  arrivalDate?: string;
  onboardingComplete?: boolean;
}

export interface TaskProgress {
  id: string; // matches TaskDefinition.id (e.g., 'anmeldung')
  status: 'todo' | 'in_progress' | 'done';
  docs_ready: string[]; // array of doc IDs
  steps_done: string[]; // array of step IDs
  deadline?: string;
  data?: Record<string, any>; // Persistent fields like IBAN, Landlord Name, etc.
}

interface AppState {
  isOnboarded: boolean;
  setOnboarded: (value: boolean) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  userTasks: Record<string, TaskProgress>;
  setUserTasks: (tasks: TaskProgress[]) => void;
  updateTaskProgress: (taskId: string, progress: Partial<TaskProgress>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboarded: false,
  setOnboarded: (value) => set({ isOnboarded: value }),
  userProfile: {},
  updateUserProfile: (profile) => 
    set((state) => ({ userProfile: { ...state.userProfile, ...profile } })),
  userTasks: {},
  setUserTasks: (tasks) => {
    const taskMap: Record<string, TaskProgress> = {};
    tasks.forEach(task => {
      taskMap[task.id] = task;
    });
    set({ userTasks: taskMap });
  },
  updateTaskProgress: (taskId, progress) =>
    set((state) => ({
      userTasks: {
        ...state.userTasks,
        [taskId]: {
          ...(state.userTasks[taskId] || { id: taskId, status: 'todo', docs_ready: [], steps_done: [] }),
          ...progress
        }
      }
    }))
}));
