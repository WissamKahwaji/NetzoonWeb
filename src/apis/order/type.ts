import { ProductModel } from "../product/type";
import { UserModel } from "../user/type";

export type SaveOrderModel = {
  _id?: string;
  userId: string;
  clientId: string;
  products: ProductOrderModel[];
  grandTotal: number;
  orderStatus: string;
  pickupId?: string;
  orderEvent?: string;
  shippingAddress?: string;
  mobile?: string;
  subTotal?: number;
  serviceFee?: number;
  percentageFromSeller?: number;
  createdAt?: string;
};

export type OrderModel = {
  _id?: string;
  userId: UserModel;
  clientId: UserModel;
  products: [
    {
      product: ProductModel;
      amount: number;
      qty: number;
    }
  ];
  grandTotal: number;
  orderStatus: string;
  pickupId?: string;
  orderEvent?: string;
  shippingAddress?: string;
  mobile?: string;
  subTotal?: number;
  serviceFee?: number;
  percentageFromSeller?: number;
  createdAt?: string;
};

export type ProductOrderModel = {
  product: string;
  amount: number;
  qty: number;
};
