import { withErrorBoundary, withSuspense } from '@extension/shared';

const SearchBar = ({ setFilterText }: { setFilterText: (filterText: string) => void }) => {
  return (
    <div className={`flex-auto px-2 pt-2`}>
      <input
        type="text"
        className={`w-full px-2 py-1.5 text-sm rounded border`}
        placeholder="Find Basket"
        onChange={e => {
          setFilterText(e.target.value.toLowerCase());
        }}></input>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SearchBar, <div> Loading ... </div>), <div> Error Occur </div>);
