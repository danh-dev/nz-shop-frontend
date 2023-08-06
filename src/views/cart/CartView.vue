<script setup>
import {computed, ref} from "vue";
import CartList from "../../components/cart/CartList.vue";

const shippingValue = ref("200000");
const couponValue = ref("50000");

const totalCart = computed(() =>
    totalValue.value - parseFloat(shippingValue.value) - parseFloat(couponValue.value)
);

const totalValue = computed(() =>
    productList.value.reduce((total, product) => {
      const price = (product.priceSale) ? product.priceSale : product.priceRegular;
      return total + parseFloat(price) * product.quantity;
    }, 0)
);

const productList = ref([
  {
    name: "Laptop ASUS X515MA-BR481W",
    priceRegular: 7600000,
    priceSale: 6690000,
    variations: ["Bạc", "Ram 32Gb"],
    quantity: 5,
    thumbnail: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/e/text_ng_n_5__1_2.png",
    url: "#"
  },
  {
    name: "Frozen 1",
    priceRegular: 100,
    priceSale: 70,
    variations: ["zxc", "acb"],
    quantity: 5,
    thumbnail: "https://dummyimage.com/160x160/000000/fff",
    url: "#"
  },
  {
    name: "Frozen 1",
    priceRegular: 100,
    variations: ["zxc", "acb"],
    quantity: 5,
    thumbnail: "https://dummyimage.com/160x160/000000/fff",
    url: "#"
  },
]);
</script>

<template>
  <v-app>
    <v-container>
      <v-sheet
          class="mx-auto mt-8 rounded pa-3"
          elevation="3"
      >
        <v-row
            class="ma-3"
            no-gutters
        >
          <v-col cols="8" class="rounded pa-3">
            <v-sheet>
              <h4 class="font-weight-bold text-red-darken-2">Giỏ hàng</h4>
              <CartList :productList="productList"/>
            </v-sheet>
          </v-col>
          <v-col cols="4" class="rounded pa-3">
            <h4>Tạm tính:</h4>
            <v-card class="my-2 pa-3">
              <div class="order-summary-inner">
                <ul class="summary-list py-2">
                  <li class="d-flex justify-content-between font-weight-medium py-2">
                    <span class="summary-list-title">Tổng giá trị :</span>
                    <span class="summary-list-text">{{ formatPrice(totalValue) }}</span>
                  </li>
                  <li class="d-flex justify-content-between font-weight-medium py-2">
                    <span class="summary-list-title">Giảm giá :</span>
                    <span class="summary-list-text">-{{ formatPrice(couponValue) }}</span>
                  </li>
                  <li class="d-flex justify-content-between font-weight-medium py-2">
                    <span class="summary-list-title">Giao hàng :</span>
                    <span class="summary-list-text">{{ formatPrice(shippingValue) }}</span>
                  </li>
                </ul>
                <span class="font-weight-medium">Mã giảm giá</span>
                <v-card-text>
                  <v-text-field
                      label="Mã giảm giá..."
                      append-inner-icon="mdi-ticket-percent-outline"
                  ></v-text-field>
                </v-card-text>
                <div class="d-flex justify-content-between text-h6 font-weight-bold py-2">
                  <span class="summary-list-title">Tổng tiền tạm tính :</span>
                  <span class="summary-list-text">{{ formatPrice(totalCart) }}</span>
                </div>
              </div>
              <v-btn
                  block=""
                  variant="flat"
                  size="large"
                  class="w-75 bg-red-darken-2"
              >
                Tiến hành đặt hàng
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<style scoped></style>
