<script setup>
import {siteData} from "@/stores/globals";
import axios from "@/axiosComfig";

const siteStore = siteData();

const createOrder = async () => {
  try {
    siteStore.isLoading = true;
    let res = await axios.post("createOrder", {
      emailBuyer: siteStore.emailBuyer,
      phoneNumberTracking: siteStore.cartInfo.infoAddress.phone_number,
      items: siteStore.listCart,
      addressShipping: siteStore.cartInfo.infoAddress,
      delivery: siteStore.cartInfo.shipping,
      coupon: siteStore.cartInfo.coupon.code,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};

const onSubmit = async () => {
  let errors = 0;
  if (!siteStore.emailBuyer) {
    siteStore.hasRes({data: {status: "error", message: "Thiếu dữ liệu email tiếp nhận đơn hàng"}});
    errors++;
  }
  if (!siteStore.cartInfo.infoAddress.phone_number) {
    siteStore.hasRes({data: {status: "error", message: "Thiếu dữ liệu số điện thoại nhận hàng"}});
    errors++;
  }
  if (siteStore.listCart <= 0) {
    siteStore.hasRes({data: {status: "error", message: "Giỏ hàng trống???"}});
    errors++;
  }
  if (Object.keys(siteStore.cartInfo.shipping).length === 0) {
    siteStore.hasRes({data: {status: "error", message: "Thiếu dữ liệu hình thức vận chuyển"}});
    errors++;
  }
  if (errors === 0) {
    await createOrder();
  }
};

</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="1" class="ma-1">
        <v-card-title class="font-weight-bold">
          Chi tiết đơn hàng:
        </v-card-title>
        <v-row class="pa-5">
          <v-col cols="12" lg="8" class="scrollbar" style="max-height: 500px; overflow-y: auto">
            <v-row v-for="(product, index) in siteStore.listCart" :key="index">
              <v-col cols="3">
                <div>
                  <v-img class="ma-auto" max-width="80" aspect-ratio="3/4" cover
                         :src="'http://localhost:8000/'+product.info.image" @error="siteStore.errorImage(60,80)"
                         :alt="product.info.name"></v-img>
                </div>
              </v-col>
              <v-col cols="9" class="d-flex flex-column justify-space-between">
                <v-card-title class="text-body-2 font-weight-bold"
                              :title="product.info.name+' - '+product.info.name_variant">{{ product.info.name }}
                </v-card-title>
                <v-card-text v-if="product.info.name_variant" class="pa-0">
                  <v-badge color="white" class="border rounded border-danger px-2 me-2"
                           v-for="variation in product.info.name_variant"
                           :key="variation" :content="variation" inline></v-badge>
                </v-card-text>
                <v-card-text class="pa-0">
                  {{ product.quantity }} x {{ formatPrice(product.info.discount_price || product.info.sell_price) }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="4" class="d-flex flex-column justify-space-between">
            <div class="my-2">
              <v-card
                  v-if="siteStore.cartInfo.infoAddress.name"
                  class="pa-2"
              >
                <v-card-subtitle class="font-weight-bold text-black ms-2">Địa chỉ giao hàng:
                  <v-btn density="compact" size="25" color="red-darken-2"
                         @click="siteStore.cartInfo.selectStep ='stepAddress'">
                    <v-icon size="20">mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-card-subtitle>
                <v-card-title class="text-body-1 font-weight-bold">{{ siteStore.cartInfo.infoAddress.name }} -
                  {{ siteStore.cartInfo.infoAddress.phone_number }}
                </v-card-title>
                <v-card-text>{{ siteStore.cartInfo.infoAddress.address }} <br>
                  {{ siteStore.cartInfo.infoAddress.ward }}, {{ siteStore.cartInfo.infoAddress.district }},
                  {{ siteStore.cartInfo.infoAddress.city }}
                </v-card-text>
              </v-card>
            </div>
            <div class="my-2">
              <v-card
                  v-if="siteStore.cartInfo.shipping.name"
                  class="pa-2"
              >
                <v-card-subtitle class="font-weight-bold text-black">Phương thức giao hàng:
                  <v-btn density="compact" size="25" color="red-darken-2"
                         @click="siteStore.cartInfo.selectStep ='stepShipping'">
                    <v-icon size="20">mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-card-subtitle>
                <v-card-title class="text-body-1 font-weight-bold">{{ siteStore.cartInfo.shipping.name }} -
                  {{ formatPrice(siteStore.priceShipping) }}
                </v-card-title>
                <v-card-text>{{ siteStore.cartInfo.shipping.text }}
                </v-card-text>
              </v-card>
            </div>
            <div class="my-2">
              <v-card color="red-darken-2" variant="tonal" rounded="5">
                <v-card-text class="d-flex justify-space-between py-2 text-blue-grey-darken-2 font-weight-black"><span>Giỏ hàng:</span>
                  {{ formatPrice(siteStore.totalValue) }}
                </v-card-text>
                <v-card-text class="d-flex justify-space-between py-2 text-blue-grey-darken-2 font-weight-black"><span>Phí ship:</span>
                  {{ formatPrice(siteStore.priceShipping) }}
                </v-card-text>
                <v-card-text v-if="siteStore.valueDiscount" class="d-flex justify-space-between py-2 text-blue-grey-darken-2 font-weight-black"><span>Giảm giá:</span>
                  {{ formatPrice(siteStore.valueDiscount) }}
                </v-card-text>
                <v-card-text class="d-flex justify-space-between text-blue-grey-darken-3 text-h6 font-weight-bold">
                  <span>Tổng đơn hàng:</span>
                  {{ formatPrice(siteStore.totalCart) }}
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="d-flex justify-center">
    <v-col cols="12" lg="3">
      <v-btn block color="red-darken-2  " @click="onSubmit">Xác nhận</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>