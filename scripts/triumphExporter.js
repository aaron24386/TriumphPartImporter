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

// console.log(partNumbersAndQuantities);