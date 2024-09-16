import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { AdsInputModel, AdsModel, AdsReponseMode } from "./type";

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

const addAds = async (payload: AdsInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.ADS.ADD, data);
  return res.data;
};

const editAds = async (payload: AdsInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(API_ROUTES.ADS.EDIT(payload._id!), data);
  return res.data;
};

const deleteAds = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.ADS.DELETE(id));
  return res.data;
};

export { getAdsList, getAdsById, getUserAdsList, addAds, editAds, deleteAds };
