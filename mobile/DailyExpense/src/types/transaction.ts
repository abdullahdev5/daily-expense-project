import { Category } from "./category";
import { CurrencyCode } from "./types";
import { Wallet } from "./wallet";

/* Models */
export interface Transaction {
    id: string;
    title: string;
    description?: string | null;
    amount: number;
    categoryId: string | Category;
    type: TransactionType;
    walletId: string | Wallet;
    currency: CurrencyCode;
    date: Date;
    merchantName: string;
    merchantLogo?: string | null;
    updatedAt: Date;
};


/* DTO's */
export interface TransactionDTO {
    id?: string;
    title?: string;
    description?: string | null;
    amount?: number;
    categoryId?: string | Object;
    type?: string;
    walletId?: string | Object;
    currency?: string;
    date?: string;
    merchantName?: string;
    merchantLogo?: string | null;
    updatedAt?: string;
};


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
}

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
    expense = 'expense'
}