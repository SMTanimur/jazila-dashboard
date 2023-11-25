
import { questionClient } from "@/services/question.service";
import { useGlobalModalStateStore } from "@/store/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useReplyQuestionMutation() {
  const globalModal = useGlobalModalStateStore((state) => state);

  const queryClient = useQueryClient();
  const { mutate: replyQuestion, isLoading } = useMutation(
    questionClient.questionReply,
    {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        toast.error(data?.message);
      },
      onSettled: () => {
        queryClient.refetchQueries(["questions"]);
        globalModal.setQuestionAnswerModal(false, null);
      },
    }
  );
  return {
    replyQuestion,
    isLoading,
  };
}
