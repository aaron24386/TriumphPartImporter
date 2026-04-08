import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState, useEffect, useRef } from 'react';
import type { IBasket, NavigateToViewFunction } from '../../../chrome-extension/public/types';
import { ViewOptions } from '../../../chrome-extension/public/enums';
import BasketOptions from '@src/BasketOptions';

const Basket = ({
  basket,
  navigateToView,
  deleteBasket,
}: {
  basket: IBasket;
  navigateToView: NavigateToViewFunction;
  deleteBasket: (basketId: string) => void;
}) => {
  const [showBasketOptions, setShowBasketOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const navigateToPartsView = () => navigateToView(ViewOptions.PARTS_VIEW, basket.id);

  useEffect(() => {
    if (!showBasketOptions) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.button == 0 &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node) &&
        (e.target as HTMLElement).id !== 'delete-basket-button'
      ) {
        setShowBasketOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBasketOptions]);

  const deleteBasketHandler = () => {
    setShowBasketOptions(false);
    deleteBasket(basket.id);
  };

  return (
    <div className="relative">
      <div
        className={`basket-row basket-row-container`}
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
        <div ref={optionsRef} className="w-1/5 flex flex-none justify-center">
          <button
            className="dots-button"
            onClick={e => {
              e.stopPropagation();
              setShowBasketOptions(!showBasketOptions);
            }}>
            <img
              src="horizontaldots.svg"
              alt="horizontal dots"
              width="30"
              height="20"
              className="fill-current hover:bg-gray-100"
            />
          </button>
        </div>
      </div>
      {showBasketOptions && <BasketOptions deleteBasket={deleteBasketHandler} />}
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
