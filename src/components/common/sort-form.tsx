import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import InputSelect from "../select/select";

interface Props {
  className?: string;
  showLabel?: boolean;
  onSortChange: any
  onOrderChange: any
  options: {
    id?: number;
    value: string;
    label: string;
  }[];
}

const SortForm: React.FC<Props> = ({
  onSortChange,
  onOrderChange,
  options,
  className,
  showLabel = true,
}) => {
  

  return (
    <div className={cn("flex items-end w-full", className)}>
      <div className="w-full">
        {showLabel && <Label>Filter by Order</Label>}
        <InputSelect
          options={options}
          onChange={onOrderChange}
          name="orderBy"
          placeholder={'Filter by Order'}
        />
      </div>

      <div className="w-[150px] ms-5">
        <InputSelect
          options={[
            { id: 1, value: "asc", label: "ASC" },
            { id: 2, value: "desc", label: "DESC" },
          ]}
          onChange={onSortChange}
          defaultValue={{ id: 1, value: "desc", label: "DESC" }}
          name="sortedBy"
        />
      </div>
    </div>
  );
};

export default SortForm;
