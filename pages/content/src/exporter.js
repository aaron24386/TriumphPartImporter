import Basket from './basket';

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

  async function collectBasketInformation() {
    // TODO: there isn't a basket id any more so needs to be updated to not incorporate this.
    // TODO: this means that I potentially need to handle ensuring baskets are unique. Probably not important till later date
    // const basketId = document.querySelector("#ctl00_ContentPlaceHolder1_txtBasketID")?.textContent;
    const basketName = document.querySelector('#name')?.value.trim();
    const basket = new Basket({ name: basketName });

    if (!basketName) {
      alert('Basket name are required to export');
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
          const number = partRows[i]?.textContent;
          basket.addPart({
            number,
            quantity,
            description: descriptionRows[i]?.textContent,
          });
        }

        let { baskets } = await chrome.storage.local.get('baskets');
        console.log(baskets);
        baskets ??= {};
        baskets[basketName] = basket;
        await chrome.storage.local.set({ baskets: baskets });

        // Update to be a popup, maybe this comes from the extension instead?
        alert(`${basketName} saved to extension`);
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
