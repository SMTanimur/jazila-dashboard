import RCPagination, { PaginationProps } from "rc-pagination";

import "rc-pagination/assets/index.css";
import { Icons } from "./icons";

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      nextIcon={<Icons.arrowNext className="w-4" />}
      prevIcon={<Icons.arrowPrev className="w-4" />}
      {...props}
    />
  );
};

export default Pagination;
