import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { FeesModel } from "./type";

const getFeesInfo = async () => {
  const res = await publicInstance.get<FeesModel>(API_ROUTES.FEES.GET_ALL);
  return res.data;
};

export { getFeesInfo };
