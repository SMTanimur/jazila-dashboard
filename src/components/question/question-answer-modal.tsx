import { useGlobalModalStateStore } from "@/store/modal";
import Image from "next/image";
import QuestionReplyForm from "./question-reply-form";

const QuestionAnswerModal = () => {
  const { questionAnswerData } = useGlobalModalStateStore((state) => state);

  return (
    <div className="p-6 flex flex-col">
      <div className="flex items-center space-x-4 bg-gray-100 p-3">
        <div className="max-w-[90px] w-full grid place-items-center bg-white">
          <Image
            src={questionAnswerData?.user?.avatar}
            alt={questionAnswerData?.user.lastName as string}
            height={70}
            width={70}
            objectFit="contain"
          />
        </div>
        <div>
          <h1 className="text-lg text-gray-800 font-semibold">
            {questionAnswerData?.question}
          </h1>
        </div>
      </div>
      <QuestionReplyForm />
    </div>
  );
};

export default QuestionAnswerModal;
