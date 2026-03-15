import { NextFunction, Request, Response } from "express";
import { CreateCategoryDTO, CreateCategoryRequestDTO } from "../types/category";
import { responseHelper } from "../helpers/responseHelper";
import { HttpError } from "../utils/errors.util";
import { categoryService } from "../services/category.service";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!._id;
    const reqBody: CreateCategoryRequestDTO = req.body;
    const iconFile = req.file;

    if (!reqBody.name || !reqBody.type) {
      throw new HttpError("all fields required!", 400);
    }

    const bodyData: CreateCategoryDTO = {
      name: reqBody.name,
      type: reqBody.type,
    }

    const category = await categoryService.addCategory(
      userId.toString(),
      iconFile,
      bodyData,
    );

    // sending response
    return responseHelper.sendSuccess(
      res,
      { category },
      "category created successfully",
      201,
    );
  } catch (e: any) {
    next(e);
  }
};

// Delete Category
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!._id;
    await categoryService.deleteCategory(userId.toString());
    // sending response
    return responseHelper.sendSuccess(res, null, "Category deleted successfully");
  } catch (e: any) {
    next(e);
  }
};

// Get Categories by Type
const getCategorieszByType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!._id;
    const { type } = req.query;
    if (!type) {
      throw new HttpError(
        "ransaction type is required to select its categories!",
        400,
      );
    }
    const categories = await categoryService.getCategoriesByType(
      userId.toString(),
      type as string,
    );
    // sending response
    responseHelper.sendSuccess(
      res,
      categories,
      "categories fetched successfully",
    );
  } catch (e: any) {
    next(e);
  }
};

export { createCategory, deleteCategory, getCategorieszByType };