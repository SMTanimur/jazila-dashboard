'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';

interface AlertProps {
  title: ReactNode;
  icon?:ReactNode;
  description?: ReactNode;
  show: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDestructive?: boolean;
  isPerformingAction?: boolean;
  confirmText?: string;
  children?: ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
}

const Alert: FC<AlertProps> = ({
  title,
  description,
  show,
  icon,
  size = 'sm',
  isDestructive = false,
  isPerformingAction = false,
  confirmText,
  children,
  onConfirm,
  onClose,
}) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={() => onClose?.()}
      >
        <div className='flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-100'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-900/80' />
          </Transition.Child>
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          />
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-100'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={cn(
                { 'sm:max-w-5xl': size === 'lg' },
                { 'sm:max-w-3xl': size === 'md' },
                { 'sm:max-w-lg': size === 'sm' },
                { 'sm:max-w-sm': size === 'xs' },
                'inline-block w-full scale-100 rounded-xl  h-full bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:align-middle  p-10 '
              )}
            >
              <div className='gap-y-14'>

              
              <div className='flex flex-col items-center  space-y-7'>
              {icon}
              
                <b className='text-xl'>{title}</b>
                {description ? <p>{description}</p> : null}
            
               
              </div>
          
              <div>{children}</div>
              <div className='flex justify-between items-center space-x-3 mt-8  '>
                {onConfirm ? (
                  <Button
                    className='w-full rounded-lg'
                    size='lg'
                    variant={isDestructive ? 'danger' : 'default'}
                    disabled={isPerformingAction}
                    onClick={() => onConfirm()}
                  >
                    {confirmText}
                  </Button>
                ) : null}
                <Button
                  className='w-full rounded-lg'
                  size='lg'
                  variant='secondary'
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Alert;
