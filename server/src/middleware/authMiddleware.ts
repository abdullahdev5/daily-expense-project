import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { responseHelper } from "../helpers/responseHelper";
import { UserPayload } from "../types/user";
import { HttpError } from "../utils/errors.util";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return responseHelper.sendError(res, "UnAuthorized, token missing!", 401);
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new HttpError("JWT_SECRET is missing in the environment variables!");
    }

    const decoded = jwt.verify(token, secret) as UserPayload;

    const user = await User.findById(decoded._id);

    if (!user) {
      return responseHelper.sendUserNotFound(res);
    }

    // Atatch User to Request
    req.user = {
      _id: user!._id,
      email: user!.email,
    };

    next();
  } catch (e: any) {
    throw new Error(e.message);
  }
};


export const verifyToken = (token: string): UserPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new HttpError("JWT_SECRET is missing in the snvironment variales!");
  }
  return jwt.verify(token, secret) as UserPayload;
}
