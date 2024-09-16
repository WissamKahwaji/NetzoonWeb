import { UserModel } from "../user/type";

export type DeliverServiceModel = {
  _id: string;
  title: string;
  description: string;
  from: string;
  to: string;
  price: number;
  owner: UserModel;
};

export type DeliverServiceInputModel = {
  _id?: string;
  title: string;
  description: string;
  from: string;
  to: string;
  price: number;
  owner: string;
};
