import { UserModel } from "../user/type";

export type RealEstateModel = {
  _id?: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  area?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  images?: string[];
  createdBy: UserModel;
  country: string;
  type?: string;
  category?: string;
  forWhat?: string;
  furnishing?: boolean;
};

export type RealEstateInputModel = {
  _id?: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  area?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  images?: string[];
  createdBy: string;
  country: string;
  type?: string;
  category?: string;
  forWhat?: string;
  furnishing?: boolean;
};

export type RealEstateType = {
  name: string;
  categories: string[];
};
