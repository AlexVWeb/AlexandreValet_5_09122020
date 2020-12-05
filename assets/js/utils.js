export function get(el, parent) {
    if (undefined === parent) {
        parent = document;
    }

    if (el.startsWith('#')) {
        return parent.querySelector(el)
    }
    return parent.querySelectorAll(el)
}

export function priceFormat(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}