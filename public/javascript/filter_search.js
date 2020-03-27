window.onload = function() {
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
}