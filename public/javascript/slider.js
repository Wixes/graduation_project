let changeSlide = n => {
    let slides = document.querySelectorAll('.slider__item');
    let buttons = document.getElementsByClassName('slider__button');

    let nextSlide = (n) => {
        console.log('slides: ', slides);
        console.log('slides length: ', slides.length);
        let activeItem = 0;
        slides.forEach(el => {
            console.log('element: ', el);
            if (el.classList.contains('slider__item--isVisible')){
                activeItem = el.getAttribute('data-image');
                el.classList.toggle('slider__item--isVisible');
            }
        });
        if (slides.item(activeItem+n)) {
            slides.item(activeItem+n).classList.toggle('slider__item--isVisible');
            console.log('next item');
        }
        
        
    }
    nextSlide(n);
}