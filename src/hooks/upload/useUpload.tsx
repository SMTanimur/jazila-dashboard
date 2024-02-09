'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadImage, uploadImages } from '@/services/upload.service';

export const useUploadMutation = (multiple: boolean) => {

  return useMutation(
   async (input: any) => {
      if (multiple) {
        const {images}= await uploadImages(input);
        return images
      } else {
        const {image}= await uploadImage(input);
        return image
      }
    },
    {
      // Always refetch after error or success:
      onSettled: () => {
     
      },
    }
  );
};
