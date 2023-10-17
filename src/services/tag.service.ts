import { ITag } from "@/types";
import { QueryParamsType, TagsQueryOptionsType } from "@/types/custom.types";
import { PaginatorInfo } from "@/types/utils";
import { API_ENDPOINTS } from "@/utils/api/api-endpoints";
import { HttpClient } from "@/utils/api/http";
import { TTag } from "@/validations/tag";

export interface ITagUpdateVariables {
  variables: {
    id: string;
    input: TTag;
  };
}

export const tagClient = {
  tagCreate: (variables: TTag) => {
    return HttpClient.post<{ message: string }>(`/tags`, variables);
  },

  updateTag: ({ variables: { id, input } }: ITagUpdateVariables) => {
    return HttpClient.put<{ message: string }>(`/tags/${id}`, input);
  },

  getTags: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page,
      text,
      limit = 15,
      orderBy = "updatedAt",
      sortedBy = "desc",
    } = params as TagsQueryOptionsType;

    const url = `/tags?${
      text ? `&search=${text}` : ""
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<ITag>>(url);
  },

  getAllTags: async () => {
    return HttpClient.get<ITag[]>(`${API_ENDPOINTS.TYPES}/all`);
  },
  deleteTag: async (id: string) => {
    return HttpClient.delete<{ message: string }>(`/tags/${id}`);
  },

  getTag: async (slug: string) => {
    return HttpClient.get<ITag>(`/tags/${slug}`);
  },
};
