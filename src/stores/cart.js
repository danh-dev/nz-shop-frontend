import {defineStore} from "pinia";
import {productList} from "@/data";
import {computed} from "vue";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cartList: {},
        coupon: null,
        shipping: 1
    }),
    getters: {
        listCart() {
            return Object.keys(this.cartList).map(productId => {
                const item = productList.find(p => p.id === productId);
                const quantity = this.cartList[productId].quantity;
                return {
                    ...item,
                    quantity: quantity,
                };
            });
        },
        totalUnit() {
            return Object.keys(this.cartList).reduce((total, id) => total + this.cartList[id].quantity, 0);
        },
        totalValue() {
            return this.listCart.reduce((total, product) => {
                const price = (product.priceSale) ? product.priceSale : product.priceRegular;
                return total + parseFloat(price) * product.quantity;
            }, 0);
        },
        couponValue() {
            if (this.coupon) {
                return 100000;
            }
            return 0;
        },
        shippingValue() {
            switch (this.shipping) {
                case 1:
                    return 0;
                case 2:
                    return 50000;
                case 3:
                    return 100000;
                default:
                    return 0;
            }
        },
        totalCart(){
            return this.totalValue - this.couponValue + this.shippingValue
        }
    },
    actions: {
        addCoupon(value) {
            this.coupon = value;
        },
        removeCoupon() {
            this.coupon = null;
        },
        add(productId) {
            if (this.cartList.hasOwnProperty(productId)) {
                this.cartList[productId].quantity += 1;
            } else {
                this.cartList[productId] = {
                    productId,
                    quantity: 1
                };
            }
        },
        remove(productId) {
            if (!this.cartList[productId]) {
                return;
            }
            this.cartList[productId].quantity -= 1;
            if (this.cartList[productId].quantity === 0) {
                delete this.cartList[productId];
            }
        },
        removeAll(productId) {
            delete this.cartList[productId];
        }
    },
    persist: true
});