<script setup>
import {siteData} from "@/stores/globals";
import {computed, onMounted, ref, watch} from "vue";
import axios from "@/axiosComfig";

const siteStore = siteData();
const formCoupon = ref();
const inputCoupon = ref();
const selectedShipping = ref();
const apiGHN = ref("");
const apiGHTK = ref("");
const infoSelected = computed(() => selectedShipping.value !== null && selectedShipping.value !== undefined ? typeShipping.value[selectedShipping.value] : {});
const priceShipping = computed(() => {
  if (siteStore.cartInfo.coupon && siteStore.cartInfo.coupon.type_value === "free_shipping") {
    return 0;
  }
  if (siteStore.cartInfo.coupon && siteStore.cartInfo.coupon.type_value === "reduce_shipping") {
    let calculatePrice = typeShipping.value[selectedShipping.value].value - siteStore.cartInfo.coupon.value;
    return calculatePrice>=0?calculatePrice:0;
  }
  return typeShipping.value[selectedShipping.value].value;
});
const typeShipping = ref([]);
watch(() => apiGHTK.value, async () => {
  await fetchGHTK();
});
const fetchDSetting = async () => {
  siteStore.isLoading = true;
  try {
    const res = await axios.get("fetchPublicDSetting");
    typeShipping.value = JSON.parse(res.data.custom_Shipping) || [];
    apiGHN.value = res.data.api_ghn;
    apiGHTK.value = res.data.api_ghtk;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const fetchGHTK = async () => {
  siteStore.isLoading = true;
  try {
    const res = await axios.post("API_PROXY_GHTK", {
      pick_province: "Thành Phố Hồ Chí Minh",
      pick_district: "Quận 3",
      province: siteStore.cartInfo.infoAddress.city,
      district: siteStore.cartInfo.infoAddress.district,
      weight: 500 * siteStore.totalUnit
    });
    if (res.data.success) {
      typeShipping.value.push({
        icon: "mdi-truck-cargo-container",
        name: "Giao Hàng Tiết Kiệm",
        text: "Đối tác Giao hàng tiết kiệm",
        value: res.data.data
      });
    }
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
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
  if (siteStore.cartInfo.coupon.type_value === "number_value" && siteStore.cartInfo.coupon.type_coupon === "onproduct") {
    return "Giảm trực tiếp số tiền trên mỗi sản phẩm chỉ định";
  }
  if (siteStore.cartInfo.coupon.type_value === "percent_value" && siteStore.cartInfo.coupon.type_coupon === "totalcart") {
    return "Giảm trực theo phần trăm tiền tổng đơn";
  }
  if (siteStore.cartInfo.coupon.type_value === "percent_value" && siteStore.cartInfo.coupon.type_coupon === "onproduct") {
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
onMounted(async () => {
  await fetchDSetting();
});
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
            class="ma-4"
            v-if="typeShipping.length>0"
        >
          <v-row>
            <v-col cols="12" sm="4" v-for="(type,index) in typeShipping" :key="index">
              <v-label class="m-pointer d-flex flex-column pa-2 m-box"
                       :class="selectedShipping === index ? 'active' : ''">
                <v-icon :icon="type.icon?type.icon:'mdi-truck-cargo-container'" size="35"></v-icon>
                <h5 class="text-red-darken-3 m-text">{{ type.name }}</h5>
                <p class="text-body-2 m-text">{{ type.text }}</p>
                <p class="text-body-2 m-text">{{ formatPrice(type.value) }}</p>
                <v-radio :value="index"></v-radio>
              </v-label>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-card>
      <v-card class="ma-6 pa-2">
        <v-card-title class="font-weight-bold">
          Sử dụng mã giảm giá:
        </v-card-title>
        <v-card-item>
          <v-form ref="formCoupon" validate-on="submit" @submit.prevent="submitCoupon">
            <v-text-field :disabled="!!(siteStore.cartInfo.coupon)"
                          :rules="[(value)=>{return value?true:'Vui lòng nhập dữ liệu'}]"
                          density="compact" variant="solo-filled" label="Nhập mã giảm giá" v-model="inputCoupon"
                          autocomplete="off" prepend-inner-icon="mdi-ticket-percent-outline">
              <template #append>
                <v-btn type="submit" size="large" color="red-darken-2">Xác nhận</v-btn>
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
          <v-card-subtitle class="font-weight-bold text-black ms-2">Giỏ hàng:</v-card-subtitle>
          <div>
            <v-card
                v-if="siteStore.listCart.length"
                class="pa-2"
                elevation="0"
            >
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

                  <v-card-text v-if="product.info.name_variant.length>0" class="pa-0">
                    <v-badge color="white" class="border rounded border-danger px-2 me-2"
                             v-for="variation in product.info.name_variant"
                             :key="variation" :content="variation" inline></v-badge>
                  </v-card-text>
                  <v-card-text v-if="product.info.name_variant.length>0" class="pa-0">
                    {{ product.quantity }} x {{ formatPrice(product.info.discount_price ?? product.info.sell_price) }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <v-card-subtitle class="font-weight-bold text-black ms-2">Địa chỉ giao hàng:</v-card-subtitle>
          <div>
            <v-card elevation="0"
                    v-if="siteStore.cartInfo.infoAddress.name"
                    class="pa-2"
            >
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
                v-if="infoSelected.name"
                class="pa-2"
            >
              <v-card-subtitle class="font-weight-bold text-black">Phương thức giao hàng:</v-card-subtitle>
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
              <v-card-subtitle class="font-weight-bold text-black">Mã giảm giá:</v-card-subtitle>
              <v-card-title class="text-body-1 font-weight-bold"><v-icon color="red-darken-2" @click="siteStore.cartInfo.coupon=null">mdi-close-circle</v-icon>{{ siteStore.cartInfo.coupon.code }}

              </v-card-title>
              <v-card-text class="pa-0">Tên mã: {{ siteStore.cartInfo.coupon.name }}<br>
                {{ typeValue }}
              </v-card-text>
              <v-card-text class="pa-0" v-if="siteStore.cartInfo.coupon.type_value!=='free_shipping'">Giá trị:{{
                  siteStore.cartInfo.coupon.type_value === "percent_value" ? siteStore.cartInfo.coupon.value + "%" : formatPrice(siteStore.cartInfo.coupon.value)
                }}
              </v-card-text>
            </v-card>
          </div>
        </v-card-item>
        <v-card-item>
          <v-card elevation="2" color="red" variant="tonal" rounded="5" class="ma-1">
            <v-card-text class="d-flex justify-space-between"><span>Giỏ hàng:</span> {{formatPrice(siteStore.totalValue)}}</v-card-text>
          </v-card>
        </v-card-item>
        <v-card-actions>
          <v-btn :disabled="!infoSelected.value"
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