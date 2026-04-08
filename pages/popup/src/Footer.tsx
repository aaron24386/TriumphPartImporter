import { useState } from 'react';
import '@src/Popup.css';
import Modal from '@src/Modal';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { IBasket } from '../../../chrome-extension/public/types';

const Footer = ({ basket, deleteBasket }: { basket: IBasket; deleteBasket: (basketId: string) => void }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`flex py-1`}>
      <div className={`w-1/5 flex-none px-1`}>
        <button className={`bg-[#FFACAC] hover:bg-[#E49999] px-4 py-2 rounded`} onClick={() => setShowModal(true)}>
          Delete
        </button>
      </div>

      {showModal && (
        <Modal deleteBasket={deleteBasket} setShowModal={setShowModal} basketId={basket.id} basketName={basket.name} />
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Footer, <div> Loading ... </div>), <div> Error Occur </div>);
