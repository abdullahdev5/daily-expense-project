import { create } from 'zustand';
import { Wallet } from '../types/wallet';
import { getWalletsService } from '../services/wallet.service';
import { ApiResponse } from '../types/api';

interface WalletStoreState {
  wallets: Wallet[];
  isLoading: boolean;
  fetchWallets: () => Promise<ApiResponse<Wallet[]>>;
  addWallet: (newWallet: Wallet) => void;
  updateWallet: (updatedWallet: Wallet) => void;
}

export const useWalletStore = create<WalletStoreState>((set, get) => ({
  wallets: [],
  isLoading: false,
  fetchWallets: async (): Promise<ApiResponse<Wallet[]>> => {
    set({ isLoading: true });
    const res = await getWalletsService();
    if (res.success && res.data) {
      const wallets = res.data;
      set({
        wallets,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }

    return res;
  },
  addWallet: (newWallet: Wallet) => {
    set(state => {
      const walletExists = state.wallets.find(w => w.id === newWallet.id);
      if (walletExists) {
        return { wallets: state.wallets };
      }

      return { wallets: [newWallet, ...state.wallets] };
    });
  },
  updateWallet: (updatedWallet: Wallet) => {
    set(state => {
      const updatedWallets = state.wallets.map(wallet =>
        wallet.id === updatedWallet.id ? updatedWallet : wallet,
      );
      return {
        wallets: updatedWallets
      };
    });
  },
}));
