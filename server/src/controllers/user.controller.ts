import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import { responseHelper } from "../helpers/responseHelper";

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!._id;
    const user = await userService.getUser(userId.toString());
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

const setBaseCurrency = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!._id;
        const { baseCurrency } = req.body;

        const newUser = await userService.setBaseCurrency(
          userId.toString(),
          baseCurrency
        );

        return responseHelper.sendSuccess(
            res,
            newUser,
            'Your base currency is set Successfully',
        );
    } catch (e) {
        next(e);
    }
}


export { getUser, setBaseCurrency };