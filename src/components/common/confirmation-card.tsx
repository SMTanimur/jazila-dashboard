
"use client"

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

type ConfirmationCardProps = {
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = 'button-delete',
  description = 'delete-item-confirm',
  cancelBtnText = 'button-cancel',
  deleteBtnText = 'button-delete',
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
}) => {
  return (
    <div className="m-auto w-full max-w-sm rounded-md bg-light p-4 pb-6 sm:w-[24rem] md:rounded-xl">
      <div className="h-full w-full text-center">
        <div className="flex h-full flex-col justify-between">
          {icon ? (
            icon
          ) : (
            <Icons.trash className="m-auto mt-4 h-12 w-12 text-accent" />
          )}
          <p className="mt-4 text-xl font-bold text-heading">{title}</p>
          <p className="py-2 px-6 leading-relaxed text-body-dark dark:text-muted">
            {description}
          </p>
          <div className="space-s-4 mt-8 flex w-full items-center justify-between">
            <div className="w-1/2">
              <Button
                onClick={onCancel}
              
                disabled={cancelBtnLoading}
                variant="default"
                className={cn(
                  'w-full rounded bg-accent py-2 px-4 text-center text-base font-semibold text-stone-100 shadow-md transition duration-200 ease-in hover:bg-accent-hover focus:bg-accent-hover focus:outline-none',
                  cancelBtnClassName
                )}
              >
                {cancelBtnText}
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                onClick={onDelete}
        
                disabled={deleteBtnLoading}
                variant="default"
                className={cn(
                  'w-full rounded bg-red-600 py-2 px-4 text-center text-base font-semibold text-light shadow-md transition duration-200 ease-in hover:bg-red-700 focus:bg-red-700 focus:outline-none',
                  deleteBtnClassName
                )}
              >
                {deleteBtnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
