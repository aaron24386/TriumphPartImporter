// constant variables that may have to change in the future but leaving as default 0 for now
const invoice_type = 0;
const globalInvoiceID = 0;

type Basket = {
  id: string;
  name: string;
  partList: Part[];
};

interface Part {
  number: string;
  quantity: number;
  description: string;
}

interface Message {
  type: string;
}

interface ImportBasketMessage extends Message {
  type: 'IMPORT_BASKET';
  basket: Basket;
}

let itemLocatorIntervalId;
let count = 0;

const importBasket = (basket: Basket, sendResponse) => {
  // TODO: check if the screen we expect to be up currently is displayed if not error
  // TOOD: FUTURE: if the screen isn't up try to display it
  console.log(basket);

  addItemsToBasket(basket);
};

const addItemsToBasket = async (basket: Basket) => {
  /**
   * Functions:
   * get_cv_itemslist
   */
  const { partList } = basket;
  /**
     * {
    "description": "Mount Boss, Screen Handle ",
    "number": "T2319108 ",
    "quantity": 1
}
     */
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
    const { itemId, childItemId } = /(?<ignore1>\D+)(?<itemId>\d+)(?<ignore2>\D+)(?<childItemId>\d+)/.exec(href).groups;

    // TODO: check if SS
    // display the item
    const response = await invItemSelect('reg_itemlocate', itemId, false, childItemId);

    // I can't click on the link in popup so follow code path and figure out what I need to do to get this to work
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

    // // save the part and quantity
    // window.save_cv_invoice_itemlocate('frm_invoice_itemlocate', 1, 0, false, 'open');
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
        case 'IMPORT_BASKET':
          const { basket } = message;
          importBasket(basket, sendResponse);
          break;
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
      if (itemLocatorElement || (findAll && itemLocatorElement.length > 0)) {
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

const invItemSelect = async (region, item, isAlsoSell = false, ChildItemID = 0) => {
  //TKS 12.09.2020rgb(95, 102, 91) I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  document.querySelector('#hid_invoice_itemid').value = item;

  //TKS 05.15.2015 #66724 added this hidden field to track child
  document.querySelector('#hid_childitemid').value = ChildItemID;

  //TKS 06.18.2014 #53411
  await closeInvoiceItemlocate(region);
  document.querySelector('#txt_descriptiontoadd').focus();

  //TKS 02.21.2012 #12364 added lost sale button. Hide by default until they select an item
  document.querySelector('#hideshow_lostsale').style.display = 'inline';
  return await getNewInvoicePartInfo(isAlsoSell, ChildItemID);
};

const closeInvoiceItemlocate = async elementId => {
  try {
    return (document.querySelector(`#${elementId}`).innerHTML = '');
  } catch (err) {
    console.error(err);
  }

  return '';
};

const getNewInvoicePartInfo = async (isAlsoSell = false, ChildItemID = 0) => {
  const globalInvoiceID = 0;
  //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  let itemId = 0;
  const hiddenInvoiceItemId = document.querySelector('#hid_invoice_itemid')?.value || 0;
  if (hiddenInvoiceItemId > 0) {
    itemId = hiddenInvoiceItemId;
  }

  const partNumber = encodeURIComponent(document.querySelector('#txt_partnumbertoadd')?.value);
  const contactId = document.querySelector('#global_contactid')?.value;
  // AP: TODO: Unsure if this ever will need to change

  //11.09.2011 jss - added encodeURIComponent cuz salina has pound signs in their part #'s
  const path = `invoicing/newinvoice/cs_invoice_items.php?partnumber=${partNumber}&contactid=${contactId}&itemid=${itemId}
    &invtype=${invoice_type}&ChildItemID=${ChildItemID}&invoiceid=${globalInvoiceID}`;

  return await getData(path).then(response => {
    return response;
    console.log('response', response);
  });
};

const call_cs_invoice_items = async (response: string) => {
  //this is returned if more than one items is found with the same p/n
  if (response == 'stop') {
    document.querySelector('#txt_partnumbertoadd')?.focus();
    return;
  }

  if (response.substring(0, 5) == 'Error') {
    throw 'Failed to add part';
  }

  let myArray;
  if (response.substring(0, 5) != 'blank') {
    //07.05.2012 ghh - added to deal with json array instead of pipe array
    //due to pipe symbols in descriptions
    myArray = JSON.parse(response);

    //07.05.2012 ghh - replaced above code with new json array parsing
    document.querySelector('#txt_descriptiontoadd').value = myArray[0];
    document.querySelector('#txt_pricetoadd').value = myArray[2];
    document.querySelector('#hid_pricetoadd').value = myArray[2];

    //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
    //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
    document.querySelector('#hid_invoice_itemid').value = myArray[3];
    document.querySelector('#reg_partnote').innerHTML = myArray[6];
    document.querySelector('#hid_cost').value = myArray[7];
    document.querySelector('#txt_partnumbertoadd').value = myArray[8];
    document.querySelector('#packagingtype').innerHTML = myArray[12];
    document.querySelector('#reg_ToBePulled').innerHTML = myArray[10];
    document.querySelector('#hid_matrixlevel').value = myArray[11];
    document.querySelector('#txt_onorder').value = myArray[14];
    document.querySelector('#hid_isRental').value = myArray[15];
    //TKS 11.30.2022 #228241
    try {
      document.querySelector('#hid_qoh').value = myArray[16];
    } catch (err) {}
    try {
      document.querySelector('#hid_minorderqty').value = myArray[17];
    } catch (err) {}
    //***********************

    try {
      document.querySelector('#txt_discounttoadd').value = myArray[9];
    } catch (err) {}

    if (myArray[4] == 1) document.querySelector('#po_field').style.display = 'inline';
    else document.querySelector('#po_field').style.display = 'none';

    //TKS 06.04.2015 #68029 we now send back from the cs_invoice_items whether this field
    //is readonly or not. It is not only contingent on security but if giftcard
    if (myArray[13] == 1) document.querySelector('#txt_pricetoadd').readOnly = true;
    else document.querySelector('#txt_pricetoadd').readOnly = false;

    // close_invoice_itemlocate();
  } else {
    document.querySelector('#txt_partnumbertoadd').value = '';
    document.querySelector('#txt_descriptiontoadd').value = '';
    document.querySelector('#txt_pricetoadd').value = '';
    document.querySelector('#txt_discounttoadd').value = '';
    document.querySelector('#hid_cost').value = '';
    document.querySelector('#reg_partnote').innerHTML = '';
    //TKS 02.05.2015 #63040 added these regions to clear if blank comes back
    //******************
    document.querySelector('#reg_itemtaxes').innerHTML = '';
    document.querySelector('#reg_driver_po').innerHTML = '';
    document.querySelector('#reg_reference').innerHTML = '';
    document.querySelector('#reg_replaceby').innerHTML = '';
    document.querySelector('#reg_bins').innerHTML = '';
    document.querySelector('#reg_alsosell').innerHTML = '';
    //******************
    //TKS 07.03.2012 #20749
    document.querySelector('#packagingtype').innerHTML = '';
    //TKS 07.11.2014 #54540 added sales promo region for potential promotions
    document.querySelector('#reg_part_promos').innerHTML = '';
  }

  //07.05.2012 ghh - changed broken to myarray
  if (myArray) {
    return await get_cv_invoice_itembins('reg_bins', myArray[3], '', '');
    //  get_cv_invoice_itemtaxes('reg_itemtaxes', myArray[3]);
    //  get_cv_invoice_driver_po('reg_driver_po', myArray[3]);//reference grid that shows drivers and PO #
    //  //TKS 4-12-10 added item reference
    //  get_cv_invoice_itemreference('reg_reference', myArray[3], true);//item reference grid
    //  //TKS 4-12-10 added item replaceby
    //  get_cv_invoice_itemreplaceby('reg_replaceby', myArray[3]);//item replaceby grid
    //  //TKS 07.11.2014 #54540 added sales promo drop list
    //  get_cv_invoice_item_promos('reg_part_promos', myArray[3], 0, 'item_locate');
  }
};

async function get_cv_invoice_itembins(placement, itemid, alllocations, otherstores) {
  //TKS 9-15-10 #1636 this var gets passed in as 'all' if they click on the link to view other locations
  alllocations ??= '';
  //10.12.2011 jss - if allx stores works like alllocations except it deals with multistore
  otherstores ??= '';

  //11.27.2017 tam - 113263 adding jobid to this call
  const dropJobsSelect = document.querySelector('#drp_jobs') as HTMLSelectElement;
  const jobid = dropJobsSelect?.value || 0;

  const globalContactIdInput = document.querySelector('#global_contactid') as HTMLInputElement;
  const globalContactId = globalContactIdInput?.value || '';

  const path = `invoicing/newinvoice/cv_invoice_itembins.php?placement=${placement}&alllocations=${alllocations}&itemid=${itemid}&invoiceid=${globalInvoiceID}
    &jobid=${jobid}&contactid=${globalContactId}&invoice_type=${invoice_type}&otherstores=${otherstores}`;

  return await getData(path).then(response => {
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
    console.error(JSON.stringify(error.message));
    return '';
  }
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
