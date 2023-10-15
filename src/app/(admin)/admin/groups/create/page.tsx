import {
  PageHeader,
  PageHeaderHeading,
} from "@/components/common/shared/page-header";
import GroupForm from "@/components/forms/GroupForm";
import { Shell } from "@/components/shells/shell";

const CreateGroup = () => {
  return (
    <Shell variant={"sidebar"}>
      <PageHeader>
        <PageHeaderHeading>Create Group</PageHeaderHeading>
      </PageHeader>

      <div className="border-dotted w-full border-2 " />

      <section className="w-full">
        <GroupForm />
      </section>
    </Shell>
  );
};

export default CreateGroup;
