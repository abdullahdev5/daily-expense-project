import { NextFunction, Request, Response } from "express";
import { responseHelper } from "../helpers/responseHelper";
import { CreateWalletDTO, CreateWalletRequestDTO, IWallet } from "../types/wallet";
import { walletService } from "../services/wallet.service";
import { HttpError } from "../utils/errors.util";

// create wallet
const createWallet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!._id;
    const iconFile = req.file;
    const reqBody: CreateWalletRequestDTO = req.body;

    if (!reqBody.name || !reqBody.currency) {
      throw new HttpError("all fields are required!", 400);
    }

    const bodyData: CreateWalletDTO = {
      name: reqBody.name,
      currency: reqBody.currency
    };

    // Creating Wallet
    const wallet = await walletService.addWallet(
      userId.toString(),
      iconFile,
      bodyData,
    );
    // sending response
    return responseHelper.sendSuccess(
      res,
      { wallet },
      "wallet created successfully",
      201,
    );
  } catch (e: any) {
    next(e);
  }
};

// delete wallet
const deleteWallet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!._id;
    const walletId = req.params.id;
    if (!walletId) {
      throw new HttpError("unable to find the wallet!", 400);
    }
    // Deleting Wallet
    await walletService.deleteWallet(userId.toString(), walletId as string);
    // sending response
    return responseHelper.sendSuccess(
        res,
        null,
        "wallet deleted successfully"
    );
  } catch (e) {
    next(e);
  }
};

// get all wallets
const getAllWallets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!._id;
        const wallets = await walletService.getAllWallets(userId.toString());
        // sending response
        return responseHelper.sendSuccess(
            res,
            wallets,
            "wallets fetched successfully"
        );
    } catch (e: any) {
        next(e);
    }
}


export { createWallet, deleteWallet, getAllWallets };