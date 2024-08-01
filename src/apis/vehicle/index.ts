import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { VehicleModel } from "./type";

const getLatestCarsByCreator = async (country: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: VehicleModel[];
  }>(API_ROUTES.VEHICLE.GET_ALL_CAR(country));
  return res.data.results;
};

const getAllCars = async (country: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: VehicleModel[];
  }>(API_ROUTES.VEHICLE.GET_ALL_CAR(country));
  return res.data.results;
};

const getAllPlanes = async (country: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: VehicleModel[];
  }>(API_ROUTES.VEHICLE.GET_ALL_PLANES(country));
  return res.data.results;
};
const getVehicleById = async (id: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: VehicleModel;
  }>(API_ROUTES.VEHICLE.GET_BY_ID(id));
  return res.data.results;
};

const getCompaniesVehicles = async (id: string) => {
  const res = await publicInstance.get<VehicleModel[]>(
    API_ROUTES.VEHICLE.GET_COMPANY_VEHICLES(id)
  );
  return res.data;
};

export {
  getLatestCarsByCreator,
  getAllPlanes,
  getAllCars,
  getVehicleById,
  getCompaniesVehicles,
};
