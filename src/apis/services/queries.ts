import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addService,
  deleteService,
  editService,
  getServiceById,
  getServiceCategoryById,
  getServicesByCategory,
  getServicesCategories,
  getUserServices,
  rateService,
} from ".";
import { useNavigate } from "react-router-dom";
import { RateServiceInputModel, ServiceInputModel } from "./type";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

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

const useAddServiceMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-service"],
    mutationFn: (payload: ServiceInputModel) => addService(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.title} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.title}`);
    },
  });
};

const useEditServiceMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-service"],
    mutationFn: (payload: ServiceInputModel) => editService(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.title} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-service-by-id"],
      });
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.title}`);
    },
  });
};

const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["delete-service"],
    mutationFn: (id: string) => {
      return deleteService(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-services-by-category"],
      });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to delete service`);
    },
  });
};

const useRateServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rate-service"],
    mutationFn: (data: RateServiceInputModel) => rateService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-service-by-id"],
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
  useGetServicesCategoriesQuery,
  useGetServicesByCategoryQuery,
  useGetServiceCategoryByIdQuery,
  useGetServiceByIdQuery,
  useGetUserServicesQuery,
  useAddServiceMutation,
  useEditServiceMutation,
  useDeleteServiceMutation,
  useRateServiceMutation,
};
