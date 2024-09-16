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
  ADD_SERVICE: (category: string, country: string) =>
    `/categories/local-company/add-service?category=${category}&country=${country}`,
  EDIT_SERVICE: (id: string) => `/categories/local-company/edit-service/${id}`,
  DELETE_SERVICE: (id: string) => `/categories/local-company/service/${id}`,
  RATE_SERVICE: (id: string) => `/categories/local-company/services/${id}/rate`,
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
  TOGGLE_LIKE: (newsId: string) => `/news/${newsId}/toggleonlike`,
  GET_COMMENTS: (newsId: string) => `/news/${newsId}/comments`,
  ADD_COMMENT: (newsId: string) => `/news/${newsId}/comment`,
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
  SAVE_PURCH: (userId: string) => `/deals/purch/save/${userId}`,
};

const REAL_ESTATE = {
  GET_ALL: (country: string) => `/real-estate?country=${country}`,
  GET_BY_ID: (id: string) => `/real-estate/getById/${id}`,
  GET_COMPANY_REAL_ESTATES: (id: string) =>
    `/real-estate/get-companies-realestate/${id}`,
  ADD: "/real-estate/add-real-estate",
  EDIT: (id: string) => `/real-estate/edit-real-estate/${id}`,
  DELETE: (id: string) => `/real-estate/delete-real-estate/${id}`,
};

const USER = {
  SIGNIN: "/user/signin",
  SIGNUP: "/user/register",
  GET_BY_ID: (userId: string) => `/user/getUser/${userId}`,
  GET_BY_TYPE: (userType: string, country: string) =>
    `/user/getUserByType?userType=${userType}&country=${country}`,
  GET_SELECTED_PRODUCTS: (userId: string) =>
    `/user/getSelectedProducts/${userId}`,
  GET_FAVORITES_LIST: (userId: string) => `/user/favorites/${userId}`,
  REMOVE_FROM_FAVORITES: "/user/favorites/remove",
  ADD_TO_FAVORITES: "/user/favorites/add",
  ADD_TO_SELECTED_PRODUCTS: (userId: string) =>
    `/user/addToSelectedProducts/${userId}`,
  EDIT: (userId: string) => `/user/net-editUser/${userId}`,
  TOGGLE_FOLLOW: (otherUserId: string) => `/user/toggleFollow/${otherUserId}`,
  GET_FOLLOWINGS_LIST: (userId: string) => `/user/getUserFollowings/${userId}`,
  USER_SEARCH: (query: string) => `user/search?query=${query}`,
  GET_USER_ACCOUNTS: (email: string) => `user/getuseraccounts?email=${email}`,
  ADD_ACCOUNT: "user/addaccount",
  CHANGE_ACCOUNT: "user/changeAccount",
  FORGET_PASSWORD: "user/forget-password",
  RESET_PASSWORD: (token: string) => `user/reset-password/${token}`,
  ADD_VISITOR: (userId: string) => `user/${userId}/addvisitor`,
  RATE_USER: (id: string) => `user/${id}/rate`,
};

const ARAMEX = {
  FETCH_CITIES: (country: string) =>
    `/aramex/fetchCities?countryCode=${country}`,
  CALCULATE_RATE: `/aramex/calculateRate`,
  CREATE_PICKUP_WITH_SHIPMENT: `/aramex/createPickUpWithShipment`,
};

const CATEGORIES = {
  GET_FACTORIES_CATEGORIES: "/categories/factories",
  GET_FACTORY_USERS: (id: string) => `/categories/get-all-factories/${id}`,
};

const PRODUCT = {
  GET_ALL: (country: string) => `/departments/allProducts?country=${country}`,
  GET_BY_CATEGORY: (categoryId: string, country: string) =>
    `/departments/${categoryId}/all-products?country=${country}`,
  ADD: "/departments/addProduct",
  EDIT: (productId: string) => `/departments//editProduct/${productId}`,
  DELETE: (productId: string) => `/departments/delete-product/${productId}`,

  GET_BY_ID: (productId: string) => `/departments/getproduct/${productId}`,
  GET_USER_PRODUCTS: (userId: string) =>
    `/departments/getUserProducts/${userId}`,
  PAYMENT_CONFIG: "/departments/config",
  CREATE_INTENT: "/departments/create-payment",
  RATE_PRODUCT: (id: string) => `/departments/products/${id}/rate`,
};

const DELIVERY = {
  GET_COMPANY_DELIVERY_SERVICES: (id: string) => `/delivery/${id}`,
  ADD: "/delivery/add-service",
  EDIT: (id: string) => `/delivery/${id}`,
};

const FEES = {
  GET_ALL: "/fees",
};

const ORDER = {
  GET_BY_ID: (id: string) => `/order/${id}`,
  SAVE_ORDER: (userId: string) => `/order/save/${userId}`,
  GET_USER_ORDERS: (userId: string) => `/order/get/${userId}`,
  GET_CLIENT_ORDERS: (clientId: string) => `/order/client-orders/${clientId}`,
};

const NOTIFICATION = {
  GET_ALL: "/notifications/get-notification",
};

const PRIVACY = {
  GET: "/legalAdvices",
};

const OPINION = {
  ADD: "/openions",
};
const COMPLAINT = {
  ADD: "/complaints",
};

const REQUEST = {
  ADD: "/requests",
};
const QUESTION = {
  ADD: "/questions",
};

const SEND_BIRD = {
  CRATE_USER: `https://api-D27C6110-9DB9-4EBE-AA85-CF39E2AF562E.sendbird.com/v3/users`,
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
  ORDER,
  NOTIFICATION,
  PRIVACY,
  OPINION,
  COMPLAINT,
  REQUEST,
  QUESTION,
  SEND_BIRD,
};

export default API_ROUTES;
