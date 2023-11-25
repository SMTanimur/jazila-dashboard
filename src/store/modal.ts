import { create } from "zustand";

interface GlobalModalState {
  shopApproveModal: boolean;
  modalData: any;
  setShopApproveModal: (loginModal: boolean, modal: any) => void;
  showQuestionAnswer: boolean;
  questionAnswerData: any;
  setQuestionAnswerModal: (
    showQuestionAnswer: boolean,
    questionAnswerData: any
  ) => void;
}
export const useGlobalModalStateStore = create<GlobalModalState>((set) => ({
  shopApproveModal: false,
  modalData: null,
  setShopApproveModal: (shopApproveModal, modalData) =>
    set(() => ({ shopApproveModal, modalData })),

  showQuestionAnswer: false,
  questionAnswerData: null,
  setQuestionAnswerModal: (showQuestionAnswer, questionAnswerData) =>
    set(() => ({ showQuestionAnswer, questionAnswerData })),
}));
