import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import {
  AddCommentInputModel,
  CommentModel,
  NewsInputModel,
  NewsModel,
} from "./type";

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

const addNews = async (payload: NewsInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.NEWS.ADD, data);
  return res.data;
};

const editNews = async (payload: NewsInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.NEWS.EDIT(payload._id!),
    data
  );
  return res.data;
};

const deleteNews = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.NEWS.DELETE(id));
  return res.data;
};

const toggleLike = async (userId: string, newsId: string) => {
  const data = { userId };
  const res = await publicInstance.post<string>(
    API_ROUTES.NEWS.TOGGLE_LIKE(newsId),
    data
  );
  return res.data;
};

const getNewsComments = async (newsId: string) => {
  const res = await publicInstance.get<CommentModel[]>(
    API_ROUTES.NEWS.GET_COMMENTS(newsId)
  );
  return res.data;
};

const addCommentToNews = async (data: AddCommentInputModel) => {
  const res = await publicInstance.post<string>(
    API_ROUTES.NEWS.ADD_COMMENT(data.newsId),
    data
  );
  return res.data;
};

export {
  getNewsList,
  getNewsById,
  addNews,
  editNews,
  deleteNews,
  toggleLike,
  getNewsComments,
  addCommentToNews,
};
