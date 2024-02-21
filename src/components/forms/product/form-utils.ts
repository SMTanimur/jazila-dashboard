import {
  ProductType,
  CreateProduct,
  VariationOption,
  Variation,
  IType,
  ICategory,
  ITag,
  IProduct,
} from '@/types';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import sum from 'lodash/sum';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { omitTypename } from '@/utils/omit-typename';
import { cartesian } from '@/utils/cartesian';

export type ProductFormValues = Omit<
  CreateProduct,
  |'type'
  | 'shop_id'
  | 'categories'
  | 'tags'

> & {
  type: Pick<IType, '_id' | 'name'>;
  product_type: ProductTypeOption;
  categories: Pick<ICategory, '_id' | 'name'>[];
  tags: Pick<ITag, '_id' | 'name'>[];
  slug?: string;
  // image: AttachmentInput;
};

export type ProductTypeOption = {
  value: ProductType;
  name: string;
};
export const productTypeOptions: ProductTypeOption[] = Object.entries(
  ProductType
).map(([key, value]) => ({
  name: key,
  value,
}));

export function getFormattedVariations(variations: any) {
  const variationGroup = groupBy(variations, 'attribute.slug');
  return Object.values(variationGroup)?.map((vg) => {
    return {
      attribute: vg?.[0]?.attribute,
      value: vg?.map((v) => ({ _id: v._id, value: v.value })),
    };
  });
}

export function processOptions(options: any) {
  try {
    return JSON.parse(options);
  } catch (error) {
    return options;
  }
}

export function calculateMinMaxPrice(variationOptions: any) {
  if (!variationOptions || !variationOptions.length) {
    return {
      min_price: null,
      max_price: null,
    };
  }
  const sortedVariationsByPrice = orderBy(variationOptions, ['price']);
  const sortedVariationsBySalePrice = orderBy(variationOptions, ['sale_price']);
  return {
    min_price:
      sortedVariationsBySalePrice?.[0].sale_price <
      sortedVariationsByPrice?.[0]?.price
        ? sortedVariationsBySalePrice?.[0].sale_price
        : sortedVariationsByPrice?.[0]?.price,
    max_price:
      sortedVariationsByPrice?.[sortedVariationsByPrice?.length - 1]?.price,
  };
}

export function calculateQuantity(variationOptions: any) {
  return sum(
    variationOptions?.map(({ quantity }: { quantity: number }) => quantity)
  );
}

export function getProductDefaultValues(
  product: IProduct,
) {
  if (!product) {
    return {
      product_type: productTypeOptions[0],
      min_price: 0.0,
      max_price: 0.0,
      categories: [],
      tags: [],
      in_stock: true,
      is_taxable: false,
      image: [],
      gallery: [],
      // isVariation: false,
      variations: [],
      variation_options: [],
    };
  }
  const {
    variations,
    variation_options,
    product_type,
  } = product;
  return cloneDeep({
    ...product,
    product_type: productTypeOptions.find(
      (option) => product_type === option.value
    ),
    

    ...(product_type === ProductType.Variable && {
      variations: getFormattedVariations(variations),
      variation_options: variation_options?.map(({  ...option }: any) => {
        return {
          ...option,
          
        };
      }),
    }),
    // isVariation: variations?.length && variation_options?.length ? true : false,

   
  });
}

export function filterAttributes(attributes: any, variations: any) {
  if (!variations || !variations.length) {
    return [];
  }

  return attributes?.filter((el: any) => {
    return !variations.find((element: any) => {
      return element?.attribute?.slug === el?.slug;
    });
  }) || [];
}

export function getCartesianProduct(values: any) {
  const formattedValues = values
    ?.map((v: any) =>
      v?.value?.map((a: any) => ({ name: v?.attribute?.name, value: a?.value }))
    )
    .filter((i: any) => i !== undefined);
  if (isEmpty(formattedValues)) return [];
  return cartesian(...formattedValues);
}

export function processFileWithName(file_input: any) {
  // Process Digital File Name section
  const splitArray = file_input?.original?.split('/');
  let fileSplitName = splitArray?.[splitArray?.length - 1]?.split('.');
  const fileType = fileSplitName?.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
  const filename = fileSplitName?.join('.'); // it will join the array with dot, which restore the original filename

  return [
    {
      fileType: fileType,
      filename: filename,
    },
  ];
}

export function getProductInputValues(
  values: ProductFormValues,
  initialValues: any
) {
  const {
    product_type,
    type,
    quantity,
    image,
    categories,
    tags,
    variation_options,
    variations,
    ...simpleValues
  } = values;


  return {
    ...simpleValues,

    // language: router.locale,
    type: type?._id,
    product_type: product_type?.value,
    categories: categories?.map((category) => category?._id),
    tags: tags?.map((tag) => tag?._id),
    image: values?.image,
    gallery: values.gallery,
    ...(product_type?.value === ProductType?.Simple && {
      quantity,
     
    }),
    variations: [],
    variation_options: {
      upsert: [],
      delete: initialValues?.variation_options?.map(
        (variation: Variation) => variation?._id
      ),
    },
    ...(product_type?.value === ProductType?.Variable && {
      quantity: calculateQuantity(variation_options),
       variations: values?.variations?.flatMap(({ value }: any) => {
              return value?.map(({ id, _id }: any) => id ?? _id);
            }),
      variation_options: {
        // @ts-ignore
        upsert: variation_options?.map(
          ({
            options,
            id,
            ...rest
          }: any) => ({
            ...(id !== '' ? { id } : {}),
            ...omit(rest, '__typename'),
            
            options: processOptions(options).map(
              ({ name, value }: VariationOption) => ({
                name,
                value,
              })
            ),
          })
        ),
        delete: initialValues?.variation_options
          ?.map((initialVariationOption: Variation) => {
            // @ts-ignore
            const find = variation_options?.find(
              (variationOption: Variation) =>
                variationOption?._id === initialVariationOption?._id
            );
            if (!find) {
              return initialVariationOption?._id;
            }
          })
          .filter((item?: number) => item !== undefined),
      },
    }),
    ...calculateMinMaxPrice(variation_options),
  };
}
