import { useQuery } from "@tanstack/react-query";
import {
  getServiceById,
  getServiceCategoryById,
  getServicesByCategory,
  getServicesCategories,
  getUserServices,
} from ".";

const useGetServicesCategoriesQuery = () =>
  useQuery({
    queryKey: ["get-services-categories"],
    queryFn: () => getServicesCategories(),
  });

const useGetServicesByCategoryQuery = (category: string, country: string) =>
  useQuery({
    queryKey: ["get-services-by-category"],
    queryFn: () => getServicesByCategory(category, country),
  });

const useGetServiceCategoryByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-service-category-by-id"],
    queryFn: () => getServiceCategoryById(id),
    enabled: !!id,
  });

const useGetServiceByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-service-by-id"],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });

const useGetUserServicesQuery = (id: string, enabled: boolean | undefined) =>
  useQuery({
    queryKey: ["get-user-services", id],
    queryFn: () => getUserServices(id),
    enabled: enabled,
  });

export {
  useGetServicesCategoriesQuery,
  useGetServicesByCategoryQuery,
  useGetServiceCategoryByIdQuery,
  useGetServiceByIdQuery,
  useGetUserServicesQuery,
};
