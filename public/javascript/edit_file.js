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

    // Properties for item name w/ label for it
    let itemName = document.createElement('input');
    itemName.value = arr.name || '';
    itemName.name = 'name';
    itemName.placeholder = 'Укажите имя файла';
    // Label
    let labelName = document.createElement('label');
    labelName.innerHTML = 'Имя файла: ';
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
    // Label
    let labelKind = document.createElement('label');
    labelKind.innerHTML = 'Тип награды: ';
    labelKind.appendChild(itemKind);
    form.appendChild(labelKind);

    // Properties for item mark w/ label for it
    let itemMark = document.createElement('input');
    itemMark.value = arr.mark || '';
    itemMark.placeholder = 'Оценка';
    itemMark.name = 'mark';
    // Label
    let labelMark = document.createElement('label');
    labelMark.innerHTML = 'Оценка: ';
    labelMark.appendChild(itemMark);
    form.appendChild(labelMark);

    // Properties for item subject w/ label for it
    let itemSubject = document.createElement('input');
    itemSubject.value = arr.subject || '';
    itemSubject.placeholder = 'Укажите тему выступления';
    itemSubject.name = 'subject';
    // Label
    let labelSubject = document.createElement('label');
    labelSubject.innerHTML = 'Тема выступления: ';
    labelSubject.appendChild(itemSubject);
    form.appendChild(labelSubject);

    // Properties for item place w/ label for it
    let itemPlace = document.createElement('input');
    itemPlace.value = arr.place || '';
    itemPlace.placeholder = 'Укажите место, где проходило мероприятие';
    itemPlace.name = 'place';
    // Label
    let labelPlace = document.createElement('label');
    labelPlace.innerHTML = 'Место мероприятия: ';
    labelPlace.appendChild(itemPlace);
    form.appendChild(labelPlace);

    // Properties for item date w/ label for it
    let itemDate = document.createElement('input');
    itemDate.value = arr.date || '';
    itemDate.placeholder = 'Укажите дату участия в мероприятии';
    itemDate.name = 'date';
    // Label
    let labelDate = document.createElement('label');
    labelDate.innerHTML = 'Дата участия: ';
    labelDate.appendChild(itemDate);
    form.appendChild(labelDate);

    // Properties for submit button w/ label for it
    let submitModal = document.createElement('button');
    submitModal.classList.add('edit-file-submit');
    submitModal.innerHTML = 'Сохранить изменения';
    submitModal.value = 'submit';
    submitModal.onclick = function() {
        this.form.submit();
    }
    form.appendChild(submitModal);

    // Close modal window element
    let closeSpan = document.createElement('span');
    closeSpan.innerHTML = '&times;';
    closeSpan.classList.add('modal-close');
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
    modalWindowWrapper.classList.add('modal-wrapper');
    modalWindowWrapper.appendChild(closeSpan);
    modalWindowWrapper.appendChild(form);
    // Add wrapper to the modal window
    modalWindow.appendChild(modalWindowWrapper);

    // Add modal window to the table
    document.getElementById('files').appendChild(modalWindow);

}