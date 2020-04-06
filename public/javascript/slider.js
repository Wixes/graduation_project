window.onload = function() {
    let slides = document.getElementsByClassName('slider__item');
    let slideActive = 0;
    let buttons = document.getElementsByClassName('slider__button');

    // Make visible 1st item and disable 'previous' button
    slides[slideActive].classList.add('slider__item--isVisible');
    buttons[0].classList.add('slider__button--disabled');

    // Change slide
    nextSlide = n => {
        // Disable activated slide
        slides[slideActive].classList.toggle('slider__item--isVisible');
        slideActive += n;
        // If next slide will be 1st, then disable 'previous' button 
        if (slideActive == 0) buttons[0].classList.toggle('slider__button--disabled');
        // If next slide will be last, then disable 'next' button
        if (slideActive == 2) buttons[1].classList.toggle('slider__button--disabled');
        // Some stupid code to handle buttons for 1st slide
        if (slideActive == 1) {
            if (buttons[0].classList.contains('slider__button--disabled'))
                buttons[0].classList.toggle('slider__button--disabled');
            if (buttons[1].classList.contains('slider__button--disabled'))
                buttons[1].classList.toggle('slider__button--disabled');
        }
        // Make the next slide visible
        slides[slideActive].classList.toggle('slider__item--isVisible');
    }
}