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
import { getMerchantLogoDomain, getMerchantLogoUrl } from "../utils/transaction.utils";

class TransactionService {
  // Add Transaction
  public async addTransaction(userId: string, data: CreateTransactionDTO) {

    const walletObjectId = new Types.ObjectId(data.walletId);
    const userObjectId = new Types.ObjectId(userId);

    // Get the Wallet
    const wallet = await Wallet.findOne({
      _id: walletObjectId,
      userId: userObjectId,
    });

    if (!wallet) {
      throw new HttpError("unable to find the wallet!", 400);
    }

    // Updating Balance
    await wallet.updatebalance(data.type, data.amount);

    // Updating Merchant Logo
    const merchantLogoDomain = getMerchantLogoDomain(data.merchantName);
    const merchantLogoUrl = await getMerchantLogoUrl(merchantLogoDomain);

    // Adding Transaction
    const transaction = await Transaction.create({
      userId: userObjectId,
      ...data,
      
      currency: wallet.currency,
      merchantLogo: merchantLogoUrl,
      categoryId: new Types.ObjectId(data.categoryId),
      walletId: walletObjectId,
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
        .populateAll()
        .sort({ date: -1 });
  }
}

export const transactionService = new TransactionService();
