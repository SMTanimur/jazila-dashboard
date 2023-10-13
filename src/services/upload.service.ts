import { HttpClient } from '@/utils/api/http';
import { TDeleteImage, TDeleteImages } from '@/validations/upload';

export interface IUploadedImage {
  img_id: string;
  img_url: string;
}

export interface IUploadDeletesVariables {
  variables: {
    public_id: string[];
  };
}
export interface IUploadVariables {
  variables: {
    public_id: string;
  };
}

export const uploadImage = async (formData: FormData) => {
  return await HttpClient.post<{ image: IUploadedImage }>(
    '/upload/image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const uploadImages = async (formData: FormData) => {
  return await HttpClient.post<{ images: IUploadedImage[] }>(
    '/upload/images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
export const deleteImages = (data: TDeleteImage) => {
  return HttpClient.put(`/upload`, data);
};
export const deleteAllImages =  (data: TDeleteImages) => {
  return HttpClient.put(`/upload/all`, data);
};
