import { ApiResponse } from "./api";

/* Models */
export interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    provider: AuthProvider;
    providerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthData {
    token: string;
    user: User;
}


/* Server DTO's */
export interface UserDTO {
    id?: string;
    name?: string;
    email?: string;
    picture?: string;
    provider?: AuthProvider;
    providerId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthDataDTO {
    token?: string;
    user?: UserDTO;
}


/* Types */
export type AuthProvider = 'google' | 'facebook' | 'email';

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    picture?: string | undefined;
}

export type LoginPayload = {
    email: string;
    password: string;
}