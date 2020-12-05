import Cart from "../Class/Cart";
import {get} from "../utils";

Cart._refresh()

let cart_items = get('#cart-items')
let cartSubPrice = get('#cartSubPrice')
if (cart_items) {
    const _refreshCart = () => {
        cartSubPrice.innerText = Cart.getTotalPrice() + ' €'
    }

    Cart.all().forEach(async function (product) {
        const item = await Cart.show(product.id)
        let el = document.createElement('div')
        el.className = 'cart-item mb-2'
        el.innerHTML = item

        el.querySelector("input[type='number']").addEventListener('change', function (e) {
            let value = parseInt(e.target.value)
            if (value > Cart.count(product.id)) {
                Cart.incrementCount(product.id, value)
                _refreshCart()
            }
            if (value < Cart.count(product.id)) {
                Cart.decrementCount(product.id, value)
                _refreshCart()
            }
        })

        el.querySelector('[data-remove-product]').addEventListener('click', function (e) {
            el.classList.add('animate-remove')
            Cart.remove(product.id)
            setTimeout(() => {
                el.remove()
                _refreshCart()
            }, 300);
        })

        cart_items.insertAdjacentElement('beforeend', el)
    })

    _refreshCart()
}