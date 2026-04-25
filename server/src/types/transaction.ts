import mongoose, { Document, Model, QueryFilter, Types } from "mongoose";

export interface ITransaction extends Document {
    userId: Types.ObjectId;
    title: string;
    description?: string | null,
    amount: number;
    categoryId: Types.ObjectId;
    type: TransactionType;
    date: Date;
    currency: string;
    walletId: Types.ObjectId;
    merchantName: string;
    merchantLogo?: string | null;
}

export interface ITransactionModel
  extends Model<ITransaction, ITransactionQueryHelpers> {

  getWithDetails(options: {
    // userId: string;
    // id?: string;
    query?: Record<string, any>;
    limit?: number;
  }): Promise<any[]>;
}

export interface ITransactionQueryHelpers {
  // query(filters: QueryFilter<ITransaction>): mongoose.Query<
  //   mongoose.HydratedDocument<ITransaction>[],
  //   mongoose.HydratedDocument<ITransaction>,
  //   ITransactionQueryHelpers
  // >;
  query(filters: any): any;
  populateCategory(): any;
  populateWallet(): any;
  populateAll(): any;
}


export interface TransactionDTO {
    id: string;
    title: string;
    description?: string | null,
    amount: number;
    categoryId: string;
    type: string;
    date: string;
    currency: string;
    walletId: string;
    merchantName: string;
    merchantLogo?: string | null;
}


export interface CreateTransactionRequestDTO {
  title?: string;
  description?: string | null;
  amount?: number;
  categoryId?: string;
  type?: string;
  walletId?: string;
  merchantName?: string;
  date?: string | null;
}

export interface CreateTransactionDTO {
  title: string;
  description?: string | null;
  amount: number;
  categoryId: string;
  type: TransactionType;
  walletId: string;
  merchantName: string;
  date: Date;
}


export type TransactionType = "income" | "expense";
export enum TransactionTypes {
  income = 'income',
  expense = 'expense'
};