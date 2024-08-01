import { useQuery } from "@tanstack/react-query";
import {
  getAllDealsItems,
  getDealById,
  getDealCategoryById,
  getDealsByCategory,
  getDealsCategories,
  getUserDealsList,
} from ".";

const useGetAllDealsItemsQuery = (country: string) =>
  useQuery({
    queryKey: ["get-all-deals-items"],
    queryFn: () => getAllDealsItems(country),
  });

const useGetDealsCategoriesQuery = () =>
  useQuery({
    queryKey: ["get-deals-categories"],
    queryFn: () => getDealsCategories(),
  });

const useGetDealsByCategoryQuery = (
  category: string,
  country: string,
  enabled?: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-deals-by-category"],
    queryFn: () => getDealsByCategory(category, country),
    enabled: enabled,
  });

const useGetDealCategoryByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-deal-category-by-id"],
    queryFn: () => getDealCategoryById(id),
    enabled: !!id,
  });

const useGetDealByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-deal-by-id"],
    queryFn: () => getDealById(id),
    enabled: !!id,
  });

const useGetUserDealsQuery = (userId: string, enabled?: boolean | undefined) =>
  useQuery({
    queryKey: ["get-user-deals", userId],
    queryFn: () => getUserDealsList(userId),
    enabled: enabled,
  });

export {
  useGetAllDealsItemsQuery,
  useGetDealsCategoriesQuery,
  useGetDealsByCategoryQuery,
  useGetDealCategoryByIdQuery,
  useGetDealByIdQuery,
  useGetUserDealsQuery,
};
