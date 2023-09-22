import { Controller } from 'react-hook-form';
import Uploader from './uploader';
import { ChangeEvent } from 'react';
import { IImage } from '@/types';

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
}

const FileInput = ({
  control,
  name,
  multiple = true,
}: FileInputProps) => {
  console.log(name)
  return (

    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { ref, ...rest } }) => (
        <Uploader
          {...rest}
          multiple={multiple}
          
        />
      )}
    />
  );
};

export default FileInput;
