let orderConfirmPage = document.querySelector('#page_confirm_order')
if (orderConfirmPage !== null) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const order_id = urlParams.get('id')
    const price = urlParams.get('price')

    if (order_id !== null &&
        order_id !== '' &&
        price !== null &&
        price !== ''
    ) {
        document.querySelector('#field_order_id').insertAdjacentText('beforeend', order_id)
        document.querySelector('#field_price').insertAdjacentText('beforeend', price + ' €')
    } else {
        window.location.href = `${document.location.origin}/P5/Orinoco/index.html`
    }
}