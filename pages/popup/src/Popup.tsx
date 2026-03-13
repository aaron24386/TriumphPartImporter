import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState, useEffect, useMemo } from 'react';
import Basket from '@src/Basket';
import SearchBar from '@src/SearchBar';
import Header from '@src/Header';
import Part from '@src/Part';
import type { IBasket, IPart } from '../../../chrome-extension/public/types';

const Popup = () => {
  const [currentView, setCurrentView] = useState<string>('basketsView');
  const [selectedBasketId, setSelectedBasketId] = useState<string>('');
  // const [basketsById, setBasketsById] = useState<any>({});
  const [currentBasketsById, setCurrentBasketsById] = useState<Record<string, IBasket>>({});

  useEffect(() => {
    const loadBaskets = async () => {
      const { baskets } = await chrome.storage.local.get('baskets');
      console.log(baskets);
      // setBasketsById(baskets || {});
      setCurrentBasketsById(baskets || {});
    };
    loadBaskets();
  }, []);

  const navigateToView = (view: string, basketId?: string) => {
    setCurrentView(view);
    setSelectedBasketId(basketId || '');
  };

  const basketsView = useMemo(
    () => getBasketList(currentBasketsById, navigateToView),
    [currentBasketsById, navigateToView],
  );
  const partsView = useMemo(
    () => getPartsList(currentBasketsById, navigateToView, selectedBasketId),
    [currentBasketsById, navigateToView, selectedBasketId],
  );

  return (
    <div>
      {/* TODO: implement search bar logic for parts and baskets, this is just the back button for now */}
      <SearchBar navigateToView={navigateToView} currentView={currentView}></SearchBar>
      {/* TODO: tabs to switch between saved baskets and potential settings page */}
      {currentView == 'basketsView' && basketsView}
      {currentView == 'partsView' && partsView}
    </div>
  );
};

const getBasketList = (
  basketsById: Record<string, IBasket>,
  navigateToView: (view: string, basketId?: string) => void,
) => {
  const basketHeader = <Header header1={'Baskets'} header2={'Parts'}></Header>;
  const basketList = Object.keys(basketsById).map((basketId: string) => (
    <Basket key={basketId} basket={basketsById[basketId]} navigateToView={navigateToView} />
  ));

  return (
    <>
      {basketHeader}
      {basketList}
    </>
  );
};

const getPartsList = (
  basketsById: Record<string, IBasket>,
  navigateToView: (view: string, basketId?: string) => void,
  selectedBasketId: string,
) => {
  if (!selectedBasketId) {
    return;
  }

  const partHeader = <Header header1={'Part No.'} header2={'Part Desc.'} header3={'Qty'}></Header>;
  const partList = basketsById[selectedBasketId].partList.map((part: IPart) => <Part key={part.number} part={part} />);

  return (
    <>
      {partHeader}
      {partList}
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
