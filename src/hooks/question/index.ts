import { questionClient } from "@/services/question.service";
import { useGlobalModalStateStore } from "@/store/modal";
import { IQuestion } from "@/types";
import { QuestionsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGlobalAlertStateStore } from "../../store/alerts";

export const useQuestionsQuery = (
  options: Partial<QuestionsQueryOptionsType>
) => {
  return useQuery<PaginatorInfo<IQuestion>, Error>(
    ["questions", options],
    questionClient.getQuestions,
    {
      keepPreviousData: true,
    }
  );
};

export const useDeleteQuestionMutation = () => {
  const globalAlert = useGlobalAlertStateStore((state) => state);
  const queryClient = useQueryClient();

  return useMutation(questionClient.deleteQuestion, {
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      toast.error(data.message);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["questions"]);
      globalAlert.setShowQuestionAlert(false, null);
    },
  });
};
