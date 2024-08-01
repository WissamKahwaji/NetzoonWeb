import { useQuery } from "@tanstack/react-query";
import {
  getAllCars,
  getAllPlanes,
  getCompaniesVehicles,
  getLatestCarsByCreator,
  getVehicleById,
} from ".";

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

export {
  useGetLatestCarByCreatorQuery,
  useGetAllPlanesQuery,
  useGetAllCarsQuery,
  useGetVehicleByIdQuery,
  useGetCompaniesVehiclesQuery,
};
