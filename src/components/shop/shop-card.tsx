import { IShop } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";


type ShopCardProps = {
  shop: IShop
};

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
 

  const isNew = false;

  return (
    <Link href={`/${shop?.slug}`}>
      <div className="flex items-center p-5 bg-light border border-gray-200 rounded cursor-pointer relative">
        {isNew && (
          <span className="text-xs text-light px-2 py-1 rounded bg-blue-500 absolute top-2 end-2">
            New
          </span>
        )}
        <div className="w-16 h-16 relative flex flex-shrink-0 border border-gray-100 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
          <Image
            alt={'Logo'}
            src={
              shop?.logo.img_url! ?? "/product-placeholder-borderless.svg"
            }
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col ms-4">
          <span className="text-lg font-semibold text-heading mb-2">
            {shop?.name}
          </span>
          <span>
            <Badge
            
              color={shop?.is_active ? "bg-accent" : "bg-red-500"}
            >
              {shop?.is_active ? "Active" : "Inactive"}
            </Badge>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
