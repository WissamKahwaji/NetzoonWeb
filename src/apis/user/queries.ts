import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddAccountInputModel,
  ForgetPasswordParams,
  RateUserInputModel,
  RequestBalanceInputModel,
  ResetPasswordParams,
  SignInValues,
  UserModel,
} from "./type";
import {
  addAccount,
  addProductToFavorites,
  addToSelectedProducts,
  addVisitor,
  changeAccount,
  editUser,
  forgetPassword,
  getUserAccounts,
  getUserByIdInfo,
  getUserFavoritesListInfo,
  getUserFollowingsListInfo,
  getUsersByTypeInfo,
  getUserSearch,
  getUserSelectedProductsInfo,
  rateUser,
  removeProductFromFavorites,
  resetPassword,
  sendRefundeRequestEmail,
  signIn,
  signup,
  toggleFollow,
} from ".";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../type";
import { useCreateSendBirdUserMutation } from "../chat/queries";
import { CreateSendBirdUserParams } from "../chat/type";

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

const useGetUserFavoritesListQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-favorites-list", userId],
    queryFn: () => getUserFavoritesListInfo(userId),
  });

const useAddProductToFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-to-favorites"],
    mutationFn: (data: { userId: string; productId: string }) =>
      addProductToFavorites(data.userId, data.productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-favorites-list"],
      });
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useRemoveProductFromFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["remove-from-favorites"],
    mutationFn: (data: { userId: string; productId: string }) =>
      removeProductFromFavorites(data.userId, data.productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-favorites-list"],
      });
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useAddToSelectedProductsMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-to-selected-products"],
    mutationFn: (data: { userId: string; productIds: string[] }) =>
      addToSelectedProducts(data.userId, data.productIds),
    onSuccess: () => {
      toast.success("success");
      navigate(-1);
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useToggleFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggle-follow"],
    mutationFn: (data: { currentUserId: string; otherUserId: string }) =>
      toggleFollow(data.currentUserId, data.otherUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-followings-list"],
      });
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useGetUserFollowingsListQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-followings-list", userId],
    queryFn: () => getUserFollowingsListInfo(userId),
  });

const useSendRefundeRequestEmailMutation = () => {
  return useMutation({
    mutationKey: ["send-refunde-request"],
    mutationFn: (data: RequestBalanceInputModel) =>
      sendRefundeRequestEmail(data),
    onSuccess: () => {
      toast.success("success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useSignInMutation = () => {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: data => {
      login(
        data.token,
        data.refreshToken,
        data.result._id,
        data.result.username
      );
      window.location.replace("/");
    },
    onError: () => {
      toast.error("failed to sign in please enter correct email & password");
    },
  });
};

const useSignUpMutation = () => {
  // const navigate = useNavigate();
  const { mutate: createSendbirdUser } = useCreateSendBirdUserMutation();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (payload: UserModel) => signup(payload),
    onSuccess: data => {
      login(
        data.token,
        data.refreshToken,
        data.result._id,
        data.result.username
      );
      const params: CreateSendBirdUserParams = {
        user_id: data.result.username,
        nickname: data.result.username,
        profile_url: data.result.profilePhoto ?? "",
        issue_access_token: true,
      };
      createSendbirdUser(params);
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to sign up, please try again later";
      toast.error(errorMessage);
    },
  });
};

const useEditUserMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-user"],
    mutationFn: (payload: UserModel) => editUser(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.username} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-by-id", variable._id],
      });
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.username}`);
    },
  });
};
const useCompleteUserMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-user"],
    mutationFn: (payload: UserModel) => editUser(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.username} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-user-by-id", variable._id],
      });
      navigate("/");
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.username}`);
    },
  });
};

const useGetUserSearchQuery = (query: string) =>
  useQuery({
    queryKey: ["get-user-search"],
    queryFn: () => getUserSearch(query),
    enabled: false,
  });

const useGetUserAccountsQuery = (email: string, enabled: boolean | undefined) =>
  useQuery({
    queryKey: ["get-user-accounts"],
    queryFn: () => getUserAccounts(email),
    enabled: enabled,
  });

const useAddAccountMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-account"],
    mutationFn: (data: AddAccountInputModel) => addAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-accounts"],
      });
      toast.success("success");
      navigate(-1);
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      toast.error(errorMessage);
    },
  });
};

const useChangeAccountMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["change-account"],
    mutationFn: (data: SignInValues) => changeAccount(data),
    onSuccess: data => {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("cartValues");

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      login(
        data.token,
        data.refreshToken,
        data.result._id,
        data.result.username
      );
      toast.success(`Switched To ${data.result.username}'s Account `);
      navigate(`/`, { replace: true });
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to sign in, please enter the correct email or password";
      toast.error(errorMessage);
    },
  });
};

const useForgetPasswordMutation = () => {
  return useMutation({
    mutationKey: ["forget-password"],
    mutationFn: (data: ForgetPasswordParams) => forgetPassword(data),
    onSuccess: data => {
      console.log(data);
      toast.success(`success, Open Your mail box`);
    },
    onError: () => {
      toast.error("Error , Please try again later");
    },
  });
};

const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: ResetPasswordParams) => resetPassword(data),
    onSuccess: () => {
      toast.success(`success`);
      navigate("/signin", { replace: true });
    },
    onError: () => {
      toast.error("Error , Please try again later");
    },
  });
};

const useAddVisitorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-visitor"],
    mutationFn: (data: { viewerUserId: string; userId: string }) =>
      addVisitor(data.viewerUserId, data.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-by-id"],
      });
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
      console.log(errorMessage);
    },
  });
};
const useRateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["rate-user"],
    mutationFn: (data: RateUserInputModel) => rateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-by-id"],
      });
      toast.success("Success");
    },
    onError: (error: ErrorMessage) => {
      const errorMessage =
        error.response?.data?.message || "Failed , please try again later";
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
  useEditUserMutation,
  useGetUserFavoritesListQuery,
  useRemoveProductFromFavoritesMutation,
  useAddProductToFavoritesMutation,
  useSendRefundeRequestEmailMutation,
  useAddToSelectedProductsMutation,
  useToggleFollowMutation,
  useGetUserFollowingsListQuery,
  useGetUserSearchQuery,
  useGetUserAccountsQuery,
  useAddAccountMutation,
  useChangeAccountMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useCompleteUserMutation,
  useAddVisitorMutation,
  useRateUserMutation,
};
