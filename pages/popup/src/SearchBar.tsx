import { withErrorBoundary, withSuspense } from '@extension/shared';

const SearchBar = ({
  basketsById,
  navigateToView,
  currentView,
  selectedBasketId,
}: {
  basketsById: any;
  navigateToView: any;
  currentView: string;
  selectedBasketId: any;
}) => {
  // TODO: update displayed basket results, need to pass useState for baskets here, probably want a new one for filtered results and then one for original
  return (
    <div className={`flex py-1 ml-1`}>
      <div className={`w-1/5 flex-none px-1`}>
        {currentView !== 'basketsView' && (
          <button
            className={`bg-[#ACC5FD] hover:bg-[#9EB0DB] px-2 py-1 rounded`}
            onClick={() => navigateToView('basketsView')}>
            Back
          </button>
        )}
      </div>
      <div className={`w-4/5 flex-none`}>
        <input
          type="text"
          className={`w-4/5 px-1 rounded border`}
          placeholder="Find Basket"
          onChange={e => {
            filterResults(basketsById, e.target.value.toLowerCase(), selectedBasketId);
          }}></input>
      </div>
    </div>
  );
};

const filterResults = (basketsById: any, input: string, selectedBasketId: string) => {
  let filteredResults = [];
  if (selectedBasketId) {
    filteredResults = basketsById[selectedBasketId].parts.filter((part: any) => {
      return part.number.toLowerCase().includes(input) || part.description.toLowerCase().includes(input);
    });
  } else {
    for (let id in basketsById) {
      if (id.includes(input)) {
        filteredResults.push(basketsById[id]);
      }
    }
  }

  return filteredResults;
};

export default withErrorBoundary(withSuspense(SearchBar, <div> Loading ... </div>), <div> Error Occur </div>);
