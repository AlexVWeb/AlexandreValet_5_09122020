import Product from "./Product";

const KEY = 'panier';

class Cart {
    constructor() {
        this._storage = window.localStorage;
        this._refresh();
    }

    /**
     * Récupère l'ensemble des produits contenu dans le panier
     * @returns {*|*[]}
     */
    all() {
        return this._cart;
    }

    /**
     * Ajoute un produit dans le panier
     * @param product
     */
    add(product) {
        if (!this.has(product.id)) {
            this._cart.push(product)
            this._storage.setItem(KEY, JSON.stringify(this._cart))
            this._refresh()
        } else {
            this.incrementCount(product.id)
        }
    }

    /**
     * Calcul le nombre d'item par ID de produit
     * @param id
     * @returns {*}
     */
    count(id) {
        return this.get(id).count
    }

    /**
     * Augmente la quantité d'un produit dans le panier
     * @param id
     * @param number
     */
    incrementCount(id, number = null) {
        let product = this.get(id)
        if (number === null) {
            product.count++
        } else {
            product.count = number
        }
        this._storage.setItem(KEY, JSON.stringify(this._cart))
        this._refresh()
    }

    /**
     * Enlève de la quantité d'un produit dans le panier
     * @param id
     * @param number
     */
    decrementCount(id, number = null) {
        let product = this.get(id)
        if (number === null) {
            product.count--
        } else {
            product.count = number
        }
        this._storage.setItem(KEY, JSON.stringify(this._cart))
        this._refresh()
        if (this.count(id) < 1) {
            this.remove(id)
        }
    }

    /**
     * Supprime un produit par son ID dans le panier
     * @param id
     */
    remove(id) {
        let product = this.get(id)
        let filter = this.all().filter(el => el !== product)
        this._storage.setItem(KEY, JSON.stringify(filter))
        this._refresh()
    }

    /**
     * Récupère un produit dans le panier par son ID
     * @param id
     */
    get(id) {
        return this._cart.find(item => item.id === id)
    }

    /**
     * Affiche le nombre de produit contenu dans le panier
     * @returns {*}
     */
    numberProduct() {
        return this.all().reduce((acc, product) => acc + parseInt(product.count), 0)
    }

    /**
     * Affiche le montant totale du panier
     * @returns {*}
     */
    getTotalPrice() {
        return this.all().reduce((acc, product) => acc + (product.price * product.count), 0);
    }

    /**
     * Vérifie si un produit est déja dans le panier
     * @param id
     * @returns {boolean}
     */
    has(id) {
        return this._cart.some(product => product.id === id)
    }

    /**
     * Rafraichie la variable this._cart
     * @private
     */
    _refresh() {
        this._cart = JSON.parse(this._storage.getItem(KEY)) || []
    }

    /**
     * Réinitialise le panier
     */
    reset() {
        this._storage.setItem(KEY, JSON.stringify([]))
        this._refresh()
    }

    /**
     * Affiche un produit pas son ID dans la page panier
     * @param product_id
     * @returns {Promise<string>}
     */
    async show(product_id) {
        let countInCart = this.count(product_id)
        const product = await Product.get(product_id)
        return `
            <img src="${product.imageUrl}" alt="Franck JS 105">
            <div class="cart-item_infos">
                <p class="cart-item_price">${product.price} €</p>
                <a class="cart-item_name"  href="product.html?id=${product._id}">${product.name}</a>
                <label class="mt-2">
                    Qté:
                    <input type="number" min="1" value="${countInCart}">
                </label>
            </div>
            <span class="btn-delete-item" data-remove-product>
            <svg width="1rem" height="1rem" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            </span>
        `
    }
}

export default new Cart()