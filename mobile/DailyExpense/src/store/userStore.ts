import { create } from "zustand";
import { User } from "../types/auth"
import { getUserService } from "../services/auth.service";
import { ERRORS } from "../constants/errorConstants";
import { getErrorMessage } from "../utils/error";


type UserState = {
    user: User | undefined;
    isLoading: boolean;
    isRefreshing: boolean;
    error: string | undefined;
    setUser: (user: User | undefined) => void;
    getUser: () => void;
    refreshUser: () => void;
    logout: () => void;
}


export const userStore = create<UserState>((set) => ({
    user: undefined,
    isLoading: false,
    isRefreshing: false,
    error: undefined,
    
    setUser: (user: User | undefined) =>{
        set((state) => {
            if (state.user === user) return state;

            return { 
                user,
                isLoading: false,
                error: undefined,
            };
        });
    },

    getUser: async () => {
        try {
            set({ isLoading: true, error: undefined });

            const res = await getUserService();

            if (!res.success) {
                set({
                    isLoading: false,
                    error: res.message
                });
                return;
            }

            set({
                isLoading: false,
                error: undefined,
                user: res.data
            });
        } catch (e: any) {
            set({
                isLoading: false,
                error: getErrorMessage(e)
            });
        }
    },

    refreshUser: async () => {
        try {
            set({ isRefreshing: true, error: undefined });

            const res = await getUserService();

            if (!res.success) {
                set({
                    isRefreshing: false,
                    error: res.message
                });
                return;
            }

            set({
                isRefreshing: false,
                error: undefined,
                user: res.data
            });
        } catch (e: any) {
            set({
                isRefreshing: false,
                error: getErrorMessage(e)
            });
        }
    },

    logout: () => {
        set({
            user: undefined,
            error: undefined,
            isLoading: false,
        });
    }
}));