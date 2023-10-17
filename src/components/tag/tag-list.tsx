"use client";

import { useGlobalAlertStateStore } from "@/store/alerts";
import { IPaginatorInfo, ITag, ImageInfo } from "@/types";
import { PaginatorInfo } from "@/types/utils";
import Link from "next/link";
import { Icons } from "../ui/icons";

import Image from "next/image";
import { Tooltip } from "../common/Tooltip";
import { MainTable } from "../table";
import Pagination from "../ui/pagination";

type IProps = {
  tags: PaginatorInfo<ITag>;
  onPagination: (key: number) => void;
};
const TagList = ({ tags, onPagination }: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;
  const setShowTagAlert = useGlobalAlertStateStore(
    (state) => state.setShowTagAlert
  );

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
      title: "Name",
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
          rowKey="id"
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
