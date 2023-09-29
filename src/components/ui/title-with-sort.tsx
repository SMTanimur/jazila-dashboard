import { cn } from "@/lib/utils";
import { Icons } from "./icons";


type Props = {
  title: string | React.ReactNode;
  ascending: boolean;
  isActive: boolean;
};

const TitleWithSort = ({ title, ascending, isActive = true }: Props) => {
  return (
    <span className="inline-flex items-center">
      <span>{title}</span>

      {ascending ? (
        <Icons.arrowUp
          width="9"
          className={cn('ms-1.5 w-4 flex-shrink-0 text-gray-300', {
            '!text-heading': isActive,
          })}
        />
      ) : (
        <Icons.arrowDown
          width="9"
          className={cn('ms-1.5 flex-shrink-0 w-4 text-gray-300', {
            '!text-heading': isActive,
          })}
        />
      )}
    </span>
  );
};

export default TitleWithSort;
