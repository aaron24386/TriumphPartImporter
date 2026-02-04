import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';

type Basket = {
  id: string;
  name: string;
  partList: object[];
};

const Basket = ({
  basket,
  navigateToView,
  setStatusMessage,
}: {
  basket: Basket;
  navigateToView: any;
  setStatusMessage: any;
}) => {
  console.log(`this Basket: ${JSON.stringify(basket)}`);
  return (
    <div className={`flex py-1 text-sm hover:bg-gray-100`} onClick={() => navigateToView('partsView', basket.id)}>
      <div className={`w-2/5 flex-none px-1`}>{basket.name}</div>
      <div className={`w-1/5 flex-none`}>{Object.keys(basket.partList).length} parts</div>
      <div className={`w-1/5 flex-none`}>
        {/* TODO: disable button if we are not on a lizzy page */}
        <button
          className={`bg-[#ACC5FD] hover:bg-[#9EB0DB] px-2 py-1 rounded`}
          onClick={e => importBasket(e, basket, setStatusMessage)}>
          Import
        </button>
      </div>
      <div className={`w-1/5 flex-none text-right text-lg font-bold pr-1`}>{'>'}</div>
    </div>
  );
};

const importBasket = async (e, basket: Basket, setStatusMessage) => {
  e.stopPropagation();

  const validUrls = ['https://*.nizex.com/'];
  try {
    const [tab] = await chrome.tabs.query({ active: true, url: validUrls });

    if (!tab || !tab.id) {
      setStatusMessage({ text: 'No Lizzy tab found', type: 'error' });
      return;
    }

    const importBasketMessage = {
      type: 'IMPORT_BASKET',
      basket,
    };
    const response = await chrome.tabs.sendMessage(tab.id, importBasketMessage);

    // AP: TODO: add messaging when basket is successfully or unsuccessfully imported
    if (response?.success) {
      console.log('Basket imported successfully');
      setStatusMessage({ text: 'Basket imported successfully', type: 'success' });
    } else {
      console.error('Failed to import basket');
      setStatusMessage({ text: 'Failed to import basket', type: 'error' });
    }
  } catch (e) {
    setStatusMessage({ text: `Failed to import basket: ${e}`, type: 'error' });
  }
};

export default withErrorBoundary(withSuspense(Basket, <div> Loading ... </div>), <div> Error Occur </div>);
