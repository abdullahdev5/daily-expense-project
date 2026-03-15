import mongoose from "mongoose";
import { MODEL_NAMES } from "../constants/dbConstants";
import { IWallet, IWalletMethods } from "../types/wallet";
import { TransactionType } from "../types/transaction";

const walletSchema = new mongoose.Schema<
  IWallet,
  mongoose.Model<IWallet, {}, IWalletMethods>,
  IWalletMethods
>({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: MODEL_NAMES.USER,
    required: true,
  },
  name: { type: String, required: true, trim: true },
  icon: { type: String, default: null },
  balance: { type: Number, default: 0 },

  currency: { type: String, default: "USD" },
  createdAt: { type: Date, default: Date.now },
});

// Methods
walletSchema.methods.updatebalance = async function (
  type: TransactionType,
  amount: number,
): Promise<IWallet> {
  if (type == TransactionType.income) {
    this.balance += amount;
  } else if (type == TransactionType.expense) {
    this.balance -= amount;
  }

  return await this.save();
};

export const Wallet = mongoose.model<IWallet, mongoose.Model<IWallet, {}, IWalletMethods>>(
  MODEL_NAMES.WALLET,
  walletSchema,
);
