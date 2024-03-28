import { create } from "zustand";

interface OverlayState {
  isOverlayVisible: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  isOverlayVisible: false,
  showOverlay: () => set({ isOverlayVisible: true }),
  hideOverlay: () => set({ isOverlayVisible: false }),
}));
