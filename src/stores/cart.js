import {defineStore} from "pinia";
import { productList } from "@/data";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cartList: {}
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
        totalUnit(){
            return Object.keys(this.cartList).reduce((total,id)=> total + this.cartList[id].quantity,0)
        }
    },
    actions: {
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