import { AdsModel } from "../ads/type";
import { ProductModel } from "../product/type";
import { RealEstateModel } from "../real_estate/type";
import { VehicleModel } from "../vehicle/type";

export type UserModel = {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  userType?: string;
  firstMobile?: string;
  isFreeZoon?: boolean;
  isService?: boolean;
  isSelectable?: boolean;
  freezoneCity?: string;
  deliverable?: boolean;
  subcategory?: string;
  country?: string;
  address?: string;
  netzoonBalance?: number;
  businessLicense?: string;
  companyProductsNumber?: number;
  sellType?: string;
  toCountry?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  banerPhoto?: string;
  frontIdPhoto?: string;
  backIdPhoto?: string;
  bio?: string;
  description?: string;
  website?: string;
  slogn?: string;
  link?: string;
  deliveryPermitPhoto?: string;
  tradeLicensePhoto?: string;
  isThereWarehouse?: boolean;
  isThereFoodsDelivery?: boolean;
  deliveryType?: string;
  deliveryCarsNum?: number;
  deliveryMotorsNum?: number;
  vehicles?: string[];
  products?: string[];
  selectedProducts?: string[];
  stripeCustomerId?: string;
  cart?: {
    items: {
      productId: string;
      quantity: number;
    }[];
  };
  favorites?: {
    products: {
      productId: string;
    }[];
  };
  accounts?: string[];
  followings?: string[];
  followers?: string[];
  ratings?: {
    user: string;
    rating: number;
  }[];
  totalRatings?: number;
  averageRating?: number;
  uniqueProfileVisitors?: string[];
  profileViews?: number;
  unreadNotifications?: string[];
  subscriptionExpireDate?: Date;
  realEstateListingsRemaining?: number;
  advertisementsRemaining?: number;
  carsListingsRemaining?: number;
  planesListingsRemaining?: number;
  profitRatio?: number;
  city?: string;
  addressDetails?: string;
  contactName?: string;
  floorNum?: number;
  locationType?: "home" | "work";
  title?: string;
};

export type SignupResponse = {
  result: UserModel;
  message: string;
  token: string;
  refreshToken: string;
};

export type RequestBalanceInputModel = {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: TemplateParams;
};

export type TemplateParams = {
  user_balance: number;
  user_name: string;
  user_email: string;
  account_name: string;
  bank_name: string;
  iban: string;
  user_mobile: string;
};

export type SearchResponseModel = {
  users: UserModel[];
  products: ProductModel[];
  advertisments: AdsModel[];
  vehicles: VehicleModel[];
  realEstates: RealEstateModel[];
  query: string;
};

export type SignInValues = { email: string; password: string };

export type AddAccountInputModel = {
  email: string;
  username: string;
  password: string;
};

export type ResetPasswordParams = {
  password: string;
  token: string;
  confirmPassword: string;
};

export type ForgetPasswordParams = {
  email: string;
};

export type RateUserInputModel = {
  id: string;
  rating: number;
  userId: string;
};
