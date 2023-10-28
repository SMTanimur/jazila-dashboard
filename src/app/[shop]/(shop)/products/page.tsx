"use client"
import { PageHeader, PageHeaderHeading } from '@/components/common/shared/page-header';
import Search from '@/components/common/shared/search';
import SortForm from '@/components/common/sort-form';
import CategoryTypeFilter from '@/components/products/category-type-filter';
import ProductsList from '@/components/products/product-list';
import { Shell } from '@/components/shells/shell'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import Loader from '@/components/ui/loader/loader';
import { useGetProductsQuery } from '@/hooks/product/useGetProducts';
import { useShopQuery } from '@/hooks/shops/useGetShop';
import { cn } from '@/lib/utils';
import { SortOrder } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react'

type Params = {
  params: {
    shop: string;
  };
};
const Attributes = ({params:{shop}}:Params) => {

  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );
  const shopId = shopData?._id!;

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const {
    data,
    isLoading: loading,
    error,
  } = useGetProductsQuery(
    {
      text: searchTerm,
      limit: 10,
      shop_id: shopId,
      type,
      category,
      orderBy,
      sortedBy,
      page,
    },
    {
      enabled: Boolean(shopId),
    }
  );

  if (loading || fetchingShop)
  return <Loader text={'Loading'} />;
// if (error) return <ErrorMessage message={error.message} />;

function handleSearch({ searchText }: { searchText: string }) {
  setSearchTerm(searchText);
}
function handlePagination(current: any) {
  setPage(current);
}
 
  return (
    <Shell variant={'sidebar'}>
      <Card className='p-8'>
      <PageHeader className='flex flex-col md:flex-row gap-4 items-center md:justify-between'>
        <PageHeaderHeading>Products</PageHeaderHeading>
        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center">
            <div className="w-full flex items-center md:gap-3">
            <Search onSearch={handleSearch} placeholder='Search By Name' />
          <Button className='w-[200px] px-0 ml-3' size={'default'}>
            <Link
              href={`/${shop}/products/create`}
              className='flex items-center gap-1'
            >
              <Icons.plus className='w-5 h-5' />
              <span className='hidden md:block'>Create Product</span>
              <span className='md:hidden'>Add</span>
            </Link>
          </Button>
            </div>

            <button
              className="text-primary text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
              onClick={toggleVisible}
            >
              Filter
              {visible ? (
                <Icons.arrowUp className="ms-2" />
              ) : (
                <Icons.arrowDown className="ms-2" />
              )}
            </button>
          </div>
      </PageHeader>
      <div
          className={cn('w-full flex transition', {
            'h-auto visible': visible,
            'h-0 invisible': !visible,
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
          <CategoryTypeFilter
              className="w-full md:w-2/3 md:me-5"
              onCategoryFilter={({ slug }: { slug: string }) => {
                setCategory(slug);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
              }}
            />
            <SortForm
              className="w-full md:w-1/2 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { value: 'name', label: 'Name' },
                { value: 'price', label: 'Price' },
                { value: 'max_price', label: 'Max Price' },
                { value: 'min_price', label: 'Min Price' },
                { value: 'sale_price', label: 'Sale Price' },
                { value: 'quantity', label: 'Quantity' },
                { value: 'createdAt', label: 'Created At' },
                { value: 'updatedAt', label: 'Updated At' },
              ]}
            />
          </div>
        </div>
      </Card>

      <ProductsList
        products={data!}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
       
      />
     
    </Shell>
  )
}

export default Attributes