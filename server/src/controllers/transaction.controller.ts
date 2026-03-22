import { CreateTransactionDTO, CreateTransactionRequestDTO } from "../types/transaction";
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
    const reqBody: CreateTransactionRequestDTO = req.body;

    if (
      !reqBody.title ||
      reqBody.amount == null ||
      !reqBody.categoryId ||
      !reqBody.type ||
      !reqBody.paymentMethod ||
      !reqBody.currency ||
      !reqBody.walletId
    ) {
      return responseHelper.sendError(res, "all fields required!", 400);
    }

    const bodyData: CreateTransactionDTO = {
      title: reqBody.title,
      description: reqBody.description || null,
      amount: reqBody.amount,
      categoryId: reqBody.categoryId,
      type: reqBody.type,
      paymentMethod: reqBody.paymentMethod,
      currency: reqBody.currency,
      walletId: reqBody.walletId,
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