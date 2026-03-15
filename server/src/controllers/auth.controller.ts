import { NextFunction, Request, Response } from "express";
import { responseHelper } from "../helpers/responseHelper";
import { RegisterUserDTO, RegisterUserRequestDTO } from "../types/user";
import { HttpError } from "../utils/errors.util";
import { authService } from "../services/auth.service";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqBody: RegisterUserRequestDTO = req.body;

    if (!reqBody.name || !reqBody.email || !reqBody.password) {
      throw new HttpError("all fields are required!", 400);
    }

    const bodyData: RegisterUserDTO = {
      name: reqBody.name,
      email: reqBody.email,
      password: reqBody.password,
    }

    const data = await authService.registerUser(bodyData);
    // sending response
    return responseHelper.sendAuthSuccess(
      res,
      "Registered Successfully",
      data.user,
      data.token
    );
  } catch (e: any) {
    next(e);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Login
    const data = await authService.login(email, password);
    // sending response
    return responseHelper.sendAuthSuccess(
      res,
      "Login Successfully",
      data.user,
      data.token
    );
  } catch (e: any) {
    next(e);
  }
}

// google auth
const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      throw new HttpError("Token required!", 400);
    }
    const data = await authService.loginWithGoogle(idToken);
    // sending response
    return responseHelper.sendAuthSuccess(
      res,
      "Signed In Successfully",
      data.user,
      data.token
    );
  } catch (e: any) {
    next(e);
  }
}

// facebook auth
const facebookAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      throw new HttpError("Token required!", 400);
    }
    const data = await authService.loginWithFacebook(accessToken);
    // sending response
    return responseHelper.sendAuthSuccess(
      res,
      "Signed In Successfully",
      data.user,
      data.token
    );
  } catch (e: any) {
    next(e);
  }
}


const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!._id;
    const user = await authService.getUser(userId.toString());
    // sending response
    return responseHelper.sendSuccess(
      res,
      user,
      "User fetched Successfully"
    );
  } catch (e: any) {
    next(e);
  }
}


export { registerUser, login, googleAuth, facebookAuth, getUser };