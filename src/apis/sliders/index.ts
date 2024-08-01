import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { SliderModel } from "./type";

const getSliderInfo = async () => {
  const res = await publicInstance.get<SliderModel>(API_ROUTES.SLIDER.GET);
  return res.data;
};

export { getSliderInfo };
