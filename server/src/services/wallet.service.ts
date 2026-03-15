import { Wallet } from "../models/Wallet";
import { supabaseAdmin } from "../config/supabase";
import { BUCKET_NAMES } from "../constants/supabaseConstants";
import { CreateWalletDTO, IWallet } from "../types/wallet";
import { Document, QueryFilter, Types } from "mongoose";
import { HttpError } from "../utils/errors.util";
import { ITransaction } from "../types/transaction";
import { Transaction } from "../models/Transaction";

class WalletService {
  private async uploadWalletIcon(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<string> {
    // will return publicUrl

    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAMES.WALLET_ICONS)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    console.log("Upload Data: " + data);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage
      .from(BUCKET_NAMES.WALLET_ICONS)
      .getPublicUrl(fileName);

    return publicUrl;
  }

  private async deleteWalletIcon(iconePublicUrl: string) {
    const filePath = iconePublicUrl.getFilePathFromUrl(BUCKET_NAMES.WALLET_ICONS);
    const { data, error } = await supabaseAdmin.storage
        .from(BUCKET_NAMES.WALLET_ICONS)
        .remove([filePath]);
    
    if (error) {
        throw new HttpError("failed to delete the wallet Icon!", 500);
    }
    
    return;
  }

  public async addWallet(
    userId: string,
    iconFile: Express.Multer.File | undefined,
    data: CreateWalletDTO,
  ) {
    let iconPublicUrl: string | null = null;

    if (iconFile) {
      // Uploading Category Icon
      const iconFileName = `${data.name}-${iconFile.originalname}-${Date.now()}`;
      iconPublicUrl = await this.uploadWalletIcon(iconFile, iconFileName);
      console.log(`wallet icon public Url: ${iconPublicUrl}`);
    }

    // Adding Category
    const wallet = await Wallet.create({
      userId,
      ...data,
      icon: iconPublicUrl,
    });

    return wallet;
  }

  public async deleteWallet(userId: string, walletId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const walletObjectId = new Types.ObjectId(walletId);
    // Wallet Filter
    const walletFilter: QueryFilter<IWallet> = {
      userId: userObjectId,
      _id: walletObjectId,
    };
    // Transaction Filter
    const transactionFilter: QueryFilter<ITransaction> = {
      userId: userObjectId,
      walletId: walletObjectId,
    };

    // Filtering Wallet
    const wallet = await Wallet.findOne(walletFilter);
    // Error (Wallet not found!)
    if (!wallet) {
      throw new HttpError("unable to find the wallet to delete!");
    }
    if (wallet.icon) {
        // Deleting Wallet Icon
        await this.deleteWalletIcon(wallet.icon);
    }
    // Deleting Wallet
    await wallet.deleteOne();

    // filter transactions related to this wallet and deleting
    const transactions = await Transaction.findOneAndDelete(transactionFilter, {
      returnDocument: "after",
    });

    return {
        wallet,
        transactions
    };
  }


  public async getAllWallets(userId: string) {
    return Wallet.find({ userId }).sort({ createdAt: -1 });
  }
}


export const walletService = new WalletService();
