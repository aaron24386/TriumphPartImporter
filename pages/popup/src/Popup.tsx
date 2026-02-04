import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Basket from '@src/Basket';
import SearchBar from '@src/SearchBar';
import Header from '@src/Header';
import Part from '@src/Part';
import StatusMessage from './StatusMessage';

type Part = {
  number: string;
  description: string;
  quantity: number;
};

type StatusMessageType = {
  text?: string;
  type?: 'success' | 'error' | 'info';
};

const Popup = () => {
  const [currentView, setCurrentView] = useState<string>('basketsView');
  const [selectedBasketId, setSelectedBasketId] = useState<string>('');
  const [basketsById, setBasketsById] = useState<object>({});
  const [currentBasketsById, setCurrentBasketsById] = useState<object>({});
  const [statusMessage, setStatusMessage] = useState<StatusMessageType>({});

  useEffect(() => {
    const loadBaskets = async () => {
      const { baskets } = await chrome.storage.local.get('baskets');

      setBasketsById(baskets || {});
      setCurrentBasketsById(baskets || {});
    };

    loadBaskets();
  }, []);

  useEffect(() => {
    const { text: messageText } = statusMessage;
    if (!messageText?.trim()) return;

    const timeoutId = window.setTimeout(() => {
      setStatusMessage({ text: '' });
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  const navigateToView = useCallback((view: string, basketId?: string) => {
    setCurrentView(view);
    setSelectedBasketId(basketId || '');
  }, []);

  const basketsView = useMemo(
    () => getBasketList(currentBasketsById, navigateToView, setStatusMessage),
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
      <StatusMessage message={statusMessage} />
    </div>
  );
};

const getBasketList = (basketsById: object, navigateToView: string, setStatusMessage) => {
  const basketHeader = <Header header1={'Baskets'} header2={'Parts'}></Header>;
  const basketList = Object.keys(basketsById).map(basketId => (
    <Basket
      key={basketId}
      basket={basketsById[basketId]}
      navigateToView={navigateToView}
      setStatusMessage={setStatusMessage}
    />
  ));

  return (
    <>
      {basketHeader}
      {basketList}
    </>
  );
};

const getPartsList = (basketsById: object, navigateToView: string, selectedBasketId: string) => {
  if (!selectedBasketId) {
    return;
  }

  const partHeader = <Header header1={'Part No.'} header2={'Part Desc.'} header3={'Qty'}></Header>;
  const partList = basketsById[selectedBasketId].partList.map((part: Part) => (
    <Part key={part.number} part={part} navigateToView={navigateToView} />
  ));

  return (
    <>
      {partHeader}
      {partList}
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
