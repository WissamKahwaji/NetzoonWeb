import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import { ProductModel } from "../product/type";
import publicInstance from "../publicInstance";
import { SignInValues, SignupResponse, UserModel } from "./type";

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

export {
  signIn,
  getUserByIdInfo,
  signup,
  getUsersByTypeInfo,
  getUserSelectedProductsInfo,
};
