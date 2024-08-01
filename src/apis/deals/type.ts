export type DealsCategoryModel = {
  _id?: string;
  name: string;
  nameAr?: string;
};

export type DealsItemModel = {
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
