import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { IBasket, IPart } from '../../../chrome-extension/public/types';
import Part from '@src/Part';
import Header from '@src/Header';

const PartTable = ({ basket }: { basket: IBasket }) => {
  const partList = basket.partList.map((part: IPart) => <Part key={part.number} part={part} />);

  return (
    <>
      <Header header1={'Part No.'} header2={'Part Desc.'} header3={'Qty'}></Header>
      {partList}
    </>
  );
};

export default withErrorBoundary(withSuspense(PartTable, <div> Loading ... </div>), <div> Error Occur </div>);
