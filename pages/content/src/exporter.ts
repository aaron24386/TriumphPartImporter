import Basket from './basket';

export const exportBasket = () => {
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

  observer.observe(document.body || document, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => {
    observer.disconnect();
    console.warn('Timeout: #name element not found after 10 seconds');
  }, 10000);

  async function collectBasketInformation() {
    const basketId = self.crypto.randomUUID();
    const basketName = (document.querySelector('#name') as HTMLInputElement)?.value.trim();
    const basket = new Basket({ id: basketId, name: basketName });

    if (!basketName) {
      alert('Basket name are required to export');
      return;
    }

    const partRows = document.querySelectorAll('[title^="Search part"]') as NodeListOf<HTMLAnchorElement>;
    const quantityRows = document.querySelectorAll('[id^="qty-requested"]') as NodeListOf<HTMLInputElement>;
    const descriptionRows = document.querySelectorAll('td:nth-of-type(2)') as NodeListOf<HTMLDivElement>;

    if (partRows.length > 0 && quantityRows.length > 0 && descriptionRows.length > 0) {
      quantityRows.forEach((quantityRow, index) => {
        const quantity = parseInt(quantityRow.value);
        const number = partRows[index]?.textContent.trim();

        basket.addPart({
          number,
          quantity,
          description: descriptionRows[index]?.textContent,
        });
      });

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

  const addDefaultBaskets = async () => {
    const fakeBaskets = [
      {
        parts: [
          { number: 'TS1234', quantity: 1, description: 'Description 1' },
          { number: 'TS4424', quantity: 2, description: 'Description 2' },
          { number: 'TS435444', quantity: 1, description: 'Description 3' },
          { number: 'TS64646', quantity: 2, description: 'Description 4' },
        ],
      },
      {
        parts: [
          { number: 'BS84484', quantity: 1, description: 'Description 1' },
          { number: 'BS33338', quantity: 2, description: 'Description 2' },
          { number: 'BS33333', quantity: 1, description: 'Description 3' },
          { number: 'BS9009', quantity: 2, description: 'Description 4' },
        ],
      },
      {
        parts: [
          { number: 'LM23444', quantity: 1, description: 'Description 1' },
          { number: 'LM9009', quantity: 1, description: 'Description 2' },
          { number: 'LM333444', quantity: 1, description: 'Description 3' },
          { number: 'LM44444', quantity: 1, description: 'Description 4' },
        ],
      },
      {
        parts: [
          { number: 'DD9999', quantity: 3, description: 'Description 1' },
          { number: 'DD0000000', quantity: 4, description: 'Description 2' },
          { number: 'DD2323232', quantity: 5, description: 'Description 3' },
          { number: 'DD5555', quantity: 6, description: 'Description 4' },
        ],
      },
    ];

    for (const i in fakeBaskets) {
      const { parts } = fakeBaskets[i];
      const basketId = self.crypto.randomUUID();
      const newBasket = new Basket({ id: basketId, name: `Basket ${+i + 1}` });

      parts.forEach(({ number, quantity, description }) => {
        newBasket.addPart({
          number,
          quantity,
          description,
        });
      });

      let { baskets } = await chrome.storage.local.get('baskets');
      baskets ??= {};
      baskets[basketId] = newBasket;
      await chrome.storage.local.set({ baskets: baskets });
    }

    return '';
  };
};
