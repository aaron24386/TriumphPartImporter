import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { IBasket, IPart, NavigateToViewFunction } from '../../../chrome-extension/public/types';
import Part from '@src/Part';
import Header from '@src/Header';
import SubHeader from '@src/SubHeader';

const PartTable = ({
  basket,
  navigateToView,
  filterText,
}: {
  basket: IBasket;
  navigateToView: NavigateToViewFunction;
  filterText: string;
}) => {
  const partList = basket.partList.reduce((partList, part: IPart) => {
    if (part.number.toLowerCase().includes(filterText) || part.description.toLowerCase().includes(filterText)) {
      partList.push(<Part key={part.number} part={part} />);
    }
    return partList;
  }, [] as React.ReactNode[]);

  return (
    <div className={'h-auto'}>
      <Header header={basket.name} navigateToView={navigateToView}></Header>
      <SubHeader header1={'Part No.'} header2={'Part Desc.'} header3={'Qty'}></SubHeader>
      <div className={'h-[400px] overflow-auto'}>{partList}</div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(PartTable, <div> Loading ... </div>), <div> Error Occur </div>);
