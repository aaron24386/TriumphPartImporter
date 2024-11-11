const searchRows = document.querySelectorAll('[title^="Search part"]');
const quantityRows = document.querySelectorAll('[id^="txtQTY"]');

let partNumbersAndQuantities = {};
if (searchRows.length > 0 && quantityRows.length > 0) {
    const rowCount = searchRows.length;

    if (rowCount > 0) {

        for (var i = 0; i < rowCount; i++) {
            const quantity = parseInt(quantityRows[i].value);
            partNumbersAndQuantities[i] = {
                partNumber: searchRows[i].text,
                quantity: quantity,
            };
        }
    }
}

/**
 * Saving info that is pulled from this to the extension
 * Possibly add ability for user to see what was exported from triumph online
 * Cart name would be a good way to distinguish in case they want to export multiple at a time 
 */

// console.log(partNumbersAndQuantities);