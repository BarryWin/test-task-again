import goods from './goods.json'


class ServiceProducts {
    constructor(containerProducts, productsCatalog, basketWrapper) {
        this.sliderContainer = document.querySelector(containerProducts);
        this.basketContainer = document.querySelector(basketWrapper);
        this.goodsItems = productsCatalog;
        this.productsNumber = document.querySelector('.basketPopup__productsCount');
        this.counter = 0;
        this.totalCost = document.querySelector('.basketPopup__price_cBlue');
        this.cost = 0;
        this.productCount = document.querySelector('.basketPopup__productInputAmount')
        this.init();
    }

    init() {
        this.create();
    }

    create() {
        let basketBtn = document.querySelector('.lineTwo__basket');
        let basketPopup = document.querySelector('.basketPopup');
        let basketPopupClose = document.querySelector('.basketPopup__close');
        basketBtn.addEventListener("click", () => basketPopup.style.display = "block");
        basketPopupClose.addEventListener("click", () => basketPopup.style.display = "none");

        // console.log(this.goodsItems[0].id)
        this.goodsItems.forEach((item) => {
            let slideWrapper = document.createElement('div');
            slideWrapper.className += 'swiper-slide popularGoods__item';

            let slide = `<div class="popularGoods__upperSide">
                                <img src=${item.image} alt='item' class="popularGoods__img">
                            </div>
                            <div class="popularGoods__downSide">            
                                <h4 class="popularGoods__title"> ${item.name} </h4>
                                <div class="popularGoods__wrapperPrice">
                                    <div class="popularGoods__price">
                                        <span class="popularGoods__nowPrice"> ${item.price} </span
                                    </div>
                                    <div class="popularGoods__toBasket">
                                        <span class="popularGoods__compareBtn"></span>
                                        <button class="popularGoods__toBasketBtn">в корзину</button>
                                    </div>
                                </div>
                            </div>`;
            slideWrapper.innerHTML = slide;

            let toBasketBtn = slideWrapper.querySelector('.popularGoods__toBasketBtn');

            toBasketBtn.addEventListener('click', () => {
                this.putProduct(item.id, item, toBasketBtn);
            });

            this.setOnLoad(item, toBasketBtn);



            this.sliderContainer.appendChild(slideWrapper);

        });

    }

    putProduct(id, item, toBasketBtn) {

        let productTitle = document.querySelectorAll('.basketPopup__productTitle');
        // console.log(productTitle.innerHTML)
        if (!localStorage.getItem(id)) {
            item.count = 1;
            localStorage.setItem(id, JSON.stringify(item));
            toBasketBtn.classList.add('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзине';
            this.addToBasket(item, toBasketBtn);
            // console.log(this.basketContainer.querySelector('.basketPopup__productInputAmount').value); //need to change the counter system
            this.cost += parseInt(item.price) * item.count;
            this.totalCost.innerText = `${this.cost} руб.`;
            this.productsAmount(item);
        } else {
            localStorage.removeItem(id);
            toBasketBtn.classList.remove('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзину';
            productTitle.forEach((title) => {
                if (title.innerHTML == item.name) {
                    this.basketContainer.removeChild(title.parentNode);
                    // console.log(title.innerHTML);
                }
            });
            this.cost -= parseInt(item.price) * item.count;
            this.totalCost.innerText = `${this.cost} руб.`;
            this.counter -= parseInt(item.count);
            this.productsNumber.innerHTML = this.counter;
        }

    }

    setOnLoad(item, toBasketBtn) {

        if (localStorage.getItem(item.id)) {
            item.count = JSON.parse(localStorage.getItem(item.id))['count'];
            toBasketBtn.classList.add('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзине';
            this.addToBasket(item, toBasketBtn);
            // this.productCount.value = parseInt(item.count);
            this.productsAmount(item);
            this.cost += parseInt(item.price) * item.count;
            this.totalCost.innerText = `${this.cost} руб.`;
        } else {
            toBasketBtn.classList.remove('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзину';
        }

    }

    addToBasket(item, toBasketBtn) {

        let productWrapper = document.createElement('div');
        productWrapper.classList.add("basketPopup__product");
        let product = ` <img class="basketPopup__productImg" src="${item.image}">
                        <h4 class="basketPopup__productTitle">${item.name}</h4>
                        <p class="basketPopupt__priceContainer">
                            <span class="basketPopup__text">Цена:</span>
                            <span class="basketPopup__price">${item.price}</span>
                        </p>
                        <form class="basketPopup__formBuy" action="#">
                            <label class="basketPopup__productTextAmount">Количество:
                                <input class="basketPopup__productInputAmount" type="number" min="1" value="${item.count}">
                            </label>
                            <button class="basketPopup__productRemove" type="button">Удалить</button>
                        </form>`
        productWrapper.innerHTML = product;

        let productRemove = productWrapper.querySelector('.basketPopup__productRemove');


        productRemove.addEventListener('click', () => {
            this.putProduct(item.id, item, toBasketBtn);
        });

        let inputAmount = productWrapper.querySelector('.basketPopup__productInputAmount');
        this.changeAmount(item, inputAmount);

        this.basketContainer.appendChild(productWrapper);

    }

    productsAmount(item) {

        if (item.count) {
            this.counter += parseInt(item.count);
            this.productsNumber.innerHTML = this.counter;
        }

    };

    changeAmount(item, inputAmount) {

        if (localStorage.getItem(item.id)) {
        inputAmount.addEventListener("change", () => {

            let retItem = JSON.parse(localStorage.getItem(item.id));
            localStorage.removeItem(item.id);
            console.log(retItem);

            retItem.count = inputAmount.value;
            localStorage.setItem(item.id, JSON.stringify(retItem));
            this.productsAmount(item);
            this.cost += parseInt(item.price) * item.count;
            this.totalCost.innerText = `${this.cost} руб.`;

        })
    }};
}

let serviceGoods = new ServiceProducts('.swiper-wrapper', goods.items, '.basketPopup__productsWrapper');
