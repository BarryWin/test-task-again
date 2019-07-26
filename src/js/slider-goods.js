import goods from './goods.json'


class ServiceProducts {
    constructor(containerProducts, productsCatalog) {
        this.sliderContainer = document.querySelector(containerProducts);
        this.goodsItems = productsCatalog;
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
            toBasketBtn.addEventListener('click', event => {
                this.productPutRem(item.id,item,toBasketBtn); 
            });

            this.setBtnsOnLoad(item.id,item,toBasketBtn);

            this.sliderContainer.appendChild(slideWrapper);

        });

    }

    productPutRem(id,item,toBasketBtn) {

        if(!localStorage.getItem(id)){
            item.count = 1;
            localStorage.setItem(id,JSON.stringify(item));
            toBasketBtn.classList.add('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзине'; 
        } else {
            localStorage.removeItem(id);
            toBasketBtn.classList.remove('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзину'; 
        }

    }

    setBtnsOnLoad(id, item, toBasketBtn) {

        if(localStorage.getItem(item.id)){
            toBasketBtn.classList.add('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзине'; 
        } else {
            toBasketBtn.classList.remove('popularGoods__toBasketBtn_active');
            toBasketBtn.innerText = 'в корзину'; 
        }

    }
}

let serviceGoods = new ServiceProducts('.swiper-wrapper', goods.items);

