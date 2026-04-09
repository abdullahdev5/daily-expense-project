import { ReactNode } from "react";

/* Models */
export interface Wallet {
    id: string;
    userId: string;
    name: string;
    type: WalletType;
    provider: AllWalletProviders | null;
    balance: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}

/* DTO's */
export interface WalletDTO {
    id?: string;
    userId?: string;
    name?: string;
    type?: string;
    provider?: string | null;
    balance?: number;
    currency?: string;
    createdAt?: string;
    updatedAt?: string;
}

/* Types */
export type WalletType = "cash" | "bank" | 'card' | "digital";

export type WalletCardProvider =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover';

export type WalletDigitalProvider =
  | 'jazzcash'
  | 'sadapay'
  | 'easypaisa'
  | 'paypal'
  | 'applepay'
  | 'googlepay';


export type AllWalletTypesAndProviders = WalletType | WalletCardProvider | WalletDigitalProvider;

export type AllWalletProviders = WalletCardProvider | WalletDigitalProvider;

export type CreateWalletPayload = {
    name: string;
    type: WalletType;
    provider?: string | null;
    currency: string;
};