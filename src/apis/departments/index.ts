import API_ROUTES from "../../constants/apiRoutes";

import publicInstance from "../publicInstance";
import { UserModel } from "../user/type";
import {
  DepartmentCategoryModel,
  DepartmentModel,
  FactoryCategoryModel,
} from "./type";

const getAllDepartmentsInfo = async () => {
  const res = await publicInstance.get<DepartmentModel[]>(
    API_ROUTES.DEPARTMENT.GET_ALL
  );
  return res.data;
};

const getAllCategoriesByDepartmentInfo = async (departmentId: string) => {
  const res = await publicInstance.get<DepartmentCategoryModel[]>(
    API_ROUTES.DEPARTMENT.GET_ALL_CATEGORIES_IN_DEPARTMENT(departmentId)
  );
  return res.data;
};

const getCategoryByIdInfo = async (categoryId: string) => {
  const res = await publicInstance.get<DepartmentCategoryModel>(
    API_ROUTES.DEPARTMENT.GET_CATEGORY_BY_ID(categoryId)
  );
  return res.data;
};

const getFactoriesCategoriesInfo = async () => {
  const res = await publicInstance.get<FactoryCategoryModel[]>(
    API_ROUTES.CATEGORIES.GET_FACTORIES_CATEGORIES
  );
  return res.data;
};

const getFactoryUsersInfo = async (id: string) => {
  const res = await publicInstance.get<{ factory: UserModel[]; title: string }>(
    API_ROUTES.CATEGORIES.GET_FACTORY_USERS(id)
  );
  return res.data;
};

export {
  getAllDepartmentsInfo,
  getAllCategoriesByDepartmentInfo,
  getCategoryByIdInfo,
  getFactoriesCategoriesInfo,
  getFactoryUsersInfo,
};
