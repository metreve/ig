import { create } from "zustand";

type UIStore = {
  dark: boolean;
  toggleDark: () => void;
  setDark: (value: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  dark: false,

  toggleDark: () =>
    set((state) => ({
      dark: !state.dark,
    })),

  setDark: (value) =>
    set({
      dark: value,
    }),
}));