import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { VehicleInputModel, VehicleModel } from "./type";

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

const addVehicle = async (payload: VehicleInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.VEHICLE.ADD, data);
  return res.data;
};
const editVehicle = async (payload: VehicleInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.VEHICLE.EDIT(payload._id!),
    data
  );
  return res.data;
};
const deleteVehicle = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.VEHICLE.DELETE(id));
  return res.data;
};

export {
  getLatestCarsByCreator,
  getAllPlanes,
  getAllCars,
  getVehicleById,
  getCompaniesVehicles,
  addVehicle,
  editVehicle,
  deleteVehicle,
};
