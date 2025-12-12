import Basket from './basket';

export const exportBasket = () => {
  /**
   * Export Button Logic: want to update this to add the button to where the basket name
   * is
   */

  // Function to add the export button once the element is found
  const addExportButton = () => {
    const buttonLocationElement = document.querySelector('#name');
    if (buttonLocationElement) {
      const exportBasketButton = document.createElement('input');
      exportBasketButton.value = `Export Basket`;
      exportBasketButton.type = 'button';
      exportBasketButton.name = 'exportBasketButton';
      exportBasketButton.onclick = collectBasketInformation;

      buttonLocationElement.insertAdjacentElement('beforebegin', exportBasketButton);
      return true;
    }
    return false;
  };

  if (addExportButton()) {
    return;
  }

  // Monitors the dom body if button name element isn't found for 10 seconds, will add it if it's found
  const observer = new MutationObserver((mutations, obs) => {
    if (addExportButton()) {
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => {
    observer.disconnect();
    console.warn('Timeout: #name element not found after 10 seconds');
  }, 10000);

  /**
   * TODO: Check if this element was added, possible just move to an element that always exists
   */

  async function collectBasketInformation() {
    // TODO: there isn't a basket id any more so needs to be updated to not incorporate this.
    // TODO: this means that I potentially need to handle ensuring baskets are unique. Probably not important till later date
    const basketId = self.crypto.randomUUID();
    const basketName = document.querySelector('#name')?.value.trim();
    const basket = new Basket({ id: basketId, name: basketName });

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
          // TODO: this may be exporting with an extra space at the end, need to remove it
          const number = partRows[i]?.textContent;
          basket.addPart({
            number,
            quantity,
            description: descriptionRows[i]?.textContent,
          });
        }

        let { baskets } = await chrome.storage.local.get('baskets');
        baskets ??= {};
        baskets[basketId] = basket;
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
