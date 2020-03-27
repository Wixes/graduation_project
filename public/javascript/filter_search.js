window.onload = function() {
    let filter = () => {
        // Search input for each field (mark. subject, place, date)
        let searchKind = document.getElementById('search-kind');
        let searchMark = document.getElementById('search-mark');
        let searchSubject = document.getElementById('search-subject');
        let searchPlace = document.getElementById('search-place');
        let searchDate = document.getElementById('search-date');

        // All items with data-item attribute
        let dataItems = document.querySelectorAll('[data-item]');

        // Array for storing elements in the order (1st elem =  all elements with [data-item = '1'] etc...)
        let itemsArray = [];
        // Assign each element to array
        dataItems.forEach(item => {
            let attr = item.getAttribute('data-item');
            if (itemsArray[attr] == undefined)
                itemsArray[attr] = [];
            itemsArray[attr].push(item);
        });

        // Add event 'keyup' for search kind
        searchKind.addEventListener('keyup', function() {
            console.log('key is pressed');
            let itemParam = searchKind.value.toLowerCase();
            searchHandler('.item-file-kind', itemsArray, itemParam);
        })

        // Add event 'keyup' for search mark
        searchMark.addEventListener('keyup', function() {
            console.log('key is pressed');
            let itemParam = searchMark.value.toLowerCase();
            searchHandler('.item-file-mark', itemsArray, itemParam);
        });

        // Add event 'keyup' for search subject
        searchSubject.addEventListener('keyup', function() {
            console.log('key is pressed');
            let itemParam = searchSubject.value.toLowerCase();
            searchHandler('.item-file-subject', itemsArray, itemParam);
        });

        // Add event 'keyup' for search place
        searchPlace.addEventListener('keyup', function() {
            console.log('key is pressed');
            let itemParam = searchPlace.value.toLowerCase();
            searchHandler('.item-file-place', itemsArray, itemParam);
        });

        // Add event 'keyup' for search date
        searchDate.addEventListener('keyup', function() {
            console.log('key is pressed');
            let itemParam = searchDate.value.toLowerCase();
            searchHandler('.item-file-date', itemsArray, itemParam);
        });
    };

    filter();

    // Function to handle search
    let searchHandler = (itemClass, itemsArray, key) => {

        // Create new array with the same elements from different data-item
        let sortItems = itemsArray.map(el => {
            let newItem;
            for (const elem of el) {
                if(elem.matches(itemClass))
                    newItem = elem;
            }
            return newItem;
        });
        
        // Check if input value is equivalent to one of the elements
        sortItems.forEach(elem => {
            // Take value of element (remember, we have span inside main div,
            // that's why we use children[0])
            let childItem = elem.children[0].innerHTML;
            if(childItem.toLowerCase().indexOf(key) > -1) {
                let itemData = elem.getAttribute('data-item');
                itemsArray[itemData].forEach(el => {
                    el.style.display = '';
                });
            } else {
                let itemData = elem.getAttribute('data-item');
                itemsArray[itemData].forEach(el => {
                    el.style.display = 'none';
                });
            }
        });

    };

}