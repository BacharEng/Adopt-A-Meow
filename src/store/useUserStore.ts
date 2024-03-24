import { create } from "zustand";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserStore {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  setId: (id: string) => void;
  setFirstName: (firstname: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  setId: (id) => {
    set({ id });
  },
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
}));
