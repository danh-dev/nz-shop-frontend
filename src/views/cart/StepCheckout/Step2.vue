<script setup>
import {siteData} from "@/stores/globals";
import {ruleShipping} from "@/validators";
import {computed, ref} from "vue";
import axios from "@/axiosComfig";

const siteStore = siteData();
const formCoupon = ref();
const inputCoupon = ref();
const selectedShipping = ref();
const infoSelected = computed(() => typeShipping.find(item => item.value === selectedShipping.value));
const priceShipping = computed(()=> {
  if(siteStore.cartInfo.coupon){
    if(siteStore.cartInfo.coupon.type_value==='free_shipping'){
      return 0;
    }
    if(siteStore.cartInfo.coupon.type_value==='reduce_shipping'){
      return selectedShipping.value - siteStore.cartInfo.coupon.value
    }
  }
  return selectedShipping.value
})
const typeShipping = [
  {
    icon: "mdi-store-marker-outline",
    name: "Pickup",
    text: "Trực tiếp tại cửa hàng",
    value: "0"
  },
  {
    icon: "mdi-moped",
    name: "Giao hàng thường",
    text: "Giao hàng từ 5-7 ngày",
    value: "50000"
  },
  {
    icon: "mdi-truck-fast-outline",
    name: "Hoả tốc",
    text: "Giao gấp 1-2 ngày",
    value: "150000"
  },
];
const typeValue = computed(() => {
  if (siteStore.cartInfo.coupon.type_value === "reduce_shipping") {
    return "Giảm phí vận chuyển";
  }
  if (siteStore.cartInfo.coupon.type_value === "free_shipping") {
    return "Miến phí vận chuyển";
  }
  if (siteStore.cartInfo.coupon.type_value === "number_value" && siteStore.cartInfo.coupon.type_coupon === "totalcart") {
    return "Giảm trực tiếp số tiền tổng đơn";
  }
  if (siteStore.cartInfo.coupon.type_value === "number_value"&& siteStore.cartInfo.coupon.type_coupon === "onproduct") {
    return "Giảm trực tiếp số tiền trên mỗi sản phẩm chỉ định";
  }
  if (siteStore.cartInfo.coupon.type_value === "percent_value" && siteStore.cartInfo.coupon.type_coupon === "totalcart") {
    return "Giảm trực theo phần trăm tiền tổng đơn";
  }
  if (siteStore.cartInfo.coupon.type_value === "percent_value"&& siteStore.cartInfo.coupon.type_coupon === "onproduct") {
    return "Giảm trực theo phần trăm trên mỗi sản phẩm chỉ định";
  }
});
const getValueCoupon = async () => {
  siteStore.hasLoading();
  try {
    let res = await axios.post("getValueByCode", {
      code: inputCoupon.value,
    });
    siteStore.hasRes(res);
    if (res.data.data) {
      siteStore.cartInfo.coupon = res.data.data;
    }
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }

};
const submitCoupon = () => {
  formCoupon.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      getValueCoupon();
    }
  });
};
</script>

<template>
  <v-row>
    <v-col cols="12" lg="8">
      <v-card elevation="0" class="pa-2">

        <v-card-title class="font-weight-bold">
          Chọn phương thức giao hàng:
        </v-card-title>
        <v-radio-group
            v-model="selectedShipping"
            color="red-darken-3"
            :rules="[ruleShipping]"
            class="ma-4"
        >
          <v-row>
            <v-col cols="12" sm="4" v-for="item in typeShipping">
              <v-label class="m-pointer d-flex flex-column pa-2 m-box"
                       :class="selectedShipping === item.value ? 'active' : ''">
                <v-icon :icon="item.icon" size="35"></v-icon>
                <h5 class="text-red-darken-3 m-text">{{ item.name }}</h5>
                <p class="text-body-2 m-text">{{ item.text }}</p>
                <v-radio :value="item.value"></v-radio>
              </v-label>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-card>
      <v-card class="ma-6 pa-2">
        <v-card-title class="font-weight-bold">
          Su dung ma giam gia:
        </v-card-title>
        <v-card-item>
          <v-form ref="formCoupon" validate-on="submit" @submit.prevent="submitCoupon">
            <v-text-field :disabled="!!(siteStore.cartInfo.coupon)"
                          :rules="[(value)=>{return value?true:'Vui lòng nhập dữ liệu'}]"
                          density="compact" variant="solo-filled" label="Nhập mã giảm giá" v-model="inputCoupon"
                          autocomplete="off" prepend-inner-icon="mdi-ticket-percent-outline">
              <template #append>
                <v-btn type="submit" size="large">Xác nhận</v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card>
        <v-card-title class="font-weight-bold">
          Thông tin:
        </v-card-title>
        <v-card-item>
          <div>
            <v-card
                v-if="siteStore.cartInfo.infoAddress.name"
                class="pa-2"
            >
              <v-card-subtitle>Địa chỉ giao hàng:</v-card-subtitle>
              <v-card-title class="text-body-1 font-weight-bold">{{ siteStore.cartInfo.infoAddress.name }} -
                {{ siteStore.cartInfo.infoAddress.phone_number }}
              </v-card-title>
              <v-card-text class="pa-0">{{ siteStore.cartInfo.infoAddress.address }} <br>
                {{ siteStore.cartInfo.infoAddress.ward }}, {{ siteStore.cartInfo.infoAddress.district }},
                {{ siteStore.cartInfo.infoAddress.city }}
              </v-card-text>
            </v-card>
          </div>
          <div>
            <v-card
                v-if="selectedShipping"
                class="pa-2"
            >
              <v-card-subtitle>Phương thức giao hàng:</v-card-subtitle>
              <v-card-title class="text-body-1 font-weight-bold">{{ infoSelected.name }} -
                {{ formatPrice(priceShipping) }}
              </v-card-title>
              <v-card-text class="pa-0">{{ infoSelected.text }}
              </v-card-text>
            </v-card>
          </div>
          <div>
            <v-card
                v-if="siteStore.cartInfo.coupon"
                class="pa-2"
            >
              <v-card-subtitle>Mã giảm giá:</v-card-subtitle>
              <v-card-title class="text-body-1 font-weight-bold">{{ siteStore.cartInfo.coupon.code }}<v-icon color="red-darken-2" @click="siteStore.cartInfo.coupon=null">mdi-close-circle</v-icon></v-card-title>
              <v-card-text class="pa-0">Tên mã: {{ siteStore.cartInfo.coupon.name }}<br>
                {{typeValue }}
              </v-card-text>
              <v-card-text  class="pa-0" v-if="siteStore.cartInfo.coupon.type_value!=='free_shipping'">Giá trị:{{siteStore.cartInfo.coupon.type_value==='percent_value'? siteStore.cartInfo.coupon.value+"%": formatPrice(siteStore.cartInfo.coupon.value) }}</v-card-text>
            </v-card>
          </div>
        </v-card-item>
        <v-card-actions>
          <v-btn :disabled="!selectedShipping"
                 @click="()=>{siteStore.cartInfo.selectStep ='stepPayment'; siteStore.cartInfo.shipping = infoSelected}"
                 block variant="flat" color="red">
            Phương thức thanh toán
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>