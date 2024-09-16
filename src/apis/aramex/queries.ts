import { useMutation, useQuery } from "@tanstack/react-query";
import {
  calculateDeliveryRate,
  createPickupWithShipments,
  getAramexCities,
} from ".";
// import { useNavigate } from "react-router-dom";
import {
  CalculateDeliveryRateInput,
  CreatePickupResponseModel,
  CreatePickupWithShipmentInputModel,
} from "./type";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";
import { useAppDispatch } from "../../app/hooks";
import { setDeliveyFee } from "../../features/cart/slice";
import { useNavigate } from "react-router-dom";

const useGetAramexCitiesQuery = (country: string) =>
  useQuery({
    queryKey: ["get-aramex-cities"],
    queryFn: () => getAramexCities(country),
  });

const useCalculateDeliveryRateMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["calculate-delivery-rate"],
    mutationFn: (payload: CalculateDeliveryRateInput) =>
      calculateDeliveryRate(payload),
    onSuccess: data => {
      toast.success("success");
      dispatch(setDeliveyFee(data.TotalAmount.Value));
      navigate(`/summery-order`);
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed   please try again later";
      toast.error(errorMessage);
    },
  });
};

const useCreatePickUpWithShipmentMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["create-pickup"],
    mutationFn: (payload: CreatePickupWithShipmentInputModel) =>
      createPickupWithShipments(payload),
    onSuccess: (data: CreatePickupResponseModel) => {
      if (data.HasErrors === false) {
        toast.success("create pickup successfully");

        navigate(`/`);
      } else {
        toast.error("error, contact with support");
        navigate(`/`);
      }
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed   please try again later";
      toast.error(errorMessage);
    },
  });
};

export {
  useGetAramexCitiesQuery,
  useCalculateDeliveryRateMutation,
  useCreatePickUpWithShipmentMutation,
};
