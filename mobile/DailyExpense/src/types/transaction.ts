import { Category, CategoryColor, CategoryIcon } from './category';
import { CurrencyCode } from './types';
import { AllWalletProviders, Wallet, WalletType } from './wallet';

/* Models */
export interface TransactionCategory {
  id: string;
  name: string;
  color: CategoryColor;
  icon?: CategoryIcon | null;
}

export interface TransactionWallet {
  id: string;
  name: string;
  type: WalletType;
  provider?: AllWalletProviders | null;
  currency: CurrencyCode;
}

export interface Transaction {
  id: string;
  title: string;
  description?: string | null;
  amount: number;
  categoryId: string;
  category?: TransactionCategory | null;
  type: TransactionType;
  walletId: string;
  wallet?: TransactionWallet | null;
  currency: CurrencyCode;
  date: Date;
  merchantName: string;
  merchantLogo?: string | null;
  updatedAt: Date;
}

/* DTO's */

export interface TransactionCategoryDTO {
  id?: string;
  name?: string;
  color?: string;
  icon?: string;
}

export interface TransactionWalletDTO {
  id?: string;
  name?: string;
  type?: string;
  provider?: string;
  currency?: string;
}

export interface TransactionDTO {
  id?: string;
  title?: string;
  description?: string | null;
  amount?: number;
  categoryId?: string;
  category?: TransactionCategoryDTO;
  type?: string;
  walletId?: string;
  wallet?: TransactionWalletDTO;
  currency?: string;
  date?: string;
  merchantName?: string;
  merchantLogo?: string | null;
  updatedAt?: string;
}

/* Types */
export type TransactionType = 'income' | 'expense';

export type CreateTransactionFormValues = {
  date: string;
  categoryId: string;
  walletId: string;
  amount: string;
  title: string;
  description?: string | null;
  type: TransactionType;
  merchantName: string;
};

export type CreateTransactionPayload = {
  date: string;
  categoryId: string;
  walletId: string;
  amount: number;
  title: string;
  description?: string | null;
  type: TransactionType;
  merchantName: string;
};

/* Enums */
export enum TransactionTypes {
  income = 'income',
  expense = 'expense',
}
