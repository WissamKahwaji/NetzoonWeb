import { UserModel } from "../user/type";

export type NewsModel = {
  _id?: string;
  title?: string;
  description?: string;
  imgUrl?: string;
  creator?: UserModel;
  country?: string;
  updatedAt?: string;
  likes?: string[];
  comments?: string[];
};
