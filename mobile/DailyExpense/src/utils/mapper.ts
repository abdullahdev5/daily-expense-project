import { AuthData, AuthDataDTO, User, UserDTO } from "../types/auth";
import { Category, CategoryColor, CategoryDTO, CategoryIcon } from "../types/category";
import { AllWalletProviders, Wallet, WalletDTO, WalletType } from "../types/wallet";

const getDefaultUser = (): User => ({
    id: '',
    name: '',
    email: '',
    picture: '',
    provider: 'email',
    providerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
})

// User Map
export const mapUser = (user: UserDTO): User => ({
    id: user.id ?? '',
    name: user.name ?? '',
    email: user.email ?? '',
    picture: user.picture ?? '',
    provider: user.provider ?? 'email',
    providerId: user.providerId ?? '',
    createdAt: new Date(user.createdAt ?? Date.now()),
    updatedAt: new Date(user.updatedAt ?? Date.now())
});
// AuthData map
export const mapAuthData = (authData: AuthDataDTO): AuthData => ({
    token: authData?.token ?? '',
    user: authData.user ? mapUser(authData.user) : getDefaultUser()
});


// Wallet Map
export const mapWallet = (wallet: WalletDTO): Wallet => ({
    id: wallet.id ?? '',
    name: wallet.name ?? '',
    type: (wallet.type ?? 'cash') as WalletType,
    provider: (wallet?.provider ?? null) as AllWalletProviders | null,
    currency: wallet.currency ?? '',
    balance: wallet.balance ?? 0,
    createdAt: new Date(wallet.createdAt ?? Date.now()),
    updatedAt: new Date(wallet.updatedAt ?? Date.now()),
});

// Category Map
export const mapCategory = (category: CategoryDTO): Category => ({
    id: category.id ?? '',
    name: category.name ?? '',
    type: category.type ?? 'expense',
    icon: (category.icon ?? 'other') as CategoryIcon,
    color: (category.color ?? 'yellow') as CategoryColor,
    isDefault: category.isDefault ?? true,
    createdAt: new Date(category.createdAt ?? Date.now()),
    updatedAt: new Date(category.updatedAt ?? Date.now())
})