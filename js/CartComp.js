Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',

            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {

            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                find.quantity++;
            } else {
                let prod = Object.assign({
                    quantity: 1
                }, product);
                this.cartItems.push(prod)
            }
            let obj = JSON.stringify(this.cartItems);
            localStorage.setItem("carts", obj);

        },
        remove(item) {

            let find = this.cartItems.find(el => el.id_product === item.id_product);
            console.log(find)
            if (find.quantity === 1) {
                this.cartItems = this.cartItems.filter(el => el.id_product !== find.id_product)
            } else {
                find.quantity--;
            }
            let obj = JSON.stringify(this.cartItems);
            localStorage.setItem("carts", obj);


        },
    },
    mounted() {
        localStorage.getItem("carts") ? this.cartItems = JSON.parse(localStorage.getItem("carts")) : localStorage.setItem("carts", {});
    },



    template: `
        <div>
            <div class="btn-cart" type="button" @click="showCart=!showCart">
                <img src="img/cart.svg" alt="cart">
                
            </div>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="remove">
                </cart-item>
            </div>
        </div>`
});



Vue.component('cart-item', {
    props: ['cartItem'],

    template: `


                <div class="cart-item">
                    <div class="product-bio">
                        <img src="img/cart1.jpg" alt="card" class="card__img" widht="50px" height="50px"/>
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                         <div class="carts-close" @click="$emit('remove', cartItem)">
                            <img src="img/close.svg" alt="close" class="carts-close__img" />
                        </div>
                        
                    </div>
                </div>

               
    `
});