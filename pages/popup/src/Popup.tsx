import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import BasketTable from '@src/BasketTable';
import PartTable from '@src/PartTable';
import SearchBar from '@src/SearchBar';
import type { IBasket } from '../../../chrome-extension/public/types';
import { ViewOptions } from '../../../chrome-extension/public/enums';

let basketsById: Record<string, IBasket> = {};
const getBaskets = async () => {
  const { baskets } = await chrome.storage.local.get('baskets');
  basketsById = baskets || {};
};
getBaskets();
const Popup = () => {
  const [currentView, setCurrentView] = useState<ViewOptions>(ViewOptions.BASKET_VIEW);
  const [selectedBasketId, setSelectedBasketId] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');

  const navigateToView = (view: ViewOptions, basketId?: string) => {
    setFilterText('');
    setCurrentView(view);
    setSelectedBasketId(basketId || '');
  };

  console.log('basketsById', Object.values(basketsById));
  return (
    <div>
      {/* TODO: implement search bar logic for parts and baskets, this is just the back button for now */}
      <SearchBar setFilterText={setFilterText}></SearchBar>
      {/* TODO: tabs to switch between saved baskets and potential settings page */}
      {currentView == ViewOptions.BASKET_VIEW && (
        <BasketTable basketsById={basketsById} navigateToView={navigateToView} filterText={filterText} />
      )}
      {currentView == ViewOptions.PARTS_VIEW && (
        <PartTable basket={basketsById[selectedBasketId]} navigateToView={navigateToView} filterText={filterText} />
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
