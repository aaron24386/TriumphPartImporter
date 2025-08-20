import Basket from './basket';

// AP: TODO: none of this works any more because the site was updated.
export const exportBasket = () => {
  /**
   * Export Button Logic: want to update this to add the button to where the basket name
   * is
   */
  const buttonLocationElement = document.querySelector('#name');
  if (buttonLocationElement) {
    const exportBasketButton = document.createElement('input');
    exportBasketButton.value = `Export Basket`;
    exportBasketButton.type = 'button';
    exportBasketButton.name = 'exportBasketButton';
    exportBasketButton.onclick = collectBasketInformation;

    buttonLocationElement.insertAdjacentElement('beforebegin', exportBasketButton);
  }

  /**
   * TODO: Check if this element was added, possible just move to an element that always exists
   */

  function collectBasketInformation() {
    // TODO: doesn't appeart to exist any more
    // const basketId = document.querySelector("#ctl00_ContentPlaceHolder1_txtBasketID")?.textContent;
    const basketName = document.querySelector('#name')?.value;
    const basket = new Basket({ id: basketId, name: basketName });

    if (!basketName || !basketId) {
      alert('Basket name is required to export');
      return;
    }

    const partRows = document.querySelectorAll('[title^="Search part"]');
    const quantityRows = document.querySelectorAll('[id^="qty-requested"]');
    const descriptionRows = document.querySelectorAll('td:nth-of-type(2)');

    if (partRows.length > 0 && quantityRows.length > 0 && descriptionRows.length > 0) {
      const rowCount = partRows.length;

      if (rowCount > 0) {
        for (var i = 0; i < rowCount; i++) {
          const quantity = parseInt(quantityRows[i].value);
          const partNumber = partRows[i]?.textContent;
          basket.addPart({
            partNumber,
            quantity,
            description: descriptionRows[i]?.textContent,
          });
        }

        const baskets = {};
        baskets[basketId] = basket;
        chrome.storage.local.set(baskets).then(() => {
          // Update to be a popup, maybe this comes from the extension instead?
          alert(`${basketName} saved to extension`);
        });
      } else {
        // Update to be a popup, maybe this comes from the extension instead?
        alert(`Please add parts to the basket before trying to export`);
      }
    }

    /**
     * Saving info that is pulled from this to the extension
     * Possibly add ability for user to see what was exported from triumph online
     * Cart name would be a good way to distinguish in case they want to export multiple at a time
     */
  }
};
