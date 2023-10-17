"use client";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/shared/page-header";
import TagForm from "@/components/forms/TagForm";
import { Shell } from "@/components/shells/shell";
import Loader from "@/components/ui/loader/loader";
import { useGetTagQuery } from "@/hooks/tag/useGetTag";

type Params = {
  params: {
    tag: string;
  };
};
const EditTagPage = ({ params: { tag } }: Params) => {
  const { data, isLoading } = useGetTagQuery(tag as string);
  if (isLoading) return <Loader showText text="Loading" />;

  return (
    <Shell variant={"sidebar"}>
      <PageHeader>
        <PageHeaderHeading
          id="shop-details-header"
          aria-labelledby="shop-header-heading"
        >
          Tag Edit
        </PageHeaderHeading>
        <PageHeaderDescription>View your Tag Details</PageHeaderDescription>

        <section>
          <TagForm initialValues={data} />
        </section>
      </PageHeader>
    </Shell>
  );
};

export default EditTagPage;
