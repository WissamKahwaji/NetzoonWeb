import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDeal,
  deleteDeal,
  editDeal,
  getAllDealsItems,
  getDealById,
  getDealCategoryById,
  getDealsByCategory,
  getDealsCategories,
  getUserDealsList,
  savePurchDeal,
} from ".";
import { useNavigate } from "react-router-dom";
import { DealsItemInputModel, SavePurchDealInputModel } from "./type";
import { toast } from "react-toastify";

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

const useAddDealMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-deal"],
    mutationFn: (payload: DealsItemInputModel) => addDeal(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.name} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};

const useEditDealMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-deal"],
    mutationFn: (payload: DealsItemInputModel) => editDeal(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};

const useDeleteDealMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["delete-deal"],
    mutationFn: (id: string) => {
      return deleteDeal(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-deals-by-category"],
      });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to delete deal`);
    },
  });
};

const useSavePurchDealMutation = () => {
  // const navigate = useNavigate();
  return useMutation({
    mutationKey: ["save-purch-deal"],
    mutationFn: (payload: SavePurchDealInputModel) => savePurchDeal(payload),
    onSuccess() {
      toast.success(`successfully.`);
      // navigate(-1);
    },
    onError() {
      toast.error(`failed`);
    },
  });
};

export {
  useGetAllDealsItemsQuery,
  useGetDealsCategoriesQuery,
  useGetDealsByCategoryQuery,
  useGetDealCategoryByIdQuery,
  useGetDealByIdQuery,
  useGetUserDealsQuery,
  useAddDealMutation,
  useEditDealMutation,
  useDeleteDealMutation,
  useSavePurchDealMutation,
};
