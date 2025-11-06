import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User Store
interface User {
  id: string;
  email: string;
  token: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

// Plan Store
interface Plan {
  tier: 'essential' | 'premium' | 'enterprise' | null;
  status: 'active' | 'inactive' | 'pending' | null;
}

interface PlanState {
  plan: Plan;
  setPlan: (plan: Plan) => void;
  clearPlan: () => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      plan: {
        tier: null,
        status: null,
      },
      setPlan: (plan) => set({ plan }),
      clearPlan: () => set({ plan: { tier: null, status: null } }),
    }),
    {
      name: 'plan-storage',
    }
  )
);

// UI Store
interface UIState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
