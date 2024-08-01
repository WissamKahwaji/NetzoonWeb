import { useQuery } from "@tanstack/react-query";
import { getNewsById, getNewsList } from ".";

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

export { useGetNewsListQuery, useGetNewsByIdQuery };
