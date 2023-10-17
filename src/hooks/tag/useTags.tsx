"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tagClient } from "@/services/tag.service";
import { useGlobalAlertStateStore } from "@/store/alerts";
import { TTag } from "@/validations/tag";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentUser } from "../user/useCurrentUser";

export function useTag() {
  const { currentUser } = useCurrentUser();

  const setShowShopAlert = useGlobalAlertStateStore(
    (state) => state.setShowAlert
  );
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    mutateAsync: tagCreateMutation,
    isLoading: tagCreateLoading,
    isError: IsTagCreateError,
  } = useMutation(tagClient.tagCreate);

  const {
    mutateAsync: tagDeleteMutation,
    isLoading: tagDeleteLoading,
    isError: IsTagDeleteError,
  } = useMutation(tagClient.deleteTag);
  const {
    mutateAsync: tagUpdateMutation,
    isLoading: tagUpdateLoading,
    isError: IsTagUpdateError,
  } = useMutation(tagClient.updateTag);

  const attempttagCreate = async (data: TTag) => {
    toast.promise(tagCreateMutation(data), {
      loading: "updating...",
      success: (data) => {
        queryClient.invalidateQueries(["tags"]);
        router.push("/admin/tags");
        return <b>{data.message}</b>;
      },
      error: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data?.message}</b>;
      },
    });
  };
  const attemptToDeletetag = async (id: string) => {
    toast.promise(tagDeleteMutation(id), {
      loading: "Deleting...",
      success: (data) => {
        queryClient.invalidateQueries(["tags"]);

        return <b>{data.message}</b>;
      },
      error: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data?.message}</b>;
      },
    });
  };

  return {
    attempttagCreate,
    tagCreateLoading,
    IsTagCreateError,
    tagUpdateMutation,
    tagUpdateLoading,
    IsTagUpdateError,
    IsTagDeleteError,
    tagDeleteLoading,
    attemptToDeletetag,
  };
}
