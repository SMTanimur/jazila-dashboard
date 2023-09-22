import * as React from 'react';
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from 'react-dropzone';
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';
import { toast } from 'sonner';
import 'cropperjs/dist/cropper.css';
import Image from 'next/image';
import { IUploadedImage, deleteImages } from '@/services/upload.service';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn, formatBytes } from '@/lib/utils';
import { useUploadMutation } from '@/hooks/upload/useUpload';

// FIXME Your proposed upload exceeds the maximum allowed size, this should trigger toast.error too

interface FilesDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName;
  setValue: UseFormSetValue<TFieldValues>;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  multiple: boolean;
  files: IUploadedImage[] 
  setFiles: React.Dispatch<React.SetStateAction<IUploadedImage[] | null>>;
}

export function FilesDialog<TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    'image/*': [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  multiple = true,
  className,
  ...props
}: FilesDialogProps<TFieldValues>) {
  const { mutate: upload, isLoading } = useUploadMutation(multiple);
  const onDrop = React.useCallback(
    async (acceptedFiles: any, rejectedFiles: FileRejection[]) => {
      const formData = new FormData();
      if (acceptedFiles.length) {
        for (const key of Object.keys(acceptedFiles)) {
          formData.append('files', acceptedFiles[key]);
        }
      }
      upload(
        formData, // it will be an array of uploaded attachments
        {
          onSuccess: (data: any) => {
            console.log(data);
            if (multiple) {
              setFiles(files?.concat(data));
            } else {
              setFiles([data]);
            }
          },
        }
      );
      // setFiles((prev) => [...(prev ?? []), fileWithPreview])

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === 'file-too-large') {
            toast.error(
              `File is too large. Max size is ${formatBytes(maxSize)}`
            );
            return;
          }
          errors[0]?.message && toast.error(errors[0].message);
        });
      }
    },

    [maxSize, setFiles]
  );

  // Register files to react-hook-form
  React.useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple,
  });

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach(file => URL.revokeObjectURL(file.img_url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' disabled={isLoading}>
          Upload Images
          <span className='sr-only'>Upload Images</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[480px]'>
        <p className='absolute left-5 top-4 text-base font-medium text-muted-foreground'>
          Upload your images
        </p>
        <div
          {...getRootProps()}
          className={cn(
            'group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
            'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            isDragActive && 'border-muted-foreground/50',
            isLoading && 'pointer-events-none opacity-60',
            className
          )}
          {...props}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <div className='group grid w-full place-items-center gap-1 sm:px-10'>
              <Icons.upload
                className='h-9 w-9 animate-pulse text-muted-foreground'
                aria-hidden='true'
              />
            </div>
          ) : isDragActive ? (
            <div className='grid place-items-center gap-2 text-muted-foreground sm:px-5'>
              <Icons.upload
                className={cn('h-8 w-8', isDragActive && 'animate-bounce')}
                aria-hidden='true'
              />
              <p className='text-base font-medium'>Drop the file here</p>
            </div>
          ) : (
            <div className='grid place-items-center gap-1 sm:px-5'>
              <Icons.upload
                className='h-8 w-8 text-muted-foreground'
                aria-hidden='true'
              />
              <p className='mt-2 text-base font-medium text-muted-foreground'>
                Drag {`'n'`} drop file here, or click to select file
              </p>
              <p className='text-sm text-slate-500'>
                Please upload file with size less than {formatBytes(maxSize)}
              </p>
            </div>
          )}
        </div>
        <p className='text-center text-sm font-medium text-muted-foreground'>
          You can upload up to {maxFiles} {maxFiles === 1 ? 'file' : 'files'}
        </p>
        {files?.length ? (
          <div className='grid gap-5'>
            {files?.map((file, i) => (
              <FileCard
                key={i}
                i={i}
                files={files}
                setFiles={setFiles}
                file={file}
              />
            ))}
          </div>
        ) : null}
        {files?.length ? (
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2.5 w-full'
            onClick={() => setFiles(null)}
          >
            <Icons.trash className='mr-2 h-4 w-4' aria-hidden='true' />
            Remove All
            <span className='sr-only'>Remove all</span>
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

interface FileCardProps {
  i: number;
  file: IUploadedImage;
  files: IUploadedImage[] | null;
  setFiles: React.Dispatch<React.SetStateAction<IUploadedImage[] | null>>;
}

function FileCard({ i, file, files, setFiles }: FileCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);


  const handleDelete = async (image: IUploadedImage) => {
    const images = files?.filter(file => file.img_id !== image.img_id);

    try {
      setFiles(images as IUploadedImage[]);
    
      await deleteImages(image.img_id);
    } catch (error: any) {}
  };

  React.useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className='relative flex items-center justify-between gap-2.5'>
      <div className='flex items-center gap-2'>
        <Image
          src={ file.img_url}
          alt={file.img_id}
          className='h-10 w-10 shrink-0 rounded-md'
          width={40}
          height={40}
          loading='lazy'
        />
        <div className='flex flex-col'>
          <p className='line-clamp-1 text-sm font-medium text-muted-foreground'>
            {file.img_id}
          </p>
          {/* <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p> */}
        </div>
      </div>
      <div className='flex items-center gap-2'>
       
        <Button
          type='button'
          variant='outline'
          size='icon'
          className='h-7 w-7'
          onClick={() => {
            console.log(file,'file')
            if (!files) return;
            handleDelete(file)
          }}
        >
          <Icons.close className='h-4 w-4 text-white' aria-hidden='true' />
          <span className='sr-only'>Remove file</span>
        </Button>
      </div>
    </div>
  );
}
