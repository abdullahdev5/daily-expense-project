import { create } from "zustand";
import { DashboardResponse } from "../types/dashboard"


export type DashboardState = {
    data: DashboardResponse | null;
    updateDashboard: (update: Partial<DashboardResponse>) => void;
}


export const useDashboardStore = create<DashboardState>((set) => ({
   data: null,
   updateDashboard: (update) =>
    set((state) => ({
        data: state.data
            ? { ...state.data, ...update }
            : (update as DashboardResponse)
    }))
}))