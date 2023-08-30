import {defineStore} from "pinia";
import {productList} from "@/data";
import {ref, computed} from "vue";

export const useCartStore = defineStore("cart", () => {
    const cartList = ref({});
    const coupon = ref(null);
    const shipping = ref(1);

    const listCart = computed(() => {
        return Object.keys(cartList.value).map((productId) => {
            const item = productList.find((p) => p.id === productId);
            const quantity = cartList.value[productId].quantity;
            return {
                ...item,
                quantity: quantity,
            };
        });
    });

    const totalUnit = computed(() => {
        return Object.keys(cartList.value).reduce(
            (total, id) => total + cartList.value[id].quantity,
            0
        );
    });

    const totalValue = computed(() => {
        return listCart.value.reduce((total, product) => {
            const price = product.priceSale ? product.priceSale : product.priceRegular;
            return total + parseFloat(price) * product.quantity;
        }, 0);
    });

    const couponValue = computed(() => {
        if (coupon.value) {
            return 100000;
        }
        return 0;
    });

    const shippingValue = computed(() => {
        switch (shipping.value) {
            case 1:
                return 0;
            case 2:
                return 50000;
            case 3:
                return 100000;
            default:
                return 0;
        }
    });

    const totalCart = computed(() => {
        return totalValue.value - couponValue.value + shippingValue.value;
    });

    const addCoupon = (value) => {
        coupon.value = value;
    };

    const removeCoupon = () => {
        coupon.value = null;
    };

    const add = (productId) => {
        if (cartList.value.hasOwnProperty(productId)) {
            cartList.value[productId].quantity += 1;
        } else {
            cartList.value[productId] = {
                productId,
                quantity: 1,
            };
        }
    };

    const remove = (productId) => {
        if (!cartList.value[productId]) {
            return;
        }
        cartList.value[productId].quantity -= 1;
        if (cartList.value[productId].quantity === 0) {
            delete cartList.value[productId];
        }
    };

    const removeAll = (productId) => {
        delete cartList.value[productId];
    };

    return {
        cartList,
        coupon,
        shipping,
        listCart,
        totalUnit,
        totalValue,
        couponValue,
        shippingValue,
        totalCart,
        addCoupon,
        removeCoupon,
        add,
        remove,
        removeAll,
    };
}, {
    persist: {
        paths: ['cartList','coupon'],
    },
});