<script setup>
import {computed, ref} from "vue";
import CartList from "../../components/cart/CartList.vue";
import {useCartStore} from "@/stores/cart";
import {rule_coupon} from "@/validators";

const cartStore = useCartStore();
const couponInput = ref("");
const dataForm = ref();
const readOnly= ref(false);

couponInput.value = cartStore.coupon || "";

if(cartStore.coupon){
  readOnly.value = true;
}

const onSubmit = () => {
  if(couponInput.value.length){
    dataForm.value?.validate().then(({ valid: isValid }) => {
      if (isValid)
        cartStore.addCoupon(couponInput.value);
      readOnly.value = true
    })}
}
const onClear = () => {cartStore.removeCoupon(); readOnly.value = false ;couponInput.value ="";}
</script>

<template>
  <v-app>
    <v-container>
      <v-sheet v-if="cartStore.listCart.length" class="mx-auto mt-8 rounded pa-3" elevation="3">
        <v-row class="ma-3" no-gutters>
          <v-col cols="8" class="rounded pa-3">
            <v-sheet>
              <h4 class="font-weight-bold text-red-accent-4">Giỏ hàng</h4>
              <CartList :mini="true"/>
            </v-sheet>
          </v-col>
          <v-col cols="4" class="rounded pa-3">
            <h4>Tạm tính:</h4>
            <v-card class="my-2 pa-3">
              <div class="order-summary-inner">
                <ul class="summary-list py-2">
                  <li class="d-flex justify-space-between font-weight-medium py-2">
                    <span class="summary-list-title">Tổng giá trị :</span>
                    <span class="summary-list-text">{{ formatPrice(cartStore.totalValue) }}</span>
                  </li>
                  <li class="d-flex justify-space-between font-weight-medium py-2">
                    <span class="summary-list-title">Giảm giá :</span>
                    <span class="summary-list-text">-{{ formatPrice(cartStore.couponValue) }}</span>
                  </li>
                  <li class="d-flex justify-space-between font-weight-medium py-2">
                    <span class="summary-list-title">Giao hàng :</span>
                    <span class="summary-list-text">{{ cartStore.shippingValue?formatPrice(cartStore.shippingValue):" Free " }}</span>
                  </li>
                </ul>
                <span class="font-weight-medium">Mã giảm giá</span>
                <v-card-text>
                  <v-form ref="dataForm" @submit.prevent="onSubmit">
                    <v-text-field label="Mã giảm giá"
                                  v-model="couponInput"
                                  :rules="[rule_coupon]"
                                  clearable
                                  persistent-clear
                                  :readonly="readOnly"
                                  @click:clear="onClear"
                                  prepend-inner-icon="mdi-ticket-percent-outline"></v-text-field>
                    <v-btn type="submit" class="d-none"></v-btn>
                  </v-form>
                </v-card-text>
                <div class="d-flex justify-space-between text-h6 font-weight-bold py-2">
                  <span class="summary-list-title">Tổng tiền :</span>
                  <span class="summary-list-text">{{ formatPrice(cartStore.totalCart) }}</span>
                </div>
              </div>
              <v-btn block="" variant="flat" size="large" class="w-75 bg-red-accent-4"
                     @click="$router.push('/checkout')">
                Tiến hành đặt hàng
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet v-else class="rounded pa-3 d-flex flex-column justify-center align-center" elevation="0">
        <div>
          <iframe width="300" height="300" frameBorder="0"
                  src="https://lottie.host/?file=95af846f-f62b-4bc5-b422-26c7cabda6eb/65kwV7npxO.json">
          </iframe>
        </div>
        <div class="ma-3">
          <p>Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại</p>
        </div>
        <v-btn class="ma-3" density="default" color="red-accent-4" @click="$router.go(-1)">Quay lại</v-btn>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<style scoped></style>
