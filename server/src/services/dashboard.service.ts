import { Types } from "mongoose";
import { Transaction } from "../models/Transaction";
import { Wallet } from "../models/Wallet";
import { COLLECTION_NAMES } from "../constants/dbConstants";

class DashboardService {
  public async getDashboardData(userId: string): Promise<Object> {
    const userObjectId = new Types.ObjectId(userId);

    // total icome and expense
    const totals = await Transaction.aggregate([
        { $match: { userId: userObjectId } },
        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount" }
            }
        }
    ]);

    let totalExpense = 0;
    let totalIncome = 0;

    totals.forEach((t) => {
        if (t.id === 'income') totalIncome = t.total;
        if (t.id === 'expense') totalExpense = t.total;
    });


    // Total Balance
    const totalBalanceResult = await Wallet.aggregate([
        { $match: { userId: userObjectId } },
        {
            $group: {
                _id: null,
                totalBalance: { $sum: "$balance" }
            }
        }
    ]);
    const totalBalance = totalBalanceResult.length ? totalBalanceResult[0].totalBalance : 0;
    
    
    // Expense Categories (Shopping, Food, Transport)
    const categoriesStats = await Transaction.aggregate([
      {
        $match: {
          userId: userObjectId,
          type: 'expense',
        },
      },
      {
        $group: {
          _id: "$categoryId",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: COLLECTION_NAMES.categories,
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "category",
      },
      {
        $project: {
          categoryId: "$_id",
          categoryName: "$category.name",
          percentage: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$totalAmount", totalExpense || 1] },
                  100,
                ],
              },
              0,
            ],
          },
        },
      },
    ]);

    // Recent Transactions
    const recentTransactions = await Transaction.find({ userId: userObjectId })
        .sort({ date: -1 })
        .populate("categoryId", "name icon color");


    
    // returning Data
    return {
        totalBalance,
        totalExpense,
        totalIncome,
        categoryPercentages: categoriesStats,
        transactions: recentTransactions
    };
  }

}

export const dashboardService = new DashboardService();
