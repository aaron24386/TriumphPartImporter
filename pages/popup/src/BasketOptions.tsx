import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import Modal from '@src/Modal';
import type { IBasket } from '../../../chrome-extension/public/types';

const BasketOptions = ({ deleteBasket, basket }: { deleteBasket: (basketId: string) => void; basket: IBasket }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="absolute right-0 w-28 bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded shadow-lg z-10">
      <button
        id="delete-basket-button"
        onClick={e => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="w-full text-left px-3 py-2 text-sm text-[#ff2626] hover:bg-gray-100 rounded flex">
        <img src="trash.svg" alt="trash" width="20" height="20" className="inline" /> Delete
      </button>
      {showModal && (
        <Modal deleteBasket={deleteBasket} setShowModal={setShowModal} basketId={basket.id} basketName={basket.name} />
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(BasketOptions, <div> Loading ... </div>), <div> Error Occur </div>);
