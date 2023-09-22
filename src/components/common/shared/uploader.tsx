import { Icons } from '@/components/ui/icons';
import { useUploadMutation } from '@/hooks/upload/useUpload';
import { IUploadedImage, deleteImages } from '@/services/upload.service';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploaderProps {
  onChange: (value: any) => any;
  value: any;
  multiple: boolean;
}

const getPreviewImage = (value: any) => {
  let images: IUploadedImage[] = [];
  if (value) {
    if (Array.isArray(value)) {
      images = value;
    } else {
      images = [value];
    }
  }
  return images;
};
export default function Uploader({ onChange, value, multiple }: UploaderProps) {
  const [files, setFiles] = useState<IUploadedImage[]>(getPreviewImage(value));

  const { mutate: upload, isLoading } = useUploadMutation(multiple);
  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      },
      multiple,
      onDrop: async (acceptedFiles: any) => {
        const formData = new FormData();
        if (acceptedFiles.length) {
          for (const key of Object.keys(acceptedFiles)) {
            formData.append('files', acceptedFiles[key]);
          }
          upload(
            formData, // it will be an array of uploaded attachments
            {
              onSuccess: (data: any) => {
                console.log(data);
                let mergedData;
                if (multiple) {
                  mergedData = files.concat(data);
                  setFiles(files.concat(data));
                } else {
                  mergedData = data[0];
                  setFiles([data]);
                }
                if (onChange) {
                  onChange(mergedData);
                }
              },
            }
          );
        }
      },
    });
  console.log(files);

  const handleDelete = async (image: IUploadedImage) => {
    const images = files.filter(file => file.img_id !== image.img_id);

    try {
      setFiles(images);
      if (onChange) {
        onChange(images);
      }
      await deleteImages(image.img_id);
    } catch (error: any) {}
  };
  const thumbs = files?.map((file: IUploadedImage, idx) => {
    return (
      <div
        className='relative inline-flex flex-col mt-2 overflow-hidden border rounded border-border-200 me-2'
        key={idx}
      >
        <div className='flex items-center justify-center w-16 h-16 min-w-0 overflow-hidden'>
          <img src={file.img_url} />
        </div>

        <button
          className='absolute flex items-center justify-center w-4 h-4 text-xs bg-red-600 rounded-full shadow-xl outline-none text-light top-1 end-1'
          onClick={() => handleDelete(file)}
          type='button'
        >
          <Icons.close width={10} height={10} />
        </button>
      </div>
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files]
  );

  return (
    <section className='upload'>
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
        })}
      >
        <input {...getInputProps()} />
        <Icons.upload className='text-muted-light' />
        <p className='mt-4 text-sm text-center text-body'>
          <span className='font-semibold text-accent'>Upload</span> some
          <br />
          <span className='text-xs text-body'>Format</span>
        </p>
      </div>

      {!!thumbs.length && (
        <aside className='flex flex-wrap mt-2'>
          {!!thumbs.length && thumbs}
          {isLoading && (
            <div className='flex items-center h-16 mt-2 ms-2'>
              <Icons.spinner className='w-6 h-6' />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
