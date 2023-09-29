'use client';
import { create } from 'zustand';

interface GlobalAlertState {
  showAlert: boolean;
  alertData: any
  setShowAlert: (
    showAlert: boolean,
    alertData: any
  ) => void;

}

export const useGlobalAlertStateStore = create<GlobalAlertState>((set) => ({
  showAlert: false,
  alertData: null,
  forceShop: false,
  setShowAlert: (showAlert, alertData) =>
    set(() => ({ showAlert, alertData })),
}));
