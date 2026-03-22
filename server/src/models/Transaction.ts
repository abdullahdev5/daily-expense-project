import mongoose, { QueryFilter } from "mongoose";
import {
  ITransaction,
  ITransactionQueryHelpers,
  TransactionType,
} from "../types/transaction";
import { MODEL_NAMES } from "../constants/dbConstants";

const transactionSchema = new mongoose.Schema<
  ITransaction,
  mongoose.Model<ITransaction, ITransactionQueryHelpers, {}>,
  {},
  ITransactionQueryHelpers
>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: MODEL_NAMES.USER,
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null, trim: true },
    amount: { type: Number, required: true, min: 0 },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: MODEL_NAMES.CATEGORY,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    date: { type: Date, defaukt: Date.now },
    paymentMethod: {
      type: String,
      default: "Cash",
      enum: [
        "Cash",
        "Debit Card",
        "Credit Card",
        "Bank Transfer",
        "Mobile Wallet",
        "Other",
      ],
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
    },
    walletId: {
      type: mongoose.Schema.ObjectId,
      ref: MODEL_NAMES.WALLET,
      required: true,
    },
    // merchantName: String,
    // location: String,
    // notes: String,
    // tags: [String],
    // isRecurring: {
    //     type: Boolean,
    //     default: false
    // },
    // receiptImage: String,
    // aiCategory: String,
    // aiInsight: String,
    // aiAnomaly: Boolean,
    // importantScore: Number,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_, ret: any) {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (_, ret: any) {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

transactionSchema.query.query = function (
  this: mongoose.Query<
    mongoose.HydratedDocument<ITransaction>[],
    mongoose.HydratedDocument<ITransaction>,
    ITransactionQueryHelpers
  >,
  filters: QueryFilter<ITransaction>,
  // this: any,
  // filters: any
) {
  if (filters.title) {
    this.where({
      title: { $regex: filters.title, $options: "i" },
    });
  }

  if (filters.type) {
    this.where({ type: filters.type });
  }

  if (filters.categoryId) {
    this.where({ categoryId: filters.categoryId });
  }

  if (filters.startDate && filters.endDate) {
    this.where({
      date: {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      },
    });
  }

  return this;
};

export const Transaction = mongoose.model<
  ITransaction,
  mongoose.Model<ITransaction, ITransactionQueryHelpers, {}>
>(MODEL_NAMES.TRANSACTION, transactionSchema);
