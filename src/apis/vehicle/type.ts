import { UserModel } from "../user/type";

export type VehicleModel = {
  _id?: string;
  name?: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  kilometers?: number;
  year?: Date;
  location?: string;
  type?: string;
  category?: string;
  creator?: UserModel;
  carImages?: string[];
  vedioUrl?: string;
  contactNumber?: string;
  exteriorColor?: string;
  interiorColor?: string;
  doors?: number;
  bodyCondition?: string;
  bodyType?: string;
  mechanicalCondition?: string;
  seatingCapacity?: number;
  numofCylinders?: number;
  transmissionType?: string;
  horsepower?: string;
  fuelType?: string;
  extras?: string;
  technicalFeatures?: string;
  steeringSide?: string;
  guarantee?: boolean;
  forWhat?: string;
  regionalSpecs?: string;
  aircraftType?: string;
  manufacturer?: string;
  vehicleModel?: string;
  maxSpeed?: string;
  maxDistance?: string;
  shipType?: string;
  shipLength?: string;
  country: string;
};

export enum VehicleType {
  CARS = "cars",
  PLANES = "planes",
  SHIPS = "sea_companies",
}

export type CarType = {
  name: string;
  categories: string[];
};
