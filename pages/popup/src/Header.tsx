import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { NavigateToViewFunction } from '../../../chrome-extension/public/types';
import { ViewOptions } from '../../../chrome-extension/public/enums';

const Header = ({ header, navigateToView }: { header: string; navigateToView: NavigateToViewFunction }) => {
  return (
    <div className={`flex py-1`}>
      <div className={`w-1/5 flex-none px-1`}>
        <button
          className={`bg-[#ACC5FD] hover:bg-[#9EB0DB] px-2 py-1 rounded`}
          onClick={() => navigateToView(ViewOptions.BASKET_VIEW)}>
          Back
        </button>
      </div>
      <div className={`w-4/5 flex-none text-base text-center`}>{header}</div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Header, <div> Loading ... </div>), <div> Error Occur </div>);
