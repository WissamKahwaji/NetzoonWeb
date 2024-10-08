import { DepartmentCategoryModel } from "../departments/type";
import { UserModel } from "../user/type";

export type ProductModel = {
  _id?: string;
  owner: UserModel;
  name: string;
  imageUrl?: string;
  category?: DepartmentCategoryModel;
  condition?: "new" | "used";
  description: string;
  price: number;
  quantity?: number;
  weight?: number;
  images?: string[];
  vedioUrl?: string;
  gifUrl?: string;
  guarantee?: boolean;
  address?: string;
  madeIn?: string;
  year?: Date;
  discountPercentage?: number;
  priceAfterDiscount?: number;
  color?: string;
  country: string;
  ratings?: {
    user: string;
    rating: number;
  }[];
  totalRatings?: number;
  averageRating?: number;
  productimages?: File[] | null;
};

export type FavoriteItemsModel = {
  productId: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
};

export type IntentData = {
  amount: number;
};
export type PaymentConfigRes = {
  publicKey: string;
};
export type IntentRes = {
  clientSecret: string;
};

export type AddEditProductInputModel = {
  _id?: string;
  owner: string;
  name: string;
  imageUrl?: string;
  departmentName: string;
  categoryName: string;
  category?: DepartmentCategoryModel;
  condition?: "new" | "used";
  description: string;
  price: number;
  quantity?: number;
  weight?: number;
  images?: string[];
  vedioUrl?: string;
  gifUrl?: string;
  guarantee?: boolean;
  address?: string;
  madeIn?: string;
  year?: Date;
  discountPercentage?: number;
  priceAfterDiscount?: number;
  color?: string;
  country: string;
  ratings?: {
    user: string;
    rating: number;
  }[];
  totalRatings?: number;
  averageRating?: number;
  productimages?: File[] | null;
};

export type RateProductInputModel = {
  id: string;
  rating: number;
  userId: string;
};
