import Product from "../Class/Product";
import Cart from "../Class/Cart";

let listProducts = document.querySelector('#listProducts')
if (listProducts !== null) {
    Product.all().then((list) => {
        list.forEach(function (product) {
            listProducts.insertAdjacentHTML('beforeend', Product.show(product))
        })

        if (localStorage.getItem('panier') === null || JSON.parse(localStorage.getItem('panier')).length === 0) {
            localStorage.setItem('panier', JSON.stringify([]))
        }

        document.querySelectorAll('.card-product').forEach(function (card) {
            card.querySelector('button').addEventListener('click', function (e) {
                e.preventDefault()
                Cart.add({
                    id: card.dataset.product_id,
                    count: 1,
                    price: card.dataset.product_price,
                })
            })
        })
    })
}