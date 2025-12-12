/*
	1. Go to invoice at the top
	2. The click on Locate Service Ticket
	3. Find a service ticket for Navarro (currently using invoice #: 25769)
	4. Look for a green button that says Add Job press and name thing Test (also make sure this is an estimate is flagged)
	5. Look for green + that says add parts

*/

var addItemBinQtyIndex = -1;
var globalGetItemList = false;
var globalGetItemListTrue = false;

var addPartsBtn = document.getElementById('addParts');
console.log(addPartsBtn);
addPartsBtn.addEventListener('click', () => {
  addParts();
});

const partsAndQuantities = {
  0: {
    partNumber: 'T2043181',
    quantity: 1,
  },
  1: {
    partNumber: 'T2060185',
    quantity: 1,
  },
  2: {
    partNumber: 'T2304694',
    quantity: 2,
  },
  3: {
    partNumber: 'T2307201',
    quantity: 2,
  },
  4: {
    partNumber: 'T2312000',
    quantity: 1,
  },
  5: {
    partNumber: 'T2319100',
    quantity: 1,
  },
  6: {
    partNumber: 'T2319103',
    quantity: 1,
  },
  7: {
    partNumber: 'T2319104',
    quantity: 1,
  },
  8: {
    partNumber: 'T2319105',
    quantity: 1,
  },
  9: {
    partNumber: 'T2319107',
    quantity: 1,
  },
  10: {
    partNumber: 'T2319108',
    quantity: 2,
  },
  11: {
    partNumber: 'T2319119',
    quantity: 1,
  },
  12: {
    partNumber: 'T2319125',
    quantity: 1,
  },
  13: {
    partNumber: 'T2319129',
    quantity: 1,
  },
  14: {
    partNumber: 'T2504922',
    quantity: 1,
  },
  15: {
    partNumber: 'T2701337',
    quantity: 1,
  },
  16: {
    partNumber: 'T3020131',
    quantity: 4,
  },
  17: {
    partNumber: 'T3050154',
    quantity: 2,
  },
  18: {
    partNumber: 'T3050323',
    quantity: 2,
  },
  19: {
    partNumber: 'T3202307',
    quantity: 2,
  },
  20: {
    partNumber: 'T3330943',
    quantity: 12,
  },
  21: {
    partNumber: 'T3331061',
    quantity: 2,
  },
  22: {
    partNumber: 'T3331065',
    quantity: 4,
  },
  23: {
    partNumber: 'T3350004',
    quantity: 2,
  },
  24: {
    partNumber: 'T3350050',
    quantity: 2,
  },
  25: {
    partNumber: 'T3350123',
    quantity: 9,
  },
  26: {
    partNumber: 'T3551139',
    quantity: 2,
  },
  27: {
    partNumber: 'T3600331',
    quantity: 2,
  },
  28: {
    partNumber: 'T3750011',
    quantity: 2,
  },
};

// Lizzy2 stuff
function addParts() {
  for (const key in partsAndQuantities) {
    const partAndQuantity = partsAndQuantities[key];

    const partNumInput = document.getElementById('txt_partnumbertoadd');
    partNumInput.value = partAndQuantity.partNumber;

    // This assumes there will always only be 1 matching item
    const url = get_cv_itemslist_custom('Invoice', 'reg_itemlocate', 0, 2, 'txt_partnumbertoadd');

    if (!url) {
      console.log('no URL made, exiting');
    }

    getData(url).then(response => {
      document.getElementById('reg_itemlocate').innerHTML = response; // Adds popup to select item

      const itemSelectorLink = document.querySelectorAll('[href^="Javascript:globalCallNavSave=false; InvItemSelect"]');
      if (itemSelectorLink.length > 0) {
        const splitLink = itemSelectorLink[0].href.split(', ');

        if (splitLink.length > 0) {
          const itemId = splitLink[1];

          /* 
						InvItemSelect does not display immediately qty input immediately
						It calls call_cs_invoice_items
						Which calls get_cv_invoice_itembins
						Which calls call_cv_invoice_itembins which is what adds the qty input
					*/
          InvItemSelect('reg_itemlocate', itemId, false, false, itemId);

          const partQuantityInput = document.querySelector('[name*="txt_qtytoadd"]');
          partQuantityInput.value = partAndQuantity.quantity;

          save_cv_invoice_itemlocate('frm_invoice_itemlocate', 1, 0, false, 'open');
        }
      }
    });
  }
}

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const text = await response.text();
    return text;
    // TODO: only want 1 request at a time, their logic tries to prevent this with globalGetItemList
  } catch (error) {
    // TODO: extension probably has api to display error message better
    console.error(JSON.stringify(error.message));
  }
}

function get_cv_itemslist_custom(comingfrom, placement, count, is_kit, itemnumberfieldname) {
  //12.12.2012 ghh - added to preven this from running anything if we're scanning
  //until we receive the enter key
  try {
    if (document.getElementById(itemnumberfieldname).value.substring(0, 1) == '^') {
      //now we have received the end so the next thing we need to do is
      //strip out the binid from the received barcode in case we need
      //it later
      var temp = document.getElementById(itemnumberfieldname).value.split('|');
      var binid = temp[1];

      //now we're going to see if we happen to be adjusting inventory and if
      //the user has clicked to scan one item at a time
      try {
        if (document.getElementById('chk_scanindividual').checked) {
          globalScanIndividual = true;
          document.getElementById('hid_binid').value = binid;
          document.getElementById('txt_qty').value = 1;
          document.getElementById('hid_itemid').value = temp[0].substring(2);
          save_cv_invadjust();
          return;
        } else globalScanIndividual = false;
      } catch (err) {
        globalScanIndividual = false;
      }
    }
  } catch (err) {}

  //12.21.2011 ghh - added to save the information being sent in so that if we need to recall
  //it later we have what we need
  comm_cv_itemslist.comingfrom = comingfrom;
  comm_cv_itemslist.placement = placement;
  comm_cv_itemslist.count = count;
  comm_cv_itemslist.is_kit = is_kit;
  comm_cv_itemslist.itemnumberfieldname = itemnumberfieldname;

  var generic = '';
  var rad_generic = 1;

  try {
    //try our new field first, but in the case this control is loaded elsewhere
    //that has a txt_desc, we try it next otherwise default to ''
    if (document.getElementById('txt_generic')) generic = document.getElementById('txt_generic').value;
    else generic = document.getElementById('txt_desc').value;
  } catch (err) {
    generic = '';
  }
  console.log(generic + '----' + rad_generic);
  //###########################
  //###########################
  //TKS 08.08.2024 #274082 locate part on invoice by serial #
  var serial = '';
  try {
    serial = document.getElementById('txt_serialnum').value;
  } catch (err) {
    serial = '';
  }

  //12.21.2011 ghh - if form is already locating items then we want to exit and give it time
  //to complete to keep from overlapping results
  if (globalGetItemList) {
    //12.21.2011 ghh - this flag lets us know there is more to do and we're going to call this again
    //from the call back function once it returns the current request
    globalGetItemListTrue = true;
    return;
  } else globalGetItemList = true; //12.21.2011 ghh - let callback know we're hunting

  //12.20.2010 jss - most forms don't use these var's, so set them to '' before we start
  var active = true;
  var instock = false;
  var vendor = 0;
  var supplier = 0;
  var binname = ''; //06.08.2011 jss -
  var ASIN = ''; //09.14.2022 tam - 216555

  //02.01.2011 ghh added to deal with when we first open the control
  if (itemnumberfieldname == undefined) var itemno = Itm_ItemNo;
  //06.08.2011 jss - added itemno = '' to the catch
  else
    try {
      var itemno = document.getElementById(itemnumberfieldname).value;
    } catch (err) {
      var itemno = '';
    }

  try {
    var poid = document.getElementById('hid_poid').value;
  } catch (err) {
    var poid = 0;
  }

  //if kit then enter 1 else 0
  if (is_kit == undefined) is_kit = 0;

  if (count == undefined) count = 0;

  //12.17.2010 jss - added an if statement cuz we're gonna use this list control all over the place now
  //TKS 06.20.2012 added crm items
  //TKS 11.13.2015 #76376 added UnitOptions for item locate on options control
  //09.18.2017 tam - 98271 added RawMaterial
  if (
    comingfrom == 'Inventory' ||
    comingfrom == 'CRMItems' ||
    comingfrom == 'AddToKit' ||
    comingfrom == 'UnitOptions' ||
    comingfrom == 'RawMaterial'
  ) {
    if (document.getElementById('drp_vendors')) vendor = document.getElementById('drp_vendors').value;
    if (document.getElementById('drp_suppliers')) supplier = document.getElementById('drp_suppliers').value;
    if (document.getElementById('chk_active')) active = document.getElementById('chk_active').checked;
    if (comingfrom == 'Inventory' || comingfrom == 'AddToKit') {
      if (document.getElementById('chk_instock')) instock = document.getElementById('chk_instock').checked;

      //06.08.2011 jss -
      //02.01.2022 tam - 209515 adding escape around the bin name because certain special characters
      //like # do not get passed through without being escaped
      if (document.getElementById('txt_binname')) binname = escape(document.getElementById('txt_binname').value);

      //09.14.2022 tam - 216555 adding ASIN
      if (document.getElementById('txt_asin')) ASIN = document.getElementById('txt_asin').value;

      //itemno		= document.getElementById( 'txt_itemno' ).value;
    }
  }

  //TKS 12.05.2019 #161509 added instock checkbox to item locate on invoice
  //07.19.2021 tam - 186940 adding CheckPartPrice to this
  if (comingfrom == 'Invoice' || comingfrom == 'CheckPartPrice') {
    if (document.getElementById('chk_instock')) instock = document.getElementById('chk_instock').checked;
  }

  //12.21.2010 jss -
  var usescanner = 'false';
  try {
    usescanner = document.getElementById('chk_usescanner').checked;
  } catch (err) {}

  //11.21.2017 jec - Ticket 117120 add try for vendor
  try {
    var vendor = document.getElementById('drp_vendors').value;
  } catch (err) {
    var vendor = 0;
  }
  //04.28.2011 naj - added encoding for handling + signs
  itemno = encodeURIComponent(itemno);
  //02.24.2016 ghh -  added encode so we could do wildcard searches
  //TKS 02.26.2016 #81413 changed from desc to generic as we have a radio option to say what it is
  //desc = encodeURIComponent(desc);
  generic = encodeURIComponent(generic);
  //TKS 08.08.2024 #274082
  serial = encodeURIComponent(serial);

  const locationId = comingfrom == 'RentalSchedule' ? document.getElementById('drp_location').value : 0;
  //TKS 10.17.2016 #92950 adding location drop list if in rental schedule control
  if (comingfrom == 'RentalSchedule') path = path + '&locationid=' + document.getElementById('drp_location').value;
  else path = path + '&locationid=0';

  //12.17.2010 jss - added comingfrom to the path
  //09.14.2022 tam - 216555 adding ASIN
  var path = `inventory/cv_itemslist.php?kit=${is_kit}
		&placement=${placement}
		&count=${count}
		&page=${document.getElementById('global_inv_list').value}
		&vendor=${vendor}
		&supplier=${supplier}
		&itemno=${itemno}
		&generic=${generic}
		&serial=${serial}
		&rad_generic=${rad_generic}
		&active=${active}
		&instock=${instock}
		&comingfrom=${comingfrom}
		&usescanner=${usescanner}
		&itemnumberfieldname=${itemnumberfieldname}
		&poid=${poid}
		&binname=${binname}
		&asin=${ASIN}
        &locationid=${locationId}
        &kitID=0
        &invoiceid=${globalInvoiceID}
        &contactid=${document.getElementById('global_contactid').value}
    `;
  // AP: Path
  /*
		'inventory/cv_itemslist.php?kit=2&placement=reg_itemlocate&count=0&page=Locate&
			vendor=&supplier=0&itemno=T2043181&generic=&serial=&rad_generic=1&active=true&
			instock=false&comingfrom=Invoice&usescanner=false&itemnumberfieldname=txt_partnumbertoadd&
			poid=0&binname=&asin=&locationid=0&kitID=0&invoiceid=24769&contactid=119970'
	*/
  return path;
}

function getNewInvoicePartInfo_Custom(isAlsoSell, ChildItemID) {
  if (isAlsoSell == undefined) isAlsoSell = false;
  if (ChildItemID == undefined) ChildItemID = 0;

  //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  if (document.getElementById('hid_invoice_itemid').value > 0)
    var itemid = document.getElementById('hid_invoice_itemid').value;
  else var itemid = 0;

  const partNumber = encodeURIComponent(document.getElementById('txt_partnumbertoadd').value);
  const contactId = document.getElementById('global_contactid').value;

  //11.09.2011 jss - added encodeURIComponent cuz salina has pound signs in their part #'s
  const path = `invoicing/newinvoice/cs_invoice_items.php?partnumber=${partNumber}&contactid=${contactId}&itemid=${itemid}
        &invtype=invoice_type&ChildItemID=${ChildItemID}&invoiceid=${globalInvoiceID}`;

  return path;
}

function InvItemSelect(region, item, isRental, isAlsoSell, ChildItemID) {
  if (isRental == undefined) isRental = false;
  if (isAlsoSell == undefined) isAlsoSell = false;
  if (ChildItemID == undefined) ChildItemID = 0;
  //TKS 02.08.2013 #29981 adding rental quote to this. Which if on rental quote, we do not
  //pull up the schedule
  if (isRental && invoice_type == 13)
    //&& rental type NOT a quote
    get_mv_inv_rental_schedule('video_overlay', 0, 0, item);
  else {
    //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
    //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
    document.getElementById('hid_invoice_itemid').value = item;
    //TKS 05.15.2015 #66724 added this hidden field to track child
    document.getElementById('hid_childitemid').value = ChildItemID;
    //TKS 06.18.2014 #53411
    ItemLocate_CalledFromPartsLookup = 0; //flag that holds itemid when coming from parts lookup
    close_invoice_itemlocate(region);
    document.getElementById('txt_descriptiontoadd').focus();
    getNewInvoicePartInfo(isAlsoSell, ChildItemID);

    //TKS 06.01.2018 #129178 if they have security show drop list of
    //the vendor's suppliers in a drop list so they can change from primary
    if (document.getElementById('hid_showmanufsup').value == 1)
      get_cv_invoiceitem_manufsuppliers('reg_manuf_sup', item);

    //TKS 02.21.2012 #12364 added lost sale button. Hide by default until they select an item
    document.getElementById('hideshow_lostsale').style.display = 'inline';
  }
}

function close_invoice_itemlocate(placement) {
  try {
    document.querySelector(`#${placement}`).innerHTML = '';
  } catch (err) {
    console.error(err);
  }
}

/*********
 * Thinking about creating custom get_cv_itemslist call that will call a custom fetch request
 * unsure if their server will let me make the accept the request but doesn't look like anything is in it that
 * would prevent it
 */
