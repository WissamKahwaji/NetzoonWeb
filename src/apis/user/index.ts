import axios from "axios";
import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import { FavoriteItemsModel, ProductModel } from "../product/type";
import publicInstance from "../publicInstance";
import {
  AddAccountInputModel,
  ForgetPasswordParams,
  RateUserInputModel,
  RequestBalanceInputModel,
  ResetPasswordParams,
  SearchResponseModel,
  SignInValues,
  SignupResponse,
  UserModel,
} from "./type";

const signIn = async (data: SignInValues) => {
  const res = await publicInstance.post(API_ROUTES.USER.SIGNIN, data);
  return res.data;
};

const signup = async (payload: UserModel) => {
  const data = createFormData(payload!);

  const res = await publicInstance.post<SignupResponse>(
    API_ROUTES.USER.SIGNUP,
    data
  );
  return res.data;
};

const getUserByIdInfo = async (userId: string) => {
  const res = await publicInstance.get<UserModel>(
    API_ROUTES.USER.GET_BY_ID(userId)
  );
  return res.data;
};

const getUsersByTypeInfo = async (userType: string, country: string) => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_BY_TYPE(userType, country)
  );
  return res.data;
};

const getUserSelectedProductsInfo = async (userId: string) => {
  const res = await publicInstance.get<ProductModel[]>(
    API_ROUTES.USER.GET_SELECTED_PRODUCTS(userId)
  );
  return res.data;
};

const getUserFavoritesListInfo = async (userId: string) => {
  const res = await publicInstance.get<FavoriteItemsModel[]>(
    API_ROUTES.USER.GET_FAVORITES_LIST(userId)
  );
  return res.data;
};

const addProductToFavorites = async (userId: string, productId: string) => {
  const data = { userId, productId };
  const res = await publicInstance.post<string>(
    API_ROUTES.USER.ADD_TO_FAVORITES,
    data
  );
  return res.data;
};

const removeProductFromFavorites = async (
  userId: string,
  productId: string
) => {
  const data = { userId, productId };
  const res = await publicInstance.post<string>(
    API_ROUTES.USER.REMOVE_FROM_FAVORITES,
    data
  );
  return res.data;
};

const addToSelectedProducts = async (userId: string, productIds: string[]) => {
  const data = { productIds };
  const res = await publicInstance.post<string>(
    API_ROUTES.USER.ADD_TO_SELECTED_PRODUCTS(userId),
    data
  );
  return res.data;
};

const editUser = async (payload: UserModel) => {
  const data = createFormData(payload!);
  const res = await publicInstance.put<UserModel>(
    API_ROUTES.USER.EDIT(payload._id ?? ""),
    data
  );
  return res.data;
};

const getUserFollowingsListInfo = async (userId: string) => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_FOLLOWINGS_LIST(userId)
  );
  return res.data;
};

const toggleFollow = async (currentUserId: string, otherUserId: string) => {
  const data = { currentUserId };
  const res = await publicInstance.put<string>(
    API_ROUTES.USER.TOGGLE_FOLLOW(otherUserId),
    data
  );
  return res.data;
};

const getUserSearch = async (query: string) => {
  const res = await publicInstance.get<SearchResponseModel>(
    API_ROUTES.USER.USER_SEARCH(query)
  );
  return res.data;
};

const getUserAccounts = async (email: string) => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_USER_ACCOUNTS(email)
  );
  return res.data;
};

const addAccount = async (data: AddAccountInputModel) => {
  const res = await publicInstance.post<UserModel>(
    API_ROUTES.USER.ADD_ACCOUNT,
    data
  );
  return res.data;
};

const changeAccount = async (data: SignInValues) => {
  const res = await publicInstance.post(API_ROUTES.USER.CHANGE_ACCOUNT, data);
  return res.data;
};

const forgetPassword = async (data: ForgetPasswordParams) => {
  const res = await publicInstance.post(API_ROUTES.USER.FORGET_PASSWORD, data);
  return res.data;
};

const resetPassword = async (data: ResetPasswordParams) => {
  const res = await publicInstance.put(
    API_ROUTES.USER.RESET_PASSWORD(data.token),
    data
  );
  return res.data;
};

const sendRefundeRequestEmail = async (payload: RequestBalanceInputModel) => {
  const baseURL = "https://api.emailjs.com/api/v1.0/email/send";
  const instance = axios.create({ baseURL });

  const res = await instance.post("", payload);
  return res.data;
};

const addVisitor = async (viewerUserId: string, userId: string) => {
  const data = { viewerUserId };
  const res = await publicInstance.post(
    API_ROUTES.USER.ADD_VISITOR(userId),
    data
  );
  return res.data;
};

const rateUser = async (paylaod: RateUserInputModel) => {
  const data = createFormData(paylaod);
  const res = await publicInstance.post(
    API_ROUTES.USER.RATE_USER(paylaod.id),
    data
  );
  return res.data;
};

export {
  signIn,
  getUserByIdInfo,
  signup,
  getUsersByTypeInfo,
  getUserSelectedProductsInfo,
  editUser,
  getUserFavoritesListInfo,
  removeProductFromFavorites,
  addProductToFavorites,
  sendRefundeRequestEmail,
  addToSelectedProducts,
  toggleFollow,
  getUserFollowingsListInfo,
  getUserSearch,
  getUserAccounts,
  addAccount,
  changeAccount,
  forgetPassword,
  resetPassword,
  addVisitor,
  rateUser,
};
