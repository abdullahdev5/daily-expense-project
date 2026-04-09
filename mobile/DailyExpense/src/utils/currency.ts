import { currencies, Currency } from "../constants/currencies";

const currencyMap = new Map<string, Currency>(
    currencies.map(c => [c.code, c])
);

export const getCurrencySymbol = (code?: string | null): string => {
  if (!code) return '';
  return currencyMap.get(code)?.symbol ?? code;
};

export const getCurrencyName = (code?: string | null): string => {
  if (!code) return '';
  return currencyMap.get(code)?.name ?? code;
};