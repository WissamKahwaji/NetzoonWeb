import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import {
  CalculateDeliveryRateInput,
  CalculateDeliveryRateResponseModel,
  CreatePickupResponseModel,
  CreatePickupWithShipmentInputModel,
  FetchCitiesResponseModel,
} from "./type";

const getAramexCities = async (country: string) => {
  const res = await publicInstance.post<FetchCitiesResponseModel>(
    API_ROUTES.ARAMEX.FETCH_CITIES(country)
  );
  return res.data;
};

const calculateDeliveryRate = async (payload: CalculateDeliveryRateInput) => {
  const data = createFormData(payload!);

  const res = await publicInstance.post<CalculateDeliveryRateResponseModel>(
    API_ROUTES.ARAMEX.CALCULATE_RATE,
    data
  );
  return res.data;
};

const createPickupWithShipments = async (
  payload: CreatePickupWithShipmentInputModel
) => {
  // const data = createFormData(payload!);

  const res = await publicInstance.post<CreatePickupResponseModel>(
    API_ROUTES.ARAMEX.CREATE_PICKUP_WITH_SHIPMENT,
    payload
  );
  return res.data;
};

export { getAramexCities, calculateDeliveryRate, createPickupWithShipments };
