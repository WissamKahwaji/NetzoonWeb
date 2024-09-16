import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QuestionInputModel } from "./type";
import { addQuestion } from ".";
import { toast } from "react-toastify";

const useAddQuestionMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["add-question"],
    mutationFn: (payload: QuestionInputModel) => addQuestion(payload),
    onSuccess() {
      toast.success(`added question successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to add question`);
    },
  });
};

export { useAddQuestionMutation };
