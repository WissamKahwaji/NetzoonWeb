import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addVehicle,
  deleteVehicle,
  editVehicle,
  getAllCars,
  getAllPlanes,
  getCompaniesVehicles,
  getLatestCarsByCreator,
  getVehicleById,
} from ".";
import { useNavigate } from "react-router-dom";
import { VehicleInputModel } from "./type";
import { toast } from "react-toastify";

const useGetLatestCarByCreatorQuery = (
  country: string,
  enabled?: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-latest-car-by-creator"],
    queryFn: () => getLatestCarsByCreator(country),
    enabled: enabled,
  });

const useGetAllCarsQuery = (country: string, enabled?: boolean | undefined) =>
  useQuery({
    queryKey: ["get-all-cars"],
    queryFn: () => getAllCars(country),
    enabled: enabled,
  });

const useGetAllPlanesQuery = (country: string, enabled?: boolean | undefined) =>
  useQuery({
    queryKey: ["get-all-planes"],
    queryFn: () => getAllPlanes(country),
    enabled: enabled,
  });

const useGetVehicleByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-vehicle-by-id"],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
  });

const useGetCompaniesVehiclesQuery = (
  id: string,
  enabled: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-companies-vehicles"],
    queryFn: () => getCompaniesVehicles(id),
    enabled: enabled,
  });

const useAddVehicleMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-vehicle"],
    mutationFn: (payload: VehicleInputModel) => addVehicle(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.name} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};

const useEditVehicleMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-vehicle"],
    mutationFn: (payload: VehicleInputModel) => editVehicle(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};
const useDeleteVehicleMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-vehicle"],
    mutationFn: (id: string) => {
      return deleteVehicle(id);
    },
    onSuccess() {
      toast.success(`delete vehicle successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-all-cars"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-plans"] });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to delete vehicle`);
    },
  });
};

export {
  useGetLatestCarByCreatorQuery,
  useGetAllPlanesQuery,
  useGetAllCarsQuery,
  useGetVehicleByIdQuery,
  useGetCompaniesVehiclesQuery,
  useAddVehicleMutation,
  useEditVehicleMutation,
  useDeleteVehicleMutation,
};
