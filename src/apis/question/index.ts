import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { QuestionInputModel } from "./type";

const addQuestion = async (payload: QuestionInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.QUESTION.ADD, data);
  return res.data;
};

export { addQuestion };
