import {defineStore} from "pinia";
import data from "@/data";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cartApp: {}
    }),
    getters: {
        listCart() {
            return Object.keys(this.cartApp).map(productId => {
                const item = data.find(p => p.id === productId);
                const quantity = this.cartApp[productId].quantity;
                return {
                    ...item,
                    quantity: quantity,
                };
            });
        },
        totalUnit(){
            return Object.keys(this.cartApp).reduce((total,id)=> total + this.cartApp[id].quantity,0)
        }
    },
    actions: {
        add(productId) {
            if (this.cartApp.hasOwnProperty(productId)) {
                this.cartApp[productId].quantity += 1;
            } else {
                this.cartApp[productId] = {
                    productId,
                    quantity: 1
                };
            }
        },
        remove(productId) {
            if (!this.cartApp[productId]) {
                return;
            }
            this.cartApp[productId].quantity -= 1;
            if (this.cartApp[productId].quantity === 0) {
                delete this.cartApp[productId];
            }
        },
        removeAll(productId) {
            delete this.cartApp[productId];
        }
    }
});