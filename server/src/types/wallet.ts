import { Document, Types } from "mongoose";
import { TransactionType } from "./transaction";

export interface IWallet extends Document {
    userId: Types.ObjectId;
    name: string;
    icon?: string | null;
    balance: number;
    currency: string;
    createdAt: Date;
}


export interface IWalletMethods {

    updatebalance(type: string, amount: number): Promise<IWallet>;

}


export interface CreateWalletRequestDTO {
    name?: string;
    currency?: string;
}

export interface CreateWalletDTO {
    name: string;
    currency: string;
}