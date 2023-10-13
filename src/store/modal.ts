"use client"

import { create } from 'zustand';

interface GlobalModalState {
  shopApproveModal: boolean;
  modalData: any
  setShopApproveModal: (loginModal: boolean,modal:any) => void;
  
}
export const useGlobalModalStateStore = create<GlobalModalState>((set) => ({
  shopApproveModal: false,
  modalData: null,
  setShopApproveModal: (shopApproveModal,modalData) => set(() => ({ shopApproveModal,modalData})),
 
}));
