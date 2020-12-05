import Product from "../Class/Product";
import Cart from "../Class/Cart";

let productPage = document.querySelector('#product')
if (productPage !== null) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product_id = urlParams.get('id')

    if (product_id !== null && product_id !== '') {
        Product.get(product_id).then((product) => {
            let lensesHTML = `<div>`
            product.lenses.forEach(function (lense) {
                lensesHTML += `<span class="lense">${lense}</span>`
            })
            lensesHTML += `</div>`

            let productInCart = Cart.has(product_id)

            let html = `
                <div class="col-md-12 product">
                    <img class="" src="${product.imageUrl}" alt="${product.name}">
                    <h1>${product.name}</h1>
                    <div class="product_description">
                        <p>${product.description}</p>
                        ${lensesHTML}
                    </div>
                    <div class="btn-group">
                        <button id="btnAddProduct" class="btn btn-outline-info mt-4" type="button">Ajouter au panier</button>
                        <button id="btnRemoveProduct" class="btn btn-outline-danger mt-4 ml-2 ${productInCart ? 'd-block' : 'd-none'}" type="button">Retirer du panier</button>
                    </div>
                </div>
            `
            productPage.insertAdjacentHTML('beforeend', html)

            let btnAddProduct = document.querySelector('#btnAddProduct')
            let btnRemoveProduct = document.querySelector('#btnRemoveProduct')

            if (btnAddProduct !== null) {
                btnAddProduct.addEventListener('click', function (e) {
                    e.preventDefault()
                    Cart.add({
                        id: product_id,
                        count: 1,
                        price: product.price
                    })

                    if (Cart.has(product_id)) {
                        btnRemoveProduct.classList.replace('d-none', 'd-block')
                    }
                })
            }

            btnRemoveProduct.addEventListener('click', function (e) {
                e.preventDefault()
                Cart.remove(product_id)
                if (!Cart.has(product_id)) {
                    this.classList.replace('d-block', 'd-none')
                }
            })
        })
    } else {
        alert("Aucun produit n'est recherché")
    }
}