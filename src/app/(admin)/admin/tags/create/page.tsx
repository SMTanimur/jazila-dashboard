import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/shared/page-header";
import TagForm from "@/components/forms/TagForm";

import { Shell } from "@/components/shells/shell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craate tag",
  description: "Manage your Tag settings",
};
const CreateCategoryPage = () => {
  return (
    <Shell variant={"sidebar"}>
      <PageHeader>
        <PageHeaderHeading
          id="create-category-header"
          aria-labelledby="category-header-heading"
        >
          New Tag
        </PageHeaderHeading>
        <PageHeaderDescription>Add a new Tag</PageHeaderDescription>
      </PageHeader>

      <section className="w-full ">
        <TagForm />
      </section>
    </Shell>
  );
};

export default CreateCategoryPage;
