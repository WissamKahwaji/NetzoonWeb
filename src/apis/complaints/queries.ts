import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ComplaintInputModel } from "./type";
import { addComplaint } from ".";
import { toast } from "react-toastify";

const useAddComplaintMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["add-complaint"],
    mutationFn: (payload: ComplaintInputModel) => addComplaint(payload),
    onSuccess() {
      toast.success(`added complaint successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to add complaint`);
    },
  });
};

export { useAddComplaintMutation };
