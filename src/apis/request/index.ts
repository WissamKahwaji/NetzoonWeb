import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { RequestInputModel } from "./type";

const addRequest = async (payload: RequestInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.REQUEST.ADD, data);
  return res.data;
};

export { addRequest };
