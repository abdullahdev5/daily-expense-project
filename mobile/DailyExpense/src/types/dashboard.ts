import { Transaction, TransactionDTO } from "./transaction";
import { CurrencyCode } from "./types";

/* Models */
export interface TopDashboardCategory {
    categoryId: string;
    name: string;
    color: string;
    total: number;
    percentage: number;
}

export interface DashboardResponse {
  totalBalance: number;
  baseCurrency: CurrencyCode;
  topCategories: TopDashboardCategory[];
  recentTransactions: Transaction[];
}


/* DTO's */
export interface DashboardResponseDTO {
  totalBalance?: number;
  baseCurrency?: string;
  topCategories?: TopDashboardCategoryDTO[] | null;
  recentTransactions?: TransactionDTO[] | null;
}

export interface TopDashboardCategoryDTO {
    categoryId?: string;
    name?: string;
    color?: string;
    total?: number;
    percentage?: number;
}
