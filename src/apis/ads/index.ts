import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { AdsModel, AdsReponseMode } from "./type";

const getAdsList = async (country: string) => {
  const res = await publicInstance.get<AdsReponseMode>(
    API_ROUTES.ADS.GET_ALL(country)
  );
  return res.data;
};

const getAdsById = async (id: string | undefined) => {
  const res = await publicInstance.get<AdsModel>(API_ROUTES.ADS.GET_BY_ID(id));
  return res.data;
};

const getUserAdsList = async (userId: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: AdsModel[];
  }>(API_ROUTES.ADS.GET_USER_ADS(userId));
  return res.data.results;
};

export { getAdsList, getAdsById, getUserAdsList };
