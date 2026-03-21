import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';

const Header = ({ header1, header2, header3 }: { header1?: string; header2?: string; header3?: string }) => {
  return (
    <div className={`flex py-1 text-base`}>
      <div className={`w-2/5 flex-none px-1`}>{header1 || ''}</div>
      <div className={`w-2/5 flex-none`}>{header2 || ''}</div>
      <div className={`w-1/5 flex-none`}>{header3 || ''}</div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Header, <div> Loading ... </div>), <div> Error Occur </div>);
