import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RequestInputModel } from "./type";
import { addRequest } from ".";
import { toast } from "react-toastify";

const useAddRequestMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["add-request"],
    mutationFn: (payload: RequestInputModel) => addRequest(payload),
    onSuccess() {
      toast.success(`sent request successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to send request`);
    },
  });
};

export { useAddRequestMutation };
