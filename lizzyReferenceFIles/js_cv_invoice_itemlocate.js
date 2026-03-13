// Code from Lizzy
var comm_cv_invoice_itemlocate = new onConnect(false, false, call_cv_invoice_itemlocate);
var comm_cs_invoice_items = new onConnect(false, false, call_cs_invoice_items);
var ariopened = false;

function get_cv_invoice_itemlocate(placement, jobid) {
  if (jobid == undefined) jobid = 0;
  var path =
    'invoicing/newinvoice/cv_invoice_itemlocate.php?numon=' +
    numon +
    '&invoice_steps=' +
    invoice_steps +
    '&invoiceid=' +
    globalInvoiceID;
  path = path + '&status=newview&jobid=' + jobid + '&usescanner=' + UseScannerInvoiceSale;
  path = path + '&placement=' + placement;
  //TKS 03.31.2015 #65380 added 2 new global vars that will tell this control
  //the user wants to swap current part with the one that superseded it. These vars
  //tell the add buttons to also make a call to remove the first part when done.
  //*********************
  path = path + '&globalSwapSuperItem=' + globalSwapSuperItem + '&globalSwapSuperJobID=' + globalSwapSuperJobID;
  //*********************

  comm_cv_invoice_itemlocate.placement = placement;
  comm_cv_invoice_itemlocate.callfunc = call_cv_invoice_itemlocate;

  ajax_send(path, true, 'GET', null, comm_cv_invoice_itemlocate);
}

function call_cv_invoice_itemlocate() {
  if (comm_cv_invoice_itemlocate.response.substring(0, 5) != 'Error') {
    //TKS 12.10.2012 #27505 changed overlay to call function
    //classname of the control loading into the overlay, id of placement, comm.response of your control, scroll to top
    //TKS 06.13.2014 #53411 changed from hard coded video_overlay to use placement as I load
    //this control in overlay2 when parts lookup is up
    BuildOverlay('.overlay_tbl', comm_cv_invoice_itemlocate.placement, comm_cv_invoice_itemlocate.response, false);

    document.getElementById('txt_partnumbertoadd').focus();
    search_options();
    //TKS 06.13.2014 #53411 if coming from parts lookup then this will hold the itemid
    if (ItemLocate_CalledFromPartsLookup > 0) {
      //call the invoice so it loads in the background so the code that reloads invoice controls does not error out
      invoice_navigate('reg_body', globalInvoiceID);
      //once control is loaded, call the function as if they had selected the part from the locate list
      InvItemSelect('reg_itemlocate', ItemLocate_CalledFromPartsLookup, false);
    }
  } else {
    setError(comm_cv_invoice_itemlocate.response);
  }
}

function js_cv_invoice_itemlocate() {
  return true;
}

//TKS 6-4-10 #1133 this function looks to see if the part % notifier is set, whether you have changed the price to
//below this setting and whether you have permission to continue or not. It returns a true or false.
//if true then we use a confirm message, else we show the user an error and don't let them continue.
function CheckPartPricePercentLocate() {
  //TKS 03.03.2021 #186652 adding a new hidden field for isRental flag. Reason is, if you are trying to add a rental part to
  //a rental quote ( it does not pull up the schedule ) then you get the warning about selling below MSRP and we don't need this to be the case
  //when dealing with rental parts
  //so if we are dealing with a rental part and on a rental quote, then just return true
  if (document.getElementById('hid_isRental')) {
    if (document.getElementById('hid_isRental').value == '1' && invoice_type == 17) return true;
  }

  //if they have this set up in settings we enter here
  if (document.getElementById('hid_percentnotify').value > 0) {
    //we have a txt_pricetoadd that the user can change and a hid_pricetoadd that holds the price when it first loads so we can compare
    //07.15.2011 jss - numbers with comma's, like 1,299 end up as 1, so we need to strip out the commas
    //var cost 			= parseFloat( document.getElementById( 'hid_cost' ).value );
    var cost = document.getElementById('hid_cost').value;
    cost = cost.replace(/,/g, '');
    cost = parseFloat(cost);

    //07.15.2011 jss - numbers with comma's, like 1,299 end up as 1, so we need to strip out the commas
    //var newprice 		= parseFloat( document.getElementById( 'txt_pricetoadd' ).value );
    var newprice = document.getElementById('txt_pricetoadd').value;
    newprice = newprice.replace(/,/g, '');
    newprice = parseFloat(newprice);

    if (isNaN(newprice))
      //returns true if not a number
      newprice = 0;

    try {
      var discount = parseFloat(document.getElementById('txt_discounttoadd').value);
    } catch (err) {
      var discount = 0;
    }
    if (isNaN(discount))
      //returns true if not a number
      discount = 0;

    var percent = parseInt(document.getElementById('hid_percentnotify').value) / 100;

    //now take the new price and subtract discount
    newprice = newprice - discount;
    //now get our percentage off List, compare to the original price to see if the price they entered is below that, if so, we notify them
    var percent_price = round(cost + percent * cost);
    //if we enter here then we fall under the set percentage and need to alert the user
    if (newprice < percent_price) return false;
    else return true;
  }
  //otherwise they do not and we just return
  else return true;
} //end of CheckPartPricePercentLocate

//TKS 12.05.2012 added param called after to tell it what to do after it is done adding
//we added an Add & Close button. This flag will tell it which button you clicked
//TKS 05.15.2015 #66724 added hidden field to keep track of childitemid
function save_cv_invoice_itemlocate(formname, status, invoiceitemid, forceorder, after) {
  //TKS 11.30.2022 #228241 now prompting a warning if they entered a qty where a S/O will be kicked off
  //and the qty to order is under the min qty to order set on the part. Trying to get this info BEFORE it adds it to the
  //invoice so I got the QOH and min qty to order when they select the part and put it in a hidden field. Now we get all the qty
  //from all bins they entered into and see if we need to prompt
  var minorderqty = 0;
  var qoh = 0;
  var qty_to_order = 0;
  var force_order = 0;
  if (document.getElementById('hid_qoh') && document.getElementById('hid_minorderqty')) {
    minorderqty = parseInt(document.getElementById('hid_minorderqty').value);
    qoh = parseInt(document.getElementById('hid_qoh').value);
    if (minorderqty > 0) {
      var qty_req = 0;
      $('.invoice_qty_fornav').each(function () {
        if ($(this).val() != '' && $(this).val() > 0 && $(this).attr('data-value') == 0)
          qty_req = qty_req + parseInt($(this).val());
        else {
          if ($(this).val() != '' && $(this).val() > 0 && $(this).attr('data-value') == 1)
            force_order = force_order + parseInt($(this).val());
        }
      });
      if (qty_req > 0) qty_to_order = qty_req - qoh;

      qty_to_order = qty_to_order + force_order;
    }
  }
  if (qty_to_order > 0 && qty_to_order < minorderqty)
    var temp =
      "confirm( 'The current qty to be ordered will be below the minimum qty to order set on the part. Min. order qty :" +
      minorderqty +
      "');";
  else var temp = true;

  //04.11.2019 jss - ( 147193 ) disable the add buttons to double clickers from getting i-d-10-t errors ;-)
  try {
    document.getElementById('btn_additem').disabled = true;
  } catch (err) {}
  try {
    document.getElementById('btn_additemclose').disabled = true;
  } catch (err) {}
  try {
    document.getElementById('btn_additemtop').disabled = true;
  } catch (err) {}
  try {
    document.getElementById('btn_additemclosetop').disabled = true;
  } catch (err) {}

  addItemBinQtyIndex = -1; //TKS 08.24.2015 #72329 reset our index var
  //08.26.2015 TKS make sure we unbind the enter key after they add the part
  globalCallNavSave = false;
  if (eval(temp)) {
    if (CheckPartPricePercentLocate()) {
      //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
      //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
      var path =
        'invoicing/newinvoice/ce_invoice_itemlocate.php?status=' +
        status +
        '&forceorder=' +
        forceorder +
        '&invoiceitemid=' +
        invoiceitemid +
        '&invoiceid=' +
        globalInvoiceID +
        '&itemid=' +
        document.getElementById('hid_invoice_itemid').value +
        '&contactid=' +
        document.getElementById('global_contactid').value +
        '&invtype=' +
        invoice_type;
      path = path + '&childitemid=' + document.getElementById('hid_childitemid').value;

      var postFields = get_objects(formname);
      comm_cv_invoice_itemlocate.callfunc = call_save_cv_invoice_itemlocate;
      comm_cv_invoice_itemlocate.misc = status;
      comm_cv_invoice_itemlocate.misc2 = 'extprice' + invoiceitemid;
      comm_cv_invoice_itemlocate.misc3 = 'txt_qty' + invoiceitemid;
      comm_cv_invoice_itemlocate.misc4 = 'txt_price' + invoiceitemid;
      comm_cv_invoice_itemlocate.misc5 = after;
      ajax_send(path, true, 'POST', postFields, comm_cv_invoice_itemlocate);
    }
    //our function returned false and there are 2 situations now, the user has permission to
    //continue or they do not and we just show an error message
    else {
      //if they have the ability/permission to continue
      if (document.getElementById('hid_can_continue').value == 'yes') {
        //show them a confirm message to see if they want to continue or cancel
        if (confirm(document.getElementById('hid_percentconfirm').value)) {
          //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
          //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
          var path =
            'invoicing/newinvoice/ce_invoice_itemlocate.php?status=' +
            status +
            '&invoiceitemid=' +
            invoiceitemid +
            '&invoiceid=' +
            globalInvoiceID +
            '&itemid=' +
            document.getElementById('hid_invoice_itemid').value +
            '&contactid=' +
            document.getElementById('global_contactid').value +
            '&invtype=' +
            invoice_type;
          path = path + '&childitemid=' + document.getElementById('hid_childitemid').value;

          var postFields = get_objects(formname);
          comm_cv_invoice_itemlocate.callfunc = call_save_cv_invoice_itemlocate;
          comm_cv_invoice_itemlocate.misc = status;
          comm_cv_invoice_itemlocate.misc2 = 'extprice' + invoiceitemid;
          comm_cv_invoice_itemlocate.misc3 = 'txt_qty' + invoiceitemid;
          comm_cv_invoice_itemlocate.misc4 = 'txt_price' + invoiceitemid;
          comm_cv_invoice_itemlocate.misc5 = after;
          ajax_send(path, true, 'POST', postFields, comm_cv_invoice_itemlocate);
        }
        //TKS 03.03.2021 #186652 I noticed that if you cancel out of the confirm above,
        //you can't do anything because all of these fields were disabled at the top of the save function.
        //so if you cancel out of the confirm window, I am making them active again
        else {
          try {
            document.getElementById('btn_additem').disabled = false;
          } catch (err) {}
          try {
            document.getElementById('btn_additemclose').disabled = false;
          } catch (err) {}
          try {
            document.getElementById('btn_additemtop').disabled = false;
          } catch (err) {}
          try {
            document.getElementById('btn_additemclosetop').disabled = false;
          } catch (err) {}
        }
      } else {
        setError(document.getElementById('hid_percentmessage').value);
        //TKS 05.14.2024 #261211 while on my ticket I got an error that I was selling a part below the allowed
        //price then I could not add the part when I changed the price because the buttons were still disabled.
        //normally we have all this in a call back function but the way we have all this setup is very odd.
        //adding this here so the buttons are active again when we get the error.
        try {
          document.getElementById('btn_additem').disabled = false;
        } catch (err) {}
        try {
          document.getElementById('btn_additemclose').disabled = false;
        } catch (err) {}
        try {
          document.getElementById('btn_additemtop').disabled = false;
        } catch (err) {}
        try {
          document.getElementById('btn_additemclosetop').disabled = false;
        } catch (err) {}
      }
    }
  } else {
    try {
      document.getElementById('btn_additem').disabled = false;
    } catch (err) {}
    try {
      document.getElementById('btn_additemclose').disabled = false;
    } catch (err) {}
    try {
      document.getElementById('btn_additemtop').disabled = false;
    } catch (err) {}
    try {
      document.getElementById('btn_additemclosetop').disabled = false;
    } catch (err) {}
  }
}

function call_save_cv_invoice_itemlocate() {
  if (comm_cv_invoice_itemlocate.response.substring(0, 5) != 'Error') {
    //11.20.2012 ghh - added to deal with forgetting to supply a qty
    //to add
    if (comm_cv_invoice_itemlocate.response.substring(0, 5) == 'noqty') {
      alert(comm_cv_invoice_itemlocate.response.substring(5));

      //04.11.2019 jss - ( 147193 ) re-enable the add buttons (there's another set of this code below)
      try {
        document.getElementById('btn_additem').disabled = false;
      } catch (err) {}
      try {
        document.getElementById('btn_additemclose').disabled = false;
      } catch (err) {}
      try {
        document.getElementById('btn_additemtop').disabled = false;
      } catch (err) {}
      try {
        document.getElementById('btn_additemclosetop').disabled = false;
      } catch (err) {}

      return;
    }

    //08.11.2009 jss - set a var to remember which search option is selected
    var searchoptions = 0;
    searchoptions = 1;
    try {
      var jobid = document.getElementById('drp_jobs').value;
    } catch (err) {
      var jobid = 0;
    }

    if (comm_cv_invoice_itemlocate.misc == 2) {
      var extprice = comm_cv_invoice_itemlocate.misc2;
      var qty = document.getElementById(comm_cv_invoice_itemlocate.misc3).value;
      var price = document.getElementById(comm_cv_invoice_itemlocate.misc4).value;
      document.getElementById(extprice).innerHTML = (price * qty).toFixed(2);
    }

    //TKS 12.05.2012 added flag to tell us if we need to close the window after adding
    //or not
    //TKS 03.20.2013 removed searchoptions flag from being passed in here as it is not in
    //function as a parameter in new flow
    //TKS 06.13.2014 #53411 changed from hard coded video_overlay to use placement as I load
    //this control in overlay2 when parts lookup is up
    //TKS 02.05.2015 #63040 do not recall the locate screen if innerHTML of reg_alsosell holds something
    //it means there are items for also sell and we need to leave the window open
    if (comm_cv_invoice_itemlocate.misc5 == 'open') {
      if (document.getElementById('reg_alsosell').innerHTML != '') {
        //clear out fields and regions but leave the is also sell visible
        document.getElementById('txt_partnumbertoadd').value = '';
        document.getElementById('txt_descriptiontoadd').value = '';
        document.getElementById('txt_pricetoadd').value = '';
        document.getElementById('txt_discounttoadd').value = '';
        document.getElementById('hid_cost').value = '';
        document.getElementById('reg_partnote').innerHTML = '';
        document.getElementById('reg_itemtaxes').innerHTML = '';
        document.getElementById('reg_driver_po').innerHTML = '';
        document.getElementById('reg_reference').innerHTML = '';
        document.getElementById('reg_replaceby').innerHTML = '';
        document.getElementById('reg_bins').innerHTML = '';
        document.getElementById('packagingtype').innerHTML = '';
        document.getElementById('reg_part_promos').innerHTML = '';
        //TKS 06.04.2018 #129178
        try {
          document.getElementById('reg_manuf_sup').innerHTML = '';
        } catch (err) {}
        //TKS 02.18.2015 since we are not recalling in the case of also sell being available,
        //we need to place the focus back in the part# field in case they want to search again.
        document.getElementById('txt_partnumbertoadd').focus();
      } else get_cv_invoice_itemlocate(comm_cv_invoice_itemlocate.placement, jobid);
    } else close_overlay(comm_cv_invoice_itemlocate.placement);

    //TKS 06.18.2014 #53411 check to see if our partslookup window is open and if so
    //recall the partslist to show that a part was added to the invoice. To determine this
    //we look to see if a hidden field exists on the page
    if (document.getElementById('hid_pl_modelid'))
      get_cv_lizzy_parts_lookup_partslist('reg_lizzy_parts_lookup_partslist');

    //TKS 02.28.2013 #31461 now that units, jobs and parts are all separate controls
    //we have some checking to do for recalling.
    if (jobid > 0) {
      //TKS 03.01.2013 #31461 this function updates the header of the job
      GetUnitJobHeaderTotals(0, jobid);
      //TKS 03.05.2013 this function checks for unit linked to job and if found
      //then calls the GetUnitJobHeaderTotals and passes in the unitid
      //located in js_mv_viewinvoice.js
      getJobUnitID(jobid);
      //**************************************
      get_cv_viewinvoice_jobdetails('reg_viewinv_jobdetails' + jobid, jobid);
    } else get_cv_viewinvoice_items('reg_main_items', 0, 0);
    //get_cv_viewinvoice_units( 'reg_inv_units' );

    //05.01.2015 jss - ( 67583 ) if on a unit sale, chances are the finance totals need changed
    //so we'll set this global flag to force it to recalc.  As long as this is set prior to calling
    //save_cv_unit_finance we'll be good.  It will force the control to recall itself and recalc.
    if (invoice_type == 3) UnitSaleDepositReceived = true;

    //05.28.2013 er - we need to recalculate the deal upon closing.
    save_cv_unitfinance('frm_unit_finance', 'SoldUnits');
    //get_cv_unitfinance( 'reg_inv_unitfinance' );
    //TKS 06.14.2013 #37233 Eric added the recall of invoice totals to the save unit finance control callback
    //how ever, the finance control should only be called on 4 invoice types. He had this commented out
    // it still needs to be called if not on unit finance to reload the totals
    if (invoice_type != 3 && invoice_type != 11 && invoice_type != 12 && invoice_type != 14)
      get_cv_viewinvoice_totals('reg_inv_totals');
  } else setError(comm_cv_invoice_itemlocate.response);

  //04.11.2019 jss - ( 147193 ) re-enable the add buttons (there's another set of this code above)
  try {
    document.getElementById('btn_additem').disabled = false;
  } catch (err) {}
  try {
    document.getElementById('btn_additemclose').disabled = false;
  } catch (err) {}
  try {
    document.getElementById('btn_additemtop').disabled = false;
  } catch (err) {}
  try {
    document.getElementById('btn_additemclosetop').disabled = false;
  } catch (err) {}
}

//TKS 02.05.2015 #63040 adding a parameter for isAlsoSell. If called from that control
//it means they selected a part with items linked to also sell and if they select one of those
//parts, we do not want to recall or clear the also sell control as they may want to add more from this list
//TKS 05.14.2015 #66724 passing in childitemid so we can return the part# of the child
function getNewInvoicePartInfo(isAlsoSell, ChildItemID) {
  if (isAlsoSell == undefined) isAlsoSell = false;
  if (ChildItemID == undefined) ChildItemID = 0;

  //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  if (document.getElementById('hid_invoice_itemid').value > 0)
    var itemid = document.getElementById('hid_invoice_itemid').value;
  else var itemid = 0;
  //11.09.2011 jss - added encodeURIComponent cuz salina has pound signs in their part #'s
  var path =
    'invoicing/newinvoice/cs_invoice_items.php?partnumber=' +
    encodeURIComponent(document.getElementById('txt_partnumbertoadd').value) +
    '&contactid=' +
    document.getElementById('global_contactid').value +
    '&itemid=' +
    itemid;
  //10.23.2014 jss - ( 58769 )
  path = path + '&invtype=' + invoice_type;
  path = path + '&ChildItemID=' + ChildItemID;
  //TKS 03.03.2021 #186652 passing this over so I can get info about rental quote items
  path = path + '&invoiceid=' + globalInvoiceID;

  //comm_cs_invoice_items.placement = placement;
  comm_cs_invoice_items.callfunc = call_cs_invoice_items;
  comm_cs_invoice_items.isAlsoSell = isAlsoSell;

  ajax_send(path, true, 'GET', null, comm_cs_invoice_items);
}

function call_cs_invoice_items() {
  //this is returned if more than one items is found with the same p/n
  if (comm_cs_invoice_items.response == 'stop') {
    document.getElementById('txt_partnumbertoadd').focus();
    return;
  }

  if (comm_cs_invoice_items.response.substring(0, 5) != 'Error') {
    if (comm_cs_invoice_items.response.substring(0, 5) != 'blank') {
      //07.05.2012 ghh - added to deal with json array instead of pipe array
      //due to pipe symbols in descriptions
      var myarray = JSON.parse(comm_cs_invoice_items.response);

      //07.05.2012 ghh - replaced above code with new json array parsing
      document.getElementById('txt_descriptiontoadd').value = myarray[0];
      document.getElementById('txt_pricetoadd').value = myarray[2];
      document.getElementById('hid_pricetoadd').value = myarray[2];
      //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
      //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
      document.getElementById('hid_invoice_itemid').value = myarray[3];
      document.getElementById('reg_partnote').innerHTML = myarray[6];
      document.getElementById('hid_cost').value = myarray[7];
      document.getElementById('txt_partnumbertoadd').value = myarray[8];
      document.getElementById('packagingtype').innerHTML = myarray[12];
      document.getElementById('reg_ToBePulled').innerHTML = myarray[10];
      document.getElementById('hid_matrixlevel').value = myarray[11];
      document.getElementById('txt_onorder').value = myarray[14];
      document.getElementById('hid_isRental').value = myarray[15];
      //TKS 11.30.2022 #228241
      try {
        document.getElementById('hid_qoh').value = myarray[16];
      } catch (err) {}
      try {
        document.getElementById('hid_minorderqty').value = myarray[17];
      } catch (err) {}
      //***********************

      try {
        document.getElementById('txt_discounttoadd').value = myarray[9];
      } catch (err) {}

      if (myarray[4] == 1) document.getElementById('po_field').style.display = 'inline';
      else document.getElementById('po_field').style.display = 'none';

      //TKS 06.04.2015 #68029 we now send back from the cs_invoice_items whether this field
      //is readonly or not. It is not only contingent on security but if giftcard
      if (myarray[13] == 1) document.getElementById('txt_pricetoadd').readOnly = true;
      else document.getElementById('txt_pricetoadd').readOnly = false;

      close_invoice_itemlocate();
    } else {
      document.getElementById('txt_partnumbertoadd').value = '';
      document.getElementById('txt_descriptiontoadd').value = '';
      document.getElementById('txt_pricetoadd').value = '';
      document.getElementById('txt_discounttoadd').value = '';
      document.getElementById('hid_cost').value = '';
      document.getElementById('reg_partnote').innerHTML = '';
      //TKS 02.05.2015 #63040 added these regions to clear if blank comes back
      //******************
      document.getElementById('reg_itemtaxes').innerHTML = '';
      document.getElementById('reg_driver_po').innerHTML = '';
      document.getElementById('reg_reference').innerHTML = '';
      document.getElementById('reg_replaceby').innerHTML = '';
      document.getElementById('reg_bins').innerHTML = '';
      document.getElementById('reg_alsosell').innerHTML = '';
      //******************
      //TKS 07.03.2012 #20749
      document.getElementById('packagingtype').innerHTML = '';
      //TKS 07.11.2014 #54540 added sales promo region for potential promotions
      document.getElementById('reg_part_promos').innerHTML = '';
    }

    //07.05.2012 ghh - changed broken to myarray
    if (myarray) {
      get_cv_invoice_itembins('reg_bins', myarray[3], '', '');
      get_cv_invoice_itemtaxes('reg_itemtaxes', myarray[3]);
      get_cv_invoice_driver_po('reg_driver_po', myarray[3]); //reference grid that shows drivers and PO #
      //TKS 4-12-10 added item reference
      get_cv_invoice_itemreference('reg_reference', myarray[3], true); //item reference grid
      //TKS 4-12-10 added item replaceby
      get_cv_invoice_itemreplaceby('reg_replaceby', myarray[3]); //item replaceby grid
      //TKS 07.11.2014 #54540 added sales promo drop list
      get_cv_invoice_item_promos('reg_part_promos', myarray[3], 0, 'item_locate');
      //TKS 02.04.2015 #63040 added control to pull up items linked to selected part for also sell
      //only recall this control if working with main itemid. If they clicked on an item inside
      //the also sell control, we do not reload so they can continue adding more items
      if (!comm_cs_invoice_items.isAlsoSell) get_cv_invoice_alsosell('reg_alsosell', myarray[3]);
    }
  } else {
    setError(comm_cs_invoice_items.response);
  }
}

//TKS 10.22.2012 I am leaving these functions the same name as wizards
//they only set focus to or clear fields of the same name so it won't conflict
function search_options() {
  document.getElementById('txt_partnumbertoadd').focus();
}

function clearPartInfo() {
  document.getElementById('txt_descriptiontoadd').value = '';
  //08.06.2010 ghh commented out because of new binloc processes
  //document.getElementById( 'txt_qtytoadd' ).value = '';
  document.getElementById('txt_discounttoadd').value = '';
  document.getElementById('txt_pricetoadd').value = '';
  //TKS 07.03.2012 #20749
  document.getElementById('packagingtype').innerHTML = '';
  //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
  //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
  document.getElementById('hid_invoice_itemid').value = '';
}

//TKS 05.26.2015 #66724 it is worth noting that these next 2 functions
//scanPartNewInvoice and isSinglePartNewInvoice are nowhere to be found in lizzy other than right here
//as of now, they are not being used.
function scanPartNewInvoice() {
  //07.15.2010 ghh checking for more than one match
  isSinglePartNewInvoice(document.getElementById('txt_partnumbertoadd').value);
}

//07.15.2010 ghh this function checks for more than one part on barcode scanner
function isSinglePartNewInvoice(partnumber) {
  var path = 'invoicing/newinvoice/ce_issinglepart.php?partnumber=' + partnumber;
  comm_cs_invoice_items.callfunc = call_isSinglePartNewInvoice;

  ajax_send(path, true, 'GET', null, comm_cs_invoice_items);
}

function call_isSinglePartNewInvoice() {
  if (comm_cs_invoice_items.response.substring(0, 5) != 'Error') {
    //if there is more than one match then we need to stop and make them
    //choose
    if (comm_cs_invoice_items.response == 'stop') {
      //07.15.2010 ghh open locate and force user to choose which item they want
      //get_cv_itemlocate_popup( 'reg_itemlocate' );
    } else {
      //TKS 12.09.2020 #183305 I have to change the name/id of this field because the 'Add new part' link that pulls up
      //the add item control from inventory also has a hid_itemid and breaks because we have 2 idental hidden fields
      document.getElementById('hid_invoice_itemid').value = comm_cs_invoice_items.response;
      save_cv_invoice_itemlocate('frm_invoice_itemlocate', 1, 0);
      document.getElementById('txt_partnumbertoadd').value = '';
      clearPartInfo();
    }
  } else setError(comm_cs_invoice_items.response);
}

//TKS 8-18-10 #1542 this function handles adding items to the invoice from teh current user's
//price code pick list
//11.14.2012 naj - changed name of this function to avoid conflict with old wizard
function itemlocate_AddPriceCodePickListInv() {
  var path = 'invoicing/newinvoice/ce_addpricecode_picklist.php?invoiceid=' + globalInvoiceID;
  path = path + '&contactid=' + document.getElementById('global_contactid').value;

  //05.17.2011 ghh - added selected job if it exists
  try {
    var jobid = document.getElementById('drp_jobs').value;
  } catch (err) {
    var jobid = 0;
  }
  path += '&jobid=' + jobid;

  comm_cv_invoice_itemlocate.callfunc = call_itemlocate_AddPriceCodePickListInv;

  ajax_send(path, true, 'GET', null, comm_cv_invoice_itemlocate);
}

//11.14.2012 naj - changed name of this function to avoid conflict with old wizard
function call_itemlocate_AddPriceCodePickListInv() {
  if (comm_cv_invoice_itemlocate.response.substring(0, 5) != 'Error') {
    //08.11.2009 jss - set a var to remember which search option is selected
    var searchoptions = 0;
    searchoptions = 1;
    try {
      var jobid = document.getElementById('drp_jobs').value;
    } catch (err) {
      var jobid = 0;
    }

    //TKS 03.20.2013 removed searchoptions flag from being passed in here as it is not in
    //function as a parameter in new flow
    get_cv_invoice_itemlocate('video_overlay', jobid);
    get_cv_viewinvoice_items('reg_main_items', 0, 0);
    get_cv_viewinvoice_totals('reg_inv_totals');
  } else setError(comm_cv_invoice_itemlocate.response);
}

//TKS 01.19.2012 added to load the partsmart interface inside lizzy in a draggable window
function get_partsmart(path) {
  document.getElementById('reg_partsmart').style.display = 'block';
  //TKS 06.14.2012 #19995 new region to load items you have selected
  get_cv_curr_partsmart_items('reg_curr_partsmart_items', '');
  //TKS 04.27.2012 added resizable, containment, iframeFix and minWidth and Height
  $(document).ready(function () {
    $('#partsmart').draggable({
      containment: '#wrapper',
      iframeFix: true,
    });

    $('#partsmart').resizable({
      minWidth: 690,
      minHeight: 400,
      alsoResize: '#partsmart_iframe',
    });
  });

  //01.16.2013 ghh - ( 26292 ) added ariopened flag.
  if (!ariopened) {
    self.frames['partsmart_iframe'].location.href = path;
    ariopened = true;
  }
}
//TKS 01.19.2012 closes the partsmart window
function close_partsmart() {
  //TKS 06.14.2012 #19995 new region to load items you have selected
  document.getElementById('reg_curr_partsmart_items').innerHTML = '';
  document.getElementById('reg_partsmart').style.display = 'none';
  //01.18.2013 naj - Stopped clearing the partsmart iframe so we can always return to the last location we viewed.
  //document.getElementById( "partsmart_iframe" ).contentWindow.document.body.innerHTML = '';
}

//01.19.2012 ghh - this is the actual function that partsmart calls to do the real
//work of adding items to the invoice.
function sendToLizzyARI(data) {
  //TKS 06.14.2012 can get rid of this try catch when done
  try {
    if (document.getElementById('drp_jobs') != '') var jobid = document.getElementById('drp_jobs').value;
    else var jobid = 0;
  } catch (err) {
    var jobid = 0;
  }

  //05.04.2012 ghh - we don't want to close window when sending to lizzy as they may
  //have more parts to lookup
  //parent.close_partsmart();
  //TKS 06.14.2012 can get rid of invoiceid and jobid here as they are not handled here
  var path =
    'invoicing/ce_partsmart.php?action=AddParts&invoiceid=' +
    globalInvoiceID +
    '&jobid=' +
    jobid +
    '&contactid=' +
    document.getElementById('global_contactid').value;

  var field = 'data=' + data.replace(/&/g, '|');

  comm_cv_invoice_itemlocate.callfunc = call_sendToLizzyARI;

  ajax_send(path, true, 'POST', field, comm_cv_invoice_itemlocate);
}

//01.19.2012 ghh - added callback to above function once we're done with
//partsmart pushing us parts
function call_sendToLizzyARI() {
  if (comm_cv_invoice_itemlocate.response.substring(0, 5) != 'Error') {
    //TKS 06.15.2012 removed the call to reload the invoice items control
    //as all this process does now is add items to a picklist. we have a separate
    //process for the individual buttons in the picklist located in invoicing/newinvoice/cv_curr_partsmart_items
    get_cv_curr_partsmart_items('reg_curr_partsmart_items', '');
  } else setError(comm_cv_invoice_itemlocate.response);
}
