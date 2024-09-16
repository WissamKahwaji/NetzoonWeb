import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { NotificationsModel } from "./type";

const getNotificationsList = async () => {
  const res = await publicInstance.get<NotificationsModel[]>(
    API_ROUTES.NOTIFICATION.GET_ALL
  );
  return res.data;
};

export { getNotificationsList };
