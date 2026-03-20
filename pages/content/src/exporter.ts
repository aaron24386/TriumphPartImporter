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
          description: descriptionRows[index]?.textContent.trim(),
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

  const basketInfo = {
    '2ef7c46c-a7f0-4669-a876-0d549aed332b': {
      id: '2ef7c46c-a7f0-4669-a876-0d549aed332b',
      name: 'Test Basket',
      partList: [
        {
          description: 'Screw, Cap/Hd, M6 x 20, Slv ',
          number: 'T3050334',
          quantity: 2,
        },
        {
          description: 'Indicator, LED, US, Red',
          number: 'T2702306',
          quantity: 2,
        },
        {
          description: 'Bracket, Indicator Support',
          number: 'T2701663',
          quantity: 2,
        },
        {
          description: 'Reg Plate Light',
          number: 'T2701254',
          quantity: 1,
        },
        {
          description: 'Subharness, Rear Number Plate',
          number: 'T2503446',
          quantity: 1,
        },
        {
          description: 'Mount Boss, Screen Handle',
          number: 'T2319108',
          quantity: 1,
        },
        {
          description: 'Central Runner',
          number: 'T2319107',
          quantity: 4,
        },
        {
          description: 'Screen Side, RH',
          number: 'T2319105',
          quantity: 2,
        },
        {
          description: 'Side Screen, LH',
          number: 'T2319104',
          quantity: 1,
        },
        {
          description: 'Screen Support Assembly',
          number: 'T2319103',
          quantity: 1,
        },
        {
          description: 'Subframe, Front, Cast',
          number: 'T2319100',
          quantity: 1,
        },
        {
          description: 'Instrument Cowl',
          number: 'T2312000',
          quantity: 1,
        },
        {
          description: 'Wave Spring, Crest to Crest',
          number: 'T2307201',
          quantity: 3,
        },
        {
          description: 'Threaded Spacer, M5',
          number: 'T2304694',
          quantity: 2,
        },
        {
          description: 'Mirror Assy, RH',
          number: 'T2060185',
          quantity: 2,
        },
        {
          description: 'Handlebar, Tapered, Black',
          number: 'T2043181',
          quantity: 1,
        },
      ],
    },
    '30a8ccda-10f3-48df-a1b4-c860e2da6728': {
      id: '30a8ccda-10f3-48df-a1b4-c860e2da6728',
      name: 'Test Basket 2',
      partList: [
        {
          description: 'Bracket, Indicator Support',
          number: 'T2701663',
          quantity: 1,
        },
        {
          description: 'Subframe, Front, Cast',
          number: 'T2319100',
          quantity: 1,
        },
        {
          description: 'Swingarm Assy',
          number: 'T2051555',
          quantity: 1,
        },
      ],
    },
    '428371d9-8938-4c32-9e4c-9c7151f3561f': {
      id: '428371d9-8938-4c32-9e4c-9c7151f3561f',
      name: 'RO# 35051-3',
      partList: [
        {
          description: 'Circlip, Ext 8 X 0.89',
          number: 'T3500207',
          quantity: 1,
        },
        {
          description: 'Bolt, Shld, M8 x 1.25, Slv, Enc',
          number: 'T3331520',
          quantity: 1,
        },
        {
          description: 'Screw, Cap/Hd, M8 x 25, Silver',
          number: 'T3051097',
          quantity: 2,
        },
        {
          description: 'Pin, Clevis, 8 x 13.7',
          number: 'T3000301',
          quantity: 1,
        },
        {
          description: 'Footrest, Rear, RH',
          number: 'T2088203',
          quantity: 1,
        },
        {
          description: 'Footrest Hanger, RH',
          number: 'T2086606',
          quantity: 1,
        },
        {
          description: 'Spring, Detent',
          number: 'T2081674',
          quantity: 1,
        },
        {
          description: 'Detent Plate',
          number: 'T2081672',
          quantity: 1,
        },
        {
          description: 'Peg, Bank Angle, 25mm',
          number: 'T2081067',
          quantity: 1,
        },
        {
          description: 'Mirror, RH, CCC',
          number: 'T2060911',
          quantity: 1,
        },
        {
          description: 'Brake Pedal Assembly',
          number: 'T2026602',
          quantity: 1,
        },
        {
          description: 'Front Brake Lever',
          number: 'T2021428',
          quantity: 1,
        },
        {
          description: 'Spring, Brake Lever Switch',
          number: 'T2020923',
          quantity: 1,
        },
      ],
    },
    '5acaf14d-50a2-4cc6-9bcf-7a54ce05086b': {
      id: '5acaf14d-50a2-4cc6-9bcf-7a54ce05086b',
      name: 'RO#35051',
      partList: [
        {
          description: 'Swingarm Assy',
          number: 'T2051555',
          quantity: 1,
        },
        {
          description: 'Bolt, Disc, M8 x 30, Slv, Enc',
          number: 'T2024801',
          quantity: 4,
        },
        {
          description: 'Rear Wheel Assembly, Spares',
          number: 'T2017900',
          quantity: 1,
        },
      ],
    },
    '9783a149-b27c-4297-9e40-1d16605d76c0': {
      id: '9783a149-b27c-4297-9e40-1d16605d76c0',
      name: 'RO#35051-2',
      partList: [
        {
          description: 'Screw, Pan/Hd, Tx, M6 x 20, Enc',
          number: 'T3331191',
          quantity: 2,
        },
        {
          description: 'Bolt, HHF, Lghtd, M6 x 20, Slv',
          number: 'T3205066',
          quantity: 1,
        },
        {
          description: 'Flanged Sleeve',
          number: 'T3016601',
          quantity: 2,
        },
        {
          description: 'Dowel, Dia 6 x 16.5',
          number: 'T3000005',
          quantity: 2,
        },
        {
          description: 'Cowl, Radiator, RH, Matt Aluminium Silver',
          number: 'T2316605MS',
          quantity: 1,
        },
        {
          description: 'Header & Silencer Assy',
          number: 'T2207447',
          quantity: 1,
        },
        {
          description: 'Catalyst Heatshield Cover',
          number: 'T2207380',
          quantity: 1,
        },
        {
          description: 'Exit, Cover',
          number: 'T2207370',
          quantity: 1,
        },
        {
          description: 'Header Gasket',
          number: 'T2200854',
          quantity: 3,
        },
        {
          description: 'Crank Cover',
          number: 'T1267006',
          quantity: 1,
        },
        {
          description: 'Crank Cover Gasket',
          number: 'T1260264',
          quantity: 1,
        },
        {
          description: 'Frame Protector Kit',
          number: 'A9780342',
          quantity: 1,
        },
      ],
    },
  };
};
