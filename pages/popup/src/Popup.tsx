import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState, useEffect, useMemo } from 'react';
import Basket from '@src/Basket';
import SearchBar from '@src/SearchBar';
import Header from '@src/Header';
import Part from '@src/Part';

const Popup = async () => {
  const [currentView, setCurrentView] = useState<string>('basketsView');
  const [selectedBasketId, setSelectedBasketId] = useState<string>('');
  const [basketsById, setBasketsById] = useState<any>({});

  useEffect(() => {
    const loadBaskets = async () => {
      const { baskets } = await chrome.storage.local.get('baskets');
      console.log(baskets);
      setBasketsById(baskets || {});
    };
    loadBaskets();
  }, []);

  const navigateToView = (view: string, basketName?: string) => {
    setCurrentView(view);
    setSelectedBasketId(basketName || '');
  };

  const basketsView = useMemo(() => getBasketList(basketsById, navigateToView), [basketsById, navigateToView]);
  const partsView = useMemo(
    () => getPartsList(basketsById, navigateToView, selectedBasketId),
    [basketsById, navigateToView, selectedBasketId],
  );

  return (
    <div>
      <SearchBar
        basketsById={basketsById}
        navigateToView={navigateToView}
        currentView={currentView}
        selectedBasketId={selectedBasketId}></SearchBar>
      {/* TODO: tabs to switch between saved baskets and potential settings page */}
      {currentView == 'basketsView' && basketsView}
      {currentView == 'partsView' && partsView}
    </div>
  );
};

const getBasketList = (basketsById: any, navigateToView: any) => {
  const basketHeader = <Header header1={'Baskets'} header2={'Parts'}></Header>;
  const basketList = Object.keys(basketsById).map(basketId => (
    <Basket basket={basketsById[basketId]} navigateToView={navigateToView} />
  ));

  return (
    <>
      {basketHeader}
      {basketList}
    </>
  );
};

const getPartsList = (basketsById: any, navigateToView: any, selectedBasketName: string) => {
  if (!selectedBasketName) {
    return;
  }

  // TODO: Need a back button
  const partHeader = <Header header1={'Part No.'} header2={'Part Desc.'} header3={'Qty'}></Header>;
  const partList = basketsById[selectedBasketName].partList.map((part: any) => (
    <Part part={part} navigateToView={navigateToView} />
  ));

  return (
    <>
      {partHeader}
      {partList}
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
