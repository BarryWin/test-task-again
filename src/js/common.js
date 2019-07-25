let toggle = document.getElementsByClassName("lineTwo__burger");
let menu = document.getElementsByClassName('header__menu');

//menuSlideDown
toggle[0].addEventListener('click', function () {
        menu[0].classList.toggle('header__menu_addHeight');
        setTimeout( () => {
            (menu[0].style.visibility === "visible") ?
                setTimeout(() => menu[0].style.visibility = "hidden", 250)
                :menu[0].style.visibility = "visible";}, 50);
});
window.onresize = () => {
    if (window.innerWidth >= 880){
        menu[0].style.visibility = "visible";
    }else if(window.innerWidth <= 880 && menu[0].className !== 'header__menu_addHeight'){
        menu[0].classList.remove('header__menu_addHeight');
        menu[0].style.visibility = "hidden";
    }
};
