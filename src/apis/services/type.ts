import { UserModel } from "../user/type";

export type ServiceCategoryModel = {
  _id?: string;
  title: string;
  titleAr?: string;
};

export type ServicesResponseModel = {
  _id: string;
  title: string;
  titleAr?: string;
  services: ServiceModel[];
};

export type ServiceModel = {
  _id?: string;
  title: string;
  description: string;
  owner: UserModel;
  imageUrl?: string;
  serviceImageList?: string[];
  averageRating?: number;
  totalRatings?: number;
  whatsAppNumber?: string;
  price?: number;
  bio?: string;
  country?: string;
  vedioUrl?: string;
};
