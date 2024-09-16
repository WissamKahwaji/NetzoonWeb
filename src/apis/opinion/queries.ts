import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOpinion } from ".";

const useAddOpinionMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["add-opinion"],
    mutationFn: (payload: { text: string }) => addOpinion(payload),
    onSuccess() {
      toast.success(`added opinion successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to add opinion`);
    },
  });
};

export { useAddOpinionMutation };
