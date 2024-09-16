import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCommentToNews,
  addNews,
  deleteNews,
  editNews,
  getNewsById,
  getNewsComments,
  getNewsList,
  toggleLike,
} from ".";
import { useNavigate } from "react-router-dom";
import { AddCommentInputModel, NewsInputModel } from "./type";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

const useGetNewsListQuery = (country: string) =>
  useQuery({
    queryKey: ["get-news-list"],
    queryFn: () => getNewsList(country),
  });

const useGetNewsByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-news-by-id"],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });

const useAddNewsMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-news"],
    mutationFn: (payload: NewsInputModel) => addNews(payload),
    onSuccess() {
      toast.success(`add news successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-news-list"] });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to add News`);
    },
  });
};

const useEditNewsMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-news"],
    mutationFn: (payload: NewsInputModel) => editNews(payload),
    onSuccess() {
      toast.success(`edit News successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to edit News`);
    },
  });
};

const useDeleteNewsMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-news"],
    mutationFn: (id: string) => {
      return deleteNews(id);
    },
    onSuccess() {
      toast.success(`delete news successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-news-list"] });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to delete news`);
    },
  });
};

const useToggleLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggle-like"],
    mutationFn: (data: { userId: string; newsId: string }) =>
      toggleLike(data.userId, data.newsId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-news-list"],
      });
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useGetNewsCommentsQuery = (
  newsId: string,
  enabled: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-news-comments"],
    queryFn: () => getNewsComments(newsId),
    enabled: enabled,
  });

const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-comment"],
    mutationFn: (data: AddCommentInputModel) => addCommentToNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-news-comments"],
      });
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

export {
  useGetNewsListQuery,
  useGetNewsByIdQuery,
  useAddNewsMutation,
  useEditNewsMutation,
  useDeleteNewsMutation,
  useToggleLikeMutation,
  useGetNewsCommentsQuery,
  useAddCommentMutation,
};
