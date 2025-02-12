var comm_cv_itemslist = new onConnect(false, false, call_cv_itemslist);
var globalGetItemList = false; //12.21.2011 ghh - added to keep item list locate working
var globalGetItemListTrue = false; //12.21.2011 ghh - added to keep item list locate working
var globalScanIndividual = false; //12.12.2012 ghh - 
var globalCallNavSave = true;//TKS 08.20.2015 #72329 flag to prevent the enter key from calling more than once
//is_kit - 0 is show items, 1 is kit, 2 show both 
function get_cv_itemslist(comingfrom, placement, count, is_kit, itemnumberfieldname) {
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
				}
				else
					globalScanIndividual = false;
			}
			catch (err) {
				globalScanIndividual = false;
			}
		}
	}
	catch (err) { }

	//12.21.2011 ghh - added to save the information being sent in so that if we need to recall
	//it later we have what we need
	comm_cv_itemslist.comingfrom = comingfrom;
	comm_cv_itemslist.placement = placement;
	comm_cv_itemslist.count = count;
	comm_cv_itemslist.is_kit = is_kit;
	comm_cv_itemslist.itemnumberfieldname = itemnumberfieldname;

	//03.07.2012 ghh - added desc out here because it could now exist
	//in a number of differnet places
	//TKS 02.26.2016 #81413 changed from a txt_desc to txt_generic that looks for radio option
	//if this is loaded without the radio option, then it will always search for desc by default
	//###########################
	//###########################
	/*
	desc = '';
	try 
		{
		if ( document.getElementById( 'txt_desc' ) )
			desc			= document.getElementById( 'txt_desc' ).value;
		}
	catch (err)
		{
			desc 			= '';
		}*/
	var generic = '';
	var rad_generic = 1;
	try {
		var rad_generic = get_radio_checked_value('rad_generic');
		if (!rad_generic)
			rad_generic = 1;
	}
	catch (err) { var rad_generic = 1; }

	try {
		//try our new field first, but in the case this control is loaded elsewhere 
		//that has a txt_desc, we try it next otherwise default to ''
		if (document.getElementById('txt_generic'))
			generic = document.getElementById('txt_generic').value;
		else
			generic = document.getElementById('txt_desc').value;
	}
	catch (err) {
		generic = '';
	}
	console.log(generic + '----' + rad_generic);
	//###########################
	//###########################
	//TKS 08.08.2024 #274082 locate part on invoice by serial #
	var serial = '';
	try {
		serial = document.getElementById('txt_serialnum').value;
	}
	catch (err) {
		serial = '';
	}

	//12.21.2011 ghh - if form is already locating items then we want to exit and give it time
	//to complete to keep from overlapping results
	if (globalGetItemList) {
		//12.21.2011 ghh - this flag lets us know there is more to do and we're going to call this again
		//from the call back function once it returns the current request
		globalGetItemListTrue = true;
		return;
	}
	else
		globalGetItemList = true;//12.21.2011 ghh - let callback know we're hunting

	//12.20.2010 jss - most forms don't use these var's, so set them to '' before we start
	var active = true;
	var instock = false;
	var vendor = 0;
	var supplier = 0;
	var binname = '';//06.08.2011 jss -	
	var ASIN = '';//09.14.2022 tam - 216555

	//02.01.2011 ghh added to deal with when we first open the control
	if (itemnumberfieldname == undefined)
		var itemno = Itm_ItemNo;
	else
		//06.08.2011 jss - added itemno = '' to the catch
		try { var itemno = document.getElementById(itemnumberfieldname).value; } catch (err) { var itemno = '' }

	try { var poid = document.getElementById('hid_poid').value; } catch (err) { var poid = 0; }


	//if kit then enter 1 else 0
	if (is_kit == undefined)
		is_kit = 0;

	if (count == undefined)
		count = 0;

	//12.17.2010 jss - added an if statement cuz we're gonna use this list control all over the place now
	//TKS 06.20.2012 added crm items
	//TKS 11.13.2015 #76376 added UnitOptions for item locate on options control
	//09.18.2017 tam - 98271 added RawMaterial
	if (comingfrom == 'Inventory' || comingfrom == 'CRMItems'
		|| comingfrom == 'AddToKit' || comingfrom == 'UnitOptions'
		|| comingfrom == 'RawMaterial') {
		if (document.getElementById('drp_vendors'))
			vendor = document.getElementById('drp_vendors').value;
		if (document.getElementById('drp_suppliers'))
			supplier = document.getElementById('drp_suppliers').value;
		if (document.getElementById('chk_active'))
			active = document.getElementById('chk_active').checked;
		if (comingfrom == 'Inventory' || comingfrom == 'AddToKit') {
			if (document.getElementById('chk_instock'))
				instock = document.getElementById('chk_instock').checked;

			//06.08.2011 jss -	
			//02.01.2022 tam - 209515 adding escape around the bin name because certain special characters
			//like # do not get passed through without being escaped
			if (document.getElementById('txt_binname'))
				binname = escape(document.getElementById('txt_binname').value);

			//09.14.2022 tam - 216555 adding ASIN
			if (document.getElementById('txt_asin'))
				ASIN = document.getElementById('txt_asin').value;

			//itemno		= document.getElementById( 'txt_itemno' ).value;
		}
	}

	//TKS 12.05.2019 #161509 added instock checkbox to item locate on invoice
	//07.19.2021 tam - 186940 adding CheckPartPrice to this
	if (comingfrom == 'Invoice' || comingfrom == 'CheckPartPrice') {
		if (document.getElementById('chk_instock'))
			instock = document.getElementById('chk_instock').checked;
	}

	//12.21.2010 jss - 
	var usescanner = 'false';
	try { usescanner = document.getElementById('chk_usescanner').checked; } catch (err) { }

	//11.21.2017 jec - Ticket 117120 add try for vendor
	try { var vendor = document.getElementById('drp_vendors').value; } catch (err) { var vendor = 0; }
	//04.28.2011 naj - added encoding for handling + signs
	itemno = encodeURIComponent(itemno);
	//02.24.2016 ghh -  added encode so we could do wildcard searches
	//TKS 02.26.2016 #81413 changed from desc to generic as we have a radio option to say what it is
	//desc = encodeURIComponent(desc);
	generic = encodeURIComponent(generic);
	//TKS 08.08.2024 #274082
	serial = encodeURIComponent(serial);

	//12.17.2010 jss - added comingfrom to the path
	//09.14.2022 tam - 216555 adding ASIN
	var path = 'inventory/cv_itemslist.php?kit=' + is_kit +
		'&placement=' + placement +
		'&count=' + count +
		'&page=' + document.getElementById('global_inv_list').value +
		'&vendor=' + vendor +
		'&supplier=' + supplier +
		'&itemno=' + itemno +
		'&generic=' + generic +
		'&serial=' + serial +
		'&rad_generic=' + rad_generic +
		'&active=' + active +
		'&instock=' + instock +
		'&comingfrom=' + comingfrom +
		'&usescanner=' + usescanner +
		'&itemnumberfieldname=' + itemnumberfieldname +
		'&poid=' + poid +
		'&binname=' + binname +
		'&asin=' + ASIN;

	//TKS 12.01.2011 #9758 get rid of CatA now starting cats with B level
	//path = path + '&catA=' + Itm_CatA;
	//12.14.2012 ghh - added so we only add the category stuff to actual
	//inventory locate and not from invoice and other parts of program
	//TKS 12.18.2012 #27332 added comingfrom rental to include the categories
	if (globalMenuID == 156 || comingfrom == 'RentalSchedule') {
		path = path + '&catA=' + Itm_CatA;
		path = path + '&catB=' + Itm_CatB;
		path = path + '&catC=' + Itm_CatC;
	}

	//TKS 10.17.2016 #92950 adding location drop list if in rental schedule control
	if (comingfrom == 'RentalSchedule')
		path = path + '&locationid=' + document.getElementById('drp_location').value;
	else
		path = path + '&locationid=0';

	//TKS 10.02.2015 #64522 if on webstore featured slide, pass over the interfaceid they are working with
	if (globalMenuID == 682 && comingfrom == 'FeaturedImageSlider')
		path = path + '&interfaceid=' + get_radio_checked_value('rad_interface');


	//TKS 01.02.2014 #45274 passing the kitid over if working with create kit
	//so we can exclude items already on kits set to OrderByMaster
	if (comingfrom == 'AddToKit')//create kit
		path = path + '&kitID=' + kitID;
	else
		path = path + '&kitID=0';

	//08.11.2011 jss - pass down the invoiceid used for getting location for showing qty on hand
	path = path + '&invoiceid=' + globalInvoiceID;

	//TKS 06.03.2014 #52713 passing over contactid now that we can link bins to a contact.
	path = path + '&contactid=' + document.getElementById('global_contactid').value;

	comm_cv_itemslist.placement = placement;
	comm_cv_itemslist.callfunc = call_cv_itemslist;

	//12.21.2010 jss -	
	comm_cv_itemslist.misc1 = itemnumberfieldname;
	//TKS 08.20.2015 #72329 so we know where we are during the arrow navigation below
	//in our callback()
	comm_cv_itemslist.misc2 = comingfrom;

	ajax_send(path, true, 'GET', null, comm_cv_itemslist);
}


function call_cv_itemslist() {
	//TKS 08.24.2015 #72329 reset this index var if locating another item
	addItemBinQtyIndex = -1;//declared in js_master.js
	//12.21.2010 jss - if using a scanner and we only get one result we'll simulate the user clicking the "select" icon and not even show the contorl
	if (comm_cv_itemslist.response.substring(0, 7) == 'barcode') {
		var temp = comm_cv_itemslist.response.split('~');
		eval(temp[1]);
		var itemnumberfieldname = comm_cv_itemslist.misc1;
		document.getElementById(itemnumberfieldname).select();

	}
	else {
		//06.22.2016 jss - ( 87686 ) added error sound if on the new shipping control.
		//this happens when a part is either scanned, or hand entered, and we either
		//get multiple results, or none at all.  This alerts the shipper to look at the
		//screen
		if (comm_cv_itemslist.misc2 == 'ShippingFormNew' && document.getElementById('chk_usescanner').checked)
			soundManager.play('ScanError');

		document.getElementById(comm_cv_itemslist.placement).innerHTML = comm_cv_itemslist.response;

		//TKS 08.18.2015 #72329 adding arrow key navigation
		//#########################################
		//#########################################
		//this starts the index off before the first element
		var displayBoxIndex = -1;
		//our highlight class
		var cssClass = "display_box_hover";
		globalCallNavSave = true;
		//TKS 02.05.2020 #163841 changed to on() rather than keydown() as keydown() depreciated in latest jQuery
		$(document).on("keydown", function (e) {
			//make sure e is the correct browser supported event
			//some browsers do not support keyCode and jQuery uses which
			e = e || window.event;
			switch (e.which || e.keyCode) {
				case 38://up arrow
					//TKS 06.01.2017 #105188
					//prevent this behavior anywhere else if the results window is empty
					if (document.getElementById(comm_cv_itemslist.placement).innerHTML == '') {
						globalCallNavSave = false;
						return;
					}
					//e.preventDefault();//uncomment if you want to prevent the scroll behavior
					Navigate(-1);
					break;
				case 40://down arrow
					//TKS 06.01.2017 #105188
					//prevent this behavior anywhere else if the results window is empty
					if (document.getElementById(comm_cv_itemslist.placement).innerHTML == '') {
						globalCallNavSave = false;
						return;
					}
					//e.preventDefault();//uncomment if you want to prevent the scroll behavior
					Navigate(1);
					break;
				case 13://enter key
					//TKS 06.01.2017 #105188
					//prevent this behavior anywhere else if the results window is empty
					if (document.getElementById(comm_cv_itemslist.placement).innerHTML == '') {
						globalCallNavSave = false;
						return;
					}
					if (globalCallNavSave) {
						Navigate(2);
						e.preventDefault();
					}
					break;
				default:
					return; // allow other keys to be handled
			}
		});

		var Navigate = function (diff) {
			//this next line is very important as the onkeyup event in most text fields are doing 
			//a hot search which recalls the grid we are trying to navigate through. The onkey event
			//of the arrow keys recall the grid over and over and it resets everything so we MUST take focus
			//out of the active field so our code can work.
			document.activeElement.blur();

			//this holds our collection/object
			var oBoxCollection = $(".display_box");
			//enter here if they hit enter
			if (diff > 1) {
				try {
					//GHH wanted to scroll back to the top of the control if you have scrolled down
					//in the item list. If in the overlay then grab the current position of the control
					//as you could have scrolled way down an invoice.
					if (document.getElementById('video_overlay').innerHTML != '') {
						//grab the current margin as it is built dynamically
						var scroll = $(".overlay_tbl").css('margin-top');
						//strip off the 'px' so we have just the number
						scroll = scroll.replace("px", "");
						scrollTo(0, scroll);
					}
					else
						scrollTo(0, 0);

					eval(document.getElementById('hid_action' + displayBoxIndex).value);
					//after they hit enter, reset our index
					displayBoxIndex = -1;
					globalCallNavSave = false;
				} catch (err) { }


				//after they hit enter we have special conditions that may apply depending
				//on where you are in lizzy. If on add item to po for example GHH wants the
				//focus to go back into the item# field. If on invoice add item we are going to try
				//and put focus into the qty field and allow the + and - keys to increase or decrease the qty
				switch (comm_cv_itemslist.misc2) // comingfrom;
				{
					case 'POAddItem':
						try {
							document.getElementById(comm_cv_itemslist.itemnumberfieldname).focus()
						}
						catch (err) { }
						break;
					default:
						break;
				}
			}
			//enter here if clicking on the arrow keys
			else {
				//this is the index we are working with in our array of rows we are cycling through
				displayBoxIndex += diff;
				//if the index we are on is >= to the length of our collection then we have
				//reached the bottom. Reset so we can start from the top again
				if (displayBoxIndex >= oBoxCollection.length)
					displayBoxIndex = 0;
				//if we reached the top, set it to start at the bottom 
				if (displayBoxIndex < 0)
					displayBoxIndex = oBoxCollection.length - 1;

				//remove the highlight class from the entire collection
				oBoxCollection.removeClass(cssClass);
				//add the class to the current ( this ) active class index
				$(".display_box").eq(displayBoxIndex).addClass(cssClass);
			}
		}
		//#########################################
		//#########################################
	}

	//12.21.2011 ghh - reset our global flag so we can go retrieve another set if necessary
	globalGetItemList = false;

	//12.21.2011 ghh - now see if we need to recall the get because of another search that got interrupted
	if (globalGetItemListTrue == true) {
		globalGetItemListTrue = false;
		get_cv_itemslist(comm_cv_itemslist.comingfrom, comm_cv_itemslist.placement, comm_cv_itemslist.count, comm_cv_itemslist.is_kit, comm_cv_itemslist.itemnumberfieldname);
	}
}

function js_cv_itemslist() {
	return true;
}

//*****************************************************
//*****************************************************
function kit_add_item(itemid) {
	//02.03.2020 tam - 163824 adding location
	var path = 'inventory/ce_additemkit.php?itemid=' + itemid +
		'&kitid=' + kitID +
		'&loc=' + document.getElementById('drpLocation').value;

	comm_cv_itemslist.callfunc = call_kit_add_item;

	ajax_send(path, true, 'GET', null, comm_cv_itemslist);

}


function call_kit_add_item() {
	if (comm_cv_itemslist.response.substring(0, 5) == 'Error')
		setError(comm_cv_itemslist.response);
	else {
		get_cv_kititems('reg_kititems', '', '');
	}
}

function set_kitID(itemid) {
	kitID = itemid;
	get_cv_createkit_step2('reg_createkit');
}
//*****************************************************
//*****************************************************

//12.20.2010 jss - this is where we call the ce page when a user selects an item
function save_cv_itemslist(comingfrom, itemid, itemnumber) {
	var path = 'inventory/ce_itemslist.php?comingfrom=' + comingfrom + '&itemid=' + itemid;
	var postFields = '';//get_objects( formname );
	comm_cv_itemslist.callfunc = call_save_cv_itemslist;
	comm_cv_itemslist.misc1 = comingfrom;
	comm_cv_itemslist.misc2 = itemid;
	comm_cv_itemslist.misc3 = itemnumber;

	ajax_send(path, true, 'GET', postFields, comm_cv_itemslist);
}

function call_save_cv_itemslist() {
	var comingfrom = comm_cv_itemslist.misc1;
	var itemid = comm_cv_itemslist.misc2;
	var itemnumber = comm_cv_itemslist.misc3;
	//alert( comm_cv_itemslist.response );//uncomment line for testing
	if (comm_cv_itemslist.response.substring(0, 5) != 'Error') {
		if (comingfrom == 'CheckPartPrice') {
			document.getElementById('txt_partnumber').value = itemnumber;
			close_check_part_price_itemlocate('reg_itemlocate');
			getCheckPartInfo();
		}
	}
	else
		setError(comm_cv_itemslist.response);
}

//09.18.2017 tam - 98271 function for RawMaterial
function raw_add_item(itemid) {
	var path = 'inventory/ce_rawitems.php?itemid=' + itemid +
		'&masterid=' + document.getElementById('hid_itemid').value;

	comm_cv_itemslist.callfunc = call_raw_add_item;
	comm_cv_itemslist.masterid = document.getElementById('hid_itemid').value;
	comm_cv_itemslist.editid = itemid;

	ajax_send(path, true, 'GET', null, comm_cv_itemslist);

}

function call_raw_add_item() {
	if (comm_cv_itemslist.response.substring(0, 5) == 'Error')
		setError(comm_cv_itemslist.response);
	else {
		//make the callback with the item just entered so that it can be edited without another click
		//TKS 12.08.2020 #142582 I am updating all the overlay places from hard coded to 
		//using my function call. I am not sure if this control is calling for the first time
		//or recalling. So I am going to check before I use my function call
		if (comm_cv_rawitems.placement == undefined)
			var placement = NextAvailOverlay();
		else
			var placement = comm_cv_rawitems.placement;

		get_cv_rawitems(placement, comm_cv_itemslist.masterid, comm_cv_itemslist.editid);
	}
}

//05.27.2014 ghh - ( 52935 ) added to deal with adding aliases to items
//quicker. The itemnumber passed in is the actual alias or scan code. We
//will be asking them for the actual part number to link it to
function addAliasToItem(aliasnumber) {
	//now we popup and ask them to hand type the actual part number
	var pn = prompt("Please Enter The Actual Part Number To Link", "Enter Your Part Number: ");

	if (pn != undefined) {
		var path = 'inventory/ce_addaliasfrompo.php?itemnumber=' + pn + '&aliasnumber=' + aliasnumber +
			'&supplierid=' + document.getElementById('drp_supplier').value;

		comm_cv_itemslist.callfunc = call_addAliasToItem;

		ajax_send(path, true, 'GET', null, comm_cv_itemslist);
	}
}

function call_addAliasToItem() {
	//alert( comm_cv_itemslist.response );//uncomment line for testing
	if (comm_cv_itemslist.response.substring(0, 5) != 'Error') {
		document.getElementById('reg_multipo').innerHTML = '';
		document.getElementById('txt_partnumber').focus();
	}
	else
		setError(comm_cv_itemslist.response);
}


