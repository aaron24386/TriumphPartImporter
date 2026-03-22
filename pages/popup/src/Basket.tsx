import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { IBasket, NavigateToViewFunction } from '../../../chrome-extension/public/types';
import { ViewOptions } from '../../../chrome-extension/public/enums';

const Basket = ({ basket, navigateToView }: { basket: IBasket; navigateToView: NavigateToViewFunction }) => {
  const navigateToPartsView = () => navigateToView(ViewOptions.PARTS_VIEW, basket.id);

  return (
    <div
      className={`basket-row`}
      onClick={navigateToPartsView}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          navigateToPartsView();
        }
      }}>
      <div className={`w-2/5 flex-none px-1`}>{basket.name}</div>
      <div className={`w-1/5 flex-none`}>{Object.keys(basket.partList).length} parts</div>
      <div className={`w-1/5 flex-none`}>
        {/* TODO: disable button if we are not on a lizzy page */}
        <button className={`import-button`} onClick={e => importBasket(e, basket)}>
          Import
        </button>
      </div>
      <div className={`w-1/5 flex-none text-right text-lg font-bold pr-1`}>{'>'}</div>
    </div>
  );
};

const importBasket = async (e: React.MouseEvent, basket: IBasket) => {
  e.stopPropagation();
  console.log(`importing basket: ${basket}`);

  const validUrls = ['https://*.nizex.com/'];
  try {
    const [tab] = await chrome.tabs.query({ active: true, url: validUrls });

    if (!tab || !tab.id) {
      console.error('No Lizzy tab found');
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
    } else {
      console.error('Failed to import basket');
    }
  } catch (e) {
    console.error('Failed to import basket', e);
  }
};

export default withErrorBoundary(withSuspense(Basket, <div> Loading ... </div>), <div> Error Occur </div>);
