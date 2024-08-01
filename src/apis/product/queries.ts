import { useQuery } from "@tanstack/react-query";
import { getProductById, getProductsByCategory, getUserProducts } from ".";

const useGetProductsByCategoryQuery = (categoryId: string, country: string) =>
  useQuery({
    queryKey: ["get-products-by-category"],
    queryFn: () => getProductsByCategory(categoryId, country),
  });
const useGetProductByIdQuery = (productId: string) =>
  useQuery({
    queryKey: ["get-products-by-id"],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
const useGetUserProductsQuery = (
  userId: string,
  enabled: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-user-products", userId],
    queryFn: () => getUserProducts(userId),
    enabled: enabled,
  });

export {
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetUserProductsQuery,
};
