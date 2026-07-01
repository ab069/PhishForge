import { create } from "zustand";
interface Phish { campaign_id: string; target_email: string; clicked: boolean; timestamp: string }
interface S { phishes: Phish[]; addPhish: (p: Phish) => void; setPhishes: (p: Phish[]) => void }
export const usePhishStore = create<S>((set) => ({ phishes: [], addPhish: (p) => set((s) => ({ phishes: [p, ...s.phishes] })), setPhishes: (phishes) => set({ phishes }) }));
