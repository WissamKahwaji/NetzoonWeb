import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { ComplaintInputModel } from "./type";

const addComplaint = async (payload: ComplaintInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.COMPLAINT.ADD, data);
  return res.data;
};

export { addComplaint };
