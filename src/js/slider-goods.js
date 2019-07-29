import goods from './goods.json'


class ServiceProducts {
    constructor(containerProducts, productsCatalog, basketPopup) {
        this.sliderContainer = document.querySelector(containerProducts);
        this.basketContainer = document.querySelector(basketPopup);
        this.goodsItems = productsCatalog;
        this.totalCost = document.querySelector('.basketPopup__price_cBlue');
        this.cost = 0;
        this.productCount = document.querySelector('.basketPopup__productInputAmount')
        this.init();
    }

    init() {
        this.create();
    }

    create(){
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
                this.putProduct(item.id,item,toBasketBtn);
            });
            

            this.setOnLoad(item,toBasketBtn);


            this.sliderContainer.appendChild(slideWrapper);

        });

    }

    putProduct(id,item,toBasketBtn) {

        let productTitle = document.querySelectorAll('.basketPopup__productTitle');
        // console.log(productTitle.innerHTML)
        if(!localStorage.getItem(id)){
            item.count = 1;
            localStorage.setItem(id,JSON.stringify(item));
            toBasketBtn.classList.add('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзине';
            this.addToBasket(item, toBasketBtn);
            this.cost+= parseInt(item.price) * item.count;
            this.totalCost.innerText = `${this.cost} руб.`;
        } else {
            localStorage.removeItem(id);
            toBasketBtn.classList.remove('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзину';
            productTitle.forEach((title) => {
                if(title.innerHTML == item.name){
                    this.basketContainer.removeChild(title.parentNode);
                    // console.log(title.innerHTML);
                }
            });
            this.cost-= parseInt(item.price) * item.count;
            this.totalCost.innerText = `${this.cost} руб.`;
        }

    }

    setOnLoad(item, toBasketBtn) {

        if(localStorage.getItem(item.id)){
            item.count = JSON.parse(localStorage.getItem(item.id))['count'];
            toBasketBtn.classList.add('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзине';
            this.addToBasket(item, toBasketBtn);
            // this.productCount.value = parseInt(item.count);
            this.cost+= parseInt(item.price) * item.count;
            this.totalCost.innerText = `${this.cost} руб.`;
        } else {
            toBasketBtn.classList.remove('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзину';
        }

    }

    addToBasket(item, toBasketBtn){

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
            this.putProduct(item.id,item,toBasketBtn);
        });
        this.basketContainer.appendChild(productWrapper);

    }

    removeFromBasket(item, toBasketBtn){

    }
}

let serviceGoods = new ServiceProducts('.swiper-wrapper', goods.items, '.basketPopup__productsWrapper');

