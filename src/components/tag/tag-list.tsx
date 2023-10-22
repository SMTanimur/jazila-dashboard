"use client";

import { useGlobalAlertStateStore } from "@/store/alerts";
import { IPaginatorInfo, ITag, ImageInfo, SortOrder } from "@/types";
import { PaginatorInfo } from "@/types/utils";
import Link from "next/link";
import { Icons } from "../ui/icons";

import Image from "next/image";
import { Tooltip } from "../common/Tooltip";
import { MainTable } from "../table";
import Pagination from "../ui/pagination";
import { useState } from "react";
import TitleWithSort from "../ui/title-with-sort";

type IProps = {
  tags: PaginatorInfo<ITag>;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const TagList = ({ tags, onPagination,onOrder,onSort }: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;
  const setShowTagAlert = useGlobalAlertStateStore(
    (state) => state.setShowTagAlert
  );
  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const paginateInfo: IPaginatorInfo = {
    hasNextPage: tags?.hasNextPage,
    hasPrevPage: tags?.hasPrevPage,
    limit: tags?.limit,
    nextPage: tags?.nextPage,
    page: tags?.page,
    pagingCounter: tags?.pagingCounter,
    prevPage: tags?.prevPage,
    totalDocs: tags?.totalDocs,
    totalPages: tags?.totalPages,
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
      align: "center",
      width: 100,
    },
    {
      title: (
        <TitleWithSort
          title={'Name'}
        
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "name",
      key: "name",
      align: "left",
      width: 150,
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: 150,

      render: (image: ImageInfo, { name }: { name: string }) => {
        if (!image) return null;
        return (
          <div className="flex justify-center items-center">
            <Image
              src={image.img_url ?? "/"}
              alt={name}
              layout="fixed"
              width={30}
              height={30}
              className="rounded overflow-hidden"
            />
          </div>
        );
      },
    },

    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (slug: any) => (
        <div
          className="overflow-hidden truncate whitespace-nowrap"
          title={slug}
        >
          {slug}
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "actions",
      align: "center",
      width: 120,
      render: (id: string, options: ITag) => (
        <div className="flex items-center gap-2">
          <Tooltip content={"Delete"} placement="bottom-end">
            <Icons.trash
              className="w-8 text-red-500 cursor-pointer"
              onClick={() => setShowTagAlert(true, id)}
            />
          </Tooltip>
          <Tooltip content={"Edit"} placement="bottom-end">
            <Link href={`/admin/tags/${options.slug}/edit`}>
              <Icons.pencil className="w-8 text-stone-300" />
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <MainTable
          //@ts-ignore
          columns={columns}
          emptyText={"No tags Found"}
          data={tags?.docs!}
          rowKey="slug"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => " ",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginateInfo?.totalDocs && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginateInfo?.totalDocs}
            current={paginateInfo?.pagingCounter}
            pageSize={paginateInfo?.limit}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default TagList;
