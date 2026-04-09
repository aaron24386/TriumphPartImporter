import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState, useEffect } from 'react';
import BasketTable from '@src/BasketTable';
import PartTable from '@src/PartTable';
import SearchBar from '@src/SearchBar';
import type { IBasket } from '../../../chrome-extension/public/types';
import { ViewOptions } from '../../../chrome-extension/public/enums';

let tabId: number = 0;

const Popup = () => {
  const [currentView, setCurrentView] = useState<ViewOptions>(ViewOptions.BASKET_VIEW);
  const [selectedBasketId, setSelectedBasketId] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');
  const [basketsById, setBasketsById] = useState<Record<string, IBasket>>({});

  useEffect(() => {
    chrome.storage.local.get('baskets').then(({ baskets }) => {
      setBasketsById(baskets || {});
    });

    chrome.tabs.query({ active: true, url: ['https://*.nizex.com/*'] }).then(([tab]) => (tabId = tab?.id ?? 0));
  }, []);

  const navigateToView = (view: ViewOptions, basketId?: string) => {
    setFilterText('');
    setCurrentView(view);
    setSelectedBasketId(basketId || '');
  };

  const deleteBasket = async (basketId: string) => {
    const { baskets } = await chrome.storage.local.get('baskets');
    delete baskets[basketId];
    setBasketsById(baskets);

    await chrome.storage.local.set({ baskets: baskets });

    if (currentView !== ViewOptions.BASKET_VIEW) {
      navigateToView(ViewOptions.BASKET_VIEW);
    }
  };

  console.log('basketsById', Object.values(basketsById));
  return (
    <div>
      <SearchBar setFilterText={setFilterText}></SearchBar>
      {/* TODO: tabs to switch between saved baskets and potential settings page */}
      {currentView == ViewOptions.BASKET_VIEW && (
        <BasketTable
          basketsById={basketsById}
          navigateToView={navigateToView}
          filterText={filterText}
          deleteBasket={deleteBasket}
          tabId={tabId}
        />
      )}
      {currentView == ViewOptions.PARTS_VIEW && (
        <PartTable
          basket={basketsById[selectedBasketId]}
          navigateToView={navigateToView}
          filterText={filterText}
          deleteBasket={deleteBasket}
        />
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
