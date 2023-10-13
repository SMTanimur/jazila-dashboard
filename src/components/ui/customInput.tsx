'use client';
import type { ComponentProps, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<ComponentProps<'input'>, 'prefix'> {
  label?: string;
  prefix?: string | ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      prefix,
      type = 'text',
      iconLeft,
      iconRight,
      className = '',
      ...props
    },
    ref
  ) {
   

    const iconStyles = [
      'text-zinc-500 [&>*]:peer-focus:text-brand [&>*]:h-5',
    ];

    return (
      <div>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <span
          tabIndex={-1}
          className={cn({ 'order-first pl-3': iconLeft }, iconStyles)}
        >
          {iconLeft}
        </span>
        <span
          tabIndex={-1}
          className={cn({ 'order-last pr-3 ': iconRight }, iconStyles)}
        >
          {iconRight}
        </span>
      </div>
    );
  }
);
