import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import {
  RateServiceInputModel,
  ServiceCategoryModel,
  ServiceInputModel,
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

const addService = async (payload: ServiceInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(
    API_ROUTES.SERVICES.ADD_SERVICE(
      payload.category ?? "",
      payload.country ?? "AE"
    ),
    data
  );
  return res.data;
};

const editService = async (payload: ServiceInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.SERVICES.EDIT_SERVICE(payload._id!),
    data
  );
  return res.data;
};

const deleteService = async (id: string) => {
  const res = await publicInstance.delete(
    API_ROUTES.SERVICES.DELETE_SERVICE(id)
  );
  return res.data;
};

const rateService = async (paylaod: RateServiceInputModel) => {
  const data = createFormData(paylaod);
  const res = await publicInstance.post(
    API_ROUTES.SERVICES.RATE_SERVICE(paylaod.id),
    data
  );
  return res.data;
};

export {
  getServiceCategoryById,
  getServicesByCategory,
  getServicesCategories,
  getServiceById,
  getUserServices,
  addService,
  editService,
  deleteService,
  rateService,
};
