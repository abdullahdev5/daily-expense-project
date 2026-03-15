import { Document, Types } from "mongoose";
import { TransactionType } from "./transaction";

export interface ICategory extends Document {
    userId?: Types.ObjectId | null;
    name: string;
    type: TransactionType;
    icon?: string | null;
    isDefault: boolean;
    isDeleted: boolean;
    createdAt: Date;
}


export interface CreateCategoryRequestDTO {
    name?: string;
    type?: TransactionType;
}

export interface CreateCategoryDTO {
    name: string;
    type: TransactionType;
}