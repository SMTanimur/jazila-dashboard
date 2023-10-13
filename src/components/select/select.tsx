"use client"
import React from 'react';
import ReactSelect, { Props } from 'react-select';
import { selectStyles } from './select.styles';

export type Ref = any;

export const InputSelect = React.forwardRef<Ref, Props>((props, ref) => {

  return (
    <ReactSelect ref={ref} styles={selectStyles}  {...props} />
  );
});

InputSelect.displayName = 'InputSelect';

export default InputSelect;


