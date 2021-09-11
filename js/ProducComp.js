Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `
        <div class="product-cards">
            <product v-for="item of filtered" :key="item.id_product"  :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product'],
    methods: {
        getRandomImg() {
            return 'img/example' + Math.floor(Math.random() * 2) + '.jpg'
        },
    },

    template: `
   <div class="product product_mb">
                <div >
                    <img class="product__img" :src="this.getRandomImg()" alt="photo product">
                </div>
                <div class="product__add"  @click="$parent.$parent.$refs.cart.addProduct(product)">
                    <img class="product__icon" src="img/panier.svg" alt="photo product"> Add to Cart
                </div>
                <div class="product__info">
                    <p href="product.html" class="product__name">{{product.product_name}}</p>
                    <p class="product__text">Known for her sculptural takes on traditional tailoring, Australian arbiter
                        of cool Kym
                        Ellery teams up with Moda Operandi.</p>
                    <div class="product__price">{{product.price}}$</div>
                </div>
            </div>
    `
})