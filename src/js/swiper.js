import Swiper from 'swiper';

var swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 'auto',
    breakpointsInverse: true,
    breakpoints: {
        // when window width is >= 1500px
        1500: {
            slidesPerView: 4,
            spaceBetween: 7
        },
        // when window width is >= 1100px
        1140: {
            slidesPerView: 3,
            spaceBetween: 7
        },
        // when window width is >= 880px
        880: {
            slidesPerView: 2,
            spaceBetween: 7
        },
        0: {
            slidesPerView: 1,
            spaceBetween: 7
        },
    },
    spaceBetween: 9,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    simulateTouch: false,
    autoplay: {
        delay: 5000,
    }, 
});

let slider = document.getElementsByClassName('swiper-container')
slider[0].addEventListener("mouseover", () => swiper.autoplay.stop());
slider[0].addEventListener("mouseout", () => swiper.autoplay.start());

