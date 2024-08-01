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

export type SignInValues = { email: string; password: string };
