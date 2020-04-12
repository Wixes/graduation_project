editFile = (arr) => {
    console.log(arr);

    // Remove element if it's exist
    let isModalExist = document.getElementById('edit-file');
    if (isModalExist != undefined)
        isModalExist.remove();    

    // Function to flexible add inline styles
    function setStyle(object, propertyObject) {
        for (let property in propertyObject)
            object.style[property] = propertyObject[property];
    }

    // Create modal window
    let modalWindow = document.createElement('div');
    modalWindow.setAttribute('id', 'edit-file');

    // Create form and elements for it
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = `/profile/edit/file/${arr._id}`;
    form.classList.add('edit-file__form');

    // Properties for item name w/ label for it
    let itemName = document.createElement('input');
    itemName.value = arr.name || '';
    itemName.name = 'name';
    itemName.placeholder = 'Укажите имя файла';
    itemName.classList.add('edit-file__input');
    // Text for item name w/ label for it
    let textName = document.createElement('p');
    textName.innerHTML = 'Имя файла:';
    textName.classList.add('edit-file__text');
    // Label
    let labelName = document.createElement('label');
    labelName.appendChild(textName);
    labelName.appendChild(itemName);
    form.appendChild(labelName);

    // Properties for item kind w/ label for it
    let itemKind = document.createElement('select');
    let optionsItemKind = ['Грамота', 'Благодарственное письмо', 'Сертификат'];
    optionsItemKind.forEach(function(element, key) {
        if (element === arr.kind){
            itemKind[key] = new Option(element, key, true);
        }
        itemKind[key] = new Option(element, key);
    });
    itemKind.name = 'kind';
    itemKind.classList.add('edit-file__select');
    // Text for item kind w/ label for it
    let textKind = document.createElement('p');
    textKind.innerHTML = 'Тип награды:';
    textKind.classList.add('edit-file__text');
    // Label
    let labelKind = document.createElement('label');
    labelKind.appendChild(textKind);
    labelKind.appendChild(itemKind);
    form.appendChild(labelKind);

    // Properties for item mark w/ label for it
    let itemMark = document.createElement('input');
    itemMark.value = arr.mark || '';
    itemMark.placeholder = 'Оценка';
    itemMark.classList.add('edit-file__input');
    itemMark.name = 'mark';
    // Text for item mark w/ label for it
    let textMark = document.createElement('p');
    textMark.innerHTML = 'Оценка:';
    textMark.classList.add('edit-file__text');
    // Label
    let labelMark = document.createElement('label');
    labelMark.appendChild(textMark);
    labelMark.appendChild(itemMark);
    form.appendChild(labelMark);

    // Properties for item subject w/ label for it
    let itemSubject = document.createElement('input');
    itemSubject.value = arr.subject || '';
    itemSubject.placeholder = 'Укажите тему выступления';
    itemSubject.classList.add('edit-file__input');
    itemSubject.name = 'subject';
    // Text for item subject w/ label for it
    let textSubject = document.createElement('p');
    textSubject.innerHTML = 'Тема выступления:';
    textSubject.classList.add('edit-file__text');
    // Label
    let labelSubject = document.createElement('label');
    labelSubject.appendChild(textSubject);
    labelSubject.appendChild(itemSubject);
    form.appendChild(labelSubject);

    // Properties for item place w/ label for it
    let itemPlace = document.createElement('input');
    itemPlace.value = arr.place || '';
    itemPlace.placeholder = 'Укажите место, где проходило мероприятие';
    itemPlace.classList.add('edit-file__input');
    itemPlace.name = 'place';
    // Text for item subject w/ label for it
    let textPlace = document.createElement('p');
    textPlace.innerHTML = 'Место мероприятия:';
    textPlace.classList.add('edit-file__text');
    // Label
    let labelPlace = document.createElement('label');
    labelPlace.appendChild(textPlace);
    labelPlace.appendChild(itemPlace);
    form.appendChild(labelPlace);

    // Properties for item date w/ label for it
    let itemDate = document.createElement('input');
    itemDate.value = arr.date || '';
    itemDate.placeholder = 'Укажите дату участия в мероприятии';
    itemDate.classList.add('edit-file__input');
    itemDate.name = 'date';
    // Text for item subject w/ label for it
    let textDate = document.createElement('p');
    textDate.innerHTML = 'Дата участия:';
    textDate.classList.add('edit-file__text');
    // Label
    let labelDate = document.createElement('label');
    labelDate.appendChild(textDate);
    labelDate.appendChild(itemDate);
    form.appendChild(labelDate);

    // Properties for submit button w/ label for it
    let submitModal = document.createElement('button');
    submitModal.classList.add('edit-file__submit');
    submitModal.innerHTML = 'Сохранить';
    submitModal.value = 'submit';
    submitModal.onclick = function() {
        this.form.submit();
    }
    form.appendChild(submitModal);

    // Close modal window element
    let closeSpan = document.createElement('span');
    closeSpan.innerHTML = '&times;';
    closeSpan.classList.add('edit-file__close');
    // Close modal window and return back URL
    closeSpan.onclick = function() {
        modalWindow.remove();
        window.history.replaceState("", document.title, window.location.pathname);
    };

    // Close modal window when user clicks outside the modal workspace
    window.onclick = event => {
        if (event.target == modalWindow) {
            modalWindow.remove();
            window.history.replaceState("", document.title, window.location.pathname);
        }
    }

    // Properties for modal window wrapper
    let modalWindowWrapper = document.createElement('div');
    modalWindowWrapper.classList.add('edit-file__wrapper');
    modalWindowWrapper.appendChild(closeSpan);
    modalWindowWrapper.appendChild(form);
    // Add wrapper to the modal window
    modalWindow.appendChild(modalWindowWrapper);

    // Add modal window to the table
    document.getElementById('files').appendChild(modalWindow);

}