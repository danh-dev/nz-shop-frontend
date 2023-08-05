<script setup>
import {computed, ref} from "vue";
import CartList from "../../components/cart/CartList.vue";



const shippingValue = ref('20');
const couponValue = ref('20');

const totalCart = computed(()=>
   totalValue.value - shippingValue.value - couponValue.value
)

const totalValue = computed(() =>
    productList.value.reduce((total,product) => total + product.priceUnit * product.quantity, 0)
)

const productList = ref([
  {
    name: "Frozen 1",
    priceUnit: 10,
    quantity: 5
  },
  {
    name: "Frozen 2",
    priceUnit: 20,
    quantity: 3
  },
  {
    name: "Frozen 3",
    priceUnit: 30,
    quantity: 1
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
          <v-col class="col-8 rounded pa-3">
            <v-sheet>
              <CartList v-for="item in productList" :key="index" :item="item"/>
            </v-sheet>
          </v-col>
          <v-col class="col-4 bg-grey-lighten-3 rounded pa-3">
            <h4>Tạm tính:</h4>
            <v-card class="my-2 pa-3">
              <div class="order-summary-inner">
                <ul class="summary-list py-2">
                  <li class="d-flex justify-content-between font-weight-medium py-2">
                    <span class="summary-list-title">Tổng giá trị :</span>
                    <span class="summary-list-text">${{totalValue}}</span>
                  </li>
                  <li class="d-flex justify-content-between font-weight-medium py-2">
                    <span class="summary-list-title">Giảm giá :</span>
                    <span class="summary-list-text">-${{ couponValue }}</span>
                  </li>
                  <li class="d-flex justify-content-between font-weight-medium py-2">
                    <span class="summary-list-title">Giao hàng :</span>
                    <span class="summary-list-text">{{ shippingValue }}</span>
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
                  <span class="summary-list-text">{{ totalCart }}</span>
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
