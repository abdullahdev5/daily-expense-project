import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  picture?: string | null;
  provider: AuthProvider,
  providerId?: string,
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}


export interface UserPayload {
    _id: Types.ObjectId,
    email: string
}

export interface RegisterUserRequestDTO {
  name?: string;
  email?: string;
  password?: string;
}

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export type AuthProvider = "google" | "facebook" | "email";