"use client";
import QuestionAnswerModal from "@/components/question/question-answer-modal";
import ApproveShopView from "@/components/shop/approve-shop-view";
import { Modal } from "@/components/ui/Modal";
import { useGlobalModalStateStore } from "@/store/modal";

const GlobalModals = () => {
  const setLoginModal = useGlobalModalStateStore(
    (state) => state.setShopApproveModal
  );
  const showLoginModal = useGlobalModalStateStore(
    (state) => state.shopApproveModal
  );

  const globalModal = useGlobalModalStateStore((state) => state);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Modal
        title={`Approve Shop`}
        size="md"
        show={showLoginModal}
        onClose={() => setLoginModal(false, null)}
      >
        <ApproveShopView />
      </Modal>

      <Modal
        title={`Anwser Question`}
        size="sm"
        show={globalModal.showQuestionAnswer}
        onClose={() => globalModal.setQuestionAnswerModal(false, null)}
      >
        <QuestionAnswerModal />
      </Modal>
    </>
  );
};

export default GlobalModals;
