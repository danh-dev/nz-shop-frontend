<script setup>
import {computed, ref} from "vue";
import {siteData} from "@/stores/globals";
import Step1 from "@/views/cart/StepCheckout/Step1.vue";
import Step2 from "@/views/cart/StepCheckout/Step2.vue";
import Step3 from "@/views/cart/StepCheckout/Step3.vue";
import Step4 from "@/views/cart/StepCheckout/Step4.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const siteStore = siteData();

const stepList = ref([
  {icon: "mdi-card-account-details-outline", text: "Thông tin đặt hàng", tabAction: "stepAddress"},
  {icon: "mdi-truck-fast-outline", text: "Giao hàng & Giảm giá", tabAction: "stepShipping"},
  {icon: "mdi-cash-register", text: "Thanh toán", tabAction: "stepPayment"},
  {icon: "mdi-package-variant-closed-check", text: "Hoàn tất đặt hàng", tabAction: "stepCompleted"},
]);

const checkIndex =computed(()=>{ return stepList.value.findIndex(item => item.tabAction === siteStore.cartInfo.selectStep) })

const modelLogin = ref(false);


// onMounted(()=>{
//   if(siteStore.cartInfo.cartList.length<=0){
//     router.push("/cart")
//   }
// })
</script>

<template>
  <div style="min-height: inherit;">
    <v-btn @click="()=>{siteStore.isLogin = !siteStore.isLogin;}">isLogin:{{ siteStore.isLogin }}</v-btn>
    <v-btn @click="()=>{siteStore.useGuest = !siteStore.useGuest;}">isGuest:{{ siteStore.useGuest }}</v-btn>
    <v-sheet v-if="siteStore.isLogin||siteStore.useGuest" style="min-height: inherit;">
      <v-card class="pa-5" style="min-height: inherit;">
        <v-row>
          <v-col cols="12">
            <v-list class="d-flex flex-wrap justify-md-space-around">
              <v-list-item v-for="(item,index) in stepList" :prepend-icon="item.icon"
                           @click="()=>{
                             if(index<=checkIndex){
                               siteStore.cartInfo.selectStep = item.tabAction
                             }
                           }"
                           :class="index<=checkIndex?'bg-red-darken-2':'tab-disable'"
                           color="white" rounded="xl" :active="siteStore.cartInfo.selectStep === item.tabAction">

                <v-list-item-title class="text-menu text-body-2 font-weight-bold">{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <Step1 v-if="siteStore.cartInfo.selectStep==='stepAddress'||siteStore.cartInfo.selectStep===null"/>
        <Step2 v-if="siteStore.cartInfo.selectStep==='stepShipping'"/>
        <Step3 v-if="siteStore.cartInfo.selectStep==='stepPayment'"/>
        <Step4 v-if="siteStore.cartInfo.selectStep==='stepCompleted'"/>
      </v-card>
    </v-sheet>
    <v-sheet v-else>
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <v-btn @click="modelLogin = !modelLogin">Đăng nhập</v-btn>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <v-btn @click="siteStore.configGuest()">Thanh toán nhanh</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-sheet>
  </div>
  <v-dialog
      v-model="modelLogin"
      max-width="400"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="modelLogin = !modelLogin"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h6 font-weight-bold ms-3">Vui lòng xác nhận mật khẩu</span>
      </v-card-title>
      <v-card-text class="ma-1">
        Vì lý do bảo mật<br> bạn phải nhập lại mật khẩu để tiếp tục.
      </v-card-text>
      <v-card-text>
        <v-form @submit.prevent="getSecretKey()">
          <v-text-field density="compact" variant="outlined" label="Xác nhận mật khẩu" v-model="inputConfirmPassword"
                        type="password" autocomplete="off"></v-text-field>
          <v-btn type="submmit" class="me-2" color="red-darken-2">Gửi</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
