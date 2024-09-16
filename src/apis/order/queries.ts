import { useMutation, useQuery } from "@tanstack/react-query";

import { SaveOrderModel } from "./type";
import { getClientOrders, getOrderByIdInfo, getUserOrders, saveOrder } from ".";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

const useGetOrderByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-order-by-id"],
    queryFn: () => getOrderByIdInfo(id),
  });

const useSaveOrderMutation = () => {
  return useMutation({
    mutationKey: ["save-order"],
    mutationFn: (payload: SaveOrderModel) => saveOrder(payload),
    onSuccess: () => {
      toast.success("Order saved successfully");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed to save order";
      toast.error(errorMessage);
    },
  });
};

const useGetUserOrdersQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-orders", userId],
    queryFn: () => getUserOrders(userId),
  });

const useGetClientOrdersQuery = (clientId: string) =>
  useQuery({
    queryKey: ["get-clientId-orders", clientId],
    queryFn: () => getClientOrders(clientId),
  });

export {
  useGetOrderByIdQuery,
  useSaveOrderMutation,
  useGetUserOrdersQuery,
  useGetClientOrdersQuery,
};
