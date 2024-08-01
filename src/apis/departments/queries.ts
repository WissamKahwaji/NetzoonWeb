import { useQuery } from "@tanstack/react-query";
import {
  getAllCategoriesByDepartmentInfo,
  getAllDepartmentsInfo,
  getCategoryByIdInfo,
  getFactoriesCategoriesInfo,
  getFactoryUsersInfo,
} from ".";

const useGetAllDepartmentsQuery = () =>
  useQuery({
    queryKey: ["get-all-departments"],
    queryFn: () => getAllDepartmentsInfo(),
  });

const useGetAllCategoriesByDepartmentQuery = (departmentId: string) =>
  useQuery({
    queryKey: ["get-all-categories-by-department", departmentId],
    queryFn: () => getAllCategoriesByDepartmentInfo(departmentId),
    enabled: !!departmentId,
  });

const useGetCategoryByIdQuery = (categoryId: string) =>
  useQuery({
    queryKey: ["get-category-by-id"],
    queryFn: () => getCategoryByIdInfo(categoryId),
    enabled: !!categoryId,
  });

const useGetFactoriesCategoriesQuery = (enabled?: boolean | undefined) =>
  useQuery({
    queryKey: ["get-factories-categories"],
    queryFn: () => getFactoriesCategoriesInfo(),
    enabled: enabled,
  });

const useGetFactoryUsersQuery = (id: string) =>
  useQuery({
    queryKey: ["get-factory-users"],
    queryFn: () => getFactoryUsersInfo(id),
    enabled: !!id,
  });

export {
  useGetAllDepartmentsQuery,
  useGetAllCategoriesByDepartmentQuery,
  useGetCategoryByIdQuery,
  useGetFactoriesCategoriesQuery,
  useGetFactoryUsersQuery,
};
