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

export type ServiceInputModel = {
  _id?: string;
  title?: string | undefined;
  description?: string | undefined;
  imageUrl?: string | undefined;
  price?: number | undefined;
  bio?: string | undefined;
  owner?: string | undefined;
  whatsAppNumber?: string | undefined;
  country?: string | undefined;
  category?: string | undefined;
  serviceImageList?: File[];
};

export type RateServiceInputModel = {
  id: string;
  rating: number;
  userId: string;
};
