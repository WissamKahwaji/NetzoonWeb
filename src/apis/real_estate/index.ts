import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { RealEstateModel } from "./type";

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

export { getRealEstateList, getRealEstateById, getCompanyRealEstates };
