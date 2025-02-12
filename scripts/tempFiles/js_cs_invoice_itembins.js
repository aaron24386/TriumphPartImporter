var comm_cv_invoice_itembins = new onConnect(false, false, call_cv_invoice_itembins);

function get_cv_invoice_itembins(placement, itemid, alllocations, otherstores) {
    //TKS 9-15-10 #1636 this var gets passed in as 'all' if they click on the link to view other locations
    if (alllocations == undefined)
        alllocations = '';
    //10.12.2011 jss - if allx stores works like alllocations except it deals with multistore
    if (otherstores == undefined)
        otherstores = '';

    var path = 'invoicing/newinvoice/cv_invoice_itembins.php?placement=' + placement + '&alllocations=' + alllocations + '&itemid=' + itemid + '&invoiceid=' + globalInvoiceID;

    //11.27.2017 tam - 113263 adding jobid to this call
    try { var jobid = document.getElementById('drp_jobs').value; }
    catch (err) { var jobid = 0; }

    path = path + '&jobid=' + jobid;

    //TKS 05.22.2014 #52713 adding contactid now that we link bins to contacts, need this 
    path = path + '&contactid=' + document.getElementById('global_contactid').value;

    //12.22.2011 jss -
    path = path + '&invoice_type=' + invoice_type;

    //10.12.2011 jss - multistore
    path = path + '&otherstores=' + otherstores;

    comm_cv_invoice_itembins.placement = placement;
    comm_cv_invoice_itembins.callfunc = call_cv_invoice_itembins;

    ajax_send(path, true, 'GET', null, comm_cv_invoice_itembins);
}


function call_cv_invoice_itembins() {
    if (comm_cv_invoice_itembins.response.substring(0, 5) != 'Error') {
        document.getElementById(comm_cv_invoice_itembins.placement).innerHTML = comm_cv_invoice_itembins.response;
        //TKS 08.21.2015 #72329 key navigation
        //####################################
        //####################################
        //####################################
        //this will hold the index of qty for an item if on invoice
        addItemBinQtyIndex = -1;//declared in js_master.js
        //will hold the collection of bin qtys
        var InvoiceBinQty = $(".invoice_qty_fornav");

        if (InvoiceBinQty.length > 0) {
            InvoiceBinQty[0].focus();
            //now we bind the tab key, enter, escape  and +/- keys
            //TKS 02.05.2020 #163841 changed to on() rather than keydown() as keydown() depreciated in latest jQuery
            $(document).on("keydown", function (e) {
                //make sure e is the correct browser supported event
                //some browsers do not support keyCode and jQuery uses which
                e = e || window.event;
                //console.log( e.which ); 
                switch (e.which || e.keyCode) {
                    //plus and minus keys in top row 
                    case 61:// plus
                        var temp = document.activeElement.id;
                        temp = temp.substring(0, 12);
                        //this preventDefault works globally on this field once active so we need to be sure we 
                        //only apply this if the focus is within one of our bin qty fields otherwise they can't type + or - anywhere in Lizzy
                        if (temp == 'txt_qtytoadd')
                            e.preventDefault();//prevent typing + in text field

                        if (InvoiceBinQty[addItemBinQtyIndex].value == '')
                            InvoiceBinQty[addItemBinQtyIndex].value = 0;

                        InvoiceBinQty[addItemBinQtyIndex].value = parseInt(InvoiceBinQty[addItemBinQtyIndex].value) + 1;
                        break;
                    case 173://minus
                        var temp = document.activeElement.id;
                        temp = temp.substring(0, 12);
                        //this preventDefault works globally on this field once active so we need to be sure we 
                        //only apply this if the focus is within one of our bin qty fields otherwise they can't type + or - anywhere in Lizzy
                        if (temp == 'txt_qtytoadd')
                            e.preventDefault();//prevent zoom

                        if (InvoiceBinQty[addItemBinQtyIndex].value == '')
                            InvoiceBinQty[addItemBinQtyIndex].value = 0;

                        InvoiceBinQty[addItemBinQtyIndex].value = parseInt(InvoiceBinQty[addItemBinQtyIndex].value) - 1;
                        break;
                    //plus and minus on numeric keypad
                    case 107:// plus
                        var temp = document.activeElement.id;
                        temp = temp.substring(0, 12);
                        //this preventDefault works globally on this field once active so we need to be sure we 
                        //only apply this if the focus is within one of our bin qty fields otherwise they can't type + or - anywhere in Lizzy
                        if (temp == 'txt_qtytoadd')
                            e.preventDefault();//prevent zoom 

                        if (InvoiceBinQty[addItemBinQtyIndex].value == '')
                            InvoiceBinQty[addItemBinQtyIndex].value = 0;

                        InvoiceBinQty[addItemBinQtyIndex].value = parseInt(InvoiceBinQty[addItemBinQtyIndex].value) + 1;
                        break;
                    case 109://minus
                        var temp = document.activeElement.id;
                        temp = temp.substring(0, 12);
                        //this preventDefault works globally on this field once active so we need to be sure we 
                        //only apply this if the focus is within one of our bin qty fields otherwise they can't type + or - anywhere in Lizzy
                        if (temp == 'txt_qtytoadd')
                            e.preventDefault();//prevent zoom

                        if (InvoiceBinQty[addItemBinQtyIndex].value == '')
                            InvoiceBinQty[addItemBinQtyIndex].value = 0;

                        InvoiceBinQty[addItemBinQtyIndex].value = parseInt(InvoiceBinQty[addItemBinQtyIndex].value) - 1;
                        break;

                    case 9://tab
                        //our index is zero based and the count of the collection is not so subtract 1
                        //from our count and if we reached the end of the bins, reset our index and jump to the price field
                        if (!(addItemBinQtyIndex <= (InvoiceBinQty.length - 1))) {
                            addItemBinQtyIndex = 0;
                            try { document.getElementById('txt_pricetoadd').focus(); } catch (err) { }
                        }
                        break;
                    case 13://enter key
                        if (addItemBinQtyIndex >= 0)
                            save_cv_invoice_itemlocate('frm_invoice_itemlocate', 1, 0, false, 'open');
                        break;
                    case 27://escape key
                        close_overlay('video_overlay');
                        //08.26.2015 TKS make sure we unbind the enter key after they add the part
                        globalCallNavSave = false;
                        break;
                    default:
                        return; // allow other keys to be ignored
                }
            });
        }
        //####################################
        //####################################
        //####################################
    }
    else {
        setError(comm_cv_invoice_itembins.response);
    }
}

function js_cv_invoice_itembins() {
    return true;
}


function add_invoice_itembins(binid, increment) {
    //12.21.2011 jss - if coming from a junkyard purchase invoice we need to work in reverse
    //12.22.2011 jss - hmm, there might be another way...
    //if ( invoice_type == 15 )
    //	increment = increment * -1;
    document.getElementById('txt_qtytoadd' + binid).value = Number(document.getElementById('txt_qtytoadd' + binid).value) + increment;
}
