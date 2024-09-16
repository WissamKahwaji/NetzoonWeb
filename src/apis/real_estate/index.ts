import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { RealEstateInputModel, RealEstateModel } from "./type";

const getRealEstateList = async (country: string) => {
  const res = await publicInstance.get<RealEstateModel[]>(
    API_ROUTES.REAL_ESTATE.GET_ALL(country)
  );
  return res.data;
};

const getRealEstateById = async (id: string) => {
  const res = await publicInstance.get<RealEstateModel>(
    API_ROUTES.REAL_ESTATE.GET_BY_ID(id)
  );
  return res.data;
};

const getCompanyRealEstates = async (id: string) => {
  const res = await publicInstance.get<RealEstateModel[]>(
    API_ROUTES.REAL_ESTATE.GET_COMPANY_REAL_ESTATES(id)
  );
  return res.data;
};

const addRealEstate = async (payload: RealEstateInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.REAL_ESTATE.ADD, data);
  return res.data;
};

const editRealEstate = async (payload: RealEstateInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.REAL_ESTATE.EDIT(payload._id!),
    data
  );
  return res.data;
};

const deleteRealEstate = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.REAL_ESTATE.DELETE(id));
  return res.data;
};

export {
  getRealEstateList,
  getRealEstateById,
  getCompanyRealEstates,
  addRealEstate,
  editRealEstate,
  deleteRealEstate,
};
