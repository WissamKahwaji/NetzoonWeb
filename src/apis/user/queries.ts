import { useMutation, useQuery } from "@tanstack/react-query";
import { SignInValues, UserModel } from "./type";
import {
  getUserByIdInfo,
  getUsersByTypeInfo,
  getUserSelectedProductsInfo,
  signIn,
  signup,
} from ".";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../type";

const useGetUserByIdQuery = (userId: string | null) =>
  useQuery({
    queryKey: ["get-user-by-id", userId],
    queryFn: () => getUserByIdInfo(userId ?? ""),
    enabled: !!userId,
  });

const useGetUsersByTypeQuery = (userType: string, country: string) =>
  useQuery({
    queryKey: ["get-users-by-type"],
    queryFn: () => getUsersByTypeInfo(userType, country),
  });

const useGetUserSelectedProductsQuery = (
  userId: string,
  enabled?: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-user-selected-product", userId],
    queryFn: () => getUserSelectedProductsInfo(userId),
    enabled: enabled,
  });

const useSignInMutation = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      login(data.token, data.refreshToken, data.result._id);
      window.location.replace("/");
    },
    onError: () => {
      toast.error("failed to sign in please enter correct email & password");
    },
  });
};

const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (payload: UserModel) => signup(payload),
    onSuccess: data => {
      login(data.token, data.refreshToken, data.result._id);
      navigate("/", { replace: true });
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to sign up, please try again later";
      toast.error(errorMessage);
    },
  });
};

export {
  useSignInMutation,
  useGetUserByIdQuery,
  useSignUpMutation,
  useGetUsersByTypeQuery,
  useGetUserSelectedProductsQuery,
};
