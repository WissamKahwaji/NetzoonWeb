import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import {
  AddEditProductInputModel,
  IntentData,
  IntentRes,
  PaymentConfigRes,
  ProductModel,
  RateProductInputModel,
} from "./type";

const getAllProducts = async (country: string) => {
  const res = await publicInstance.get<ProductModel[]>(
    API_ROUTES.PRODUCT.GET_ALL(country)
  );
  return res.data;
};

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

const getSelectedProducts = async (userId: string) => {
  const res = await publicInstance.get<ProductModel[]>(
    API_ROUTES.USER.GET_SELECTED_PRODUCTS(userId)
  );
  return res.data;
};

const addProduct = async (payload: AddEditProductInputModel) => {
  const data = createFormData(payload);

  const res = await publicInstance.post<ProductModel>(
    API_ROUTES.PRODUCT.ADD,
    data
  );
  return res;
};

const editProduct = async (payload: AddEditProductInputModel) => {
  const data = createFormData(payload!);
  const res = await publicInstance.put(
    API_ROUTES.PRODUCT.EDIT(payload._id ?? ""),
    data
  );
  return res.data;
};

const deleteProduct = async (productId: string) => {
  const res = await publicInstance.delete(API_ROUTES.PRODUCT.DELETE(productId));
  return res.data;
};

const getPaymentConfig = async () => {
  const res = await publicInstance.get<PaymentConfigRes>(
    API_ROUTES.PRODUCT.PAYMENT_CONFIG
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

const rateProduct = async (paylaod: RateProductInputModel) => {
  const data = createFormData(paylaod);
  const res = await publicInstance.post(
    API_ROUTES.PRODUCT.RATE_PRODUCT(paylaod.id),
    data
  );
  return res.data;
};

export {
  getProductsByCategory,
  getProductById,
  getUserProducts,
  createIntent,
  getPaymentConfig,
  getSelectedProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  rateProduct,
};
