import { useQuery } from "@tanstack/react-query";
import { getAdsById, getAdsList, getUserAdsList } from ".";

const useGetAdsListQuery = (country: string) =>
  useQuery({
    queryKey: ["get-ads-list"],
    queryFn: () => getAdsList(country),
  });

const useGetAdsByIdQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-ads-by-id"],
    queryFn: () => getAdsById(id),
    enabled: !!id,
  });

const useGetUserAdsQuery = (userId: string, enabled: boolean | undefined) =>
  useQuery({
    queryKey: ["get-user-ads-list", userId],
    queryFn: () => getUserAdsList(userId),
    enabled: enabled,
  });

export { useGetAdsListQuery, useGetAdsByIdQuery, useGetUserAdsQuery };
