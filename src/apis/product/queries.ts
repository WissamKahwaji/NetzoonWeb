import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getPaymentConfig,
  getProductById,
  getProductsByCategory,
  getSelectedProducts,
  getUserProducts,
  rateProduct,
} from ".";
import { useNavigate } from "react-router-dom";
import { AddEditProductInputModel, RateProductInputModel } from "./type";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

const useGetAllProductsQuery = (country: string) =>
  useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getAllProducts(country),
  });

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

const useGetSelectedProductsQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-selected-products", userId],
    queryFn: () => getSelectedProducts(userId),
  });

const useAddProductMutation = () => {
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: (payload: AddEditProductInputModel) => addProduct(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.name} successfully.`);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};

const useEditProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-product"],
    mutationFn: (payload: AddEditProductInputModel) => editProduct(payload),
    onSuccess() {
      toast.success(`edit successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-products-by-id"] });
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};

const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (productId: string) => {
      return deleteProduct(productId);
    },
    onSuccess() {
      toast.success(`delete product successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-products-by-category"] });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to delete product`);
    },
  });
};

const useGetPaymentConfigQuery = () =>
  useQuery({
    queryKey: ["payment-config"],
    queryFn: () => getPaymentConfig(),
    staleTime: 0,
  });

const useRateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rate-product"],
    mutationFn: (data: RateProductInputModel) => rateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-products-by-id"],
      });
      toast.success("Success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

export {
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetUserProductsQuery,
  useGetPaymentConfigQuery,
  useGetSelectedProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useRateProductMutation,
};
