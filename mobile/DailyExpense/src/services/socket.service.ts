import { io, Socket } from 'socket.io-client';
import { ENV } from '../config/env';
import { getToken } from '../storage/auth.storage';
import { useSnackbarStore } from '../store/snackbarStore';
import { userStore } from '../store/userStore';
import { logoutService } from './user.service';
import { ERRORS } from '../constants/errorConstants';
import { SOCKET_LISTENERS } from '../constants/socketConstants';
import { DashboardResponse, DashboardResponseDTO } from '../types/dashboard';
import { useDashboardStore } from '../store/useDashboardStore';
import { Transaction, TransactionDTO } from '../types/transaction';
import { mapDashboardResponse, mapTransaction, mapWallet } from '../utils/mapper';
import { WalletDTO } from '../types/wallet';
import { useWalletStore } from '../store/useWalletStore';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return;

    const token = getToken();
    if (!token) {
      useSnackbarStore
        .getState()
        .showSnackbar(ERRORS.unauthorized, { type: 'error' });

      return logoutService();
    }

    const getSocketUrl = (url: string): string => {
      try {
        const parsed = new URL(url);
        return `${parsed.protocol}//${parsed.host}`;
      } catch (e) {
        return url.split('/api')[0];
      }
    };

    if (!ENV.API_BASE_URL) {
      console.error('unable to find API_BASE_UTL')
      return;
    }

    const SOCKET_URL = getSocketUrl(ENV.API_BASE_URL);

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        token: token,
      },
    });

    // Setup Listeners
    this.setupDashboardListeners();
    this.setupTransactionsListener();
    this.setupWalletListener();

    this.socket.on('connect', () => {
      console.log('Socket Connected Successfully');
    })

    this.socket.on('connect_error', err => {
      console.error('Socket Connection Error: ', err);
    });
  }

  private setupDashboardListeners() {
    if (!this.socket) return;

    this.socket.on(
      SOCKET_LISTENERS.dashboardUpdate,
      (updateDTO: Partial<DashboardResponseDTO>) => {
        console.log('Socket: Dashboard Update: ', JSON.stringify(updateDTO));

        const update = mapDashboardResponse(updateDTO);

        useDashboardStore.getState().updateDashboard(update);
      },
    );
  }

  private setupTransactionsListener() {
    if (!this.socket) return;

    this.socket.on(
      SOCKET_LISTENERS.newTransaction,
      (newTransactionDTO: Partial<TransactionDTO>) => {
        console.log(
          'Socket: New Transaction: ',
          JSON.stringify(newTransactionDTO),
        );

        const store = useDashboardStore.getState();
        const currentDashboardData = store.data;

        if (currentDashboardData) {
          const mappedTransaction = mapTransaction(newTransactionDTO);

          // Check for duplicates to prevent issues if server emits twice
          const alreadyExists = currentDashboardData.recentTransactions.some(
            tx => tx.id === mappedTransaction.id,
          );

          if (!alreadyExists) {
            // Updated Recent Transactions
            const updatedRecentTransactions: Transaction[] = [
              mappedTransaction,
              ...currentDashboardData.recentTransactions,
            ];

            useDashboardStore.setState({
              data: {
                ...currentDashboardData,
                recentTransactions: updatedRecentTransactions,
              },
            });
          }
        }
      },
    );
  }

  private setupWalletListener() {
    if (!this.socket) return;

    this.socket.on(
      SOCKET_LISTENERS.newWallet,
      (newWalletDTO: WalletDTO) => {
        const store = useWalletStore.getState();
        const newMappedWallet = mapWallet(newWalletDTO);

        console.log('Socket: New Wallet: ', JSON.stringify(newWalletDTO));

        store.addWallet(newMappedWallet);
      }
    )

    this.socket.on(
      SOCKET_LISTENERS.walletUpdate,
      (updatedWalletDTO: WalletDTO) => {
        const updatedMappedWallet = mapWallet(updatedWalletDTO);
        const store = useWalletStore.getState();

        console.log('Socket: Wallet Update (updated Wallet): ', JSON.stringify(updatedWalletDTO));

        store.updateWallet(updatedMappedWallet);
      }
    )
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export default new SocketService();
