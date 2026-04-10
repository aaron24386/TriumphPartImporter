import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';

const Modal = ({
  deleteBasket,
  setShowModal,
  basketName,
  basketId,
}: {
  deleteBasket: (basketId: string) => void;
  setShowModal: (showModal: boolean) => void;
  basketName: string;
  basketId: string;
}) => {
  return (
    <div className={`flex py-1`}>
      <div
        className="modal-overlay"
        onClick={e => {
          e.stopPropagation();
          setShowModal(false);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setShowModal(false);
          }
        }}>
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.stopPropagation();
            }
          }}>
          <p className="text-gray-800 text-base mb-6">
            Are you sure you want to delete <b>{basketName}</b>?
          </p>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              onClick={() => setShowModal(false)}
              tabIndex={0}>
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              onClick={() => deleteBasket(basketId)}
              tabIndex={0}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Modal, <div> Loading ... </div>), <div> Error Occur </div>);
