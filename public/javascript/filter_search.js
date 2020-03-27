/* window.onload = function() {
    let filter = () => {
        // Element for input value
        let searchMark = document.getElementById('search-mark');
        // Add keyup event to track pressing keys
        searchMark.addEventListener('keyup', function() {
            // Entire div block with span inside (which has innerHTML)
            let filterItems = document.querySelectorAll('.item-file-mark');
            // Filter for inserting values
            let filterCases = searchMark.value.toLowerCase();
            // Check each item in filterItems
            filterItems.forEach(item => {
                let childItem = item.children[0].innerHTML;
                // Delete all unnecessary tabs if exists
                childItem = childItem.replace(/\s/g, '');
                // Check if values the same
                if (childItem.toLowerCase().indexOf(filterCases) > -1) {
                    // Take data attribute of item
                    let itemData = item.getAttribute('data-item');
                    // Take all elements with the same data-item attr
                    let itemRow = document.querySelectorAll(`[data-item='${itemData}']`);
                    // Change style for each element
                    itemRow.forEach(elem => {
                        elem.style.display = '';
                    })
                    
                } else {
                    // Opposite actions
                    let itemData = item.getAttribute('data-item');
                    let itemRow = document.querySelectorAll(`[data-item='${itemData}']`);
                    itemRow.forEach(elem => {
                        elem.style.display = 'none';
                    })
                }
            });

        });
    }
    
    filter();
} */

window.onload = function() {
    let filter = () => {
        // Search input for each field (mark. subject, place, date)
        let searchMark = document.getElementById('search-mark');
        let searchSubject = document.getElementById('search-subject');
        let searchPlace = document.getElementById('search-place');
        let searchDate = document.getElementById('search-date');

        // All items with data-item attribute
        let dataItems = document.querySelectorAll('[data-item]');
        console.log('just row items: ', dataItems);

        // Array for storing elements in the order (1st elem =  all elements with [data-item = '1'] etc...)
        let itemsArray = [];
        // Assign each element to array
        dataItems.forEach(item => {
            let attr = item.getAttribute('data-item');
            if (itemsArray[attr] == undefined)
                itemsArray[attr] = [];
            itemsArray[attr].push(item);
        });
        console.log('array: ', itemsArray);
        console.log('test elem: ', itemsArray[0][1]);

        // Add event 'keyup' for search mark
        searchMark.addEventListener('keyup', function() {
            console.log('key is pressed');
            searchHandler('.item-file-mark', itemsArray);
        });

        // Add event 'keyup' for search subject
        searchSubject.addEventListener('keyup', function() {
            console.log('key is pressed');
            searchHandler('.item-file-subject', itemsArray);
        });

        // Add event 'keyup' for search place
        searchPlace.addEventListener('keyup', function() {
            console.log('key is pressed');
            searchHandler('.item-file-place', itemsArray);
        });

        // Add event 'keyup' for search date
        searchDate.addEventListener('keyup', function() {
            console.log('key is pressed');
            searchHandler('.item-file-date', itemsArray);
        });
    };

    filter();

    // Function to handle search
    let searchHandler = (itemClass, itemsArray) => {
        console.log('itemsArray from function:', itemsArray);
        let items = document.querySelectorAll(itemClass);
        console.log('items from function: ', items);
        let newItem;
        
        // Create new array with the same elements from different data-item
        let sortItems = itemsArray.map(el => {
            console.log('element: ', el);
            for (const elem of el) {
                if(elem.matches(itemClass))
                    newItem = elem;
            }
            return newItem;
        });
        
        console.log('Array with elements from different data-items: ', sortItems);

    };
}