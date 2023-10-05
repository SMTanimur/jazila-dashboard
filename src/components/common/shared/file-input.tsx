import { Controller } from 'react-hook-form';
import Uploader from './uploader';

interface FileInputProps extends React.HTMLAttributes<HTMLDivElement> {
  control: any;
  name: string;
  multiple?: boolean;
}

const FileInput = ({
  control,
  name,
  multiple = true,
  className,
}: FileInputProps) => {
  
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { ref, onChange, value, ...rest } }) => {
        console.log(value,'value')
        return (
          <Uploader
            {...rest}
            value={value}
            onChange={onChange}
            className={className}
            multiple={multiple}
          />
        );
      }}
    />
  );
};

export default FileInput;
