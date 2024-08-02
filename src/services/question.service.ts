import { AnswerQuestionInput, ITag } from "@/types";
import { QueryParamsType, QuestionsQueryOptionsType, TagsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";
import { IQuestion } from "../types";

type TData ={
  answer:string
}
export interface AnswerQuestion {
  variables: {
    id: string;
    answer:TData
  };
}
export const questionClient = {

  questionReply:async ({variables:{id,answer}}: AnswerQuestion) => {

    const responst = await HttpClient.put<{ message: string }>(`/questions/${id}`, answer);
    return responst
  },

  getQuestions: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      limit = 15,
      shop_id,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
      user,
      product,
    } = params as QuestionsQueryOptionsType;
  
    const url = `/questions?${
      shop_id ? `shop=${shop_id}` : ''
    }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}${
      user ? `&user=${user}` : ''
    }${product ? `&product=${product}` : ''}`;
    return HttpClient.get<PaginatorInfo<IQuestion>>(url);
  },

  getAllTags: async () => {
    return HttpClient.get<ITag[]>(`${API_ENDPOINTS.TYPES}/all`);
  },
  deleteQuestion: async (id: string) => {
    return HttpClient.delete<{ message: string }>(`/questions/${id}`);
  },

  getTag: async (slug: string) => {
    return HttpClient.get<ITag>(`/tags/${slug}`);
  },
};
