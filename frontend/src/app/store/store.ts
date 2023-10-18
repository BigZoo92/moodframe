import { create } from 'zustand';

interface Store {
  isAuthActive: boolean;
  setIsAuthActive: (value: boolean) => void;
  isLoginActive: boolean;
  setIsLoginActive: (value: boolean) => void;
  isUserExists: boolean;
  setIsUserExists: (value: boolean) => void;
  userName: string;
  setUserName: (value: string) => void;
}

export const useStore = create<Store>((set) => ({
  isAuthActive: false,
  setIsAuthActive: (value) => set({ isAuthActive: value }),
  isLoginActive: true,
  setIsLoginActive: (value) => set({ isLoginActive: value }),
  isUserExists: false,
  setIsUserExists: (value) => set({ isUserExists: value }),
  userName: '',
  setUserName: (value) => set({ userName: value }),
}));
