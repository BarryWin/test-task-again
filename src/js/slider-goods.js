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
        this.basketClearBtn = document.querySelector('.basketPopup__btnReset');

        this.init();
    }

    init() {
        this.create();
        this.basketClear();
    }

    create() {
        let basketBtn = document.querySelector('.lineTwo__basket');
        let basketPopup = document.querySelector('.basketPopup');
        let basketPopupClose = document.querySelector('.basketPopup__close');
        basketBtn.addEventListener("click", () => basketPopup.style.display = "block");
        basketPopupClose.addEventListener("click", () => basketPopup.style.display = "none");
        this.productsTotal();
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
            // this.cost += parseInt(item.price) * item.count;
            // this.totalCost.innerText = `${this.cost} руб.`;
            this.productsTotal();
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
            // this.cost -= parseInt(item.price) * item.count;
            // this.totalCost.innerText = `${this.cost} руб.`;
            this.productsTotal();
        }

    }

    setOnLoad(item, toBasketBtn) {

        if (localStorage.getItem(item.id)) {
            item.count = JSON.parse(localStorage.getItem(item.id))['count'];
            toBasketBtn.classList.add('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзине';
            this.addToBasket(item, toBasketBtn);
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
        let inputAmount = productWrapper.querySelector('.basketPopup__productInputAmount');

        productRemove.addEventListener('click', () => {
            this.putProduct(item.id, item, toBasketBtn);
        });

        // this.productsTotal(item, inputAmount);

        this.changeAmount(item, inputAmount);

        this.basketContainer.appendChild(productWrapper);

    }

    productsTotal() {

        this.counter = 0;
        this.cost = 0;
        for (let i = 0; i < localStorage.length; i++) {
            let myKey = localStorage.key(i);
            let retItem = JSON.parse(localStorage.getItem(myKey));
            this.counter += parseInt(retItem.count);
            this.cost += parseInt(retItem.price) * parseInt(retItem.count);
        }
        this.productsNumber.innerHTML = this.counter;
        this.totalCost.innerText = `${this.cost} руб.`;


    };

    changeAmount(item, inputAmount) {

        if (localStorage.getItem(item.id)) {
            inputAmount.addEventListener("change", () => {

                let retItem = JSON.parse(localStorage.getItem(item.id));
                localStorage.removeItem(item.id);

                retItem.count = inputAmount.value;
                localStorage.setItem(item.id, JSON.stringify(retItem));
                this.productsTotal();


            })
        }
    };

    basketClear() {

        this.basketClearBtn.addEventListener("click", () => {
            let toBasketBtn = document.querySelectorAll('.popularGoods__toBasketBtn');
            toBasketBtn.forEach((Btn) =>{
                Btn.classList.remove("popularGoods__toBasketBtn_active")
            })
            let productsWrapper = document.querySelector('.basketPopup__productsWrapper');
            productsWrapper.innerHTML = "";
            localStorage.clear();
            this.productsTotal();
        })
    }
}

let serviceGoods = new ServiceProducts('.swiper-wrapper', goods.items, '.basketPopup__productsWrapper');
