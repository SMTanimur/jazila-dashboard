import { type Icons } from "@/components/ui/icons";
import { type FileWithPath } from "react-dropzone";
export declare type Maybe<T> = T | null;

export interface Option {
  label: string;
  value: string;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface TypesIcon {
  value: keyof typeof Icons;
  label: string;
}

export interface ShopSideItem {
  title: string;
  href?: (shop: string) => string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}
export interface NavShopItemWithChildren extends ShopSideItem {
  items: NavShopItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
export type ShopSidebarNavItem = NavShopItemWithChildren;

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  is_active?: boolean;
  provider: string;
  provider_id?: string;
  role: string;
  _id: string;
  contact?: string;
  email_verified?: boolean;
  shop?: IShop;
  addresses?: IAddress[];
}
export type ImageInfo = {
  img_url: string;
  img_id: string;
};

export interface IShop {
  name: string;
  description: string;
  is_active: boolean;
  orders_count: number;
  products_count: number;
  slug: string;
  cover_image: ImageInfo;
  owner: IUser;
  balance: IBalance;
  address: IShopAddress;
  _id: string;
  logo: ImageInfo;
  createdAt: Date;
  settings?: IShopSettings;
}

export interface IPaginatorInfo {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: any;
  nextPage?: any;
}

export interface IBalance {
  _id?: string;
  admin_commission_rate?: number;
  seller_commission_rate?: number;
  admin_commission?: number;
  total_earnings?: number;
  withdrawn_amount?: number;
  current_balance?: number;
  payment_info?: IPaymentInfo;
}

export interface IPaymentInfo {
  account?: string;
  name?: string;
  email?: string;
  bank?: string;
}

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export interface IShopAddress {
  street_address: string;
  city: string;
  country: string;
  zip: string;
  state: string;
}

export interface IShopSettings {
  contact: string;
  website: string;
}

export interface IAddressData {
  name: string;
  country: string;
  street: string;
  customer: IUser;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  default: boolean;
}

export interface IAddress extends IAddressData {
  _id: string;
}

export interface IAddressInfo {
  street_address: string;
  city: string;
  country: string;
  zip: string;
  state: string;
}

export interface ICategory {
  name: string;
  slug: string;
  icon?: string;
  _id: string;
  image: ImageInfo;
  type: IType;
  parent?: ICategory;
  children?: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IBanner {
  _id: string;
  type: IType;
  title: string;
  description: string;
  image: ImageInfo;
}

export interface ITag {
  name: string;
  slug: string;
  details: string;
  image: ImageInfo;
  type: IType;
  products: IProduct[];
  _id: string;
}

export interface IType {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  banners: IBanner[];
  promotional_sliders: ImageInfo[];
}

export interface IImage {
  id: string;
  url: string;
  file: File | null;
}

export interface IAttributeValue {
  _id: string;
  meta: string;
  value: string;
  attribute: string;
}
export interface IAttribute {
  _id: string;
  name: string;
  shop: string;
  slug: string;
  values: IAttributeValue[];
}

export interface OrderProductPivot {
  order_quantity?: number;
  unit_price?: number;
  subtotal?: number;
  variation_option_id?: string;
}

export enum ProductStatus {
  Publish = "publish",
  Draft = "draft",
}
export enum ProductType {
  Simple = "simple",
  Variable = "variable",
}

export interface VariationOption {
  name?: string;
  value?: string;
}

export interface Variation {
  id?: string;
  title?: string;
  image?: ImageInfo;
  price?: number;
  sku?: string;
  is_disable?: boolean;
  sale_price?: number;
  quantity?: number;
  options?: VariationOption[];
}

export interface IOrder {
  id: string;
  tracking_number: string;
  customer_contact: string;
  customer_name: string;
  customer_id: number;
  customer?: IUser;
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway?: string;
  // coupon?: ICoupon;
  discount?: number;
  delivery_fee?: number;
  delivery_time: string;
  products: IProduct[];
  created_at: string;
  updated_at: string;
  address?: IAddress;
  translated_languages: string[];
  language: string;
  order_status: string;
  payment_status: string;
  shop_id?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  shop_id: string;
  slug: string;
  type: IType;
  product_type: ProductType;
  max_price?: number;
  min_price?: number;
  categories: ICategory[];
  variations?: IAttributeValue[];
  variation_options?: Variation[];
  pivot?: OrderProductPivot;
  orders: IOrder[];
  description?: string;
  in_stock?: boolean;
  is_digital?: boolean;
  is_external?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  sku?: string;
  gallery?: ImageInfo[];
  image?: ImageInfo;
  status?: ProductStatus;
  height?: string;
  length?: string;
  width?: string;
  price: number;
  quantity?: number;
  unit?: string;
  external_product_url?: string;
  external_product_button_text?: string;
  created_at: string;
  updated_at: string;
  ratings: number;
}

export interface AttributeProductPivot {
  id: string;
  price?: number;
}

export interface VariationOptionInput {
  name?: string;
  value?: string;
}

export interface UpsertVariationsHasMany {
  delete?: string[];
  upsert?: VariationInput[];
}

export interface VariationInput {
  id?: string;
  image?:ImageInfo
  is_digital?: boolean;
  is_disable?: boolean;
  options?: VariationOptionInput[];
  price: number;
  quantity: number;
  sale_price?: number;
  sku: number;
  title: number;
}


export interface CreateProduct {
  name: string;
  type_id: string;
  price: number;
  sale_price?: number;
  quantity?: number;
  unit: string;
  description?: string;
  categories?: string[];
  variations?: AttributeProductPivot[];
  in_stock?: boolean;
  is_taxable?: boolean;
  author_id?: string;
  is_external?: boolean;
  max_price?: number;
  min_price?: number;
  variation_options?: UpsertVariationsHasMany;
  sku?: string;
  gallery?: ImageInfo[];
  image?: ImageInfo
  status?: ProductStatus;
  height?: string;
  length?: string;
  width?: string;
  shop_id?: string;
}

export interface UpdateProduct {
  name?: string;
  type_id?: string;
  price?: number;
  sale_price?: number;
  quantity?: number;
  unit?: string;
  description?: string;
  categories?: string[];
  variations?: AttributeProductPivot[];
  in_stock?: boolean;
  is_taxable?: boolean;
  author_id?: string;
  is_external?: boolean;
  max_price?: number;
  min_price?: number;
  variation_options?: UpsertVariationsHasMany;
  sku?: string;
  gallery?: ImageInfo[];
  image?: ImageInfo
  status?: ProductStatus;
  height?: string;
  length?: string;
  width?: string;
  shop_id?: string;
}



export interface IFileHandler<T> {
  imageFile: T;
  setImageFile: React.Dispatch<React.SetStateAction<T>>;
  isFileLoading: boolean;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    callback?: (file?: IImage) => void
  ) => void;
  removeImage: (id: string) => void;
  clearFiles: () => void;
}

export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = "asc",
  /** Sort records in descending order. */
  Desc = "desc",
}
