/* eslint-disable react/no-unescaped-entities */
"use client"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import ReadMore from '@/components/ui/truncate';
import { useShopQuery } from '@/hooks/shops/useGetShop';
import { formatAddress } from '@/utils/format-address';
import usePrice from '@/utils/use-price';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ProductListSkeleton from './loading';
import Loader from '@/components/ui/loader/loader';
type Params = {
  params: {
    shop: string;
  };
};

const StorePage = ({ params: { shop } }: Params) => {
  const { data, isLoading } = useShopQuery(shop);

  const { price: totalEarnings } = usePrice(
    data && {
      amount: data?.balance?.total_earnings!,
    }
  );
  const { price: currentBalance } = usePrice(
    data && {
      amount: data?.balance?.current_balance!,
    }
  );
  if (isLoading) {
    return <Loader text='Loading'/>
  }
  return (
    <Shell variant={'sidebar'}>
      <PageHeader>
        <PageHeaderHeading
          id='shop-details-header'
          aria-labelledby='shop-header-heading'
        >
          Shop Details
        </PageHeaderHeading>
        <PageHeaderDescription>View your Shop Details</PageHeaderDescription>
      </PageHeader>

      <section>
        <div className='grid grid-cols-12 gap-6'>
          {!data?.is_active && (
            <div className='col-span-12 bg-red-500 text-sm text-stone-50 px-5 py-4 rounded-xl'>
              Your shop is not activated yet. You can't proceed further
              operations.
            </div>
          )}
          {/* about Shop */}
          <div className='order-2 xl:order-1 col-span-12 sm:col-span-6 xl:col-span-4 3xl:col-span-3'>
            <Card className='shadow-md h-[450px]'>
              <div className='py-8 px-6  rounded flex flex-col items-center'>
                <div className='w-36 h-36 relative rounded-full mb-5'>
                  <div className='w-full h-full relative overflow-hidden flex items-center justify-center border border-gray-100 rounded-full'>
                    <Image
                      src={data?.logo?.img_url as any}
                      layout='fill'
                      alt={'avatar'}
                    />
                  </div>
                </div>

                <h1 className='text-xl font-semibold text-heading mb-2'>
                  {data?.name}
                </h1>
                <p className='text-sm text-body text-center'>
                  <ReadMore character={70}>{data?.description!}</ReadMore>
                </p>

                <div className='flex w-full justify-start mt-5'>
                  <span className='text-slate-400-light mt-0.5 me-2'>
                    <Icons.address className='w-4' />
                  </span>

                  <address className='text-body text-sm not-italic'>
                    {!isEmpty(formatAddress(data?.address!))
                      ? formatAddress(data?.address!)
                      : 'NO Address Provided'}
                  </address>
                </div>

                <div className='flex w-full justify-start mt-3'>
                  <span className='text-slate-400-light mt-0.5 me-2'>
                    <Icons.phone className='w-3' />
                  </span>
                  <Link
                    href={`tel:${data?.settings?.contact}`}
                    className='text-body text-sm'
                  >
                    {data?.settings?.contact
                      ? data?.settings?.contact
                      : 'No contact found'}
                  </Link>
                </div>

                {/* <div className='grid grid-cols-1 w-full mt-7'>
                <a
                  href={`${process.env.NEXT_PUBLIC_SHOP_URL}/${locale}/shops/${slug}`}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center justify-center flex-shrink-0 leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 !bg-gray-100 hover:!bg-accent !text-heading hover:!text-light !font-normal px-5 py-0 h-12'
                >
                  {t('common:text-visit-shop')}
                </a>
              </div> */}
              </div>
            </Card>
          </div>

          {/* Cover Photo */}

          <div className='order-1 xl:order-2 col-span-12 xl:col-span-8 3xl:col-span-9 rounded h-full overflow-hidden'>
            <Card className='shadow-md p-4 h-[450px]'>
              <div className=' relative bg-light min-h-[400px]'>
                {data?.cover_image && (
                  <Image
                    src={data?.cover_image.img_url}
                    layout='fill'
                    alt={'cover image'}
                    objectFit='contain'
                  />
                )}

                {/* {hasAccess(adminAndOwnerOnly, permissions) && ( */}
                <Button size={'lg'} className='absolute top-1 end-1'>
                  <Link href={`/${shop}/edit`} className='flex items-center'>
                    <Icons.edit className='w-4 me-2' />
                    <span> Edit Shop</span>
                  </Link>
                </Button>

                {/* )} */}
              </div>
            </Card>
          </div>

          {/* Mini Dashboard */}
          <div className='order-4 xl:order-3 col-span-12 xl:col-span-9 '>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 bg-light p-4 rounded h-full'>
              <div className='space-y-3'>
                <h2 className='text-heading text-lg font-semibold '>
                  Products
                </h2>

                <div className='border border-gray-100'>
                  <div className='flex items-center py-3 px-4 border-b border-gray-100'>
                    <div className='p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FC9EC6] text-light'>
                      <Icons.product className='w-5' />
                    </div>

                    <div className='ml-3'>
                      <p className='text-lg font-semibold text-sub-heading mb-0.5'>
                        {data?.products_count}
                      </p>
                      <p className='text-sm text-slate-400 mt-0 '>
                        Total Products
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center py-3 px-4'>
                    <div className='p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#6EBBFD] text-light'>
                      <Icons.order className='w-4' />
                    </div>

                    <div className='ml-3'>
                      <p className='text-lg font-semibold text-sub-heading mb-0.5'>
                        {data?.orders_count}
                      </p>
                      <p className='text-sm text-slate-400 mt-0'>
                        Total Orders
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h2 className='text-heading text-lg font-semibold'>
                  Total Revenue
                </h2>

                <div className='border border-gray-100'>
                  <div className='flex items-center py-3 px-4 border-b border-gray-100'>
                    <div className='p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#C7AF99] text-light'>
                      <Icons.wallet className='w-4' />
                    </div>

                    <div className='ml-3'>
                      <p className='text-lg font-semibold text-sub-heading mb-0.5'>
                        {totalEarnings}
                      </p>
                      <p className='text-sm text-slate-400 mt-0'>Gross Sales</p>
                    </div>
                  </div>

                  <div className='flex items-center py-3 px-4'>
                    <div className='p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FFA7AE] text-light'>
                      <Icons.dollarSign className='w-4' />
                    </div>

                    <div className='ml-3'>
                      <p className='text-lg font-semibold text-sub-heading mb-0.5'>
                        {currentBalance}
                      </p>
                      <p className='text-sm text-slate-400 mt-0'>
                        Current Balance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h2 className='text-heading text-lg font-semibold'>Others</h2>

                <div className='border border-gray-100'>
                  <div className='flex items-center py-3 px-4 border-b border-gray-100'>
                    <div className='p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#D59066] text-light'>
                      <Icons.percent className='w-4' />
                    </div>

                    <div className='ml-3'>
                      <p className='text-lg font-semibold text-sub-heading mb-0.5'>
                        {`${data?.balance?.admin_commission_rate ?? 0} %` ??
                          'Not Set'}
                      </p>
                      <p className='text-sm text-slate-400 mt-0'>
                        Commission rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Misc. Information */}
          <div className='order-3 xl:order-4 bg-light rounded col-span-12 sm:col-span-6 xl:col-span-3'>
            <div className='flex flex-col p-6 2xl:p-7 border-b border-gray-200'>
              <span className='text-slate-400 text-sm mb-2'>
                registered-since
              </span>
              <span className='text-sm font-semibold text-sub-heading'>
                {dayjs(data?.createdAt).format('MMMM D, YYYY')}
              </span>
            </div>

            <div className='flex flex-col p-6 2xl:p-7'>
              <span className='text-sub-heading text-lg font-semibold mb-4'>
                Payment Information
              </span>

              <div className='flex flex-col space-y-3'>
                <p className='text-sm text-sub-heading'>
                  <span className='text-slate-400 block w-full'>Name</span>{' '}
                  <span className='font-semibold'>
                    {data?.balance?.payment_info?.name}
                  </span>
                </p>
                <p className='text-sm text-sub-heading'>
                  <span className='text-slate-400 block w-full'>Email</span>{' '}
                  <span className='font-semibold'>
                    {data?.balance?.payment_info?.email}
                  </span>
                </p>
                <p className='text-sm text-sub-heading'>
                  <span className='text-slate-400 block w-full'>Bank</span>{' '}
                  <span className='font-semibold'>
                    {data?.balance?.payment_info?.bank}
                  </span>
                </p>
                <p className='text-sm text-sub-heading'>
                  <span className='text-slate-400 block w-full'>
                    Account No
                  </span>{' '}
                  <span className='font-semibold'>
                    {data?.balance?.payment_info?.account}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
};

export default StorePage;
