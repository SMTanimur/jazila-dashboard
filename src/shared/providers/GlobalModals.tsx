
"use client"
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
  

  return  (

      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        <Modal
          title={`Approve Shop`}
          size="md"
          show={showLoginModal}
          onClose={() => setLoginModal(false,null)}
        >
          <ApproveShopView/>
        </Modal>
       
      </>
 
  );
};

export default GlobalModals