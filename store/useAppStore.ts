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

interface AppState {
  isOnboarded: boolean;
  setOnboarded: (value: boolean) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboarded: false,
  setOnboarded: (value) => set({ isOnboarded: value }),
  userProfile: {},
  updateUserProfile: (profile) => 
    set((state) => ({ userProfile: { ...state.userProfile, ...profile } }))
}));
