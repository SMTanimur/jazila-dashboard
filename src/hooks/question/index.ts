import { questionClient } from "@/services/question.service";
import { IQuestion } from "@/types";
import { QuestionsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useReplyQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(questionClient.questionReply, {
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["questions"]);
    },
  });
};

export const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(questionClient.deleteQuestion, {
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["questions"]);
    },
  });
};
