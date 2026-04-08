import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import type { NavigateToViewFunction } from '../../../chrome-extension/public/types';
import { ViewOptions } from '../../../chrome-extension/public/enums';

const Header = ({ header, navigateToView }: { header: string; navigateToView: NavigateToViewFunction }) => {
  return (
    <div className={`relative flex items-center py-1`}>
      <button
        className={`absolute left-1 top-1/2 -translate-y-[45%] bg-[#ACC5FD] px-2 py-1 rounded hover:bg-[#9EB0DB]`}
        onClick={() => navigateToView(ViewOptions.BASKET_VIEW)}>
        <img src="leftarrow.svg" alt="left arrow" width="20" height="20" className="fill-current hover:bg-[#9EB0DB]" />
      </button>
      <div className={`w-full px-10 text-base text-center`}>{header}</div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Header, <div> Loading ... </div>), <div> Error Occur </div>);
