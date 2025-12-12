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

    const partNumberInput = document.getElementById('txt_partnumbertoadd') as HTMLInputElement;
    if (!partNumberInput) {
      console.error('Part number input not found');
      return;
    }
    partNumberInput.value = number;

    const enterKeyUpEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });

    partNumberInput.dispatchEvent(enterKeyUpEvent);

    const itemLocatorElement = document.querySelector('#reg_itemlocate') as HTMLDivElement;

    // grab the first item matching the element entered
    const itemSelectorLinkElement = (await checkForElement(
      'a[href^="Javascript:globalCallNavSave=false; InvItemSelect("]',
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

    call_cs_invoice_items(response);

    const quantityElement = (await checkForElement('[name*="txt_qtytoadd"]')) as HTMLInputElement;
    if (!quantityElement) {
      console.error('Quantity element not found');
      return;
    }
    quantityElement.value = quantity.toString();

    // // save the part and quantity
    // window.save_cv_invoice_itemlocate('frm_invoice_itemlocate', 1, 0, false, 'open');
    const addButtonElement = document.querySelector('#btn_additem') as HTMLButtonElement;
    if (!addButtonElement) {
      console.error('Add button element not found');
      return;
    }
  }
};

export const messageListener = chrome.runtime.onMessage.addListener(
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

const checkForElement = (selectorString: string, queryElement = document.body) => {
  // TODO: maybe start a timer and check the timer instead of checking the count variable
  return new Promise((resolve, reject) => {
    itemLocatorIntervalId = setInterval(() => {
      const itemLocatorElement = queryElement.querySelector(selectorString);
      if (itemLocatorElement) {
        clearInterval(itemLocatorIntervalId);
        count = 0;
        resolve(itemLocatorElement);
      } else if (count >= 5) {
        clearInterval(itemLocatorIntervalId);
        count = 0;
        reject(new Error(`${selectorString} element not found after 5 seconds`));
      }
      count++;
    }, 1000);
  });
};

const invItemSelect = async (region, item, isAlsoSell = false, ChildItemID = 0) => {
  //TKS 12.09.2020rgb(95, 102, 91) I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  document.querySelector('#hid_invoice_itemid').value = item;

  //TKS 05.15.2015 #66724 added this hidden field to track child
  document.querySelector('#hid_childitemid').value = ChildItemID;

  //TKS 06.18.2014 #53411
  closeInvoiceItemlocate(region);
  document.querySelector('#txt_descriptiontoadd').focus();

  //TKS 02.21.2012 #12364 added lost sale button. Hide by default until they select an item
  document.querySelector('#hideshow_lostsale').style.display = 'inline';
  return await getNewInvoicePartInfo(isAlsoSell, ChildItemID);
};

const closeInvoiceItemlocate = elementId => {
  try {
    document.querySelector(`#${elementId}`).innerHTML = '';
  } catch (err) {
    console.error(err);
  }
};

const getNewInvoicePartInfo = async (isAlsoSell = false, ChildItemID = 0) => {
  const globalInvoiceID = 0;
  //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  if (document.querySelector('#hid_invoice_itemid').value > 0)
    var itemid = document.querySelector('#hid_invoice_itemid').value;
  else var itemid = 0;

  const partNumber = encodeURIComponent(document.querySelector('#txt_partnumbertoadd').value);
  const contactId = document.querySelector('#global_contactid').value;

  //11.09.2011 jss - added encodeURIComponent cuz salina has pound signs in their part #'s
  const path = `invoicing/newinvoice/cs_invoice_items.php?partnumber=${partNumber}&contactid=${contactId}&itemid=${itemid}
        &invtype=invoice_type&ChildItemID=${ChildItemID}&invoiceid=${globalInvoiceID}`;

  return await getData(path);
};

const call_cs_invoice_items = async (response: string) => {
  //this is returned if more than one items is found with the same p/n
  if (response == 'stop') {
    document.querySelector('#txt_partnumbertoadd').focus();
    return;
  }

  if (response.substring(0, 5) != 'Error') {
    if (response.substring(0, 5) != 'blank') {
      //07.05.2012 ghh - added to deal with json array instead of pipe array
      //due to pipe symbols in descriptions
      var myarray = JSON.parse(response);

      //07.05.2012 ghh - replaced above code with new json array parsing
      document.querySelector('#txt_descriptiontoadd').value = myarray[0];
      document.querySelector('#txt_pricetoadd').value = myarray[2];
      document.querySelector('#hid_pricetoadd').value = myarray[2];
      //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
      //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
      document.querySelector('#hid_invoice_itemid').value = myarray[3];
      document.querySelector('#reg_partnote').innerHTML = myarray[6];
      document.querySelector('#hid_cost').value = myarray[7];
      document.querySelector('#txt_partnumbertoadd').value = myarray[8];
      document.querySelector('#packagingtype').innerHTML = myarray[12];
      document.querySelector('#reg_ToBePulled').innerHTML = myarray[10];
      document.querySelector('#hid_matrixlevel').value = myarray[11];
      document.querySelector('#txt_onorder').value = myarray[14];
      document.querySelector('#hid_isRental').value = myarray[15];
      //TKS 11.30.2022 #228241
      try {
        document.querySelector('#hid_qoh').value = myarray[16];
      } catch (err) {}
      try {
        document.querySelector('#hid_minorderqty').value = myarray[17];
      } catch (err) {}
      //***********************

      try {
        document.querySelector('#txt_discounttoadd').value = myarray[9];
      } catch (err) {}

      if (myarray[4] == 1) document.querySelector('#po_field').style.display = 'inline';
      else document.querySelector('#po_field').style.display = 'none';

      //TKS 06.04.2015 #68029 we now send back from the cs_invoice_items whether this field
      //is readonly or not. It is not only contingent on security but if giftcard
      if (myarray[13] == 1) document.querySelector('#txt_pricetoadd').readOnly = true;
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
    if (myarray) {
      get_cv_invoice_itembins('reg_bins', myarray[3], '', '');
      //  get_cv_invoice_itemtaxes('reg_itemtaxes', myarray[3]);
      //  get_cv_invoice_driver_po('reg_driver_po', myarray[3]);//reference grid that shows drivers and PO #
      //  //TKS 4-12-10 added item reference
      //  get_cv_invoice_itemreference('reg_reference', myarray[3], true);//item reference grid
      //  //TKS 4-12-10 added item replaceby
      //  get_cv_invoice_itemreplaceby('reg_replaceby', myarray[3]);//item replaceby grid
      //  //TKS 07.11.2014 #54540 added sales promo drop list
      //  get_cv_invoice_item_promos('reg_part_promos', myarray[3], 0, 'item_locate');
    }
  }
  // else {
  //     setError(comm_cs_invoice_items.response);
  // }
};

function get_cv_invoice_itembins(placement, itemid, alllocations, otherstores) {
  //TKS 9-15-10 #1636 this var gets passed in as 'all' if they click on the link to view other locations
  if (alllocations == undefined) alllocations = '';
  //10.12.2011 jss - if allx stores works like alllocations except it deals with multistore
  if (otherstores == undefined) otherstores = '';

  //11.27.2017 tam - 113263 adding jobid to this call
  const jobid = document.getElementById('drp_jobs')?.value || 0;
  const globalContactId = document.getElementById('global_contactid').value;

  const path = `invoicing/newinvoice/cv_invoice_itembins.php?placement=${placement}&alllocations=${alllocations}&itemid=${itemid}&invoiceid=${globalInvoiceID}
        &jobid=${jobid}&contactid=${globalContactId}&invoice_type=${invoice_type}&otherstores=${otherstores}`;

  getData(path).then(response => {
    call_cv_invoice_itembins(response);
  });
}

function call_cv_invoice_itembins() {
  if (comm_cv_invoice_itembins.response.substring(0, 5) != 'Error') {
    document.getElementById(comm_cv_invoice_itembins.placement).innerHTML = comm_cv_invoice_itembins.response;
  }
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
  }
};
