"use client";
import {
  PageHeader,
  PageHeaderHeading,
} from "@/components/common/shared/page-header";
import Search from "@/components/common/shared/search";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import Loader from "@/components/ui/loader/loader";
import UserList from "@/components/user/user-list";
import { useGetUsersQuery } from "@/hooks/user/getUsersQuery";
import { SortOrder } from "@/types";
import Link from "next/link";
import { useState } from "react";

const UserScreenComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("createdAt");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const {
    data,
    isLoading: loading,
    error,
  } = useGetUsersQuery({
    limit: 10,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text={"Loading"} />;
  // if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <div>
      <Card className="p-10">
        <PageHeader className="flex flex-col md:flex-row gap-4 items-center md:justify-between">
          <PageHeaderHeading>User</PageHeaderHeading>

          <div className="w-full md:w-[70%] flex flex-col md:flex-row items-center gap-4">
            <Search onSearch={handleSearch} placeholder="Search By Name" />
            <Button className="w-[200px] px-0  ">
              <Link
                href={"/admin/users/create"}
                className="flex items-center gap-1"
              >
                <Icons.plus className="w-5 h-5" />
                <span>Create User</span>
              </Link>
            </Button>
          </div>
        </PageHeader>
      </Card>

      <UserList
        user={data!}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </div>
  );
};

export default UserScreenComponent;
