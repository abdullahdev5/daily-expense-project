import { View } from "react-native";
import { WalletCardProvider, WalletDigitalProvider, WalletType } from "../types/wallet";
import { DropdownItem } from "@components/Dropdown";

/* Wallet Types */
export const walletTypes: DropdownItem<WalletType>[] = [
    { label: 'Cash', value: "cash", data: 'cash', icon: 'cash' },
    { label: 'Bank', value: "bank", data: 'bank', icon: 'bank' },
    { label: 'Card', value: "card", data: 'card', icon: 'card' },
    { label: 'Digital', value: "digital", data: 'digital', icon: 'digital' },
] as const;

/* Wallet Card Providers */
export const walletCardProviders: DropdownItem<WalletCardProvider>[] = [
    { label: 'Visa', value: "visa", data: 'visa', icon: 'visa' },
    { label: 'Mastercard', value: "mastercard", data: 'mastercard', icon: 'mastercard' },
    { label: 'Amex', value: "amex", data: 'amex', icon: 'amex' },
    { label: 'Discover', value: "discover", data: 'discover', icon: 'discover' },
] as const;

/* Wallet Digital Providers */
export const walletDigitalProviders: DropdownItem<WalletDigitalProvider>[] = [
    { label: 'Jazzcash', value: "jazzcash", data: 'jazzcash', icon: 'jazzcash' },
    { label: 'Sadapay', value: "sadapay", data: 'sadapay', icon: 'sadapay' },
    { label: 'Easypaisa', value: "easypaisa", data: 'easypaisa', icon: 'easypaisa' },
    { label: 'Paypal', value: "paypal", data: 'paypal', icon: 'paypal' },
    { label: 'GooglePay', value: "googlepay", data: 'googlepay', icon: 'googlepay' },
    { label: 'ApplePay', value: "applepay", data: 'applepay', icon: 'applepay' },
] as const;