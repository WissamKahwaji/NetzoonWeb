import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addDeliveryService,
  editDeliveryService,
  getCompanyDeliveryServices,
} from ".";
import { useNavigate } from "react-router-dom";
import { DeliverServiceInputModel } from "./type";
import { toast } from "react-toastify";

const useGetCompanyDeliveryServicesQuery = (
  id: string,
  enabled: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-company-delivery-services", id],
    queryFn: () => getCompanyDeliveryServices(id),
    enabled: enabled,
  });

const useAddDeliveryServiceMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-delivery-service"],
    mutationFn: (payload: DeliverServiceInputModel) =>
      addDeliveryService(payload),
    onSuccess() {
      toast.success(`add delivery service successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to add delivery service`);
    },
  });
};

const useEditDeliveryServiceMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-delivery-service"],
    mutationFn: (payload: DeliverServiceInputModel) =>
      editDeliveryService(payload),
    onSuccess() {
      toast.success(`edit Delivery service successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to edit delivery service`);
    },
  });
};

export {
  useGetCompanyDeliveryServicesQuery,
  useAddDeliveryServiceMutation,
  useEditDeliveryServiceMutation,
};
