<script setup>
import CartList from "../../components/cart/CartList.vue";
import {siteData} from "@/stores/globals";
import { LottieAnimation } from "lottie-web-vue"
import EmptyCart from "@/assets/cart_empty.json"

const siteStore = siteData();

</script>

<template>
  <div style="
    min-height: inherit;
">
    <v-sheet v-if="siteStore.listCart.length" class="rounded pa-3" elevation="2" style="min-height: inherit;">
      <v-row class="ma-3" no-gutters>
        <v-col cols="12" lg="8" class="rounded pa-3">
          <v-sheet>
            <h4 class="font-weight-bold text-red-accent-4">Giỏ hàng</h4>
            <CartList/>
          </v-sheet>
        </v-col>
        <v-col cols="12" lg="4" class="rounded pa-3">
          <h4>Tạm tính:</h4>
          <v-card class="my-2 pa-3">
            <div class="order-summary-inner">
              <div class="d-flex justify-space-between text-h6 font-weight-bold py-2">
                <span class="summary-list-title">Tổng tiền :</span>
                <span class="summary-list-text">{{ formatPrice(siteStore.totalValue) }}</span>
              </div>
            </div>
            <v-btn block="" variant="flat" size="large" class="w-75 bg-red-accent-4"
                   @click="()=>{siteStore.cartInfo.selectStep = 'stepAddress';$router.push('/checkout')}">
              Tiến hành đặt hàng
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet v-else class="rounded pa-3 d-flex flex-column justify-center align-center" elevation="0">
      <div>
        <LottieAnimation :animation-data="EmptyCart" :auto-play="true" :loop="true" :speed="1" style="width: 500px"/>
      </div>
      <div class="ma-3">
        <p>Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại</p>
      </div>
      <v-btn class="ma-3" density="default" color="red-accent-4" @click="$router.go(-1)">Quay lại</v-btn>
    </v-sheet>
  </div>
</template>

<style scoped></style>
