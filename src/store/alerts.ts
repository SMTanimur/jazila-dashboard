
import { create } from "zustand";

interface GlobalAlertState {
  showAlert: boolean;
  alertData: any;
  setShowAlert: (showAlert: boolean, alertData: any) => void;

  showGroupAlert: boolean;
  groupAlertData: any;
  setShowGroupAlert: (showGroupAlert: boolean, groupAlertData: any) => void;
  showCategoryAlert: boolean;
  categoryAlertData: any;
  setShowCategoryAlert: (
    showCategoryAlert: boolean,
    categoryAlertData: any
  ) => void;

  showTagAlert: boolean;
  tagAlertData: any;
  setShowTagAlert: (showTagAlert: boolean, tagAlertData: any) => void;

  showAttributeAlert: boolean;
  attributeAlertData: any;
  setShowAttributeAlert: (
    showAttributeAlert: boolean,
    attributeAlertData: any
  ) => void;

  showProductAlert: boolean;
  productAlertData: any;
  setShowProductAlert: (
    showProductAlert: boolean,
    productAlertData: any
  ) => void;

  showQuestionAlert: boolean;
  questionAlertData: any;
  setShowQuestionAlert: (
    showQuestionAlert: boolean,
    questionAlertData: any
  ) => void;
}

export const useGlobalAlertStateStore = create<GlobalAlertState>((set) => ({
  showAlert: false,
  alertData: null,
  forceShop: false,
  setShowAlert: (showAlert, alertData) => set(() => ({ showAlert, alertData })),

  showGroupAlert: false,
  groupAlertData: null,
  setShowGroupAlert: (showGroupAlert, groupAlertData) =>
    set(() => ({ showGroupAlert, groupAlertData })),

  showCategoryAlert: false,
  categoryAlertData: null,
  setShowCategoryAlert: (showCategoryAlert, categoryAlertData) =>
    set(() => ({ showCategoryAlert, categoryAlertData })),

  showTagAlert: false,
  tagAlertData: null,
  setShowTagAlert: (showTagAlert, tagAlertData) =>
    set(() => ({ showTagAlert, tagAlertData })),

  showAttributeAlert: false,
  attributeAlertData: null,
  setShowAttributeAlert: (showAttributeAlert, attributeAlertData) =>
    set(() => ({ showAttributeAlert, attributeAlertData })),

  showProductAlert: false,
  productAlertData: null,
  setShowProductAlert: (showProductAlert, productAlertData) =>
    set(() => ({ showProductAlert, productAlertData })),

  showQuestionAlert: false,
  questionAlertData: null,
  setShowQuestionAlert:(showQuestionAlert: boolean,questionAlertData: any) => set(()=>({showQuestionAlert,questionAlertData}))
}));
