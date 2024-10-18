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

var addPartsBtn = document.getElementById("addParts");
console.log(addPartsBtn);
addPartsBtn.addEventListener(
	"click", () => {
		addParts();
	});

const partsAndQuantities = {
	"0": {
		"partNumber": "T2043181",
		"quantity": 1
	},
	"1": {
		"partNumber": "T2060185",
		"quantity": 1
	},
	"2": {
		"partNumber": "T2304694",
		"quantity": 2
	},
	"3": {
		"partNumber": "T2307201",
		"quantity": 2
	},
	"4": {
		"partNumber": "T2312000",
		"quantity": 1
	},
	"5": {
		"partNumber": "T2319100",
		"quantity": 1
	},
	"6": {
		"partNumber": "T2319103",
		"quantity": 1
	},
	"7": {
		"partNumber": "T2319104",
		"quantity": 1
	},
	"8": {
		"partNumber": "T2319105",
		"quantity": 1
	},
	"9": {
		"partNumber": "T2319107",
		"quantity": 1
	},
	"10": {
		"partNumber": "T2319108",
		"quantity": 2
	},
	"11": {
		"partNumber": "T2319119",
		"quantity": 1
	},
	"12": {
		"partNumber": "T2319125",
		"quantity": 1
	},
	"13": {
		"partNumber": "T2319129",
		"quantity": 1
	},
	"14": {
		"partNumber": "T2504922",
		"quantity": 1
	},
	"15": {
		"partNumber": "T2701337",
		"quantity": 1
	},
	"16": {
		"partNumber": "T3020131",
		"quantity": 4
	},
	"17": {
		"partNumber": "T3050154",
		"quantity": 2
	},
	"18": {
		"partNumber": "T3050323",
		"quantity": 2
	},
	"19": {
		"partNumber": "T3202307",
		"quantity": 2
	},
	"20": {
		"partNumber": "T3330943",
		"quantity": 12
	},
	"21": {
		"partNumber": "T3331061",
		"quantity": 2
	},
	"22": {
		"partNumber": "T3331065",
		"quantity": 4
	},
	"23": {
		"partNumber": "T3350004",
		"quantity": 2
	},
	"24": {
		"partNumber": "T3350050",
		"quantity": 2
	},
	"25": {
		"partNumber": "T3350123",
		"quantity": 9
	},
	"26": {
		"partNumber": "T3551139",
		"quantity": 2
	},
	"27": {
		"partNumber": "T3600331",
		"quantity": 2
	},
	"28": {
		"partNumber": "T3750011",
		"quantity": 2
	}
}

// Lizzy2 stuff
function addParts() {
	for (const key in partsAndQuantities) {
		const partAndQuantity = partsAndQuantities[key];

		const partNumInput = document.getElementById('txt_partnumbertoadd');
		partNumInput.value = partAndQuantity.partNumber;

		const myPromise = new Promise((resolve, reject) => {
			get_cv_itemslist_custom('Invoice', 'reg_itemlocate', 0, 2, 'txt_partnumbertoadd');
			setTimeout(() => {
				resolve("foo");
			}, 300);
		});

		myPromise.then(() => {
			const itemSelectorLink = document.querySelectorAll('[href^="Javascript:globalCallNavSave=false; InvItemSelect"]');
			if (itemSelectorLink.length > 0) {
				const splitLink = itemSelectorLink[0].href.split(', ');

				if (splitLink.length > 0) {
					const itemId = splitLink[1];

					InvItemSelect('reg_itemlocate', itemId, false, false, itemId);

					const partQuantityInput = document.getElementById('txt_qtytoadd469')
					partQuantityInput.value = partAndQuantity.quantity;

					save_cv_invoice_itemlocate('frm_invoice_itemlocate', 1, 0, false, 'open');
				}
			}
		});
	}
}

async function getData() {
	const url = 'inventory/cv_itemslist.php?kit=2&placement=reg_itemlocate&count=0&page=Locate&vendor=&supplier=0&itemno=T2043181&generic=&serial=&rad_generic=1&active=true&nstock=false&comingfrom=Invoice&usescanner=false&itemnumberfieldname=txt_partnumbertoadd&poid=0&binname=&asin=&locationid=0&kitID=0&invoiceid=24769&contactid=119970';
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const text = await response.text();
		console.log(text);
	} catch (error) {
		console.error(JSON.stringify(error.message));
	}
}

var comm_cv_itemslist = new onConnect(false, false, call_cv_itemslist);

function onConnect(response, placement, callfunc, misc, misc2, misc3, misc4, misc5) {
	this.response = response;
	this.placement = placement;
	this.callfunc = callfunc;
	this.misc = misc;
	this.misc2 = misc2
	this.misc3 = misc3;
	this.misc4 = misc4;
	this.misc5 = misc5;
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

	var generic = '';
	var rad_generic = 1;

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

	//TKS 10.17.2016 #92950 adding location drop list if in rental schedule control
	if (comingfrom == 'RentalSchedule')
		path = path + '&locationid=' + document.getElementById('drp_location').value;
	else
		path = path + '&locationid=0';

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


	// AP: Path
	/*
		'inventory/cv_itemslist.php?kit=2&placement=reg_itemlocate&count=0&page=Locate&
			vendor=&supplier=0&itemno=T2043181&generic=&serial=&rad_generic=1&active=true&
			instock=false&comingfrom=Invoice&usescanner=false&itemnumberfieldname=txt_partnumbertoadd&
			poid=0&binname=&asin=&locationid=0&kitID=0&invoiceid=24769&contactid=119970'
	*/
	ajax_send(path, true, 'GET', null, comm_cv_itemslist);
}


/*********
 * Thinking about creating custom get_cv_itemslist call that will call a custom fetch request
 * unsure if their server will let me make the accept the request but doesn't look like anything is in it that
 * would prevent it
 */