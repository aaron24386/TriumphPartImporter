/*
    1. Go to invoice at the top
    2. The click on Locate Service Ticket
    3. Find a service ticket for Navarro (currently using invoice #: 16857)
    4. Look for a green button that says Add Job press and name thing Test (also make sure this is an estimate is flagged)
    5. Look for green + that says add parts

*/

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
function addParts () {
    const partNumInput = document.getElementById('txt_partnumbertoadd');
    partNumInput.value = partsAndQuantities[0].partNumber;
    get_cv_itemslist('Invoice', 'reg_itemlocate', 0, 2, 'txt_partnumbertoadd' );

    const itemSelectorLink = document.querySelectorAll('[href^="Javascript:globalCallNavSave=false; InvItemSelect"]');
    if (itemSelectorLink.length > 0) {
        const splitLink = itemSelectorLink[0].href.split(', ');

        if (splitLink.length > 0) {
            const itemId = splitLink[1];

            InvItemSelect('reg_itemlocate', itemId, false, false, itemId);

            // TODO: update the quantity field after this

            // TODO: select the item add or
            // TODO: if the end of the loop select add and close
        }
    }
}