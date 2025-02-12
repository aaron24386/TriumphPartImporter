document.addEventListener("DOMContentLoaded", (event) => {
    let basketList = {};
    chrome.storage.local.get().then((baskets) => {
        console.log("Baskets: ", baskets);
        basketList = baskets;
    });

    const basketListDiv = document.getElementById("basketList");

    document.getElementById("viewSavedBasketsBtn").addEventListener("click", () => {
      populateBasketList();
    });

    const populateBasketList = () => {
      let basketListElement = `<ul>`;
      for (let i in basketList) {
        basketListElement += `<li>${basketList[i].basketName}</li>`;
      }
      basketListElement += `</ul>`;

      basketListDiv.outerHTML = basketListElement;
    }

    const deleteBasket = (basketName) => {
      chrome.storage.local.remove(basketName);
    }
});
