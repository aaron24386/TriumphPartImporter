import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import BasketTable from '@src/BasketTable';
import PartTable from '@src/PartTable';
import SearchBar from '@src/SearchBar';
import type { IBasket } from '../../../chrome-extension/public/types';
import { ViewOptions } from '../../../chrome-extension/public/enums';

let currentBaskets: Record<string, IBasket> = {};
const getBaskets = async () => {
  const { baskets } = await chrome.storage.local.get('baskets');
  currentBaskets = baskets || {};
};
getBaskets();

const Popup = () => {
  const [currentView, setCurrentView] = useState<ViewOptions>(ViewOptions.BASKET_VIEW);
  const [selectedBasketId, setSelectedBasketId] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');
  const [basketsById, setBasketsById] = useState<Record<string, IBasket>>(currentBaskets);

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
