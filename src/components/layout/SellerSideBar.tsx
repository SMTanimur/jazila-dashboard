"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useCurrentUser } from '@/hooks/user/useCurrentUser'

const SellerSideBar = () => {
  const {currentUser}=useCurrentUser()
  return (
   <div className='flex flex-col justify-center'>
              <div className='flex flex-col justify-center items-center gap-3'>
                <Avatar className='w-[100px] h-[100px]'>
                  <AvatarImage
                    src={currentUser?.avatar}
                    alt={currentUser?.lastName}
                  />
                  <AvatarFallback>{currentUser?.lastName}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-center gap-1'>
                  <p className='text-2xl font-semibold leading-none tracking-tight'>
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <h6 className='text-sm text-muted-foreground'>
                    {currentUser?.email}
                  </h6>
                </div>
              </div>
            </div> 
  )
}

export default SellerSideBar