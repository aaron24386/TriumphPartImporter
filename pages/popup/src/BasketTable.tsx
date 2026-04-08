import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { IBasket, NavigateToViewFunction } from '../../../chrome-extension/public/types';
import Basket from '@src/Basket';
import SubHeader from '@src/SubHeader';

const BasketTable = ({
  basketsById,
  navigateToView,
  filterText,
  deleteBasket,
}: {
  basketsById: Record<string, IBasket>;
  navigateToView: NavigateToViewFunction;
  filterText: string;
  deleteBasket: (basketId: string) => void;
}) => {
  const basketList = Object.values(basketsById).reduce((basketList, basket: IBasket) => {
    if (basket.name.toLowerCase().includes(filterText)) {
      basketList.push(
        <Basket key={basket.id} basket={basket} navigateToView={navigateToView} deleteBasket={deleteBasket} />,
      );
    }

    return basketList;
  }, [] as React.ReactNode[]);

  return (
    <div className={'h-auto'}>
      <SubHeader header1={'Baskets'} header2={'Parts'}></SubHeader>
      <div className={'h-[400px] overflow-auto'}>{basketList}</div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(BasketTable, <div> Loading ... </div>), <div> Error Occur </div>);
