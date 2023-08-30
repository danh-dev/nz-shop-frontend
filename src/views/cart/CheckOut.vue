<script setup>
import {ref} from "vue";
import {useCartStore} from "@/stores/cart";
import {siteData} from "@/stores/globals";


const cartStore = useCartStore();
const siteStore = siteData();
const checkoutSteps = [
  {
    title: 'Cart',
    icon: 'mdi-account-star',
  },
  {
    title: 'Address',
    icon: 'mdi-account-star',
  },
  {
    title: 'Payment',
    icon: 'mdi-account-star',
  },
  {
    title: 'Confirmation',
    icon: 'mdi-account-star',
  },
]
const currentStep = ref(0)
</script>

<template>
    <v-container>
      <v-btn @click="()=>{siteStore.isLogin = !siteStore.isLogin;}">isLogin:{{siteStore.isLogin}}</v-btn>
      <v-btn @click="()=>{siteStore.useGuest = !siteStore.useGuest;}">isGuest:{{siteStore.useGuest}}</v-btn>
      <v-sheet v-if="!siteStore.isLogin">
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" class="d-flex justify-center">
                Đăng nhập
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-center">
                <v-btn @click="siteStore.configGuest()">Xác nhận thanh toán khách</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-sheet>
      <v-sheet v-if="siteStore.isLogin||siteStore.useGuest">
        <v-card>
          <v-card-text>
            <v-stepper
                v-model:current-step="currentStep"
                class="checkout-stepper"
                :items="checkoutSteps"
            />
          </v-card-text>

          <v-divider />

          <v-card-text>
            <!-- 👉 stepper content -->
            <v-window
                v-model="currentStep"
                class="disable-tab-transition"
            >
              <v-window-item>
                <CartContent
                    v-model:current-step="currentStep"
                    v-model:checkout-data="checkoutData"
                />
              </v-window-item>

              <v-window-item>
                <AddressContent
                    v-model:current-step="currentStep"
                    v-model:checkout-data="checkoutData"
                />
              </v-window-item>

              <v-window-item>
                <PaymentContent
                    v-model:current-step="currentStep"
                    v-model:checkout-data="checkoutData"
                />
              </v-window-item>

              <v-window-item>
                <ConfirmationContent v-model:checkout-data="checkoutData" />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-sheet>


    </v-container>
</template>

<style scoped></style>
