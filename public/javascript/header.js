const modalHandler = (actionId) => {

    let modalWindow = document.getElementById('modal');
    let actionContent = document.getElementsByClassName('actions__content');
    let closeModal = document.getElementsByClassName("modal__close")[0];
    let linkModal = document.getElementsByClassName("actions__link");

    // Close the modal window when button (span) is pressed
    closeModal.onclick = () => {
        document.getElementById(actionId).style.display = "none";
        modalWindow.style.display = "none";
        window.history.replaceState("", document.title, window.location.pathname);
    }

    // Close the modal window when user clicks outside the modal window
    window.onclick = event => {
        if (event.target == modalWindow) {
            document.getElementById(actionId).style.display = "none";
            modalWindow.style.display = "none";
            window.history.replaceState("", document.title, window.location.pathname);
        }
    }

    // Disable all modal content tabs
    for (let item of actionContent){
        item.style.display = "none";
    }

    // Show the modal window
    modalWindow.style.display = "flex";
    modalWindow.style.flexDirection = "column";

    // Display content for modal window
    switch(actionId) {
        case "login":
            document.getElementById(actionId).style.display = "flex";
            document.getElementById(actionId).style.flexDirection = "column";
            linkModal.item(0).classList.add("actions__link-active");
            if (linkModal.item(1).classList.contains("actions__link-active"))
                linkModal.item(1).classList.remove("actions__link-active");
            break;
        case "register":
            document.getElementById(actionId).style.display = "flex";
            document.getElementById(actionId).style.flexDirection = "column";
            linkModal.item(1).classList.add("actions__link-active");
            if (linkModal.item(0).classList.contains("actions__link-active"))
                linkModal.item(0).classList.remove("actions__link-active");
            break;
    }
}