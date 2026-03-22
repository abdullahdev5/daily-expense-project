import mongoose, { Document, QueryFilter, Types } from "mongoose";

export interface ITransaction extends Document {
    userId: Types.ObjectId;
    title: string;
    description?: string | null,
    amount: number;
    categoryId: Types.ObjectId;
    type: TransactionType;
    date: Date;
    paymentMethod: string;
    currency: string;
    walletId: Types.ObjectId;
}

export interface ITransactionQueryHelpers {
  query(filters: QueryFilter<ITransaction>): mongoose.Query<
    mongoose.HydratedDocument<ITransaction>[],
    mongoose.HydratedDocument<ITransaction>,
    ITransactionQueryHelpers
  >;
  // query(filters: any): any;
}


export interface CreateTransactionRequestDTO {
  title?: string;
  description?: string | null;
  amount?: number;
  categoryId?: string;
  type?: TransactionType;
  paymentMethod?: string;
  currency?: string;
  walletId?: string;
}

export interface CreateTransactionDTO {
  title: string;
  description?: string | null;
  amount: number;
  categoryId: string;
  type: TransactionType;
  paymentMethod: string;
  currency: string;
  walletId: string;
}


export type TransactionType = "income" | "expense";