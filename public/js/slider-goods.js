!function(t){var e={};function o(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=3)}([function(t){t.exports=JSON.parse('{"items":[{"id":1,"image":"./images/slider/glasses1.png","name":"DAVIDOFF Urban Coolness Sunglasses","price":"14500 руб."},{"id":2,"image":"./images/slider/glasses2.png","name":"BULGARI NV-2345 Sunglasses","price":"18500 руб."},{"id":3,"image":"./images/slider/lenses.png","name":"ACUVUE OASYS with HydraLuxe(30 линз)","price":"11500 руб."},{"id":4,"image":"./images/slider/glasses3.png","name":"DAVIDOFF2 Urban Coolness Sunglasses","price":"12500 руб."},{"id":5,"image":"./images/slider/lenses.png","name":"ANOTHER LENSES","price":"16500 руб."}]}')},,,function(t,e,o){t.exports=o(4)},function(t,e,o){"use strict";o.r(e);var n=o(0);function s(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}new(function(){function t(e,o,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.sliderContainer=document.querySelector(e),this.basketContainer=document.querySelector(n),this.goodsItems=o,this.productsNumber=document.querySelector(".basketPopup__productsCount"),this.counter=0,this.totalCost=document.querySelector(".basketPopup__price_cBlue"),this.cost=0,this.productCount=document.querySelector(".basketPopup__productInputAmount"),this.init()}var e,o,n;return e=t,(o=[{key:"init",value:function(){this.create()}},{key:"create",value:function(){var t=this;this.goodsItems.forEach(function(e){var o=document.createElement("div");o.className+="swiper-slide popularGoods__item";var n='<div class="popularGoods__upperSide">\n                                <img src='.concat(e.image,' alt=\'item\' class="popularGoods__img">\n                            </div>\n                            <div class="popularGoods__downSide">            \n                                <h4 class="popularGoods__title"> ').concat(e.name,' </h4>\n                                <div class="popularGoods__wrapperPrice">\n                                    <div class="popularGoods__price">\n                                        <span class="popularGoods__nowPrice"> ').concat(e.price,' </span\n                                    </div>\n                                    <div class="popularGoods__toBasket">\n                                        <span class="popularGoods__compareBtn"></span>\n                                        <button class="popularGoods__toBasketBtn">в корзину</button>\n                                    </div>\n                                </div>\n                            </div>');o.innerHTML=n;var s=o.querySelector(".popularGoods__toBasketBtn");s.addEventListener("click",function(){t.putProduct(e.id,e,s)}),t.setOnLoad(e,s),t.sliderContainer.appendChild(o)})}},{key:"putProduct",value:function(t,e,o){var n=this,s=document.querySelectorAll(".basketPopup__productTitle");localStorage.getItem(t)?(localStorage.removeItem(t),o.classList.remove("popularGoods__toBasketBtn_active"),o.innerText="в корзину",s.forEach(function(t){t.innerHTML==e.name&&n.basketContainer.removeChild(t.parentNode)}),this.cost-=parseInt(e.price)*e.count,this.totalCost.innerText="".concat(this.cost," руб."),this.counter-=parseInt(e.count),this.productsNumber.innerHTML=this.counter):(e.count=1,localStorage.setItem(t,JSON.stringify(e)),o.classList.add("popularGoods__toBasketBtn_active"),o.innerText="в корзине",this.addToBasket(e,o),this.cost+=parseInt(e.price)*e.count,this.totalCost.innerText="".concat(this.cost," руб."),this.productsAmount(e))}},{key:"setOnLoad",value:function(t,e){localStorage.getItem(t.id)?(t.count=JSON.parse(localStorage.getItem(t.id)).count,e.classList.add("popularGoods__toBasketBtn_active"),e.innerText="в корзине",this.addToBasket(t,e),this.productsAmount(t),this.cost+=parseInt(t.price)*t.count,this.totalCost.innerText="".concat(this.cost," руб.")):(e.classList.remove("popularGoods__toBasketBtn_active"),e.innerText="в корзину")}},{key:"addToBasket",value:function(t,e){var o=this,n=document.createElement("div");n.classList.add("basketPopup__product");var s=' <img class="basketPopup__productImg" src="'.concat(t.image,'">\n                        <h4 class="basketPopup__productTitle">').concat(t.name,'</h4>\n                        <p class="basketPopupt__priceContainer">\n                            <span class="basketPopup__text">Цена:</span>\n                            <span class="basketPopup__price">').concat(t.price,'</span>\n                        </p>\n                        <form class="basketPopup__formBuy" action="#">\n                            <label class="basketPopup__productTextAmount">Количество:\n                                <input class="basketPopup__productInputAmount" type="number" min="1" value="').concat(t.count,'">\n                            </label>\n                            <button class="basketPopup__productRemove" type="button">Удалить</button>\n                        </form>');n.innerHTML=s;var a=n.querySelector(".basketPopup__productRemove"),r=document.querySelector(".basketPopup__productInputAmount");a.addEventListener("click",function(){o.putProduct(t.id,t,e)}),this.changeAmount(t,r),this.basketContainer.appendChild(n)}},{key:"productsAmount",value:function(t){t.count&&(this.counter+=parseInt(t.count),this.productsNumber.innerHTML=this.counter)}},{key:"changeAmount",value:function(t,e){inputAmount.addEventListener("change",function(){var e=JSON.parse(localStorage.getItem(t.id));localStorage.removeItem(t.id),e.count}),console.log(retItem)}}])&&s(e.prototype,o),n&&s(e,n),t}())(".swiper-wrapper",n.items,".basketPopup__productsWrapper")}]);