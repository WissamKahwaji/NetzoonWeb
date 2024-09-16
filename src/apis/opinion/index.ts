import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";

const addOpinion = async (payload: { text: string }) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.OPINION.ADD, data);
  return res.data;
};

export { addOpinion };
