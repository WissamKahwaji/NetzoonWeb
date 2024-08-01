import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { DeliverServiceModel } from "./type";

const getCompanyDeliveryServices = async (id: string) => {
  const res = await publicInstance.get<DeliverServiceModel[]>(
    API_ROUTES.DELIVERY.GET_COMPANY_DELIVERY_SERVICES(id)
  );
  return res.data;
};

export { getCompanyDeliveryServices };
