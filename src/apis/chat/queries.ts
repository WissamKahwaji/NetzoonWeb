import { useMutation } from "@tanstack/react-query";
import { CreateSendBirdUserParams } from "./type";
import { createSendBirdUser } from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCreateSendBirdUserMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-sendbird-user"],
    mutationFn: (payload: CreateSendBirdUserParams) =>
      createSendBirdUser(payload),
    onSuccess() {
      navigate("/", { replace: true });
    },
    onError() {
      toast.error(`failed to create sendbird user`);
    },
  });
};

export { useCreateSendBirdUserMutation };
