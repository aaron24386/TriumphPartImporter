import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';

type Basket = {
  id: string;
  name: string;
  partList: object[];
};

const Basket = ({ basket, navigateToView }: { basket: Basket; navigateToView: any }) => {
  console.log(`this Basket: ${JSON.stringify(basket)}`);
  return (
    <div className={`flex py-1 text-sm hover:bg-gray-100`} onClick={() => navigateToView('partsView', basket.name)}>
      <div className={`w-2/5 flex-none px-1`}>{basket.name}</div>
      <div className={`w-1/5 flex-none`}>{Object.keys(basket.partList).length} parts</div>
      <div className={`w-1/5 flex-none`}>
        <button className={`bg-[#ACC5FD] hover:bg-[#9EB0DB] px-2 py-1 rounded`}>Import</button>
      </div>
      <div className={`w-1/5 flex-none text-right text-lg font-bold pr-1`}>{'>'}</div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Basket, <div> Loading ... </div>), <div> Error Occur </div>);
