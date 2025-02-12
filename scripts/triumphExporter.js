/**
 * Export Button Logic: want to update this to add the button to where the basket name
 * is
 */
const buttonLocationElement = document.querySelector(".buttons")
if (buttonLocationElement) {
    const exportBasketButton = document.createElement("input");
    exportBasketButton.value = `Export Basket`;
    exportBasketButton.type = "button";
    exportBasketButton.name = "exportBasketButton";
    exportBasketButton.onclick = collectBasketInformation;

    buttonLocationElement.insertAdjacentElement("beforebegin", exportBasketButton)
}

/**
 * TODO: Check if this element was added, possible just move to an element that always exists
 */

function collectBasketInformation () {
    const basketId = document.querySelector("#ctl00_ContentPlaceHolder1_txtBasketID")?.textContent;
    const basketName = document.querySelector("#ctl00_ContentPlaceHolder1_txtBasketName")?.value;
    const basketInformation = {};

    if (!basketName || !basketId) {
        alert('Basket name is required to export');
        return;
    }

    const searchRows = document.querySelectorAll('[title^="Search part"]');
    const quantityRows = document.querySelectorAll('[id^="txtQTY"]');
    
    if (searchRows.length > 0 && quantityRows.length > 0) {
        const rowCount = searchRows.length;
    
        if (rowCount > 0) {
            const partInformation = {};
            for (var i = 0; i < rowCount; i++) {
                const quantity = parseInt(quantityRows[i].value);
                partInformation[i] = {
                    partNumber: searchRows[i].text,
                    quantity,
                };
            }

            basketInformation[basketId] = {
                basketId,
                basketName,
                partInformation,
            }

            chrome.storage.local.set(basketInformation).then(() => {
                alert(`${basketName} saved to extension`);
            });
        }
    }
    
    /**
     * Saving info that is pulled from this to the extension
     * Possibly add ability for user to see what was exported from triumph online
     * Cart name would be a good way to distinguish in case they want to export multiple at a time 
     */
}