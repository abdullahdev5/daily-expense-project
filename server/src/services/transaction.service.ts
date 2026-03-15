import {
  CreateTransactionDTO,
  ITransaction,
  TransactionType,
} from "../types/transaction";
import { socketService } from "./socket.service";
import { Wallet } from "../models/Wallet";
import { Transaction } from "../models/Transaction";
import { HttpError } from "../utils/errors.util";
import { Types } from "mongoose";
import { dashboardService } from "./dashboard.service";
import { SOCKET_EVENTS } from "../constants/socketEvents";

class TransactionService {
  // Add Transaction
  public async addTransaction(userId: string, data: CreateTransactionDTO) {

    // Get the Wallet
    const wallet = await Wallet.findOne({
      _id: new Types.ObjectId(data.walletId),
      userId: new Types.ObjectId(userId),
    });

    if (!wallet) {
      throw new HttpError("unable to find the wallet!", 400);
    }

    // Updating Balance
    await wallet.updatebalance(data.type, data.amount);

    // Adding Transaction
    const transaction = await Transaction.create({
      userId: new Types.ObjectId(userId),
      ...data,
      categoryId: new Types.ObjectId(data.categoryId),
      walletId: new Types.ObjectId(data.walletId),
    });

    try {
      // Emit the Dashboard Data & New Transaction to the Socket User
      const updatedDashboardData =
        await dashboardService.getDashboardData(userId);
      // Emit updated dashboard data
      socketService.emitToUser(
        userId,
        SOCKET_EVENTS.DASHBOARD_UPDATED,
        updatedDashboardData,
      );
      // Emit new transaction
      socketService.emitToUser(
        userId,
        SOCKET_EVENTS.NEW_TRANSACTION,
        transaction,
      );
    } catch (socketError) {
      console.log("Socket emission failed: ", socketError);
    }

    return transaction;
  }


  public async getTransactions(userId: string, query: any) {
    return await Transaction.find({ userId: new Types.ObjectId(userId) })
        .query(query)
        .populate("categoryId", "name icon")
        .sort({ date: -1 });
  }
}

export const transactionService = new TransactionService();
