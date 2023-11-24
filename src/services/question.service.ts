import { AnswerQuestionInput, ITag } from "@/types";
import { QueryParamsType, QuestionsQueryOptionsType, TagsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";
import { TTag } from "@/validations/tag";
import { IQuestion } from "../types";

export interface ITagUpdateVariables {
  variables: {
    id: string;
    input: TTag;
  };
}

export const questionClient = {
  questionReply: ({id,answer}: AnswerQuestionInput) => {
    return HttpClient.post<{ message: string }>(`/questions/${id}`, answer);
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
