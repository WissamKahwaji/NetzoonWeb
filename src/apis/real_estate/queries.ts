import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRealEstate,
  deleteRealEstate,
  editRealEstate,
  getCompanyRealEstates,
  getRealEstateById,
  getRealEstateList,
} from ".";
import { useNavigate } from "react-router-dom";
import { RealEstateInputModel } from "./type";
import { toast } from "react-toastify";

const useGetRealEstateListQuery = (country: string) =>
  useQuery({
    queryKey: ["get-realestate-list"],
    queryFn: () => getRealEstateList(country),
  });

const useGetRealEstateByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-real-estate-by-id"],
    queryFn: () => getRealEstateById(id),
    enabled: !!id,
  });

const useGetCompanyRealEstatesQuery = (
  id: string,
  enabled: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-company-real-estate", id],
    queryFn: () => getCompanyRealEstates(id),
    enabled: enabled,
  });

const useAddRealEstateMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-real-estate"],
    mutationFn: (payload: RealEstateInputModel) => addRealEstate(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.title} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.title}`);
    },
  });
};

const useEditRealEstateMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-real-estate"],
    mutationFn: (payload: RealEstateInputModel) => editRealEstate(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.title} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.title}`);
    },
  });
};
const useDeleteRealEstateMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-real-estate"],
    mutationFn: (id: string) => {
      return deleteRealEstate(id);
    },
    onSuccess() {
      toast.success(`delete realEstate successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-company-real-estate"] });

      navigate(-1);
    },
    onError() {
      toast.error(`failed to delete realEstate`);
    },
  });
};

export {
  useGetRealEstateListQuery,
  useGetRealEstateByIdQuery,
  useGetCompanyRealEstatesQuery,
  useAddRealEstateMutation,
  useEditRealEstateMutation,
  useDeleteRealEstateMutation,
};
