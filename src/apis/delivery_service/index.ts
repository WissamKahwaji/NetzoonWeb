import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { DeliverServiceInputModel, DeliverServiceModel } from "./type";

const getCompanyDeliveryServices = async (id: string) => {
  const res = await publicInstance.get<DeliverServiceModel[]>(
    API_ROUTES.DELIVERY.GET_COMPANY_DELIVERY_SERVICES(id)
  );
  return res.data;
};

const addDeliveryService = async (payload: DeliverServiceInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.DELIVERY.ADD, data);
  return res.data;
};

const editDeliveryService = async (payload: DeliverServiceInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.DELIVERY.EDIT(payload._id!),
    data
  );
  return res.data;
};

export { getCompanyDeliveryServices, addDeliveryService, editDeliveryService };
