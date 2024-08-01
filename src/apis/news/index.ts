import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { NewsModel } from "./type";

const getNewsList = async (country: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: NewsModel[];
  }>(API_ROUTES.NEWS.GET_ALL(country));
  return res.data.results;
};

const getNewsById = async (id: string) => {
  const res = await publicInstance.get<NewsModel>(
    API_ROUTES.NEWS.GET_BY_ID(id)
  );
  return res.data;
};

export { getNewsList, getNewsById };
