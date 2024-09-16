import { useQuery } from "@tanstack/react-query";
import { getNotificationsList } from ".";

const useGetNotificationsListQuery = () =>
  useQuery({
    queryKey: ["get-notifications-list"],
    queryFn: () => getNotificationsList(),
  });

export { useGetNotificationsListQuery };
