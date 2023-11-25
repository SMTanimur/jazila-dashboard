import { useReplyQuestionMutation } from "@/hooks/question/createQuestion";
import { useGlobalModalStateStore } from "@/store/modal";
import { AnswerQuestionInput } from "@/types";
import { questionAnswerSchema } from "@/validations/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Icons } from "../ui/icons";
import { Textarea } from "../ui/textarea";

const QuestionReplyForm = () => {
  const { isLoading, replyQuestion } = useReplyQuestionMutation();
  const { questionAnswerData, setQuestionAnswerModal } =
    useGlobalModalStateStore((state) => state);
  const questionReplyForm = useForm<AnswerQuestionInput>({
    resolver: zodResolver(questionAnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const onSubmit = (values: Pick<AnswerQuestionInput, "answer">) => {
    replyQuestion({
      variables: {
        answer: {
          answer: values.answer,
        },
        id: questionAnswerData._id as string,
      },
    });
  };
  return (
    <Form {...questionReplyForm}>
      <form
        className="grid gap-4 py-6"
        onSubmit={(...args) =>
          void questionReplyForm.handleSubmit(onSubmit)(...args)
        }
      >
        <FormField
          control={questionReplyForm.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Answer *</FormLabel>
              <FormControl>
                <Textarea placeholder="Your Answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            disabled={isLoading}
            variant={"outline"}
            className="border border-primary px-6 rounded-lg"
            onClick={() => setQuestionAnswerModal(false, null)}
          >
            Cencel
          </Button>
          <Button disabled={isLoading} className=" px-6 rounded-lg">
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Submit
            <span className="sr-only">Submit</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionReplyForm;
