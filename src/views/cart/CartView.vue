<script setup>
import {computed, ref} from "vue";
import CartList from "../../components/cart/CartList.vue";
import {useCartStore} from "@/stores/cart";

const cartStore = useCartStore();
const shippingValue = ref("200000");
const couponValue = ref("50000");

const totalCart = computed(() =>
    totalValue.value - parseFloat(shippingValue.value) - parseFloat(couponValue.value)
);

const totalValue = computed(() =>
    cartStore.listCart.reduce((total, product) => {
      const price = (product.priceSale) ? product.priceSale : product.priceRegular;
      return total + parseFloat(price) * product.quantity;
    }, 0)
);
</script>

<template>
  <v-app>
    <v-container>
      <v-sheet
          v-if="cartStore.listCart.length"
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
              <CartList/>
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
      <v-sheet v-else
               class="rounded pa-3 d-flex flex-column justify-center align-center"
               elevation="3">
        <div>        <v-lazy>
          <iframe  width="300" height="300" frameBorder="0" src="https://lottie.host/?file=95af846f-f62b-4bc5-b422-26c7cabda6eb/65kwV7npxO.json"></iframe></v-lazy></div>
        <div class="ma-3"><p>Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại</p></div>
        <v-btn class="ma-3" density="default" color="red-darken-2" @click="$router.go(-1)">Quay lại</v-btn>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<style scoped></style>
