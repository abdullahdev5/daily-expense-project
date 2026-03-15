import { QueryFilter, Types } from "mongoose";
import { supabaseAdmin } from "../config/supabase";
import { BUCKET_NAMES } from "../constants/supabaseConstants";
import { Category } from "../models/Category";
import { CreateCategoryDTO, ICategory } from "../types/category";

class CategoryService {
  private async uploadCategoryIcon(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<string> {
    // will return publicUrl

    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAMES.CATEGORIES_ICONS)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    console.log("Upload Data: " + data);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage
      .from(BUCKET_NAMES.CATEGORIES_ICONS)
      .getPublicUrl(fileName);

    return publicUrl;
  }

  public async addCategory(
    userId: string,
    iconFile: Express.Multer.File | undefined,
    data: CreateCategoryDTO,
  ) {
    let iconPublicUrl: string | null = null;

    if (iconFile) {
      // Uploading Category Icon
      const iconFileName = `${data.name}-${iconFile.originalname}-${Date.now()}`;
      iconPublicUrl = await this.uploadCategoryIcon(iconFile, iconFileName);
      console.log(`category icon public Url: ${iconPublicUrl}`);
    }

    // Capitalizing the Category Name
    const capitalizedName: string = data.name.capitalizeFirstLetter();

    // Adding Category
    const category = await Category.create({
      userId,
      ...data,
      name: capitalizedName,
      icon: iconPublicUrl,
      isDefault: false,
    });

    return category;
  }

  public async deleteCategory(userId: string) {
    const filter: QueryFilter<ICategory> = {
      userId: new Types.ObjectId(userId),
    };
    const update = { isDeleted: true };

    return await Category.findOneAndUpdate(filter, update);
  }

  public async getCategoriesByType(userId: string, type: string) {
    const categories = await Category.aggregate([
      {
        $match: {
          type,
          isDeleted: false,
          $or: [{ isDefault: true }, { userId }],
        },
      },

      {
        $sort: { isDefault: 1, createdAt: -1 },
      },

      {
        $group: {
          _id: { $toLower: "$name" },
          category: { $first: "$$ROOT" },
        },
      },

      {
        $replaceRoot: { newRoot: "$category" },
      },
    ]);

    return categories;
  }
}


export const categoryService = new CategoryService();