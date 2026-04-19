import { CreateTransactionDTO, CreateTransactionRequestDTO, TransactionType } from "../types/transaction";
import { NextFunction, Request, Response } from "express";
import { responseHelper } from "../helpers/responseHelper";
import { transactionService } from "../services/transaction.service";

const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!._id;
    const {
      title,
      description,
      amount,
      categoryId,
      type,
      walletId,
      merchantName,
      date,
    }: CreateTransactionRequestDTO = req.body;

    if (
      !title ||
      amount == null ||
      !categoryId ||
      !type ||
      !walletId ||
      !merchantName
    ) {
      return responseHelper.sendError(res, "all fields required!", 400);
    }

    const bodyData: CreateTransactionDTO = {
      title: title,
      description: description || null,
      amount: amount,
      categoryId: categoryId,
      type: type as TransactionType,
      walletId: walletId,
      merchantName: merchantName,
      date: new Date(date ?? Date.now())
    };

    const transaction = await transactionService.addTransaction(
      userId.toString(),
      bodyData,
    );
    // Sending Response
    return responseHelper.sendSuccess(
      res,
      { transaction },
      "Transaction Created Successfully",
      201,
    );
  } catch (e: any) {
    next(e);
  }
};

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!._id;
    const transactions = await transactionService.getTransactions(
      userId.toString(),
      req.query,
    );
    return responseHelper.sendSuccess(
      res,
      transactions,
      "Transaction Fetched Successfully",
    );
  } catch (e: any) {
    next(e);
  }
};

export { createTransaction, getTransactions };