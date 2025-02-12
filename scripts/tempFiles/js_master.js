var globalJobPartsReturnsBin = 0;//TKS 08.13.2024 #273342
var globalEmailPPMID = 0;
var globalSMSPPMID = 0;
var globalFleetReportContact = 0;
var globalFleetReportUnitID = 0;
var globalAR_ARID = 0;//TKS 10.20.2023 #249680
//TKS 12.19.2022 #228827 if coming from alert, load this tab on invoice
var globalInvoiceChatTab = false;
//TKS 04.21.2022 #208808 for adding job template to specific unit
//so we can auto select the unit in the droplist on invoice
var globalInvJobTemplateUnitID = 0;
//TKS 03.25.2022 #209028 for duplicating a model in settings
var ModelCopy = 0;
//TKS 08.18.2021 #197446 this var holds a string to tell the parts
//trouble shooting report to set certain fields by default. It is used
//in the Data Management control in lizzy root dir.
var DMPartsTrouble_ComingFrom = '';
var DMReceiptbox_ComingFrom = '';
var DMSOList_ComingFrom = '';
var DMARAging_ComingFrom = '';
var DMSupplierAR_ComingFrom = '';
//TKS 05.22.2018 #127953 for sales dash. need this here so we have it declared
//will clear it out anytime you add or locate a contact in the contact module.
var globalSalesDashOpp = 0;
var globalDashFirstName = '';
var globalDashLastName = '';
var globalDashBusiness = '';
var globalDashOnlyOpp = 0;
var globalDashPhone = '';
var globalDashEmail = '';
var globalSalesDashView = '';
//TKS 02.13.2018 #116041 when clicking on an incoming sms alert,
//we take you to the invoice. This flag tells the invoice to expand the customer 
//info section so you can see the phone #s and pull up texting
var SMSAlertInvoiceCust = false;
var global_AlertlistPastDue = 0;
var global_AlertlistUserID = 0;

//TKS 09.22.2016 #92466
var global_SalesUserID = 0;
var global_SalesDate = '';
var globalSalesDeptView = 'Dashboard';
var ConferenceCallFlag = '';//flag for conference calls
var ConferenceContact = 0;//this holds the contactid that we are adding to the conference
var globalConferenceID = 0;//holds the conf id so our page knows which conf to save the contact to
var SalesEmailTopic = false;//TKS 02.28.2018 #99254 flag to load topic control for email
var SalesEmailTopicID = 0;//TKS 02.28.2018 #99254 holds topicid to link to email
//TKS 08.17.2017 #111639
var JoinConference = 0;
var globalCalConfID;
//TKS 02.19.2018 #122046 added to track date and checkbox
var globalConfDate = '';
var globalConfFutureDates = false;
//TKS 02.19.2018 #122046 if you expand a conf. to participants
//or you click to add more people, this holds the id so when you come back, it expands
//automatically
var globalConfWorkingWith = 0;

var SimpleLocateTicket = false;
var globalSimpleTicketKeywords = '';
var globalSimpleTicketLocation = 1;//1 title, 2desc, 3 notes, 4 all
var globalSimpleTicketTag = '';//TKS 06.01.2017 #105188 tags on personal notes
var globalSimpleTicketContact = 0;//TKS 06.01.2017 #105188 limit for current contact
var globalSimpleTicketViewAll = 0;//TKS 06.01.2017 #105188 view other's notes 
var globalSimpleTicketCreatedBy = 0;//TKS 07.24.2017 #110524
//TKS 08.15.2017 #111703 moved from js_mv_contactissues.js
var globalCRMTicketsViewAll = '';
var globalCRMTicketsHideTesting = '';
var globalCRMTicketsHideSupport = '';
//TKS 08.15.2017 #111703
var globalCRMTicketsTopPriority = '';
var globalCRMTicketsUrgent = '';

//TKS 12.14.2017 #117166 schedule incoming
var globalScheduleScrollRight = 0;
var globalScheduleScrollTop = 0;
//TKS 02.24.2016 #81387 this var tells the proj-section-detail control
//it has been called by the knowledbase link in header and to show all projects 
//to customers, not just support project. For now it will be blank or hold 'KB'
//but can be used in the future for other controls that need special consideration
var ProjSectionDetailFrom = '';
//TKS 02.22.2016 #81297 now allowing log call without contact set
//this flag gets set when they are locating a contact to add to the call
var GlobalCallContactID = 0;
var CanStopCorrespondence = 0;

//TKS 04.03.2017 #103799 flag to tell log call screen
//it was called from a post sale follow up event so it puts the
//event title in the topic title
var PostSaleCall = 0;
//TKS 06.15.2017 #105629 holds 3 or 22 for call or face to face
//calendar event type. This flag is used for scheduled
//call backs vs scheduled face to face
var LogCallTopicID = 0;
var ScheduledCorrType = 3;
var CallBackView = 2;
//TKS 08.24.2015 #72329 key navigation holds current item bin index
var addItemBinQtyIndex = -1;
//TKS 12.07.2011 #9892 added these to track mouse coords so we can load the quick view dialog near where you click
var DragDialogY = 0;
var DragDialogX = 0;
//**********************
//TKS 05.19.2014 #52407 holds date to view schedule incoming. Added for view contact
//and wanting to jump to scheduled incoming to view in case you need to edit something
var globalIncomingDate = '';
//TKS 01.21.2014 #45513 these two vars tell the add additional contact control
//to add the new contact to the current call and when done, pull up the call window
var AddConCallLogID = '';
var AddConTopicID = '';
//**********************
//TKS 10.22.2012 temp flag so we can still use some existing controls
//I am creating new invoice view and flow. it will hold true if
//on the old way
var globalOldInvoiceView = true;
//TKS 04.04.2013 #33726 new flags for sales and service invoice flow
var globalOldSalesInvoiceView = true;
var globalOldServiceInvoiceView = true;
//***************************************
//TKS 04.15.2015 #63750 flag to tell view invoice that when it is pulling up that it was 
//immediately after create and not just for view from a link or locate. This flag will then tell
//the customer notes control to popup automatically if that customer is set to auto pop up and
//they have a note and this only needs to happen when creating an invoice
var globalCreatingInvoice = false;

var globalInvoiceEditControl = 0;//TKS 10.25.2012 flag used in invoicing/newinvoice/js_mv_viewinvoice.js
//TKS 12.26.2012 #27332 moved these from rental schedule to here because invoicing uses them as well
//****************************************************************
var RentalCalView = 'Monthly';
var RentalSchVehicleType = 0;
var RentalSchModel = 0;
//TKS 10.11.2016 #92637 remember date they are working with
var RentalSchDate = '';
var globalRentalLocation = '';//TKS 10.14.2016 #92950

var globalRentalType = 1;//when scheduling determines 1 unit or 2 item rental
var globalInvRentalType = 1;//when scheduling determines 1 unit or 2 item rental on invoice
var Itm_CatA = '';
var Itm_CatB = '';
var Itm_CatC = '';
//****************************************************************
var global_crm_item = 0;//TKS 06.20.2012 #19923
var video_control = '';
var language = 1;
var page = '';
var comm_cv_messagealerts = new onConnect(false, false, call_cv_messagealerts);
var comm_cv_usermessages = new onConnect(false, false, call_cv_UserMessages);
var comm_cv_checkconf = new onConnect(false, false, call_CheckConfJoin);
var MESSAGEALERTTIMER = 120000; //07.29.2014 naj - changed to 2 minutes, to reduce load on server.
var StopMessageAlerts = false;//TKS 12-30-10 #1890 this flag gets set to prevent the auto running of the message alerts when someone does the quick logout
var userchat1 = 0;
var userchat2 = 0;
var userchat3 = 0;
var getUserMessagesRunning = false;
var global_CurrentEFT = 0;
var Global_bwidth = 0;
var Global_bheight = 0;
//TKS 05.31.2012 added in the hopes that from here forward all flags for locate contact will use this var
var LocateContactFlag = '';
var LinkContactFlag = 0;
var globalContactScanTag = '';
//************************************
//TKS 04.29.2015 #67354 flag to tell unassigned support list to show reviewed tickets or not
var globalTicketManagerReviewed = 1;
//**********************
//TKS 10-15-12 if coming from email module viewing current contact emails
//and they click to view corresp. this flag will help load contacts module
//and all the controls
var globalLoadCorr = false;
//************************
var NewInvoiceFlag = '';//tells our contact locate form where to go after selecting a contact
var globalInvoiceID = 0;//07.11.2010 ghh moved here from ms_locateinvoice due to problems on invoice
var globalInvoiceIDToPay = '';//05.04.2011 ghh - added to hold multiple invoices for payment
//TKS 05.31.2018 #129082 when creating quote from interested units control
//if we have a modelid for trade, this flag will tell the new invoice we created 
//to open the add trade unit control with this model already selected
var globalTradeModelID = 0;
var globalWarrantyID = 0;//TKS 05.13.2011 moved from mv_view_warranty
var invoice_type = 0;//1-20-11 moved here from mv_new_invoice due to problems on invoice
var invoice_status = 0;//TKS 11.13.2013 #43002 using global var instead of hidden fields now taht we can have invoice and overlay invoice on the screen at same time
var LogEmailAddress = '';//anytime someone clicks a link inside of Lizzy to email this var holds the email address long enough to take them to the email module
var LogEmailTopicID = 0;//TKS 05.07.2013 #35202 anytime someone clicks a link inside of Lizzy to email this var holds topicid if linking to a call
var LogEmailUnitID = 0;//TKS 07.06.2015 #70166
var globalPOID = 0; //moved from js_mv_view_po.js because we need this var in other modules like invoicing
var globalTaggedJobID = 0;//03.08.2011 ghh added to allow creating templates directly from service ticket jobs
var globalUnitID = 0;//TKS 4-28-11 moved from locate unit
//TKS 05.12.2016 #85906 tracking invoice and PO locate paging
var globalInvoiceLocatePaging = 1;
var globalPOLocatePaging = 1;
//TKS 06.03.2015 #52516 changing this to globalIAmDept so we can look at more than service
//var globalIAmService = 0;//05.12.2011 ghh - added to show service menu instead of invoice if person in service
var globalIAmDept = 0;
var CalledFromWhoToCall = false;//TKS 03.03.2015 #63795 tells edit additional contact form being called from payment form

//******************************
//TKS 10.29.2015 #74947 moved from build kit
var kitID = 0;
var globalKitQty = 0;
var kitMultiplier;
var itemMultiplier;
var BuildKitStation = 0;//TKS 07.27.2016 #89449
var FinishedKitBin = 0;//TKS 07.27.2016 #89449
//TKS 7-22-10 #1146 when a service job is complete we log a calendar event that has a link to log a call
//if the default call type is set for service in settings then we setup the call and go to the log call page
//if it is not, we rely on this flag to hold the invoiceid and it tells the logcall page to include my file
//and call my function to setup the call that adds info to the call after they have chosen a call type
//I declasrd the var here since we need access to it at anytime from the calendar screen
var globalClosedServiceCall = 0;//will hold an invoiceid
var globalServiceCall = 0;// TKS #7601 will hold an invoiceid when logging call on service ticket, closed or not
var globalInvoiceCall = 0;//TKS 06.20.2013 #37066 this is used for all other invoice calls
var globalOppIntUnit = 0;//TKS 01.08.2018 #118526 clicking to call from sales call sheet.
//TKS 08.04.2015 #71406 adding a var that will hold a job or jobs to link to a call
//when on service list viewing estimates and calling customer. If more than one job, it will hold a pipe
//delimited string
var globalEstJobCall = '';
var GlobalCorrespondence;//TKS 7-22-10 moved from js_ms_locate_contact because I need to set this from the calendar in order to skip the corresp. buttons step. We know we are logging a call.
//var MassEmailID=0;//TKS 2-1-11 holds our emailid when we create a draft from crm locate
//TKS 07.07.2015 #70166 changed variable name from MassEmailID to TempEmailID so we can use it for more than
//just setting up mass emails
var TempEmailID = 0;//holds emailid anytime we need to create a draft before taking the user to email module in compose mode
//******************************
var global_item;//TKS 05.26.2015 #66724 was declared in multiple files, moved it here
//12.30.2010 jss - defaults for the barcode scanner
var UseScannerInvoiceSale = false;
var UseScannerInvoiceCheckPrice = false;
var UseScannerReceiveSinglePO = true;
var UseScannerReceiveMultiPO = true;
var UseScannerInventoryLocate = false;
var UseScannerInventoryAdjust = false;
var UseScannerPrintBarCode = true;
var UseScannerPOAddItem = false;
var UseScannerAlsoSell = false;
var UseScannerParent = false;
var UseScannerChild = false;
var UseScannerUnitOptions = false;
var UseScannerLocateException = false;
var onlyselectedpos = false;

//TKS 4-28-11 moved from js_cv_sel_contact_emails.js so we have access to array right off. It was giving
//errors in Email if not defined
var crm_email_corr = [];

//TKS 04.20.2015 #66627
var merged_tickets_calls = [];

//01.10.2011 jss - tells where the Unit Model popup is being called from
var UnitModelSearchCalledFrom = '';

//02.16.2011 jss -
var GlobalAddItemFromPO = false;
var GlobalAddItemFromInvoice = false;

//04.07.2011 jss -
var Global_GoBackToInvoiceID = 0;

//06.20.2011 jss -
var Global_CompareCompanyID = 0;
var Global_Compare_Count = 0;
var Global_Compare_GLDate = '';//11.18.2019 jss 

var Global_Compare_ShowActive = true;
var Global_Compare_ShowConfirmed = true;
var Global_Compare_ShowUseAccounting = false;//09.22.2015 jss - 
var Global_Compare_ShowPriorityCustomer = false;//09.22.2015 jss - 
var Global_Compare_ShowInventoryNotComplete = false;//11.18.2019 jss - 
var Global_Compare_ShowDirty = false;
var Global_Compare_ShowDirtyPage2 = false;
var Global_Compare_FiscalYearEnd = "-1";//09.28.2015 jss - 
var Global_Compare_YearEndDone = "-1";
//10.16.2014 jss -
var Global_Compare_Inventory = false;
var Global_Compare_Payables = false;
var Global_Compare_VendorCredits = false;
var Global_Compare_Checking = false;
var Global_Compare_PettyCash = false;
var Global_Compare_Receivables = false;
var Global_Compare_VendorReceivables = false;
var Global_Compare_CustomerDeposits = false;
var Global_Compare_UndepositedFunds = false;
var Global_Compare_DebitsCredits = false;
var Global_Compare_InventoryBinQty = false;
var Global_Compare_InventoryHistory = false;

//03.03.2021 jss - 
var Global_Compare_CostRowCount = 10;
var Global_Compare_HistoryRowCount = 10;
var Global_Compare_GLRowCount = 10;

//07.05.2011 naj - Add Geolocation support
var latitude = 0;
var longitude = 0;
//TKS 07.13.2011 log call from view ticket
var LogCallTicketID = 0;
//TKS 09.09.2016 #74238 log call or email from survey report
var LogCallSurveyLinkID = 0;
var LogEmailSurveyLinkID = 0;
//TKS 05.01.2013 #35204 log email from ticket
var LogEmailTicketID = 0;
//TKS 08.26.2011 log call from view checklist item
var LogCallChecklistContactID = 0;

//TKS 04.29.2014 #51455 when logging a call from RMA rejected list
var LogCallRMAItemID = 0;

//07.19.2011 naj - Java enabled flag.
var JavaEnabled = 0;

//08.05.2011 jss -
var GlobalPriorTrade = false;
//TKS 08.26.2011 #6505 these track the user and checklist item for scheduling on the calendar
var GlobalCalChecklist = 0;
var GlobalCalChecklistUser = 0;
//TKS 06.08.2016 #87473
var ChecklistHideComplete = 1;

//08.29.2011 jss - flag to tell us that we are linking/adding a cobuyer to a deal
var CoBuyerFlag = false;
var CoBuyerContactID = 0;
//TKS 03.27.2019 #146255
var PDMLocate_Tag = '';
//TKS 07.15.2011 #5153 got rid of active user cookies and using these vars now on the ticket locate
//TKS 03.04.2013 #31891 updating the locate ticket process to
//track your search parameters via JS global vars as well as making sure that none
//of the variables and selected states can be overridden by going to another control and coming back
var PDMLocate_TicketID = '';
var PDMLocate_Keyword = '';
var PDMLocate_Location = 1;//title, desc, notes, all
var PDMLocate_Dept = 3;//support, RD, both
var PDMLocate_User = 0;
//TKS 05.11.2017 #105479 when viewing my tickets in support
//this helps us pull up the issue list for how many days set
//in settings that represent overdue
var PDMLocate_OverDueDays = 0;
var PDMLocate_CreatedBy = 0;
var PDMLocate_CurrentContact = 0;
var PDMLocate_Proj = '';
var PDMLocate_Section = '';
var PDMLocate_Detail = '';//TKS 12.18.2019 #151560
var PDMLocate_FutureRel = '';
var PDMLocate_Sort = '';
var PDMLocate_Priority = '';
var PDMLocate_Unass = false;
var PDMLocate_NotComplete = false;
var PDMLocate_DateRange = 1;
var PDMLocate_DateFrom = '';
var PDMLocate_DateTo = '';
var PDMLocate_Scroll = 0;
var PDMLocate_Status = 0;//TKS 03.11.2014 #48908
//TKS 05.05.2016 #85588
var PDMLocate_Tester = 0;
//TKS 08.16.2017 #111703
var PDMLocate_TopPriority = '';
//***************************************
//TKS 04.02.2015 #65381
var MovePartsContactVoidInvoice = false;

//10.07.2011 jss - global var used when replacing the general contact on an invoice with an actual person
var Global_ReplaceGeneralContact = false;
var globalSwapSuperItem = 0;//TKS 03.31.2015 #65380 flag when swapping item with supersede item
var globalSwapSuperJobID = 0;//TKS 03.31.2015 #65380 flag when swapping item with supersede item
//TKS 12.30.2011 #10693
var globalReceiptID = 0;
//TKS 1.31.2012 #12248 tells the view ticket screen to connect to nizex_nizex for all the controls
//loading since the customer is loading a ticket logged in nizex db
var globalCustLogSupTicket = 0;
//TKS 03.23.2012 #15638 tells add unit controls that we are converting old unit to lizzy from conversion
//look in units/js_mv_view_converted_units.js
//additional fields tell us whether we ned to create a PO or RO after the unit has been created
var ConvertedUnitID = 0;
var ConvertedModelID = 0;
var ConvertedSetupPrice = 0;
var ConvertedInstallPrice = 0;
var ConvertedRepairPrice = 0;
var ConvertedPDIPrice = 0;
var ConvertedAccessPrice = 0;
var ConvertedRefiSupplier = 0;
var ConvertedRefiAmount = 0;
//TKS 03.22.2012 #15638 built for locating and handling converted units
var globalOldUnitVin = '';
var globalOldUnitModel = '';
var globalOldUnitStockNo = '';
var globalOldNUDID = '';
var globalOldLocation = 0;
var globalOldUnitColor = '';
//TKS 06.08.2012 #19711
var globalOldUnitCurrentContact = 0;
var globalOldUnitFirstName = '';
var globalOldUnitLastName = '';
var globalOldUnitBusiness = '';
var globalOldUnitPhone = '';
//TKS 06.11.2012 #19711
//holds invoice id of service ticket if they came from service ticket to see converted units for customer
var globalOldUnitInvoiceID = '';
//holds the contactid for the invoice we left so we make sure not to accidentally
//add another contact's unit to someone else's service ticket. We hold this temporarily
//until they process a unit when coming from a service ticket
var globalOldUnitInvoiceContact = 0;//holds
//******************************

//TKS 05.09.2013 #35202 moved from email to here
var globalEmailSearchKW = '';
var globalEmailSearchRadio = 1;
var globalEmailSearchUser = 0;
//added emailid global var so we can click an email in activities panel or view
//correspondence and take them to view it.
var globalEmailSearchEmailID = 0;
//******************************

//04.11.2012 jss - ( 16415 ) - moved from accounting/checking/js_mv_viewcheckregister.js for hotLink functionatlity
var chk_reg_account = 0;
var chk_reg_checknum = '';
var chk_reg_checkamount = '';//06.23.2011 ghh -
var chk_reg_paidto = '';//TKS 07.24.2012

//05.18.2012 : CMK : # 18842 : recurring bills with dept account using check control - which doesn't update recurring bills
var fromRecurringBills = 0;
var global_RecurringID = 0;

//09.14.2012 jss - global var's for the special order list control
var solist_internet = false;
var solist_catalog = false;
var solist_viewoption = 1;//1=all, 2=curr cont, 3=curr inv
//TKS 08.31.2016 #91511 changed from mycustomers to usercustomers
//now, if true, we look at a drop list of users to see customers for the selected user
var solist_usercustomers = false;
var solist_viewusercustomer = 0;

var solist_received = false;
var solist_called = 0;
//TKS 08.22.2016 #91085 added solist_withstock
var solist_withstock = false;
var solist_completed = false;
var solist_removepaging = false;
var solist_allreceived_drop = 0;//TKS 03.17.2015 #63795
var solist_locationid = '';//TKS 09.22.2015 #73820

//TKS 04.16.2014 #51038 adding global var to track page so when we recall the S/O list
//it reloads on the correct paging you left
var solist_pageon = 1;
//05.22.2014 jss - ( 46901 )
var solist_supplierbackordered = false;

//TKS 05.28.2015 #66309
var po_currentitems_pageon = 1;
//07.03.2014 jss - ( 53772 )
var pullscreen_pullstatus = 99;

//04.02.2013 jss - ( 33524 ) global var for auto shipping a dropship po upon receiving it
var autoshipcurrentcontact = false;

//08.06.2013 er - ( 39264 ) global var to tell us if we just took a deposit on a unit sale.  If
//									 true then we recalc the deal.
var UnitSaleDepositReceived = false;

//12.03.2013 jss - ( 41721 ) global var that's set when pulling parts for s/o bins and using
//a transit bin to move things around.  If set, you end up going back to the pull screen
//after taking a side step to the "process transit bins" control
var PullingPartsUsingTransitBins = false;

//11.12.2015 jss - ( 76016 ) var to hold the write off date for writing off inventory
var GlobalWriteoffDate = '';

//03.22.2016 er - ( 82473 ) We now have a global var so we can better control the Recap control	
var RecapInitialLoad = 1;

//02.16.2017 jss - ( 101245 ) global var for when user adds shipping charge to a processed
//int/cat invoice, so the payform knows how much to autofill when a payment method is selected
var global_shipping_upcharge = 0;

//06.08.2016 jss - ( 86010 ) this var tells us we're pulling multiple bins so the process transit 
//bins control knows what to reload
var PullingMultiBins = false;

//06.22.2018 jss - ( 130030 )
var globalRefundInvoiceID = 0;

//01.17.2012 naj - Enable file upload links on iOS
var iOS = 0;
if (navigator.userAgent.match(/iphone|ipad/i)) {
	iOS = 1;
}

//08.23.2012 jss - ( 23163 ) var to tell A/R to display all or current receivables
var ar_viewall = false;

//09.14.2012 naj - added flag to use either tel or callto links in Lizzy.
var VOIP = 0;

//11.19.2012 naj - file_upload XMLHttpRequest
var uploadXHR = new XMLHttpRequest();

function getVOIPSkype() {
	$.get("getVOIPSkype.php", function (data) { VOIP = data; });
}

function enableLocationDetection() {
	if (navigator.userAgent.match(/iphone|android/i) && navigator.geolocation)
		try {
			navigator.geolocation.getCurrentPosition(getLocation, locationFail);
		}
		catch (err) {
			//console.log(err);
		}
}

//04.16.2013 naj - detect java
function detectJava() {
	createCookie('nizex_java', 0, 5);

	for (x in navigator.plugins) {
		if (x.match(/[0-9]?[0-9]/) && navigator.plugins[x].name.match(/java|icedtea/i)) {
			JavaEnabled = 1;
			createCookie('nizex_java', 1, 5);
		}
	}
}

function getLocation(position) {
	if (position.coords.latitude != null && position.coords.latitude != undefined)
		latitude = position.coords.latitude;

	if (position.coords.longitude != null && position.coords.longitude != undefined)
		longitude = position.coords.longitude;
}

function locationFail(error) {
	//console.log(error);
}

function swap_objects(formname, func, focused) {
	var elem = document.forms[formname].elements;
	var chgbtn = document.getElementById('global_lang_edit').value;
	var focusit = false;

	for (var i = 0; i < elem.length; i++) {
		if (elem[i].type == "text")
			if (elem[i].className == 'txt_view') {
				chgbtn = 'Save';
				elem[i].className = 'txt_edit';
				elem[i].readOnly = false;
			}
			else {
				chgbtn = 'Edit';
				elem[i].className = 'txt_view';
				elem[i].readOnly = true;
			}

		if (elem[i].type == "textarea")
			if (elem[i].className == 'txt_view') {
				chgbtn = document.getElementById('global_lang_save').value;
				elem[i].className = 'txt_edit';
				elem[i].disabled = false;
			}
			else {
				chgbtn = document.getElementById('global_lang_edit').value;
				elem[i].className = 'txt_view';
				elem[i].disabled = true;
			}

		if (elem[i].type == "checkbox")
			if (elem[i].className == 'chk_view') {
				elem[i].className = 'chk_edit';
				elem[i].disabled = false;
				elem[i].readonly = false;
			}
			else {
				elem[i].className = 'chk_view';
				elem[i].disabled = true;
				elem[i].readonly = true;
			}

		if (elem[i].type == "select-one")
			if (elem[i].className == 'drp_view') {
				elem[i].className = 'drp_edit';
				elem[i].disabled = false;
				elem[i].readonly = false;
			}
			else {
				elem[i].className = 'drp_view';
				elem[i].disabled = true;
				elem[i].readonly = true;
			}


		if (elem[i].type == "radio")
			if (elem[i].className == 'rad_view') {
				elem[i].className = 'rad_edit';
				elem[i].disabled = false;
			}
			else {
				elem[i].className = 'rad_view';
				elem[i].disabled = true;
			}

		if (elem[i].id == focused) {
			if (document.forms[formname].btn_edit.value == document.getElementById('global_lang_save').value)
				elem[i].focus();
		}

		if (elem[i].id == 'btn_edit')
			if (elem[i].value == document.getElementById('global_lang_edit').value) {
				elem[i].value = document.getElementById('global_lang_save').value;
				focusit = true;
			}
			else {
				var fCall = func + '(\'' + formname + '\');';

				try { eval(fCall); }
				catch (err) {
					alert('There was an error posting data. Error is:' + err);
				}

				elem[i].value = document.getElementById('global_lang_edit').value;
			}
	}
}


function get_objects(formname) {
	var postFields = '';
	try {
		var elem = document.forms[formname].elements;
	}
	catch (err) {
		return '';
	}

	for (var i = 0; i < elem.length; i++) {
		if (elem[i].tagName == "TEXTAREA") {
			//TKS 10.26.2011 #8231 changed from encode to encodeURIComponent becuase encode doesn't work with plus signs
			postFields += elem[i].name + "=" + encodeURIComponent(elem[i].value) + "&";
		}

		if (elem[i].tagName == "INPUT") {
			if (elem[i].type == "text" || elem[i].type == "hidden" || elem[i].type == "password") {
				//05.03.2011 ghh - changed .value to .match
				if (!elem[i].value.match(/\+/)) {
					postFields += elem[i].name + "=" + escape(elem[i].value) + "&";
				}
				else {
					//12.8.2009 ghh added because encode doesn't work with plus signs
					postFields += elem[i].name + "=" + encodeURIComponent(elem[i].value) + "&";
				}
			}

			if (elem[i].type == "checkbox") {
				if (elem[i].checked) {
					postFields += elem[i].name + "=" + elem[i].checked + "&";
					postFields += "v_" + elem[i].name + "=" + elem[i].value + "&";
				}
				else {
					postFields += elem[i].name + "=&";
				}
			}

			if (elem[i].type == "radio") {
				if (elem[i].checked) {
					postFields += elem[i].name + "=" + elem[i].value + "&";
				}
			}
		}

		if (elem[i].tagName == "SELECT") {
			var sel = elem[i];
			try {
				postFields += sel.name + "=" + sel.options[sel.selectedIndex].value + "&";
			}
			catch (err) {

			}
		}
	}

	return postFields;
}


//05.08.2014 naj - Global variable for tracking the LizzyWorkingEvent.
var LizzyWorkingEvent = undefined;
function ajax_send(path, async, method, postFields, callback) {

	//04.29.2019 rch -  if were coming from cip then need new message
	var temp = path.indexOf('?');
	if (path.substring(0, temp) == 'invoicing/payments/cv_cip_payment.php') {
		if (LizzyWorkingEvent == undefined) {
			if (callback.callfunc.name != 'call_footeralerts' && callback.callfunc.name != 'call_cv_messagealerts')
				LizzyWorking('CIP');
		}
	}
	else {
		//05.07.2014 naj - check to see if we already have a pending event scheduled, clear it if there is one.
		if (LizzyWorkingEvent == undefined) {
			//06.03.2014 naj - due to dealers having very slow internet, this will be disabled on get_alerts
			if (callback.callfunc.name != 'call_footeralerts' && callback.callfunc.name != 'call_cv_messagealerts')
				LizzyWorkingEvent = setTimeout("LizzyWorking(" + true + ")", 4000);
		}
	}

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		var xmlcon = new XMLHttpRequest();
	}
	else
		if (window.ActiveXObject) { // IE
			var xmlcon = new ActiveXObject("Microsoft.XMLHTTP");
		}

	xmlcon.open(method, path, async);

	if (method == 'POST') {
		xmlcon.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	else
		postFields = null;


	xmlcon.onreadystatechange =
		function () {
			if (xmlcon.readyState == 4 || xmlcon.readyState == 'complete') {
				//09.21.2011 ghh - added to error out if we get something other than a 200
				if (xmlcon.status == 200) {
					clearTimeout(LizzyWorkingEvent);
					LizzyWorking(false);
					callback.response = xmlcon.responseText;
					callback.push();
				}
				else
					//09.21.2011 ghh - we show error codes here if we get them, however, on windows
					//there seems to be times where a zero is returned like when clicking phone numbers to
					//dial with skype, so I had to exclude zero returns from the alert process.
					if (xmlcon.status > 0) {
						clearTimeout(LizzyWorkingEvent);
						LizzyWorking(false);
						alert('Lizzy has timed out with status code ' + xmlcon.status + ' Please try again.');
					}
			}
		}


	xmlcon.send(postFields);
	return false;
}



//onReceive class called from ajax_send function
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

function push() {
	this.callfunc();
}

onConnect.prototype.push = push;



function include(file) {
	var filename = file.split('/');
	var func = filename[filename.length - 1].split('.');
	var fCall = func[0] + '();';

	try { eval(fCall); }
	catch (err) {
		var script = document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		document.getElementsByTagName('head').item(0).appendChild(script);
	}

	return fCall;
}



String.prototype.trim = function () {
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
}


function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else
		var expires = "";

	//TKS 05.18.2020 #172027 adding sameSite cookie code. Browsers are about to change
	//how they handle cookies between same site and 3rd party and the way we were doing it will
	//eventually be rejected by the browser.
	//document.cookie = name + "=" + value + expires + "; path=/";
	document.cookie = name + "=" + value + expires + "; path=/; SameSite=None; Secure ";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

//05.09.2012 naj - added to clear out the download frame and prevent barcodes from being reprinted on db change
function clearDownloadFrame(domain) {

	self.frames['download_frame'].location.href = decodeURIComponent(domain) + '/templates/main/download_frame.php';
}

function setStatus(val) {
	document.getElementById('reg_statusbar').innerHTML = val;
}

function addslashes(str) {
	str = str.replace(/\'/g, '\\\'');
	return str;
}

function stripslashes(str) {
	str = str.replace(/\\'/g, '\'');
	return str;
}


//function that checks to make sure the Fromdate is less than or equal to TO date in date ranges
function check_todate(from, to) {
	if (Date.parse(from.value) > Date.parse(to.value))
		to.value = from.value;//set the to field to have the from field's value.
}

var globalBrowserResize = false;
function isbrowserResize() {
	if (!globalBrowserResize) {
		globalBrowserResize = true;
		window.setTimeout("browserResize();", 2000);
	}
}

//gets kicked off if user resizes their browser window
function browserResize() {
	try {
		//first we need to resize our reg_body wrapper to ensure it never goes off the page
		Global_bheight = document.body.clientHeight;
		//TKS 2-9-11  do not call the resize of these regions if in the email module because
		//they get in the way
		if (readCookie('ssi_menumodule') != 18) {
			document.getElementById('reg_menuleft').style.height = (Global_bheight - 220) + 'px';
			document.getElementById('reg_body_main').style.height = (Global_bheight - 220) + 'px';
		}
		Global_bwidth = Math.round(document.body.clientWidth * 0.020);
	}
	catch (err) {
	}

	//TKS 2-18-11 we now open the monthly calendar for rentals in invoicing,
	//was getting JS errors here because of of resize was trying to load get_cv_monthly_view
	//instead we need to load the rental monthly view
	//TKS 04.07.2011 now adding schedule process as well
	if (readCookie('ssi_menumodule') == 1)//invoicing module ( rentals )
	{
		//rental
		if (readCookie('ssi_menuid') == 492) {
			try {
				if (document.getElementById('onMonthlyCalendar').value == 'Open')
					get_cv_rental_monthly_view('reg_rentals', rental_lastdate);
			}
			catch (err) {
			}
		}

		//TKS 04.07.2011 now adding schedule process as well
		//scheduling
		if (readCookie('ssi_menuid') == 513) {
			try {
				if (document.getElementById('onMonthlyCalendar').value == 'Open')
					get_cv_scheduling_monthly_view('reg_schedule', schedule_lastdate);
			}
			catch (err) {
			}
		}
	}
	//TKS everything within this else has been here all along. I only added the above for when
	//we are in invoicing rentals. otherwise we enter here and all is like it has always been
	else {
		try {
			if (document.getElementById('onMonthlyCalendar').value == 'Open')
				get_cv_monthly_view('reg_cal_view', lastdate);
		}
		catch (err) {
		}

		try {
			if (document.getElementById('onDailyCalendar').value == 'Open')
				get_cv_daily_view('reg_cal_view', lastdate);
		}
		catch (err) {
		}

		try {
			//TKS 10.25.2019 #157243 cleaning up this code. Inside the get_cv_weekly_view
			//we are hardcoding the placement to reg_adv_dash. So I am passing it conrrectly here 
			//so that we can remove that code and allow load in overlay
			if (document.getElementById('onWeeklyCalendar').value == 'Open')
				get_cv_weekly_view('reg_adv_dash', lastdate);
		}
		catch (err) {
		}
	}

	globalBrowserResize = false;
}


function trapEnterKey(key, buttonname, functioncall) {
	if (key == 13 || key == 10) {
		if (buttonname != '') {
			try {
				document.getElementById(buttonname).click();
			}
			catch (err) {
			}
		}
		else {
			try {
				eval(functioncall);
			}
			catch (err) {
			}
		}

		return true;
	}
	else
		return false;
}


function getTimeZoneOffset() {
	var dt = new Date();
	var offset = (dt.getTimezoneOffset() / 60) * -1;

	//03.21.2012 ghh - added 1 to expire cookie after 1 day
	createCookie('ssi_timezone', offset, 1);
}



//opens video link for whatever video is passed in.
//TKS 6-24-10 changed function to call php page and load movie in region with
//layer overlay and styles
var comm_lizzy_get_video = new onConnect(false, false, call_lizzy_get_video);
function getVideo() {
	var video_module = readCookie('ssi_menumodule');
	//var path = 'http://www.nizex.com/videos/language/' + language + '/' + video_module + '/' + video_control + '.mov';
	//window.open( path,'postpone','height=768,width=1024, scrollbars,resizable' );
	var path = 'lizzy_get_video.php?video_module=' + video_module + '&video_control=' + video_control;
	comm_lizzy_get_video.callfunc = call_lizzy_get_video;

	ajax_send(path, true, 'GET', null, comm_lizzy_get_video);
}


function call_lizzy_get_video() {
	if (comm_lizzy_get_video.response.substring(0, 5) != 'Error') {
		var theWidth, theHeight;
		//TKS 10.31.2012 swapped setting width and height based on clientHeight
		//which is only giving viewing window height, not scroll area to now calling functions
		//located in js_master
		theWidth = getDocWidth();
		theHeight = getDocHeight();
		document.getElementById('video_overlay').style.width = theWidth + 'px';
		document.getElementById('video_overlay').style.height = theHeight + 'px';
		document.getElementById('video_overlay').style.display = 'block';
		document.getElementById('video_overlay').innerHTML = comm_lizzy_get_video.response;
		scroll(0, 0);
	}
	else
		setError(comm_lizzy_get_video.response);
}


//this closes the video overlay that we also load other controls in
//a fake lightbox kind of groove
function close_overlay(region) {
	//TKS 07.29.2019 added 'all' flag so we can call it once and close all overlays at once
	if (region == 'all') {
		//make sure our invoice overlay flags are reset
		globalOverlayContactID = 0;
		globalOverlayInvoiceID = 0;
		document.getElementById('video_overlay').innerHTML = '';
		document.getElementById('video_overlay').style.display = 'none';
		document.getElementById('overlay2').innerHTML = '';
		document.getElementById('overlay2').style.display = 'none';
		document.getElementById('overlay3').innerHTML = '';
		document.getElementById('overlay3').style.display = 'none';
		document.getElementById('overlay4').innerHTML = '';
		document.getElementById('overlay4').style.display = 'none';
	}
	else {
		document.getElementById(region).innerHTML = '';
		document.getElementById(region).style.display = 'none';
	}
}

//*****************************************





var sec = 0;
var min = 0;
var hour = 0;
var CALLTIMER = 0;
//TKS 10.30.2017 #116374 changed from using global called_it var
//which only got used once to passing in a recall flag. We can log multiple calls 
//at the same time and the timer needs to hit the hid_calltime field every time
//with the exception of when this function recalls itself.
function stopwatchStart(region, recall) {
	if (recall == undefined)
		recall = false;

	if (!document.getElementById('hid_pause') || !document.getElementById(region))
		return;

	//if ( document.getElementById( 'hid_pause' ).value == 0 )
	{
		//grab the time from the hidden field that gets filled in when the call log screen comes up
		//in the php file we already figure out the difference between NOW and the StartTime and place that
		//in the hidden field as hh:mm:ss
		//only enter and set up our time once
		if (!recall) {
			sec = 0;
			min = 0;
			hour = 0;
			CALLTIMER = 0;
			var temp = document.getElementById('hid_calltime').value;
			//break apart the hours, minutes and seconds
			var time = temp.split(":");
			sec = parseInt(time[2]);
			min = parseInt(time[1]);
			hour = parseInt(time[0]);
		}

		if (recall) {
			sec++;
			if (sec == 60) {
				sec = 0;
				min++;
			}
			else
				min = min;

			if (min == 60) {
				min = 0;
				hour++;
			}
		}
	}
	document.getElementById(region).innerHTML = ((hour <= 9) ? "0" + hour : hour) + " : " + ((min <= 9) ? "0" + min : min) + " : " + ((sec <= 9) ? "0" + sec : sec);

	if (document.getElementById('hid_pause').value == 0) {
		window.clearTimeout(CALLTIMER);
		var temp2 = "stopwatchStart( '" + region + "', true );";
		CALLTIMER = window.setTimeout(temp2, 1000);
	}
	else {
		var temp = document.getElementById(region).innerHTML;
		document.getElementById(region).innerHTML = temp + '<div style="margin-left:15px; display:inline-block;">**PAUSED**</div>';
	}
}

function stopwatchStop(region) {
	sec = 0;
	min = 0;
	hour = 0;
	window.clearTimeout(CALLTIMER);
	if (document.getElementById(region))
		document.getElementById(region).innerHTML = '';
}

//here we deal with the messsage alerts retrieval
function getMessageAlerts(timeit) {
	//TKS 12-30-10 #1890 this flag gets set to prevent the auto running of the message alerts when someone does the quick logout
	if (StopMessageAlerts)
		return;

	//05.02.2018 ghh -  commenting out all of this functions moving botton two functions into here
	//because they are all that needs to be called.  This was old chat stuff
	/*
	var module = readCookie( 'ssi_menumodule' );
	var path = 'communications/cv_messagealerts.php?mod=' + module;
	
	comm_cv_messagealerts.callfunc = call_cv_messagealerts;
	ajax_send( path, true, 'GET', null, comm_cv_messagealerts );
	*/

	//05.09.2019 ghh - ( temp removal to test something )
	if (timeit)
		window.setTimeout('getMessageAlerts( true );', MESSAGEALERTTIMER);

	//05.02.2018 ghh -  these 2 calls were in callback for this function but
	//moved up to here
	//TKS 02.02.2018 #116041 new control to check for incoming
	//SMS alerts to show differently from our normal Lizzy alerts
	//05.02.2018 ghh -  removed and added code into footer process so we're only making 1 call
	//get_cv_sms_alerts( 'reg_sms_alert' );

	//adding new footer call here
	get_footeralerts('reg_footer_alerts');
}

function call_cv_messagealerts() {
	var module = readCookie('ssi_menumodule');
	if (comm_cv_messagealerts.response != '') {
		/*
		var users = comm_cv_messagealerts.response.split('~');
	
		//now we loop through and display any users that have sent us a message
		for ( i = 0; i < users.length; i++ )
			{
			if ( users[ i ] > 0 )
				{
				if ( userchat1 != users[ i ] && userchat2 != users[ i ] && userchat3 != users[ i ] )
					get_cv_comm_chat_window( users[ i ] );
				}
			}
		*/
	}
	else {
		//07.28.2010 ghh commented out to try to clean up alerts
		//document.getElementById( 'reg_messagealert' ).style.visibility = 'hidden';
	}

}


//this function opens the user message window to allow you to chat
//with someone
function getUserMessages(userid) {
	if (userid == 0 && getUserMessagesRunning)
		return;

	if (userchat1 > 0 || userchat2 > 0 || userchat3 > 0) {
		getUserMessagesRunning = true;
		//if userid is 0 then this is the first time we're calling
		if (userid == 0) {
			if (userchat3 > 0) {
				userid = userchat3;
				comm_cv_usermessages.placement = 'reg_user3';
				comm_cv_usermessages.misc = 'msg_table3';
				comm_cv_usermessages.misc2 = 'txt_message3';
				comm_cv_usermessages.misc3 = 'reg_chathistory3';
			}
			else {
				if (userchat2 > 0) {
					userid = userchat2;
					comm_cv_usermessages.placement = 'reg_user2';
					comm_cv_usermessages.misc = 'msg_table2';
					comm_cv_usermessages.misc2 = 'txt_message2';
					comm_cv_usermessages.misc3 = 'reg_chathistory2';
				}
				else {
					if (userchat1 > 0) {
						userid = userchat1;
						comm_cv_usermessages.placement = 'reg_user1';
						comm_cv_usermessages.misc = 'msg_table1';
						comm_cv_usermessages.misc2 = 'txt_message1';
						comm_cv_usermessages.misc3 = 'reg_chathistory1';
					}
				}
			}
		}

		comm_cv_usermessages.misc4 = userid;

		var path = 'communications/cv_usermessages.php?userid=' + userid;

		comm_cv_usermessages.callfunc = call_cv_UserMessages;

		ajax_send(path, true, 'GET', null, comm_cv_usermessages);
	}
	else
		getUserMessagesRunning = false;
}


function call_cv_UserMessages() {
	if (comm_cv_usermessages.response != '') {
		var tbl = document.getElementById(comm_cv_usermessages.misc);
		var lastrow = tbl.rows.length;
		var row = tbl.insertRow(lastrow);
		row.setAttribute('class', 'ChatTheirs');

		//build date to insert into column
		var dt = new Date();
		var mydate = dt.getHours() + ':' + dt.getMinutes();

		//now insert cells
		var cell1 = row.insertCell(0);
		cell1.innerHTML = comm_cv_usermessages.response;

		document.getElementById(comm_cv_usermessages.misc3).scrollTop = document.getElementById(comm_cv_usermessages.misc3).scrollHeight;
		document.getElementById(comm_cv_usermessages.misc2).focus();
		soundManager.play('AlertSound');
	}

	//now figure out which we will call next
	if (comm_cv_usermessages.misc4 == userchat1) {
		if (userchat2 == 0 && userchat3 == 0) {
			getUserMessagesRunning = false;
			window.setTimeout('getUserMessages( 0 );', 5000);
		}
		else
			if (userchat2 > 0)
				getUserMessages(userchat2);
			else
				if (userchat3 > 0)
					getUserMessages(userchat3);
	}
	else
		if (comm_cv_usermessages.misc4 == userchat2) {
			if (userchat3 == 0) {
				getUserMessagesRunning = false;
				window.setTimeout('getUserMessages( 0 );', 5000);
			}
			else
				if (userchat3 > 0)
					getUserMessages(userchat3);
		}
		else {
			getUserMessagesRunning = false;
			window.setTimeout('getUserMessages( 0 );', 5000);
		}
}



function textbox_resize(pix, field_id) {
	var box = document.getElementById(field_id);
	var new_height = (parseInt(box.style.height) ? parseInt(box.style.height) : 300) + pix;

	if (new_height > 0)
		box.style.height = new_height + 'px';

	return false;
}


function nizexPrint(region) {
	var a = window.open('', '', 'scrollbars=yes,width=800px,height=600');
	var domain = document.getElementById('global_domain').value;

	a.document.open("text/html");
	//03.13.2024 jmf - 235149
	a.document.write('<!DOCTYPE html>');
	a.document.write('<html><head>');
	a.document.write('<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />');
	//TKS 10.29.2020 #181166
	//03.13.2024 jmf - 235149 adjusted quote breaks so that css would load properly
	a.document.write('<link href="' + domain + '/templates/main/main.css" rel="stylesheet" type="text/css"></head>');
	a.document.write('<link href="' + domain + '/templates/1/style.css" rel="stylesheet" type="text/css"></head>');

	a.document.write('<body>');
	a.document.write(document.getElementById(region).innerHTML);
	a.document.write('</body></html>');
	a.document.close();
	//07.21.2014 naj - Ticket 55063 New version of chrome is calling print before the new window
	//is rendered. This causes the print dialog to print a blank page. Added setTimeout to delay the
	//call of the print function.
	a.onload = a.setTimeout(function () { a.print(); }, 1200);
}

//this function adds a trim function to the javascript string class
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, '');
}



//this function will return true if at least one checkbox is checked otherwise return false
function is_checkbox_checked(formname) {
	var elem = document.forms[formname].elements;
	var tmpcount = 0;
	for (var i = 0; i < elem.length; i++) {
		if (elem[i].type == "checkbox")
			if (elem[i].checked == true)
				tmpcount++
	}

	if (tmpcount > 0)
		return true;
	else
		return false;
}


function get_radio_checked_value(radio_name) {
	radioObj = document.getElementsByName(radio_name);
	//TKS 11-18-10 if the radio boxes are not on the page
	//just return false
	if (!radioObj.length > 0)
		return false;

	for (var i = 0; i < radioObj.length; i++)
		if (radioObj[i].checked)
			return radioObj[i].value;

	return false;
}


// will return the scroll location for the control in question
function detectScrollLocation(controlid) {
	return document.getElementById(controlid).scrollTop;
}

//sets a controls scroll location back to what it was before
function setScrollLocation(controlid, height) {
	document.getElementById(controlid).scrollTop = height;
}


//this function handles clicking on a phone number in Lizzy and taking them to log a call.
//I put this function here because there could be phone numbers all over Lizzy and this needs to be
//in a universal place
function LizzyPhone(phone, contactid) {
	setLast10Contacts(contactid);
	try { document.getElementById('reg_quickadd').style.visibility = 'hidden'; } catch (err) { }
	document.getElementById('global_contactid').value = contactid;
	get_menu_includes(1, 8);//this gets all the necessary includes from the locate contact includes and loads them for us
	var browser = navigator.userAgent;

	//04.08.2011 ghh - added droid and changed iPhone to use indexOf.  Need to test on iPhone but don't have access to one right now
	//if ( ( browser.indexOf( 'iPhone' ) >= 0 ) || ( browser.indexOf( 'droid' ) >= 0 ) )
	//05.20.2011 naj - added support for chrome. Chrome is URL encoding the plus sign, which is technically correct, skype does not know what to do with the encoded string so changed the + to 00
	//which is also a valid standard for phone numbers.
	//TKS 07.13.2011 I am calling this on view ticket to setup the call but don't need it to kick off skype
	//so I added the ability to pass in an empty phone and just a contactid
	if (phone != '') {
		//09.14.2012 naj - added support for tel: links in Lizzy.
		if (browser.match(/iphone|android/i) || VOIP == 0)
			window.location.href = 'tel:+1' + phone;

		if (VOIP == 1) //for Skype
		{
			if (browser.match(/chrome/i)) {
				window.location.href = 'callto:001' + phone;
			}
			else
				window.location.href = 'callto:+1' + phone;
		}

		if (VOIP == 2 && JavaEnabled == 1) // for Hard Phones
			window.open('/java/LizzyDialer.php?phone=' + phone, 'download_frame');

		//07.16.2014 naj - added dialing support when Java is not available.
		if (VOIP == 3 || (VOIP == 2 && JavaEnabled == 0)) // for Hard Phones using Go module
		{
			$.getJSON('/java/LizzyDialer.php?phone=' + phone + '&json=1', function (data) {
				$.ajax({ url: 'http://localhost:9090/' + data.host + '/' + data.user + '/' + data.passwd + '/' + phone, type: 'GET' });
			});
		}
	}

	//08.24.2011 naj - Chrome sometimes comes back with a failed to load resource error on the callto and tel links.
	//So, I added a timeout and function to force it to load the call logging screen.
	setTimeout(function () {
		GlobalCorrespondence = '1';
		get_mv_logcall('reg_body');
	}, 500);
	//GlobalCorrespondence = '1';
	//get_mv_logcall( 'reg_body' );
}



//this function handles clicking on an email address and logging a new email inside of Lizzy
//takes an email address, and then goes to the email module to setup the email
//TKS 7-27-10 #1421 we no longer log a call for the email we take them to the
//TKS 05.07.2013 #35202 added topicid so when passed in, we link email to topicid
function LizzyEmail(email, topicid) {
	if (topicid == undefined)
		topicid = 0;
	//TKS 07.22.2015 #68666 a customer had an email address with a plus sign in it. 
	//added encodeURIComponent so that it would save properly as well as pass the email address
	// over to the email module correctly
	LogEmailAddress = encodeURIComponent(email);
	LogEmailTopicID = topicid;
	//now calling menu_master so things load right
	get_menu_master('reg_left1', 18, '');
}





//############################################################################
//############################################################################
//this function handles validating fields through out Lizzy for their field types
//1st parameter is what type, then field value to validate, 3rd parameter pass in true if you need
//Lizzy to return a formatted value
//type 1 - int
//type 2 - float
var comm_lizzy_field_validation = new onConnect(false, false, call_lizzy_field_validation);

function Lizzy_Field_Validation(fieldtype, fieldvalue, reformat, fieldid) {
	if (reformat == undefined)
		reformat = 0;
	//if they choose to reformat, fieldid will give us the field to send the comm response back to
	if (fieldid == undefined)
		fieldid = '';

	var path = 'includes/lizzy_field_validation.php?type=' + fieldtype + '&value=' + fieldvalue + '&format=' + reformat;
	comm_lizzy_field_validation.callfunc = call_lizzy_field_validation;
	comm_lizzy_field_validation.misc = fieldid;
	comm_lizzy_field_validation.misc2 = reformat;
	comm_lizzy_field_validation.misc3 = fieldtype;

	ajax_send(path, true, 'GET', null, comm_lizzy_field_validation);
}

function call_lizzy_field_validation() {
	if (comm_lizzy_field_validation.response.substring(0, 5) != 'Error') {
		//if reformat is true and we have a fieldid to update, then we set the field's value = to comm response
		if (comm_lizzy_field_validation.misc2 == 1 && comm_lizzy_field_validation.misc != '')
			document.getElementById(comm_lizzy_field_validation.misc).value = comm_lizzy_field_validation.response;

		document.getElementById('reg_error').innerHTML = '';
	}
	else {
		alert(comm_lizzy_field_validation.response);
		soundManager.play('AlertSound');
		//if the field id holds something and not reformatting, then we clear the field and place focus
		if (comm_lizzy_field_validation.misc != '' && comm_lizzy_field_validation.misc2 == 0) {
			if (comm_lizzy_field_validation.misc3 == 1)
				document.getElementById(comm_lizzy_field_validation.misc).value = '0';
			else if (comm_lizzy_field_validation.misc3 == 2)
				document.getElementById(comm_lizzy_field_validation.misc).value = '0.00';
			else
				document.getElementById(comm_lizzy_field_validation.misc).value = '';

			document.getElementById(comm_lizzy_field_validation.misc).focus();
		}
	}
}
//############################################################################
//############################################################################
function CheckAll(formname) {
	for (var i = 0; i < document.forms[formname].elements.length; i++) {
		if (document.forms[formname].elements[i].type == 'checkbox')
			document.forms[formname].elements[i].checked = !(document.forms[formname].elements[i].checked);

	}
}

//give all your checkboxes the same class name.
//put this function in your toggle all checkbox's on click event passing in this.checked and 
//your checkbox group class name. This will take the current checked state of your toggle checkbox
//and update the group to match
//checkall check all
function ToggleAllByClass(checked, classname) {
	$('.' + classname).each(function (i, obj) { this.checked = checked; });
}


//closes the error region
function clearError() {
	try {
		//	document.getElementById( 'reg_error' ).className = '';
		//	document.getElementById( 'reg_error' ).innerHTML = '';
		document.getElementById('reg_error').innerHTML = '';
		document.getElementById('reg_error').style.display = 'none';
	}
	catch (err) {
	}
}

//TKS 2-14-11 changed error reporting to overlay and added buttons
//for close window and email support
var globalErrorReport;//this holds the Error long enough for our control to load and to place it into the value of our textarea then we clear it
function setError(response) {
	if (response.trim() != '') {
		document.getElementById('reg_error').className = 'lblerror';
		get_cv_error_reporting('reg_error');
		//document.getElementById( '' ).innerHTML = response;
		globalErrorReport = response;
	}
}

//TKS 08.03.2011 added function for successful updates to load the region with message and clear it when done
function setUpdate(response) {
	if (response.trim() != '') {
		document.getElementById('reg_update').style.display = 'block';
		document.getElementById('reg_update').innerHTML = response;
	}
}
function clearUpdate() {
	document.getElementById('reg_update').innerHTML = '';
	document.getElementById('reg_update').style.display = 'none';
}
//**********************************'



//TKS these functions handle taking a url or image path and building the
//html code necessary and placing the code into a textarea where the user's cursor was.
//these are used on textareas and prompt the user for the url and clickable text. Or in teh case
//of images, just eth path tot he image. It helps
//eliminate user error on these common html codes when posting notes or what not
//################################################################################
//################################################################################

//this handles trapping the current cursor position so when they leave the field and
//enter data into a prompt and hit ok, the data they enter can then be put in the field
//where the cursor was
function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else
		if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			myField.value = myField.value.substring(0, startPos)
				+ myValue
				+ myField.value.substring(endPos, myField.value.length);
		}
		else
			myField.value += myValue;
}//usage insertAtCursor( document.getElementById( 'txt_changeme' ), 'what ever you want here' );

//this function takes a url, a clickable message and the fieldid to place the html code in when done
function SetURLAsLink(message, message2, fieldid) {
	var temp = prompt(message, "http://www");
	var temp2 = prompt(message2, '');

	var web = '<a href="' + temp + '" target=_BLANK>' + temp2 + '</a>';
	if (temp != 'http://www' && temp != '' && temp2 != '')
		insertAtCursor(document.getElementById(fieldid), web);//located in js_master
}


//**************
var imgHeight;
var imgWidth;
//TKS 03.26.2012 added this function findHHandWW becuase the width and height stopped working.
//further research determined you could not get the width or height of a remote image unless it was either already cached
//in your browser or loaded. So we call onload, then our function which sets our height and width and now the resize works again.
function findHHandWW() {
	imgHeight = this.height;
	imgWidth = this.width;
	return true;
}
//**************
//takes image path and build html code for img and places where cursor was in textarea
//TKS 10.10.2011 added parameter to limit the size of the image, like for our notes where the image
//cannot be wider than 700px
function ImagePathForTextarea(message, fieldid, maxWidth) {
	//TKS 10.10.2011 #7975 resizing images if maxWidth is passed in and the image exceeds it
	//TKS 03.07.2018 No Ticket. Jayme just hit me up because someone linked to an image on imgur
	//that blew out the notes control bad. This code below obviously no longer works.
	//I am just going to hard code a max width and height of 650 so we no longer worry about it.
	//they can always click the image to view full size.
	var temp = prompt(message, "http://www");
	/*
	if ( maxWidth == undefined )
		maxWidth = '';
	
	if ( maxWidth != '' )
		{
		var img = new Image();
		img.name = temp;
		//TKS 03.26.2012 added this function findHHandWW becuase the width and height stopped working.
		//further research determined you could not get the width or height of a remote image unless it was either already cached
		//in your browser or loaded. So we call onload, then our function which sets our height and width and now the resize works again.
		img.onload = findHHandWW;
		img.src = temp;
	
		var temp_string = '';
		if ( img.width > maxWidth )
			{
			var ratio = maxWidth / img.width;
			var height = Math.round( img.height * ratio );
			var width 	= Math.round( img.width * ratio );
			var temp_string = ' width="' + width + '" height="' + height + '" ';
			}
		}
	else
		var temp_string = '';
	*/

	//TKS 03.07.2018 No Ticket. adding max width/height to prevent huge images from blowing out our interface
	var temp_string = ' style="max-width:650px; max-height:650px;" ';
	var web = '<a href="' + temp + '" target=_BLANK><img src="' + temp + '"' + temp_string + ' border=0></a>';
	if (temp != 'http://www' && temp != '')
		insertAtCursor(document.getElementById(fieldid), web);//located in js_master
}
//################################################################################
//################################################################################

//04.26.2010 ghh added to test if a field holds a numeric value
function isNumberKey(evt) {
	try {
		var charCode = (evt.which) ? evt.which : event.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
			return false;
	}
	catch (err) {
	}

	return true;
}

//TKS 9-1-31 I tried using GHH's isNumberKey function above and it does not work for what I need
//I need an unsigned int. No negative numbers, no decimals etc. This function takes a value you pass
//it, converts to a string then perform regular expression on the string. Returns false if any chars other than 0-9 found
function isUnsignedInteger(s) {
	if (s.length == 0)
		return false;

	return (s.toString().search(/^[0-9]+$/) == 0);
}
//******************************************

//6-3-10 TKS #1275 issues with GL entry list paging. Originally a locate screen and grid results
//but now the grid is loaded on PO, invoice, AR and major units etc. In order for the grid
//to work everywhere and be universal I am setting global vars here that Lizzy has access to
//no matter where you are. I am also going to write a clear function to make sure the vars are
//cleared out before you call the grid from say view PO. We only want the numbers and type
//vars to hold something so this clear function will ensure this.
//12.17.2010 : CMK : # 2016 : adding global for AcctType	& XportCSV
var globalGL_List_AcctNum = '';
var globalGL_List_AcctType = '';
var globalGL_List_DateFrom = '';
var globalGL_List_DateTo = '';
var globalGL_List_Numbers = '';
var globalGL_List_Type = '';
var globalGL_List_CurrContact = false;
var globalGL_List_ZeroBegBal = false;
var globalGL_List_XportCSV = false;
var globalGL_List_CreatedBy = 0;
var globalGL_List_LocationID = 0;
var globalGL_List_DeptID = 0;
var globalGL_List_ViewGLDetails = '';
var globalGL_List_ViewAccountDescriptions = '';

//12.27.2012 jss - ( 28366 )
var globalGL_List_InflationHits = false;
var globalGL_List_ManualHits = false;

//04.17.2013 : CMK : # 34479 : adding offset to gllocate
var globalGL_List_OffsetHits = false;
//12.29.2015 jss - ( 78298 )
var globalGL_List_HideInvoices = false;

function clearGlobalGLListVars() {
	globalGL_List_AcctNum = '';
	globalGL_List_AcctType = '';
	globalGL_List_CreatedBy = 0;
	globalGL_List_DateFrom = '';
	globalGL_List_DateTo = '';
	globalGL_List_Numbers = '';
	globalGL_List_Type = '';
	globalGL_List_CurrContact = false;
	globalGL_List_ZeroBegBal = false;
	globalGL_List_XportCSV = false;
	globalGL_List_LocationID = 0;
	globalGL_List_DeptID = 0;
	globalGL_List_ViewGLDetails = '';
	globalGL_List_ViewAccountDescriptions = '';

	//12.27.2012 jss - ( 28366 )
	globalGL_List_InflationHits = false;
	globalGL_List_ManualHits = false;

	//04.17.2013 : CMK : # 34479 : locate offsetting hits as well
	globalGL_List_OffsetHits = false;

	//03.28.2023 tam - 236725 this had been added on another ticket but not added to this function
	globalGL_List_DateCreated = false;
}
//***********************************************************

//TKS 6-3-10 There is no simple way to round floats in JS many solutions I found did not work correctly
//with items like 12.236 which rounded at 2 decimals should be 12.24
//however I did find this function a programmer wrote
/**
* Rounds a number to two decimal places.
* 7.335 is rounded to (7.34) so 5/100 always does ceiling)
* @n the number to round (float type expected)
* @return a rounded number (you may need to pad this to 2 decial places)
*/
function round(n) {
	return Math.round(n * 100 + ((n * 1000) % 10 > 4 ? 1 : 0)) / 100;
}

//javascript number format issue
function getNumber(num) {
	var temp = '';
	var temp1 = '';

	//10.28.2010 jss - added this cuz negative's were getting turned into positives
	var multiplier = 1;
	if (num.substring(0, 1) == '-')
		multiplier = -1;

	for (i = 0; i < num.length; i++) {
		temp1 = num[i].match(/[0-9]|\./);

		if (temp1 != null)
			temp += temp1;
	}

	//10.28.2010 jss - added this cuz negative's were getting turned into positives
	temp = temp * multiplier;

	return temp;
}



//TKS 7-29-10 #1441 I use the same function that samples the sound in settings/my profile
//it also sets it once you save so you do not have to log out
//I added this to the js_master file so that when you login, this function also handles setting
//your sound for you
function SampleSoundSetSound(id, setflag) {
	id = parseInt(id);
	//TKS 01.30.2015 #54146 added No Sound option so if 0 do not worry with any of this.
	if (id == 0)
		return;

	switch (id) {
		case 1:
			var filename = 'stapler';
			break;
		case 2:
			var filename = 'boxrattle';
			break;
		case 3:
			var filename = 'bubbles';
			break;
		case 4:
			var filename = 'cartoonboing';
			break;
		case 5:
			var filename = 'clank';
			break;
		case 6:
			var filename = 'coinslot';
			break;
		case 7:
			var filename = 'crash';
			break;
		case 8:
			var filename = 'doorclose';
			break;
		case 9:
			var filename = 'glassring';
			break;
		case 10:
			var filename = 'metalclank';
			break;
		case 11:
			var filename = 'phoneringing';
			break;
		case 12:
			var filename = 'rattlingkeys';
			break;
		case 13:
			var filename = 'thud';
			break;
		case 14:
			var filename = 'waterdrop';
			break;
	}

	//enter here if they saved so we can update their current sound to what they
	//saved so they don't have to logout for the change
	//05.09.2013 naj - changed this to use the new nizex-soundmanager.js
	if (setflag == 'setit') {
		//soundManager.destroySound( 'AlertSound' );
		//soundManager.createSound( 'AlertSound','../sounds/' + filename );
		soundManager.setSound('AlertSound', '../sounds/' + filename);
	}
	//enter here if just sampling the sound by changing it in the droplist
	else {
		//soundManager.destroySound( 'tempSound' );
		//soundManager.createSound( 'tempSound','../sounds/' + filename );
		soundManager.setSound('tempSound', '../sounds/' + filename);
		soundManager.play('tempSound');
	}
}//End of SampleSoundSetSound


//TKS 12-7-10 1934 this function takes a path to a barcode file and loads in iframe for print
function BarcodePrint(path) {
	//10.08.2013 naj - added guard rail to make sure we do not reload lizzy in the iframe
	//06.28.2017 rch -  108324 - 
	if (path.trim() == "")
		return true;

	self.frames['download_frame'].location.href = path;
}


//TKS 3-23-11 added this function so we had a single function to close regions and popups controls
function CloseRegion(region) {
	try { document.getElementById(region).innerHTML = ''; }
	catch (err) { }
}

//this function sets our global Inv var and calls what ever controls we need
//TKS 04.28.2011 moved from cv_invoice_list because many places need access to this function
function invoice_navigate(placement, invid) {
	globalInvoiceID = invid;
	try {
		get_mv_view_invoice(placement);
	}
	catch (err) {
		get_menu_includes(231, 81);
		setTimeOut(get_mv_view_invoice(placement), 2000);
	}

}

//TKS 04.28.2011 added here because many places need access to this function
function goto_contact(contactid, zipid) {
	//TKS 02.19.2024 #256792 complaints that you locate an AR by ID for a contact,
	//then locate another contact and come back to view their AR and because the ARID is stored
	//it would yield 0 results for the latest contact you selected because it was for the previous contact. 
	//So we will clear this var out
	globalAR_ARID = 0;
	document.getElementById('global_contactid').value = contactid;
	document.getElementById('global_zipid').value = zipid;
	get_mv_viewcontact('reg_body', '');
	get_menu_master('reg_left1', 2);
}

//TKS 04.28.2011 added here because many places need access to this function
function goto_ViewUnit(unitid) {
	globalUnitID = unitid;
	get_menu_getpage('reg_body', 181, 65);
}

//07.26.2018 rlw - 131505 added so that Unit Transfers alert in communications/cv_comm_misc_alerts.php
//can have a link to the Serialized->Managment->'View Converted Units' contol
function goto_ViewConvertedUnits() {
	get_menu_getpage('reg_body', 594, 66);
}

//TKS 05.02.2011 added this to start a conf call from adv dashboard
function StartConference(confid, contactid) {
	get_menu_includes(1, 8);
	document.getElementById('global_contactid').value = contactid;
	CheckConfJoin(confid, contactid);
}

//TKS 08.17.2017 #111639 this function fakes out the call log in order to pull it up.
//however, our new var will hide all fields to the viewing user so that
//everything is readonly for them in the conference call
//userid is actually the contactid of the user on the call ( that's how it is stored in conCallLogs )
function JoinConferenceCall(userid, contactid, zipid) {
	CanStopCorrespondence = 0;
	JoinConference = userid;
	get_bulletin_contact(contactid, zipid);
}

//TKS 02.21.2018 #122046 the StartConference is used all over with the phone icon
//if you have already started the conference call or someone else has, 
//we don't want to start another one. We have a JoinConferenceCall()
//that handles adding you to the conference with read only
//this function will be called inside of the StartConference() to quickly determine
//this scenario 
function CheckConfJoin(confid, contactid) {
	var path = 'contacts/ce_checkconference_join.php?confid=' + confid;
	comm_cv_checkconf.callfunc = call_CheckConfJoin;
	comm_cv_checkconf.confid = confid;

	ajax_send(path, true, 'GET', null, comm_cv_checkconf);
}

function call_CheckConfJoin() {
	if (comm_cv_checkconf.response.substring(0, 5) != 'Error') {
		if (comm_cv_checkconf.response == 'NOTSTARTED' || comm_cv_checkconf.response == 'HOSTING') {
			globalConferenceID = comm_cv_checkconf.confid;
			GlobalCorrespondence = '1';
			get_mv_logcall('reg_body');
		}
		else {
			var temp = comm_cv_checkconf.response.split('|');
			JoinConferenceCall(temp[0], temp[1], 0);
		}
	}
	else {
		//if they get a validation error, make button active again so they can click save
		//document.getElementById( 'your_buttonid' ).disabled=false;
		setError(comm_cv_checkconf.response);
	}
}






//TKS 05.02.2011 moved from calendar/js_cv_quickview_event.js so adv dashboard can use it
var Cal_Call_TopicID = '';
function navigateLogCall(contactid, zipid, TopicID, placement) {
	get_menu_includes(1, 8);
	if (placement != '') {
		hideTip();
		document.getElementById(placement).innerHTML = '';
	}

	GlobalCorrespondence = '1';


	if (TopicID == undefined)
		Cal_Call_TopicID = '';
	else
		Cal_Call_TopicID = TopicID;

	document.getElementById('global_contactid').value = contactid;
	document.getElementById('global_zipid').value = zipid;
	get_cv_updatestatus(contactid);
	//TKS 05.08.2013 #35202 GHH wants to be able to log a call from activities panel and it
	//not reload the menus and leave the panel. So commenting all this out and added menu includes at the top
	//of this function and just calling the mv_logcall function
	//get_menu_master( 'reg_left1', 2 );
	//get_menu_main( 'mnu_Contacts', 8 );
	//get_menu_getpage( 'reg_body', 15, 8 );
	get_mv_logcall('reg_body');
}

//TKS 06.15.2017 #105629 adding a completely different function to setup face to face calls
//as we don't need to ask for call type care about many of the flags a call needs when coming from
//other places. We won't pull up the the call type control so hidden fields and radio options won't exist.
//so we set everything we need up in this function before we open the window.
var comm_logfacetoface = new onConnect(false, false, call_logfacetoface);
function navigateFaceToFace(contactid, zipid, TopicID, placement) {
	get_menu_includes(1, 8);
	if (placement != '') {
		hideTip();
		document.getElementById(placement).innerHTML = '';
	}

	GlobalCorrespondence = '4';
	//call type is 28


	if (TopicID == undefined)
		Cal_Call_TopicID = '';
	else
		Cal_Call_TopicID = TopicID;

	document.getElementById('global_contactid').value = contactid;
	GlobalCallContactID = contactid;
	document.getElementById('global_zipid').value = zipid;
	get_cv_updatestatus(contactid);

	var path = 'contacts/ce_logcall.php?correspondencetype=' + GlobalCorrespondence;
	path = path + '&action=continue' + '&status=start';
	path = path + '&calltype=28' + '&contactid=' + document.getElementById('global_contactid').value;

	comm_logfacetoface.callfunc = call_logfacetoface;

	ajax_send(path, true, 'GET', null, comm_logfacetoface);
}


function call_logfacetoface() {
	if (comm_logfacetoface.response.substring(0, 5) != 'Error') {
		globalClosedServiceCall = 0;
		PostSaleCall = 0;
		LogCallTicketID = 0;
		LogCallSurveyLinkID = 0;
		get_bulletin_contact(document.getElementById('global_contactid').value, 0);
		get_cv_ticket_call_icons('reg_icons_dash');
	}
	else
		setError(comm_logfacetoface.response);
}

//this function sets our global var and calls what ever controls we need
//TKS 05.3.2011 put here so other controls can use it. Primarily at the time fo this comment it
//is used for adv dashboard
//You may have to use get_menu_includes( 292, 50 ); in your control and load the includes before
//you call this. I had it in the function itself but the includes don't load fast enough before the get_mv call
function PO_navigate(poid) {
	get_menu_master('reg_left1', 3, '');
	globalPOID = poid;

	get_mv_view_po('reg_body');
}

//TKS 08.1.2011 added to hide/show the lengthy instructions to give room
function MoreLess(showmore, showless) {
	if (document.getElementById('moreless').innerHTML == showmore) {
		document.getElementById('moreless').innerHTML = showless;
		document.getElementById('instruction_hide_show').style.display = 'block';
	}
	else {
		document.getElementById('moreless').innerHTML = showmore;
		document.getElementById('instruction_hide_show').style.display = 'none';
	}
}


//TKS 08.19.2011 #6385 moved from js_mv_checklist_report. Allows clicking on contact
//and viewing that contact's checklist. Moved so it can be called from inprocess list as well
function ChecklistContactView(contactid, checklistid) {
	get_menu_includes(528, 8);
	document.getElementById('global_contactid').value = contactid;
	get_cv_updatestatus(contactid);
	get_mv_contact_checklist('reg_body', checklistid);
}
//TKS 08.15.2011 # 6099 create link to take user to 'View My Checklists' in alerts
//and in dashboard
function getViewMyChecklists() {
	document.getElementById('global_pro_page').value = 'mv_my_issues';
	document.getElementById('global_pro_myissuelist').value = 9;

	get_menu_master('reg_left1', 2);
	try {
		get_menu_main('mnu_View', 10);
	}
	catch (err) {
		window.setTimeout('getViewMyChecklists( );', 1000);
		return;
	}

	get_menu_includes(26, 10);

	try { get_mv_my_issues('reg_body'); } catch (err) { window.setTimeout('getViewMyChecklists( );', 1000); }
}


//TKS 08.25.2011 close dialog window function
//TKS 08.31.2011 now that we may support more than one dialog window,
//passing in the region
function CloseDialog(region) {
	document.getElementById(region).innerHTML = '';
	//TKS 12.07.2011 #9892 reset the dialog window position
	document.getElementById(region).style.position = 'absolute';
	DragDialogY = 0;
	DragDialogX = 0;
	document.getElementById(region).style.top = DragDialogY + 'px';
	document.getElementById(region).style.left = DragDialogX + 'px';
}

//TKS 12.07.2011 #9892 added code to set the dialog near where you clicked
function PositionDialog(region) {
	document.getElementById(region).style.top = (DragDialogY - 100) + 'px';
	document.getElementById(region).style.left = (DragDialogX - 180) + 'px';
	document.getElementById(region).style.position = 'absolute';
}

//TKS 10.20.2011 since we no longer have the red alert box to let us know whether the user
//has clicked to view or not, we are going to remove the image tags from the cv_getalerts
//and use a div with a class and just swap the class when they click
function SwapAlertIcon() {
	//TKS 03.21.2016 #82728 changed to new menu icon
	//document.getElementById( 'reg_alert_icon' ).className='yellow_alert';
	document.getElementById('reg_alert_icon').className = 'alert-module alert-module-read';
	try {
		document.getElementById('unread_alert_count').innerHTML = '';
		document.getElementById('unread_alert_count').style.display = 'none';
	} catch (err) { }
	//TKS 10.25.2011 set the alertit flag to 2 for already viewed
	document.getElementById('hid_alertit').value = 2;
}

//###################################
//###################################
//###################################
//TKS 01.03.2012 #11078 this function handles hiding and showing the lizzy is working progress bar
//delay is how many seconds before showing the progress bar
//hide_show is 1 for show, 2 for hide
var ProgressNeeded = true;
var ProgressEvent = undefined;
function LizzyProgressBar(delay, hide_show) {
	//05.07.2014 naj - disable the old LizzyProgressBar
	return true;
	//TKS 11.07.2017 No Ticket. Commenting all the code out below
	//as this return above  this code causes a JS warning in console for unreachable code.
	/*
	if ( hide_show == 1 )//displaying
		{
		ProgressNeeded = true;
		//make sure they passed in a legit value
		if ( !isUnsignedInteger( delay ) )
			delay = 4;
	
		//since the setTimeout works in milliseconds, multiply our number of seconds by 1000
		delay = delay * 1000;
	
		//This code sets up the height and width for our semi-transparent layer that holds our control
		//make sure that the control you load in the overlay_video region has a table with class of overlay_tbl
		//it will center the control and place a border and set background color
		var theWidth, theHeight;
		//TKS 10.31.2012 swapped setting width and height based on clientHeight
		//which is only giving viewing window height, not scroll area to now calling functions
		//located in js_master
		theWidth 	= getDocWidth();
		theHeight 	= getDocHeight();
		document.getElementById( 'lizzy_progress' ).style.width = theWidth + 'px';
		document.getElementById( 'lizzy_progress' ).style.height = theHeight + 'px';
		scroll(0,0);
	
		if (ProgressEvent == undefined)
			ProgressEvent = setTimeout( "DisplayProgressBar()", delay );
		}
	else//hiding
		{
		ProgressNeeded = false;
		clearTimeout(ProgressEvent);
		ProgressEvent = undefined;
		document.getElementById( 'lizzy_progress' ).style.display = 'none';
		}
	*/
}//end LizzyProgressBar

//TKS 01.03.2012 #11078 this function works with the above LizzyProgressBar. I found a bug in my original solution in that
//you can't just call it and say show in 4 seconds and then in your callback call hide. Case in point I went to email module and
//did this and it called it with 4 second timer, my email loaded instantly so the call to close had passed then after the 4 second mark
//the progress bar loaded and the close call had passed leaving me stuck. So I added a flag for cases like this, put it into a function
//so I can check it when the setTimeout call is kicked off
function DisplayProgressBar() {
	if (ProgressNeeded)
		document.getElementById('lizzy_progress').style.display = 'block';
}

//05.07.2014 naj - new LizzyWorking process, superceeds the old LizzyProgressBar
function LizzyWorking(display) {
	if (display == undefined)
		display = false;

	//05.08.2014 naj - we want to always resize the div to match the size of the browser window
	$("#workingcontainer").css("width", getDocWidth() + "px");
	$("#workingcontainer").css("height", getDocHeight() + "px");

	//04.29.2019 rch -  if dispaly is from CIP then show different mssage
	if (display == 'CIP') {
		$("#workingcontainer").css("display", "block");
		$("#workingcipcontainer").css("display", "block");
		$("#workingtextcontainer").css("display", "none");
	}
	else if (display) {
		$("#workingcontainer").css("display", "block");
		$("#workingtextcontainer").css("display", "block");
		$("#workingcipcontainer").css("display", "none");
	}
	else {
		$("#workingcontainer").css("display", "none");
		$("#workingtextcontainer").css("display", "none");
		$("#workingcipcontainer").css("display", "none");
		LizzyWorkingEvent = undefined;
	}
}

//###################################
//###################################
//###################################


//10.29.2012 naj - gets a list of the user defined quick keys.
function getQuickKeys() {
	QuickKeys = new Object;

	//10.30.2012 naj - make an ajax request and parse the resulting JSON into the QuickKeys object
	$.getJSON('ce_getquickkeys.php',
		function (data) {
			$.each(data,
				function (key, value) {
					QuickKeys[key] = new Array(4);

					for (var i = 0; i < value.length; i++)
						QuickKeys[key][i] = value[i];

					//TKS 05.28.2013 #35825 added global actions. If this array element
					//holds a val > 0 then we handle our necessary includes to pull up the controls we need
					if (QuickKeys[key][3] != undefined && QuickKeys[key][3] > 0) {
						switch (QuickKeys[key][3]) {
							case '1'://general contact invoice
								get_menu_includes(233, 81);
								get_menu_includes(628, 98);//get all includes for the view invoice from our settings view invoice menu
								get_menu_includes(636, 98);//get all includes for the new invoice from our settings new invoice menu
								break;
						}
					}
				}
			);
		}
	);

}

//TKS 10.31.2012 was using document.body.clientHeight for our overlays
//but this only gave us the viewport height. So the background stopped at the scroll
//this function will fill in the total area including the scroll
function getDocHeight() {
	var D = document;
	return Math.max(
		Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		Math.max(D.body.clientHeight, D.documentElement.clientHeight)
	);
}

function getDocWidth() {
	var D = document;
	return Math.max(
		Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
		Math.max(D.body.offsetWidth, D.documentElement.offsetWidth),
		Math.max(D.body.clientWidth, D.documentElement.clientWidth)
	);
	//TKS 06.03.2013 #25221 setup the calc of width to do the same as height
	/*var theWidth;
	if (document.body)
		theWidth=document.body.clientWidth;
	
	return theWidth;
	*/
}

//TKS 12.07.2012 #27505 this function will handle building and setting up our overlays
//or faux lightboxes
//controlclassname is the class we use on our tables that load in the overlay
//we now have code that positions this at the point of scroll in the browser
//I am passing it in to give us flexibility later in case things change
//in how we do things, we can then target something else.
//placement is the overlay id
//response will be the comm response to set the inner HTML to when done
//scrolltop will be false by default but if you pass in true, it will make the
//scroll jump to the top of the window
function BuildOverlay(controlclassname, placement, response, scrolltop) {
	//This code sets up the height and width for our semi-transparent layer that holds our control
	//make sure that the control you load in the overlay_video region has a table with class of overlay_tbl
	//it will center the control and place a border and set background color
	var theWidth, theHeight;
	theWidth = getDocWidth();
	theHeight = getDocHeight();
	try {
		//TKS 04.07.2020 #166692 changed width to 100% so the BG expands as you resize the browser
		//document.getElementById( placement ).style.width = theWidth + 'px';
		document.getElementById(placement).style.width = '100%';
		document.getElementById(placement).style.height = theHeight + 'px';
		document.getElementById(placement).style.display = 'block';
		document.getElementById(placement).innerHTML = response;
		var scroll = $(window).scrollTop() + 30;
		if (scrolltop)
			scrollTo(0, 0);
		else
			$(controlclassname).css('margin-top', scroll + "px");

		//TKS 11.21.2017 #117166 adding code in an attempt to make sure
		//the overlay table always loads in the middle of the view port. 
		//especially an issue on schedule incoming with a bunch of techs. It scrolls
		//way right so the overlay controls were loading off screen
		//get the table width
		CenterOverlay(placement);
	}
	catch (err) { }
}

//TKS 11.21.2017 #117166
function CenterOverlay(placement) {
	var temp = "#" + placement + " table.overlay_tbl";
	var table_width = $(temp).outerWidth();
	if (table_width == undefined)//maybe working with a div rather than a table
	{
		var temp = "#" + placement + " div.overlay_tbl";
		var table_width = $(temp).outerWidth();
	}
	//get view port width
	var view_port_width = $(window).width();
	//calculate the space surrounding the table in the view port
	var extra_space = view_port_width - table_width;
	//cut this space in half and set the left margin to this value
	var left_margin = (extra_space / 2);
	left_margin = Math.round(left_margin);
	$(temp).css({ "margin-left": +left_margin + "px" });

	//there are some controls that load other controls within them and the width
	//of the overall container has not had time to fill in yet so we wait a fraction of
	//a second and do a recheck. If the control is not centered, we recalc and move it over.
	setTimeout(SlowLoad_CenterOverlay, 700, temp);
}
//this function checks to see if the overlay loaded centered 
//in some cases it fills in after the above function calculates.
//this function will do a quick adjustment
function SlowLoad_CenterOverlay(target) {
	if ($(target).css("margin-left") != $(target).css("margin-right")) {
		var table_width = $(target).outerWidth();
		//get view port width
		var view_port_width = $(window).width();
		//calculate the space surrounding the table in the view port
		var extra_space = view_port_width - table_width;
		//cut this space in half and set the left margin to this value
		var left_margin = (extra_space / 2);
		left_margin = Math.round(left_margin);
		$(target).css({ "margin-left": +left_margin + "px" });
	}
}

//TKS 11.28.2017 #117166 like above, on schedule incoming, the error log window
//was loading way over to the right when tere were a lot of techs. Now calculating
//viewport 
function CenterErrorLog() {
	var table_width = $("table.lblerror_tbl").outerWidth();
	//get view port width
	var view_port_width = $(window).width();
	//calculate the space surrounding the table in the view port
	var extra_space = view_port_width - table_width;
	//cut this space in half and set the left margin to this value
	var left_margin = (extra_space / 2);
	left_margin = Math.round(left_margin);
	$(".lblerror_tbl").css({ "margin-left": +left_margin + "px" });
}


//TKS 06.12.2014 #53411 adding a separate overlay function specific to parts lookup
//as we need it to always have a fixed height so it doesn't constantly resize as you change
//assemblies. Instead of altering the BuildOverlay() and potentially messing things up elsewhere
//in lizzy this function will be specific to parts look up
function BuildPartsLookupOverlay(controlclassname, placement, response, scrolltop) {
	//This code sets up the height and width for our semi-transparent layer that holds our control
	//make sure that the control you load in the overlay_video region has a table with class of overlay_tbl
	//it will center the control and place a border and set background color
	var theWidth, theHeight;
	theWidth = getDocWidth();
	theHeight = $(window).height();
	document.getElementById(placement).style.width = theWidth + 'px';
	document.getElementById(placement).style.height = theHeight + 'px';
	document.getElementById(placement).style.display = 'block';
	document.getElementById(placement).innerHTML = response;
	scrollTo(0, 0);
}
//****************************************


/****************************************/
//11.13.2012 naj - functions for drag and drop html elements.
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev, source) {
	ev.dataTransfer.setData("Source", source);
}

function drop(ev, target, callback, confirmation) {
	ev.preventDefault();
	var source = ev.dataTransfer.getData("Source");

	//11.13.2012 naj - if the source and target are the same do nothing.
	if (source == target) return false;

	//11.13.2012 naj - if a confirmation message was passed send it to the callback function
	if (confirmation != undefined && confirmation != "")
		callback(source, target, confirmation);
	else
		callback(source, target);
}
/****************************************/

/****************************************/
//11.19.2012 naj - these functions are for handling file uploads
function attachmentUploadInit(callback, singlefile, frm_name) {
	var doc = document.getElementById('draganddrop');

	//07.25.2013 naj - added check to supress errors when the drag and drop area does not exist.
	if (doc == undefined || doc == null)
		return false;

	doc.ondragover = function () { return false; };
	doc.ondragend = function () { return false; };
	doc.ondrop = function (event) {
		event.preventDefault && event.preventDefault();

		// now do something with:
		var files = event.dataTransfer.files;

		//11.20.2012 naj - check to see if a form name was passed, if not default to frm_upload.
		if (frm_name == undefined)
			frm_name = 'frm_upload';

		submitAttachments(frm_name, files, callback, singlefile);
		return false;
	};
}

function logoUploadInit(callback, singlefile, frm_name) {
	var logodoc = document.getElementById('draganddrop_logo');

	//07.25.2013 naj - added check to supress errors when the drag and drop area does not exist.
	if (logodoc == undefined || logodoc == null)
		return false;

	logodoc.ondragover = function () { return false; };
	logodoc.ondragend = function () { return false; };
	logodoc.ondrop = function (event) {
		event.preventDefault && event.preventDefault();

		// now do something with:
		var files = event.dataTransfer.files;

		//11.20.2012 naj - check to see if a form name was passed, if not default to frm_upload.
		if (frm_name == undefined)
			frm_name = 'frm_upload_logo';

		submitAttachments(frm_name, files, callback, singlefile);
		return false;
	};
}

function WebstoreCSSUploadInit(callback, singlefile, frm_name) {
	var cssdoc = document.getElementById('draganddrop_stylesheet');

	//07.25.2013 naj - added check to supress errors when the drag and drop area does not exist.
	if (cssdoc == undefined || cssdoc == null)
		return false;

	cssdoc.ondragover = function () { return false; };
	cssdoc.ondragend = function () { return false; };
	cssdoc.ondrop = function (event) {
		event.preventDefault && event.preventDefault();

		// now do something with:
		var files = event.dataTransfer.files;

		//11.20.2012 naj - check to see if a form name was passed, if not default to frm_upload.
		if (frm_name == undefined)
			frm_name = 'frm_upload';
		submitAttachments(frm_name, files, callback, singlefile);
		return false;
	};
}

function submitAttachments(frm_name, files, callback, singlefile) {
	if (frm_name != undefined && frm_name != "") {
		var form = document.getElementById(frm_name);
		var fd = new FormData(form);
		var uploading = document.getElementById('hid_uploading').value;
		uploadXHR = new XMLHttpRequest();//11.20.2012 naj - reset the uploadXHR object, this clears any events.

		//11.19.2012 naj - this is only used for drag and drop uploads
		if (files != undefined && files != "") {
			if (singlefile != undefined && singlefile == true) {
				//11.19.2012 naj - form is only supposed to accept a single file.
				fd.append('file', files[0]);
			}
			else {
				//11.19.2012 naj - form is setup to allow multiple files.
				for (i = 0; i < files.length; i++) {
					fd.append('file[]', files[i]);
				}
			}
		}

		//This code sets up the height and width for our semi-transparent layer that holds our control
		//make sure that the control you load in the overlay_video region has a table with class of overlay_tbl
		//it will center the control and place a border and set background color
		var theWidth = getDocWidth();
		var theHeight = getDocHeight();
		//TKS 06.18.2015 #69700 changed from video_overlay to overlay2 because we can load tickets in overlay now
		//each time you added a file while it was up it would close the ticket
		var overlay = document.getElementById('overlay4');
		var html = '<div class="overlay_tbl" style="width:230px;"><div id="upstatus">' + uploading + '</div>';
		html = html + '<progress id="prog" value="0" max="100.0"></progress>';
		html = html + '<span id="percent"></span></div>';
		overlay.style.width = theWidth + 'px';
		overlay.style.height = theHeight + 'px';
		overlay.style.display = 'block';
		overlay.innerHTML = html;
		scroll(0, 0);

		//11.12.2012 naj - set event listener to update the upload progress.
		uploadXHR.upload.addEventListener("progress", uploadProgress, false);
		uploadXHR.addEventListener("load", callback, false);
		uploadXHR.open("POST", form.action += ((/\?/).test(form.action) ? "&" : "?") + (new Date()).getTime(), true);
		uploadXHR.send(fd);

		//11.12.2012 naj - Clear the form
		form.reset();
	}
}

function uploadProgress(evt) {
	//11.12.2012 naj - update the percent uploaded display.
	if (evt.lengthComputable) {
		var percentComplete = Math.round(evt.loaded * 100 / evt.total);
		var loadedKB = Math.round(evt.loaded / 1024);
		var totalKB = Math.round(evt.total / 1024);
		document.getElementById('prog').value = percentComplete;
		document.getElementById('percent').innerHTML = percentComplete + "%<br />" + loadedKB + "KB of " + totalKB + "KB";
	}
	else {
		document.getElementById('percent').innerHTML = 'unable to compute';
	}
}
/****************************************/


//TKS 03.12.2013 #32442 added this function to clear out all global flags
//this way if they are doing a locate that pulls up in overlay to link
//then click the close link and do not complete the process
//we can call this function to clear out the vars to prevent problems
function ClearContactGlobals() {
	try { NewInvoiceFlag = ''; } catch (err) { }
	try { CheckingBillsFlag = ''; } catch (err) { }
	try { ReceivablesFlag = ''; } catch (err) { }
	try { globalMergeContact1 = 0; } catch (err) { }
	try { globalMergeContact2 = 0; } catch (err) { }
	try { MergeConFlag = 0; } catch (err) { }
	try { InvGeneralContactID = 0; } catch (err) { }
	try { globalInvoiceDefaultFlag = ''; } catch (err) { }
	try { ConsignmentContact = ''; } catch (err) { }
	try { InternalInvoiceContact = ''; } catch (err) { }
	try { globalScanTagContactID = 0; } catch (err) { }
	try { LocateContactFlag = ''; } catch (err) { }
	try { LinkContactFlag = 0; } catch (err) { }//once a contact is selected, this holds the contactid
	//TKS 03.12.2013 in the case they click add new contact, we close the scan tag window
	//so we need to store the scan tag they entered so we fill in the form when we recall it
	try { globalContactScanTag = ''; } catch (err) { }
	try { MovePartsContactVoidInvoice = false; } catch (err) { }
	try { GlobalCallContactID = 0; } catch (err) { }
	try { MoveARContact_ARID = 0; } catch (err) { }
}

//11.20.2014 naj - the old iframe PDF methods have become unstable and not uniform across platforms.
//As a result I have changed everything to displaying the PDF in a div with the opbject tag. This
//appears to work the same on all browsers and with all PDF plugins.
//11.07.2014 naj - added function to help with customers that slow computers.
function loadPDFFrame(iframe, url, print, clearfirst) {
	if (clearfirst == undefined)
		clearfirst = false;

	if (print == undefined)
		print = false;

	if (clearfirst) {
		var frame = window.frames[iframe];
		document.getElementById(iframe).src = "templates/main/download_frame.php";
		setTimeout(function () {
			loadPDFFrame(iframe, url, print, false);
		}, 300);
	}
	else {
		//11.17.2017 ghh -  removed to keep this from coming up instantly when we
		//press print button. 
		//LizzyWorking(true);
		var frame = window.frames[iframe];
		frame.location.replace(url);

		//12.07.2020 rch -  182294 - removing this for now b/c it is not working with 
		//chrome in the shit year 2020
		/*
		if (print)
			setTimeout(function() {
					printIframe(iframe);
					}, 200);
		*/
	}
}
//04.22.2013 naj - added function to print PDF in an iframe.
function printIframe(iframe)//, clear)
{
	//08.26.2014 naj - changed handling of iframe to improve compatibility.
	var browser = navigator.userAgent;
	var frame = window.frames[iframe];
	var framedoc = frame.contentDocument || frame.document;

	if (framedoc == undefined || framedoc.readyState != 'complete') {
		setTimeout("printIframe('" + iframe + "');", 200);
		return false;
	}

	if (browser.match(/chrome|safari/i))
		var docready = framedoc.body.getElementsByTagName('embed');

	if (browser.match(/firefox/i))
		var docready = framedoc.body.getElementById('outerContainer');

	if (docready.length == 0) {
		setTimeout("printIframe('" + iframe + "');", 200);
		return false;
	}
	else {
		//08.23.2013 naj - Ticket# 39940 change the print call to use setTimeout
		//to give the browser an extra 400ms to display the pdf.
		//11.07.2014 naj - Updated timeout to 2.5 seconds due to dealers with slow computers
		setTimeout(function () {
			if (frame.contentWindow == undefined)
				frame.print();
			else
				frame.contentWindow.print();

			LizzyWorking(false);
		}, 2500);
	}
}

//11.20.2014 naj - Displays the PDF in a div.
function printPDFDocument(url) {
	//11.20.2014 naj - first set the overlay size and display it.
	//TKS 12.04.2020 #182873 changed out hard coded overlay with new function
	var temp = NextAvailOverlay();
	var overlay = document.getElementById(temp);
	theWidth = getDocWidth();
	theHeight = getDocHeight();
	overlay.style.width = theWidth + 'px';
	overlay.style.height = theHeight + 'px';
	overlay.style.display = 'block';

	//11.20.2014 naj - now create a div to go inside the overlay.
	var innerdiv = document.createElement('div');
	//TKS 12.04.2020 #182873 added id so I can target it below for the scroll position
	innerdiv.setAttribute("id", "print_ro");
	innerdiv.style.margin = '0px auto 0px auto';
	innerdiv.style.textAlign = 'center';
	innerdiv.style.width = '100%';
	innerdiv.style.height = $(window).height() + 'px';

	//11.20.2014 naj - create our banner for closing the overlay
	var banner = document.createElement('div');
	banner.style.margin = '0px auto 0px auto';
	banner.style.background = 'gray';
	banner.style.width = '60%';
	banner.style.height = '5%';
	banner.style.minHeight = '45px';
	banner.setAttribute("onclick", 'closePDFDocument()');
	//TKS 12.04.2020 #182873 added hidden field so we know what overlay this loaded in so the close
	//function can target it since it is no longer hard coded overlay
	banner.innerHTML = '<span style="position:relative; top:10%;"><span class="bold">Use the PDF viewer\'s controls to print or save the PDF.</span><br>Click Here to Return To Lizzy.</span><input type="hidden" id="printpdf_overlay" value="' + temp + '">';
	//11.20.2014 naj - now create the pdf object
	var pdfobject = document.createElement('object');
	pdfobject.setAttribute("data", url);
	pdfobject.style.width = '60%';
	pdfobject.style.height = '95%';

	//11.20.2014 naj - place the pdf object into the div and then place the inner div into the overlay.
	innerdiv.appendChild(banner);
	innerdiv.appendChild(pdfobject);
	overlay.appendChild(innerdiv);

	//TKS 12.04.2020 #182873 added the scroll position
	var scroll = $(window).scrollTop() + 30;
	$('#print_ro').css('margin-top', scroll + "px");
}

//11.20.2014 naj - closes the PDF Document when the user is done.
function closePDFDocument() {
	//TKS 12.04.2020 #182873 added hidden field so we know what overlay this loaded in so the close
	//function can target it since it is no longer hard coded overlay
	var temp = document.getElementById('printpdf_overlay').value
	//var overlay = document.getElementById('video_overlay');
	close_overlay(temp);
}
//08.27.2013 naj - added support for client computer names stored in the browsers local storage
var ClientHostName = "";
if (typeof (Storage) != undefined) {
	if (localStorage.ClientHostName != undefined)
		ClientHostName = localStorage.ClientHostName;
}

//02.07.2014 naj - this function is for handling scriptel signature tablets.
//02.07.2018 jec - Adding the InvoiceID to this grabSignature js function so that we can store signatures in Mongo
//02.07.2018 jec - TransID being passed in is actually the invoiceid
//06.14.2018 jec - Ticket 129869, some signatures were incorrectly being flagged as service signatures
//Adding the is service flag to distinguish these
function grabSignature(date, filename, key, transid, isservice) {
	var sig = document.getElementById('txt_scriptel').value;
	$.get("/java/SigApplet.php?date=" + date +
		"&filename=" + filename + "&key=" + key + "&transid=" + transid + "&isservice=" + isservice + "&scriptel=" + encodeURIComponent(sig),
		function (data) {
			document.getElementById('sigarea').innerHTML = data
		}
	);
}

//TKS 09.03.2015 #73144 this function takes all the possible flags
//used in our nav key processes for allowing the enter key to kick off 
//and sets them back to the values needed to prevent it. This will be used to cancel the listeners
//so that enter key can be used elsewhere after locating an item like locate po or contact
//allowing these controls to take you to the po or contact and not think you are still locating an item
function KillItemEnterKey() {
	globalCallNavSave = false;
	addItemBinQtyIndex = -1;
}

//TKS 12.07.2015 #76376 moved from settings/units/js_cv_model_finance_defaults.js
//08.10.2016 jss - ( 89749 ) when tim moved this here from settings he didn't realize this same
//function was already up above.  Problem is, the one above was changed to handle negative
//numbers, and this one was not.  Talked to him and decided it's safe to remove this one.
/*
function getNumber( num )
{
var temp = '';
var temp1 = '';
for ( i = 0; i < num.length; i++ )
	{
	temp1 = num[ i ].match( /[0-9]|\./ );

	if ( temp1 != null )
		temp += temp1;
	}

return temp;
}
*/


function ShippingSounds() {
	soundManager.setSound('ScanPositive', '../sounds/scan-positive');
	soundManager.setSound('ScanSerial', '../sounds/scan-serial');
	soundManager.setSound('ScanError', '../sounds/scan-error');
}

//TKS 10.27.2017 No Ticket, writing function to tell certain controls that we
//are in the sales module so they react a certain way. Was checking for globalMenuID = 0
//but now you can access some controls from left menu and this broke it.
//this function will figure out if we are in sales dash module and within one of these menus
//TKS 03.29.2019 #144502 added sales manager dash menu to this
function InSalesDash() {
	if (readCookie('ssi_menumodule') == 12) {
		if (globalMenuID == 0 || globalMenuID == 586 || globalMenuID == 756 || globalMenuID == 805 || globalMenuID == 174 || globalMenuID == 175)
			return true
	}
	else//if on home screen and sales manager dash menu
	{
		if (readCookie('ssi_menumodule') == 8) {
			if (globalMenuID == 727)
				return true;
		}
	}
	//if not found above, return false
	return false;
}

//TKS 03.04.2019 #144502 I started the masonry dashboard for sales manager dash
//calculations are made for it all when it loads. So after I added the ability
//to collapse/expand the left menu, the control would calc, you would collapse the menu and 
//it would remain the same size. In order to use the new available space, we have to recall
//the masonry when they do this. SO I wrote this function to call not only for these
//situations but also because I see more places where this type of feature will be added
//and having a function that will build everything for you that is called in all places
//will be beneficial and prevent a bunch of duplicated code. if something changes, we can just change it here.
//main_container is the container the items move within, item_selector are each item/widget
//var MasonryDashComingFrom 	= '';
var globalWidgetArrange = false;
var MasonryDashFillGaps = false;
function setupMasonryDash(main_container,
	item_selector) {
	//this global var is turned on/off via a toggle on the interface
	//and tells the interface whether to allow drag sorting or not
	if (globalWidgetArrange) {
		var sorting = true;
		$(item_selector).each(
			function () {
				$(this).removeClass('masonry-item-draggable-disabled');
				$(this).addClass('masonry-item-draggable');
			}
		);
	}
	else {
		var sorting = false;
		$(item_selector).each(
			function () {
				$(this).removeClass('masonry-item-draggable');
				$(this).addClass('masonry-item-draggable-disabled');
			}
		);
	}

	var grid = new Muuri(main_container, {
		layout: {
			fillGaps: MasonryDashFillGaps
		},
		items: item_selector,
		layoutEasing: 'ease',
		dragEnabled: sorting
	});

	//TKS 07.18.2019 #153261 added data-section here so we can filter by section ( Sales, PDM )
	//or category of section ( Sales - Opportunities )
	var filterAttr = 'data-category';
	var filterSect = 'data-section';
	var filterColor = 'data-color';
	var filterField = document.getElementById('drp_filter');
	var filterField2 = document.getElementById('drp_filter2');
	var filterField2Value;
	var filterFieldValue;
	var filterFieldClass;
	filterField.addEventListener('change', filter);
	filterField2.addEventListener('change', filter2);

	//filters widgets by category/section
	function filter() {
		filterFieldValue = filterField.value;
		filterFieldClass = $('select[name="drp_filter"] :selected').attr('class');
		grid.filter(function (item) {
			var element = item.getElement();
			//TKS 07.18.2019 #153261 if class on the option holds a value then it means they selected
			//a Section and we filter by class from filter drop list to the data-section attribute
			//else we compare hte value of the drop list to the data-category attribute
			if (filterFieldClass == '')
				isFilterMatch = !filterFieldValue ? true : (element.getAttribute(filterAttr) || '') === filterFieldValue;
			else
				isFilterMatch = !filterFieldClass ? true : (element.getAttribute(filterSect) || '') === filterFieldClass;
			return isFilterMatch;
		});
	}
	//this is for filtering widgets by color
	function filter2() {
		filterField2Value = filterField2.value;
		grid.filter(function (item) {
			var element = item.getElement();
			isFilterMatch = !filterField2Value ? true : (element.getAttribute(filterColor) || '') === filterField2Value;
			return isFilterMatch;
		});
	}
	//on drag when released, serialize ( order ) our items
	grid.on('dragReleaseEnd', function (item) {
		serializeLayout(grid);
	});

	//this function handles building a string of our dashids in the new order
	//and then calling the save function
	function serializeLayout(grid) {
		var dashids = '';
		var itemElems = grid.getItems();
		$(itemElems).each(function (i, itemElem) {
			//build a pipe delimited string of our ids in the new order
			if (dashids == '')
				dashids = itemElem.getElement().getAttribute('id');
			else
				dashids = dashids + '|' + itemElem.getElement().getAttribute('id');
		});
		//SaveDashWidget() is located in common/js_cv_widget_list.js
		if (dashids != '')
			SaveDashWidget('', 0, 'sort', dashids);
	}
}

//TKS 11.10.2020 #142582 this function tries to figure out what the next available
//overlay would be so that the control you are actively calling does not load behind an overlay
//if no overlays are available, it will use and replace the top level region
function NextAvailOverlay() {
	//if you add more overlays beyond overlay4, add to this array
	//and increase the for loop counters from 3 below
	var overlay = [false, false, false, false];

	//loop through checking for what regions have data in the innerHTML
	for (var i = 0; i <= 3; i++) {
		if (i == 0)//video_overlay
		{
			if (document.getElementById('video_overlay').innerHTML != '')
				overlay[0] = true;
		}
		else {
			if (document.getElementById('overlay' + (i + 1)).innerHTML != '')
				overlay[i] = true;
		}
	}

	//if overlay4 is empty, step back one
	if (overlay[3] == false) {
		//if overlay 3 has something in it, use overlay4
		if (overlay[2] == true)
			return 'overlay4';
		//else step back one
		else {
			//if overlay2 has something in it, use overlay3
			if (overlay[1] == true)
				return 'overlay3';
			//else step back one
			else {
				//if video_overlay has something in it, use overlay2
				if (overlay[0] == true)
					return 'overlay2';
				//else use video_overlay
				else
					return 'video_overlay';
			}
		}
	}
	//overlay4 has something in it, replace it
	else
		return 'overlay4';
}

//TKS 11.10.2020 #142582 looks to see if you are closing an invoice in the overlay
//and sets back all the original variables. This was added because clicking the escape key
//closes overlays and this step was overlooked by me
function CheckForClosingInvoiceOverlay(region) {
	if (document.getElementById('hid_overlayinvoice')) {
		//parse out the | separator
		var temp = document.getElementById('hid_overlayinvoice').value.split('|');
		//if the region they are closing matches what our invoice is in, set our vars
		//we don't want to do this if they are closing some other control and still have the 
		//invoice open in the overlay
		if (region == temp[0]) {
			globalOverlayContactID = 0;
			globalOverlayInvoiceID = 0;
			invoice_status = temp[1];
			invoice_type = temp[2];
			globalInvoiceID = temp[3];
			document.getElementById('global_contactid').value = temp[4];
			get_cv_updatestatus(temp[4]);
		}
	}
}

//TKS 09.14.2023 stops propagation from a click event continuing
//to other object event listeners it may be inside of. Like a link 
//in a div with an onclick. Placing this in the link will prevent the onclick of 
//the div when you click the link
function StopProp(event) {
	event.stopPropagation();
}

//TKS 01.26.2024 #255122 to save paging limit by field
var comm_lizzy_save_paginglimit = new onConnect(false, false, call_lizzy_save_paginglimit);
function lizzy_save_paginglimit(value) {
	var path = 'lizzy_save_paginglimit.php?value=' + value;
	comm_lizzy_save_paginglimit.callfunc = call_lizzy_save_paginglimit;

	ajax_send(path, true, 'GET', null, comm_lizzy_save_paginglimit);
}


function call_lizzy_save_paginglimit() {
	if (comm_lizzy_save_paginglimit.response.substring(0, 5) != 'Error') {
	}
	else
		setError(comm_lizzy_save_paginglimit.response);
}


function scrollToId(id) {
	let x = document.getElementById(id);
	let height = 0;

	let head = document.getElementsByClassName('header_container')[0];
	if (head)
		height = head.offsetHeight + 10;
	else
		height = 135;

	if (x) {
		x.scrollIntoView();
		if (!(window.innerHeight + window.scrollY) >= document.body.offsetHeight)
			window.scrollBy(0, height * -1);
	} else
		return
}

function scrollToNthClassName(classname, n) {
	let x = document.getElementsByClassName(classname)[n];
	let height = 0;

	let head = document.getElementsByClassName('header_container')[0];
	if (head)
		height = head.offsetHeight + 10;
	else
		height = 135;

	if (x) {
		x.scrollIntoView();
		if (!(window.innerHeight + window.scrollY) >= document.body.offsetHeight)
			window.scrollBy(0, height * -1);
	} else
		return
}

// function to sort a table, n is the column number to sort on
// table needs to have an id of "sortTable"
// see Reports > Accounting General > Cash Drawer Till Report for example
// borrowed from w3schools
function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("sortTable");
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc";
	/* Make a loop that will continue until
		no switching has been done: */
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
			first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
				one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/* Check if the two rows should switch place,
				based on the direction, asc or desc: */
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
				and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/* If no switching has been done AND the direction is "asc",
				set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}
