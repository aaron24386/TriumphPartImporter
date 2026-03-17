import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState, useEffect, useMemo } from 'react';
import BasketTable from '@src/BasketTable';
import PartTable from '@src/PartTable';
import SearchBar from '@src/SearchBar';
import type { IBasket } from '../../../chrome-extension/public/types';

let basketsById: Record<string, IBasket> = {};
const getBaskets = async () => {
  const { baskets } = await chrome.storage.local.get('baskets');
  basketsById = baskets || {};
};
getBaskets();
const Popup = () => {
  const [currentView, setCurrentView] = useState<string>('basketsView');
  const [selectedBasketId, setSelectedBasketId] = useState<string>('');

  const navigateToView = (view: string, basketId?: string) => {
    setCurrentView(view);
    setSelectedBasketId(basketId || '');
  };

  console.log('basketsById', Object.values(basketsById));
  console.log('currentView', currentView);
  return (
    <div>
      {/* TODO: implement search bar logic for parts and baskets, this is just the back button for now */}
      <SearchBar navigateToView={navigateToView} currentView={currentView}></SearchBar>
      {/* TODO: tabs to switch between saved baskets and potential settings page */}
      {currentView == 'basketsView' && <BasketTable basketsById={basketsById} navigateToView={navigateToView} />}
      {currentView == 'partsView' && <PartTable basket={basketsById[selectedBasketId]} />}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
