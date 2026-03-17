import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { IBasket, NavigateToViewFunction } from '../../../chrome-extension/public/types';
import Basket from '@src/Basket';
import Header from '@src/Header';

const BasketTable = ({
  basketsById,
  navigateToView,
}: {
  basketsById: Record<string, IBasket>;
  navigateToView: NavigateToViewFunction;
}) => {
  const basketList = Object.values(basketsById).map((basket: IBasket) => (
    <Basket key={basket.id} basket={basket} navigateToView={navigateToView} />
  ));

  return (
    <>
      <Header header1={'Baskets'} header2={'Parts'}></Header>
      {basketList}
    </>
  );
};

export default withErrorBoundary(withSuspense(BasketTable, <div> Loading ... </div>), <div> Error Occur </div>);
