import API_ROUTES from "../../constants/apiRoutes";

import publicInstance from "../publicInstance";
import { OrderModel, SaveOrderModel } from "./type";

const saveOrder = async (payload: SaveOrderModel) => {
  const res = await publicInstance.post<string>(
    API_ROUTES.ORDER.SAVE_ORDER(payload.userId),
    payload
  );
  return res.data;
};
const getOrderByIdInfo = async (id: string) => {
  const res = await publicInstance.get<OrderModel>(
    API_ROUTES.ORDER.GET_BY_ID(id)
  );
  return res.data;
};
const getUserOrders = async (userId: string) => {
  const res = await publicInstance.get<OrderModel[]>(
    API_ROUTES.ORDER.GET_USER_ORDERS(userId)
  );
  return res.data;
};

const getClientOrders = async (clientId: string) => {
  const res = await publicInstance.get<OrderModel[]>(
    API_ROUTES.ORDER.GET_CLIENT_ORDERS(clientId)
  );
  return res.data;
};

export { getOrderByIdInfo, saveOrder, getUserOrders, getClientOrders };
