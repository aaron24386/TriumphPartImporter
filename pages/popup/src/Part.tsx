import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { IPart } from '../../../chrome-extension/public/types';

const Part = ({ part }: { part: IPart }) => {
  return (
    <div className={`flex py-1 text-sm hover:bg-gray-100`}>
      <div className={`w-2/5 flex-none px-1`}>{part.number}</div>
      <div className={`w-2/5 flex-none`}>{part.description}</div>
      <div className={`w-1/5 flex-none`}>{part.quantity}</div>
      {/* TODO: add a delete/trash button */}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Part, <div> Loading ... </div>), <div> Error Occur </div>);
