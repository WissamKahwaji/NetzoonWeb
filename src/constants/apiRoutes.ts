const SLIDER = {
  GET: "/dynamic-sliders/",
};

const DEPARTMENT = {
  GET_ALL: "/departments/all-departments",
  GET_ALL_CATEGORIES_IN_DEPARTMENT: (departmentId: string) =>
    `/departments/${departmentId}/all-categories`,
  GET_CATEGORY_BY_ID: (categoryId: string) =>
    `/departments/category/${categoryId}`,
};

const SERVICES = {
  GET_SERVICES_CATEGORIES: "/categories/services-categories",
  GET_SERVICES_BY_CATEGORY: (category: string, country: string) =>
    `/categories/services-by-category?category=${category}&country=${country}`,
  GET_CATEGORY_BY_ID: (id: string) =>
    `/categories/services-categories/byid/${id}`,

  GET_BY_ID: (id: string) => `/categories/local-company/get-service/${id}`,
  GET_USER_SERVICES: (id: string) =>
    `/categories/local-company/get-services/${id}`,
};

const ADS = {
  GET_ALL: (country: string) => `/advertisements?country=${country}`,
  GET_BY_ID: (id: string | undefined) => `/advertisements/${id}`,
  DELETE: (id: string) => `/advertisements/${id}`,
  ADD: `/advertisements/createAds`,
  EDIT: (id: string) => `/advertisements/${id}`,
  GET_USER_ADS: (userId: string) => `/advertisements/getUserAds/${userId}`,
};

const NEWS = {
  GET_ALL: (country: string) => `/news?country=${country}`,
  DELETE: (id: string) => `/news/${id}`,
  GET_BY_ID: (id: string) => `/news/${id}`,
  EDIT: (id: string) => `/news/${id}`,
  ADD: `/news/createNews`,
};

const VEHICLE = {
  GET_ALL_CAR: (country: string) => `/categories/cars?country=${country}`,
  GET_LATEST_CARS_BY_CREATOR: (country: string) =>
    `/categories/latest-cars-by-creator?country=${country}`,
  GET_ALL_PLANES: (country: string) => `/categories/planes?country=${country}`,
  GET_ALL_SHIPS: (country: string) => `/categories/ships?country=${country}`,
  GET_BY_ID: (id: string) => `/categories/vehicle/${id}`,
  DELETE: (id: string) => `/categories/vehicle/${id}`,
  EDIT: (id: string) => `/categories/vehicle/edit-vehicle/${id}`,
  ADD: `/categories/vehicle/create-vehicle`,
  GET_COMPANY_VEHICLES: (id: string) => `/categories/company-vehicles/${id}`,
};

const DEALS = {
  GET_DEALS_CATEGORIES: "/deals",
  ADD_CATEGORY: "/deals/add-category",
  GET_ALL_DEALS: (country: string) => `/deals/alldealsItems?country=${country}`,
  DELETE_CATEGORY: (id: string) => `/deals/delete-category/${id}`,
  EDIT_CATEGORY: (id: string) => `/deals/edit-category/${id}`,
  GET_CATEGORY_BY_ID: (id: string) => `/deals/get-category/${id}`,

  GET_DEALS_BY_CATEGORY: (category: string, country: string) =>
    `/deals/get-deals-ByCat?category=${category}&country=${country}`,
  DELETE_DEAL: (id: string) => `/deals/${id}`,
  ADD_DEAL: `/deals/addDeal`,
  EDIT_DEAL: (id: string) => `/deals/${id}`,
  GET_DEAL_BY_ID: (id: string) => `/deals/${id}`,
  GET_USER_DEALS: (userId: string) => `/deals/userDeals/${userId}`,
};

const REAL_ESTATE = {
  GET_ALL: (country: string) => `/real-estate?country=${country}`,
  GET_BY_ID: (id: string) => `/real-estate/getById/${id}`,
  GET_COMPANY_REAL_ESTATES: (id: string) =>
    `/real-estate/get-companies-realestate/${id}`,
};

const USER = {
  SIGNIN: "/user/signin",
  SIGNUP: "/user/register",
  GET_BY_ID: (userId: string) => `/user/getUser/${userId}`,
  GET_BY_TYPE: (userType: string, country: string) =>
    `/user/getUserByType?userType=${userType}&country=${country}`,
  GET_SELECTED_PRODUCTS: (userId: string) =>
    `/user/getSelectedProducts/${userId}`,
};

const ARAMEX = {
  FETCH_CITIES: (country: string) =>
    `/aramex/fetchCities?countryCode=${country}`,
  CALCULATE_RATE: `/aramex/calculateRate`,
};

const CATEGORIES = {
  GET_FACTORIES_CATEGORIES: "/categories/factories",
  GET_FACTORY_USERS: (id: string) => `/categories/get-all-factories/${id}`,
};

const PRODUCT = {
  GET_BY_CATEGORY: (categoryId: string, country: string) =>
    `/departments/${categoryId}/all-products?country=${country}`,

  GET_BY_ID: (productId: string) => `/departments/getproduct/${productId}`,
  GET_USER_PRODUCTS: (userId: string) =>
    `/departments/getUserProducts/${userId}`,
  CREATE_INTENT: "/products/create-payment",
};

const DELIVERY = {
  GET_COMPANY_DELIVERY_SERVICES: (id: string) => `/delivery/${id}`,
};

const FEES = {
  GET_ALL: "/fees",
};

const API_ROUTES = {
  SLIDER,
  DEPARTMENT,
  SERVICES,
  ADS,
  NEWS,
  VEHICLE,
  DEALS,
  REAL_ESTATE,
  USER,
  ARAMEX,
  CATEGORIES,
  PRODUCT,
  DELIVERY,
  FEES,
};

export default API_ROUTES;
