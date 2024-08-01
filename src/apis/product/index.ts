import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { IntentData, IntentRes, ProductModel } from "./type";

const getProductsByCategory = async (categoryId: string, country: string) => {
  const res = await publicInstance.get<ProductModel[]>(
    API_ROUTES.PRODUCT.GET_BY_CATEGORY(categoryId, country)
  );
  return res.data;
};

const getProductById = async (productId: string) => {
  const res = await publicInstance.get<ProductModel>(
    API_ROUTES.PRODUCT.GET_BY_ID(productId)
  );
  return res.data;
};

const getUserProducts = async (userId: string) => {
  const res = await publicInstance.get<ProductModel[]>(
    API_ROUTES.PRODUCT.GET_USER_PRODUCTS(userId)
  );
  return res.data;
};

const createIntent = async (data: IntentData) => {
  const res = await publicInstance.post<IntentRes>(
    API_ROUTES.PRODUCT.CREATE_INTENT,
    data
  );
  return res.data;
};

export { getProductsByCategory, getProductById, getUserProducts, createIntent };
