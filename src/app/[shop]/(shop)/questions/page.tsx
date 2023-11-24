"use client";
import {
  PageHeader,
  PageHeaderHeading,
} from "@/components/common/shared/page-header";
import QuestionList from "@/components/question/questions-list";
import { Shell } from "@/components/shells/shell";
import { Card } from "@/components/ui/card";
import Loader from "@/components/ui/loader/loader";
import { useQuestionsQuery } from "@/hooks/question";
import { useShopQuery } from "@/hooks/shops/useGetShop";
import { SortOrder } from "@/types";
import { useState } from "react";

type Params = {
  params: {
    shop: string;
  };
};
const QuestionsPage = ({ params: { shop } }: Params) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [orderBy, setOrder] = useState("createdAt");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  function handlePagination(current: any) {
    setPage(current);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  const { data: shopData } = useShopQuery(shop as string);

  const { data, isLoading } = useQuestionsQuery({
    limit: 20,
    page,
    shop_id: shopData?._id,
    sortedBy,
    orderBy,
  });

  if (isLoading) return <Loader text="Loading" />;
  return (
    <Shell variant={"sidebar"}>
      <Card className="p-8">
        <PageHeader className="flex justify-between items-center ">
          <PageHeaderHeading size="sm">Questions</PageHeaderHeading>
        </PageHeader>
      </Card>

      <QuestionList
        questions={data!}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
       
      />
    </Shell>
  );
};

export default QuestionsPage;
