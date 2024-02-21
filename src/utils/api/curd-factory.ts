
import { HttpClient } from "./http";
import { GetParams } from "@/types";

export interface IMessage{
  message:string
 }


export function crudFactory<Type , QueryParams, InputType>(
  endpoint: string
) {
  return {
   async all(params: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params);
    },
 
   async get({ slug }: GetParams) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`);
    },
   async create(data: InputType) {
      return await HttpClient.post<IMessage>(endpoint, data);
    },
  async  update({ id, ...input }: Partial<InputType> & { id: string }) {
      console.log("id, ...input***", id, input)
      return HttpClient.put<{message:string}>(`${endpoint}/${id}`, input);
    },
   async delete({ id }: { id: string }) {
      return HttpClient.delete<boolean>(`${endpoint}/${id}`);
    },
  };
}
