class Product {
    constructor(id, name, price, description, imageUrl) {
        this.id = id
        this.name = name
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

    /**
     * Récupère l'ensemble des fournitures
     * @returns {Promise<any>}
     */
    async all() {
        const response = await fetch('http://localhost:3000/api/cameras', {
            method: 'GET'
        })
        return await response.json()
    }

    /**
     * Récupère un produit par son ID
     * @param id
     * @returns {Promise<any>}
     */
    async get(id) {
        const response = await fetch(`http://localhost:3000/api/cameras/${id}`, {
            method: 'GET'
        })
        return await response.json()
    }

    /**
     * Génère une Card Produit en HTML
     * @param product
     * @returns {string}
     */
    show(product) {
        return `
         <div class="col-md-4">
            <div class="card-product card border-primary mb-3" style="max-width: 20rem;" data-product_id="${product._id}" data-product_price="${product.price}">
                <div class="card-header"><a href="product.html?id=${product._id}">${product.name}</a></div>
                <div class="card-body" 
                style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(48,48,48,0.5)), url('${product.imageUrl}'); background-size: cover !important;">
                    <p class="text-white">${product.description}</p>
                    <h4 class="float-right text-white">${product.price} €</h4>
                </div>

                <button type="button" class="btn btn-primary">Ajouter au panier</button>
            </div>
        </div>
    `
    }
}

export default new Product()