import type { IBasket, ImportBasketMessage } from '../../../chrome-extension/public/types';
// constant variables that may have to change in the future but leaving as default 0 for now
const invoice_type = 0;
const globalInvoiceID = 0;

let itemLocatorIntervalId: NodeJS.Timeout;
let count = 0;

const importBasket = (basket: IBasket) => {
  // TODO: check if the screen we expect to be up currently is displayed if not error
  // TOOD: FUTURE: if the screen isn't up try to display it
  addItemsToBasket(basket);
};

const addItemsToBasket = async (basket: IBasket) => {
  const { partList } = basket;

  for (const part of partList) {
    const { number, quantity } = part;

    const partNumberInput = document.querySelector('#txt_partnumbertoadd') as HTMLInputElement;
    if (!partNumberInput) {
      console.error('Part number input not found');
      return;
    }
    partNumberInput.value = number.trim();

    const enterKeyUpEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });

    partNumberInput.dispatchEvent(enterKeyUpEvent);

    const itemLocatorElement = document.querySelector('#reg_itemlocate') as HTMLDivElement;

    // grab the first item matching the element entered
    const itemSelectorLinkElement = (await checkForElement(
      'a[href*="InvItemSelect("]',
      itemLocatorElement,
    )) as HTMLAnchorElement;
    if (!itemSelectorLinkElement) {
      console.error('Item selector link element not found');
      return;
    }

    const href = itemSelectorLinkElement.getAttribute('href') || '';
    const { itemId, childItemId } =
      /(?<ignore1>\D+)(?<itemId>\d+)(?<ignore2>\D+)(?<childItemId>\d+)/.exec(href)?.groups || {};

    const response = await invItemSelect('reg_itemlocate', itemId, parseInt(childItemId) ?? 0);

    if (response) {
      await call_cs_invoice_items(response);
    } else {
      console.error('call_cs_invoice_items failed');
      return;
    }

    const partQuantityInput = (await findNonMiscQuantityElement()) as HTMLInputElement;
    if (!partQuantityInput) {
      console.error('Quantity element not found');
      return;
    }
    partQuantityInput.value = quantity.toString();

    const addButtonElement = document.querySelector('#btn_additem') as HTMLButtonElement;
    if (!addButtonElement) {
      console.error('Add button element not found');
      return;
    }

    addButtonElement.click();
  }
};

export const addMessageListener = () => {
  chrome.runtime.onMessage.addListener(
    (message: ImportBasketMessage, sender: chrome.runtime.MessageSender, sendResponse) => {
      switch (message.type) {
        case 'IMPORT_BASKET': {
          const { basket } = message;
          importBasket(basket);
          break;
        }
        default:
          sendResponse({ success: false, message: 'Invalid message type' });
          break;
      }
    },
  );
};

const checkForElement = (selectorString: string, queryElement: HTMLElement = document.body, findAll = false) => {
  // TODO: maybe start a timer and check the timer instead of checking the count variable
  return new Promise((resolve, reject) => {
    itemLocatorIntervalId = setInterval(() => {
      const itemLocatorElement = findAll
        ? queryElement.querySelectorAll(selectorString)
        : queryElement.querySelector(selectorString);
      if (itemLocatorElement || (findAll && (itemLocatorElement || []).length > 0)) {
        clearInterval(itemLocatorIntervalId);
        count = 0;
        resolve(itemLocatorElement);
      } else if (count >= 8) {
        clearInterval(itemLocatorIntervalId);
        count = 0;
        reject(new Error(`${selectorString} element not found after 5 seconds`));
      }
      count++;
    }, 500);
  });
};

const invItemSelect = async (region: string, item: string, ChildItemID: number = 0) => {
  (document.querySelector('#hid_invoice_itemid') as HTMLInputElement).value = item;

  (document.querySelector('#hid_childitemid') as HTMLInputElement).value = `${ChildItemID}`;

  await closeInvoiceItemlocate(region);
  (document.querySelector('#txt_descriptiontoadd') as HTMLTextAreaElement).focus();

  (document.querySelector('#hideshow_lostsale') as HTMLDivElement).style.display = 'inline';
  return await getNewInvoicePartInfo(ChildItemID);
};

const closeInvoiceItemlocate = async (elementId: string) => {
  try {
    return ((document.querySelector(`#${elementId}`) as HTMLDivElement).innerHTML = '');
  } catch (err) {
    console.error(err);
  }

  return '';
};

const getNewInvoicePartInfo = async (ChildItemID: number = 0) => {
  const globalInvoiceID = 0;
  //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  let itemId = 0;
  const hiddenInvoiceItemId = parseInt(
    (document.querySelector('#hid_invoice_itemid') as HTMLInputElement).value || '0',
  );
  if (hiddenInvoiceItemId > 0) {
    itemId = hiddenInvoiceItemId;
  }

  const partNumber = encodeURIComponent((document.querySelector('#txt_partnumbertoadd') as HTMLInputElement)?.value);
  const contactId = (document.querySelector('#global_contactid') as HTMLInputElement)?.value;

  const path = `invoicing/newinvoice/cs_invoice_items.php?partnumber=${partNumber}&contactid=${contactId}&itemid=${itemId}
    &invtype=${invoice_type}&ChildItemID=${ChildItemID}&invoiceid=${globalInvoiceID}`;

  return await getData(path);
};

const call_cs_invoice_items = async (response: string) => {
  //this is returned if more than one items is found with the same p/n
  if (response == 'stop') {
    (document.querySelector('#txt_partnumbertoadd') as HTMLInputElement).focus();
    return;
  }

  if (response.substring(0, 5) == 'Error') {
    throw 'Failed to add part';
  }

  let myArray;
  const descriptionTextArea = document.querySelector('#txt_descriptiontoadd') as HTMLTextAreaElement;
  const priceInput = document.querySelector('#txt_pricetoadd') as HTMLInputElement;
  const partNoteDiv = document.querySelector('#reg_partnote') as HTMLDivElement;
  const partNumberToAddInput = document.querySelector('#txt_partnumbertoadd') as HTMLInputElement;
  const hiddenCostInput = document.querySelector('#hid_cost') as HTMLInputElement;
  const packagingTypeSpan = document.querySelector('#packagingtype') as HTMLSpanElement;
  const discountToAddInput = document.querySelector('#txt_discounttoadd') as HTMLInputElement;

  if (response.substring(0, 5) != 'blank') {
    myArray = JSON.parse(response);

    const hiddenPriceInput = document.querySelector('#hid_pricetoadd') as HTMLInputElement;
    const hiddenInvoiceItemInput = document.querySelector('#hid_invoice_itemid') as HTMLInputElement;
    const toBePulledDiv = document.querySelector('#reg_ToBePulled') as HTMLDivElement;
    const hiddenMatrixLevelInput = document.querySelector('#hid_matrixlevel') as HTMLInputElement;
    const textOnOrderTextArea = document.querySelector('#txt_onorder') as HTMLTextAreaElement;

    descriptionTextArea.value = myArray[0];
    priceInput.value = myArray[2];
    hiddenPriceInput.value = myArray[2];

    hiddenInvoiceItemInput.value = myArray[3];
    partNoteDiv.innerHTML = myArray[6];
    hiddenCostInput.value = myArray[7];
    partNumberToAddInput.value = myArray[8];
    packagingTypeSpan.innerHTML = myArray[12];
    toBePulledDiv.innerHTML = myArray[10];
    hiddenMatrixLevelInput.value = myArray[11];
    textOnOrderTextArea.value = myArray[14];

    (document.querySelector('#hid_isRental') as HTMLInputElement).value = myArray[15];

    try {
      (document.querySelector('#hid_qoh') as HTMLInputElement).value = myArray[16];
    } catch (err) {
      console.log(err);
    }
    try {
      (document.querySelector('#hid_minorderqty') as HTMLInputElement).value = myArray[17];
    } catch (err) {
      console.log(err);
    }

    try {
      discountToAddInput.value = myArray[9];
    } catch (err) {
      console.log(err);
    }

    const poFieldDiv = document.querySelector('#po_field') as HTMLDivElement;
    poFieldDiv.style.display = myArray[4] == 1 ? 'inline' : 'none';

    priceInput.readOnly = myArray[13] == 1 ? true : false;
    // close_invoice_itemlocate();
  } else {
    partNumberToAddInput.value = '';
    descriptionTextArea.value = '';
    priceInput.value = '';
    discountToAddInput.value = '';
    hiddenCostInput.value = '';
    partNoteDiv.innerHTML = '';
    packagingTypeSpan.innerHTML = '';

    (document.querySelector('#reg_itemtaxes') as HTMLDivElement).innerHTML = '';
    (document.querySelector('#reg_driver_po') as HTMLDivElement).innerHTML = '';
    (document.querySelector('#reg_reference') as HTMLDivElement).innerHTML = '';
    (document.querySelector('#reg_replaceby') as HTMLDivElement).innerHTML = '';
    (document.querySelector('#reg_alsosell') as HTMLDivElement).innerHTML = '';
    (document.querySelector('#reg_bins') as HTMLSpanElement).innerHTML = '';
    (document.querySelector('#reg_part_promos') as HTMLDivElement).innerHTML = '';
  }

  if (myArray) {
    return await get_cv_invoice_itembins('reg_bins', myArray[3], '', '');
  } else {
    return '';
  }
};

async function get_cv_invoice_itembins(placement: string, itemid: string, alllocations: string, otherstores: string) {
  alllocations ??= '';
  otherstores ??= '';

  const dropJobsSelect = document.querySelector('#drp_jobs') as HTMLSelectElement;
  const jobid = dropJobsSelect?.value || 0;

  const globalContactIdInput = document.querySelector('#global_contactid') as HTMLInputElement;
  const globalContactId = globalContactIdInput?.value || '';

  const path = `invoicing/newinvoice/cv_invoice_itembins.php?placement=${placement}&alllocations=${alllocations}&itemid=${itemid}&invoiceid=${globalInvoiceID}
    &jobid=${jobid}&contactid=${globalContactId}&invoice_type=${invoice_type}&otherstores=${otherstores}`;

  return await getData(path).then((response: string) => {
    if (response.substring(0, 5) != 'Error') {
      const regBinsElement = document.querySelector('#reg_bins') as HTMLDivElement;
      regBinsElement.innerHTML = response;
    } else {
      console.error('failure to get data for cv_invoice_itembins, response: ', response);
    }

    return '';
  });
}

const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
    // TODO: only want 1 request at a time, their logic tries to prevent this with globalGetItemList
  } catch (error) {
    // TODO: extension probably has api to display error message better
    // TODO: add logic to save error to cache so I can review later
    if (error instanceof Error) {
      console.error(JSON.stringify(error.message));
    } else {
      console.error(JSON.stringify(error));
    }
  }

  return '';
};

const findNonMiscQuantityElement = async () => {
  const quantityElements = (await checkForElement('[name*="txt_qtytoadd"]', document.body, true)) as HTMLElement[];
  if (!quantityElements.length) {
    return null;
  }

  if (quantityElements.length === 1) {
    return quantityElements[0];
  }

  const quantityElement = Array.from(quantityElements).find(quantityElement => {
    const binRow = quantityElement.closest('tr');
    const binName = (binRow?.querySelector('div') as HTMLDivElement).innerText;
    return !binName.includes('Miscel');
    // AP: TODO: fallback logic to default to Miscel if no other quantity element is found
  });

  return quantityElement || null;
};
