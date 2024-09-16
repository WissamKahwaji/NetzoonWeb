import { useMutation } from "@tanstack/react-query";
import { SendEmailInputModel } from "./type";
import { sendEmail } from ".";
import { toast } from "react-toastify";
import { ErrorMessage } from "../type";

const useSendEmailMutation = () => {
  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: (data: SendEmailInputModel) => sendEmail(data),
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

export { useSendEmailMutation };
