import { UserModel } from "../user/type";

export type DealsCategoryModel = {
  _id?: string;
  name: string;
  nameAr?: string;
};

export type DealsItemModel = {
  _id?: string;
  owner?: UserModel;
  name?: string;
  imgUrl?: string;
  companyName?: string;
  prevPrice?: number;
  currentPrice?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
  country: string;
  description: string;
};

export type DealsItemInputModel = {
  _id?: string;
  owner?: string;
  name?: string;
  imgUrl?: string;
  companyName?: string;
  prevPrice?: number;
  currentPrice?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
  country: string;
  description: string;
};

export type SavePurchDealInputModel = {
  userId: string;
  buyerId: string;
  deal: string;
  grandTotal: number;
  shippingAddress?: string;
  mobile?: string;
};
