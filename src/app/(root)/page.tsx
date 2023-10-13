/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useMe } from '@/hooks/user/useMe';
import React, { useEffect } from 'react';

const page = () => {
  const {isAuthorized,me}=useMe()

  useEffect(() => {
    if(isAuthorized ){
      if(me?.role == 'admin'){
        window.location.href = '/admin/dashboard'
      }else{
        window.location.href = '/seller/dashboard'
      }

    }else{
      window.location.href = '/signin'
    }
    
  },[isAuthorized,me])
  
};

export default page;
