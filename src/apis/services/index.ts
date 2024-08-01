import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import {
  ServiceCategoryModel,
  ServiceModel,
  ServicesResponseModel,
} from "./type";

const getServicesCategories = async () => {
  const res = await publicInstance.get<ServiceCategoryModel[]>(
    API_ROUTES.SERVICES.GET_SERVICES_CATEGORIES
  );
  return res.data;
};

const getServicesByCategory = async (category: string, country: string) => {
  const res = await publicInstance.get<ServicesResponseModel>(
    API_ROUTES.SERVICES.GET_SERVICES_BY_CATEGORY(category, country)
  );
  return res.data;
};

const getServiceCategoryById = async (id: string) => {
  const res = await publicInstance.get<ServiceCategoryModel>(
    API_ROUTES.SERVICES.GET_CATEGORY_BY_ID(id)
  );
  return res.data;
};

const getServiceById = async (id: string) => {
  const res = await publicInstance.get<ServiceModel>(
    API_ROUTES.SERVICES.GET_BY_ID(id)
  );
  return res.data;
};

const getUserServices = async (id: string) => {
  const res = await publicInstance.get<ServiceModel[]>(
    API_ROUTES.SERVICES.GET_USER_SERVICES(id)
  );
  return res.data;
};

export {
  getServiceCategoryById,
  getServicesByCategory,
  getServicesCategories,
  getServiceById,
  getUserServices,
};
