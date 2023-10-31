import { cartesian } from '@/utils/cartesian';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';




export function getFormattedVariations(variations: any) {
  const variationGroup = groupBy(variations, 'attribute.slug');
  return Object.values(variationGroup)?.map((vg) => {
    return {
      attribute: vg?.[0]?.attribute,
      value: vg?.map((v) => ({ id: v._id, value: v.value })),
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


export function filterAttributes(attributes: any, variations: any) {
  let res = [];
  res = attributes?.filter((el: any) => {
    return !variations.find((element: any) => {
      return element?.attribute?._id === el?._id;
    });
  });
  return res;
}

export function getCartesianProduct(values: any) {
  const formattedValues = values
    ?.map((v: any) =>
      v.value?.map((a: any) => ({ name: v.attribute.name, value: a.value }))
    )
    .filter((i: any) => i !== undefined);
  if (isEmpty(formattedValues)) return [];
  return cartesian(...formattedValues);
}

