import { AuthData, AuthDataDTO, User, UserDTO } from "../types/auth";

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