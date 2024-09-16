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

export type NewsInputModel = {
  _id?: string;
  title?: string;
  description?: string;
  imgUrl?: string;
  creator?: string;
  country?: string;
  updatedAt?: string;
  likes?: string[];
  comments?: string[];
};

export type CommentModel = {
  user: UserModel;
  news: string;
  text: string;
};

export type AddCommentInputModel = {
  newsId: string;
  userId: string;
  text: string;
};
