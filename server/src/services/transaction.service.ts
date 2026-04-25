import {
  CreateTransactionDTO,
  ITransaction,
  TransactionDTO,
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
import { User } from "../models/User";

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

    console.log('Merchant Name: ', data.merchantName);
    console.log('Generated Merchant Domain: ', merchantLogoDomain);
    console.log('Final Merchant Logo Url: ', merchantLogoUrl);

    // Adding Transaction
    const transaction = await Transaction.create({
      userId: userObjectId,
      ...data,
      
      currency: wallet.currency,
      merchantLogo: merchantLogoUrl,
      categoryId: new Types.ObjectId(data.categoryId),
      walletId: walletObjectId,
    });

    // Emit the Dashboard Data & New Transaction to the Socket User
    try {
      const user = await User.findById({ _id: userObjectId });
      const newTransaction = await Transaction.getWithDetails({
        query: {
          userId: user?._id,
          _id: transaction._id
        }
      });
      const newTransactionObj = newTransaction[0] as unknown as TransactionDTO;
      
      if (user && user.baseCurrency) {
        await Promise.all([
          socketService.emitToUser<TransactionDTO>(
            userId,
            'new_transaction',
            newTransactionObj
          ),
          dashboardService.emitDashboardUpdate(userId, user.baseCurrency),
        ])
      }
    } catch (socketError) {
      console.log("Socket emission failed: ", socketError);
    }

    console.log('Transaction is Added: ', JSON.stringify(transaction.toObject()))

    return transaction;
  }


  public async getTransactions(userId: string, query: any, page: number, limit: number) {
    return await Transaction.find({ userId: new Types.ObjectId(userId) })
        .query(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ date: -1 });
  }

  public async getTransactionsWithDetails(userId: string, limit: number) {
    return await Transaction.getWithDetails({
      query: { userId: userId },
      limit: limit
    });
  }
}

export const transactionService = new TransactionService();
