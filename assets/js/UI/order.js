import {get, priceFormat} from "../utils";
import Cart from "../Class/Cart";
import Product from "../Class/Product";
import ValidationForm from "../Class/ValidationForm";

let page_order = get('#page_order')
if (page_order) {
    document.querySelector('#orderCountItems').innerText = Cart.numberProduct()
    document.querySelector('#orderSubPrice').innerText = priceFormat(Cart.getTotalPrice())

    let form = get('#js_form_order')
    let firstname = get('#order_firstname')
    let lastname = get('#order_lastname')
    let email = get('#order_email')
    let city = get('#order_city')
    let adress = get('#order_adress')
    let input_list = form.querySelectorAll("input[type='text']")

    input_list.forEach((input) => {
        input.addEventListener('input', function (e) {
            input.classList.remove('is-invalid')
        })
    })

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        let errors = false

        input_list.forEach((input) => {
            if (ValidationForm.fieldIsInvalid(input)) {
                ValidationForm.renderInvalidField(input, 'Le champs est invalide')
                errors = true
            } else {
                ValidationForm.renderValidField(input)
            }
        })

        if (!ValidationForm.emailIsValid(email.value)) {
            errors = true
            ValidationForm.renderInvalidField(email, 'Le champs est invalide')
        } else {
            ValidationForm.renderValidField(email)
        }

        if (!errors) {
            let infos = {
                "contact": {
                    "firstName": firstname.value,
                    "lastName": lastname.value,
                    "address": adress.value,
                    "city": city.value,
                    "email": email.value
                },
                "products": []
            }
            let listProducts = []
            Cart.all().forEach(async function (item) {
                try {
                    let product = await Product.get(item.id)
                    let i = 0
                    while (i < item.count) {
                        listProducts.push(product)
                        i++
                    }
                } catch (e) {
                    console.error(e);
                }

                if (listProducts.length == Cart.numberProduct()) {
                    infos.products = listProducts
                    let response = await fetch('http://localhost:3000/api/cameras/order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(infos)
                    })

                    if (response.ok) {
                        let jsonResponse = await response.json()
                        let price = Cart.getTotalPrice()
                        Cart.reset()
                        window.location.href = `${document.location.origin}/P5/Orinoco/confirm-order.html?id=${jsonResponse.orderId}&price=${price}`
                    }
                }
            })
        }
    })
}