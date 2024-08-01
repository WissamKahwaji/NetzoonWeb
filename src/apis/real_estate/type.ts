import { UserModel } from "../user/type";

export type RealEstateModel = {
  _id?: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  area?: string;
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
