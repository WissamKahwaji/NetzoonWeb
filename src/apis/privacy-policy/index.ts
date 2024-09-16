import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { PrivacyModel } from "./type";

const getPrivacyInfo = async () => {
  const res = await publicInstance.get<{
    message: string;
    results: PrivacyModel[];
  }>(API_ROUTES.PRIVACY.GET);
  return res.data.results;
};

export { getPrivacyInfo };
