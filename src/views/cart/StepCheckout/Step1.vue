<script setup>
import {onMounted, ref, watch, watchEffect} from "vue";
import {siteData} from "@/stores/globals";
import dataAddress from "../../../utils/data-address.json";
import axios from "@/axiosComfig";
import {rule_phone} from "@/validators";


const siteStore = siteData();

const refFormA = ref();
const refFormC = ref();

const modelAddress = ref(false);

const formCAddress = ref({
  name: "",
  phone_number: "",
  address: "",
  ward: null,
  district: null,
  city: null
});

const formAAddress = ref({
  name: "",
  phone_number: "",
  address: "",
  ward: null,
  district: null,
  city: null
});

const listDistrict = ref([]);
const listWards = ref([]);

watch(() => formCAddress.value.city, () => {
  if (formCAddress.value.city) {
    listDistrict.value = dataAddress.find(item => item.Name === formCAddress.value.city).Districts;
    listWards.value = [];
    formCAddress.value.district = null;
    formCAddress.value.ward = null;
  }
});

watch(() => formCAddress.value.district, () => {
  if (formCAddress.value.district) {
    listWards.value = listDistrict.value.find(item => item.Name === formCAddress.value.district).Wards;
    formCAddress.value.ward = null;
  }
});

watch(() => formAAddress.value.city, () => {
  if (formAAddress.value.city) {
    listDistrict.value = dataAddress.find(item => item.Name === formAAddress.value.city).Districts;
    listWards.value = [];
    formAAddress.value.district = null;
    formAAddress.value.ward = null;
  }
});
watch(() => formAAddress.value.district, () => {
  if (formAAddress.value.district) {
    listWards.value = listDistrict.value.find(item => item.Name === formAAddress.value.district).Wards;
    formAAddress.value.ward = null;
  }
});


const userListAddress = ref([]);
const checkIndex = ref();

watchEffect(() => {
  if (userListAddress.value.length > 0) {
    checkIndex.value = userListAddress.value.findIndex(item => item.name === siteStore.cartInfo.infoAddress.name && item.phone_number === siteStore.cartInfo.infoAddress.phone_number && item.city === siteStore.cartInfo.infoAddress.city && item.district === siteStore.cartInfo.infoAddress.district && item.ward === siteStore.cartInfo.infoAddress.ward && item.address === siteStore.cartInfo.infoAddress.address);
  }
});

const addNewAddress = async () => {
  siteStore.hasLoading();
  try {
    let res = await axios.post("createAddress", formCAddress.value);
    siteStore.hasRes(res);
    modelAddress.value = false;
    await fetchAddress();
  } catch (e) {
    if (e.response.status === 401) {
      siteStore.hadDisable();
    } else {
      siteStore.errorSystem();
      console.log(e);
    }
  } finally {
    siteStore.doneLoading();
  }
};
const fetchAddress = async () => {
  siteStore.hasLoading();
  try {
    let res = await axios.get("showListAddressOfUser");
    userListAddress.value = res.data;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
};
const submitAdd = () => {
  refFormA.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      siteStore.cartInfo.infoAddress = formAAddress.value;
      formAAddress.value = {};
    }
  });
};
const submitCreate = () => {
  refFormC.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      addNewAddress();
      formCAddress.value = {};
    }
  });
};
onMounted(() => {
  if (!siteStore.useGuest) {
    fetchAddress();
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12" lg="8">
      <div class="ps-4">
        <v-btn v-if="siteStore.isLogin" color="red-darken-2" @click="modelAddress=true">Thêm địa chỉ mới</v-btn>
      </div>
      <v-card v-if="userListAddress.length" elevation="0" class="pa-2">
        <v-card-title class="font-weight-bold">Địa chỉ của bạn:</v-card-title>
        <v-row class="ma-1">
          <v-col cols="12" md="6" v-for="(item,index) in userListAddress" :key="index">
            <v-card class="pa-2" @click="()=>{Object.assign(siteStore.cartInfo.infoAddress,item)}"
                    :ripple="{ class: 'text-red' }">
              <v-card-title class="text-body-1 font-weight-bold">{{ item.name }} - {{ item.phone_number }}
                <v-icon v-if="checkIndex===index" color="red-darken-2">mdi-check-circle</v-icon>
              </v-card-title>
              <v-card-text>{{ item.address }} <br>
                {{ item.ward }}, {{ item.district }}, {{ item.city }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card-title class="font-weight-bold">Hoặc theo địa chỉ tuỳ chỉnh:</v-card-title>
      </v-card>
      <v-sheet>
        <v-row class="ma-2">
          <v-col cols="12">
            <v-form ref="refFormA" @submit.prevent="submitAdd" validate-on="blur">
              <v-text-field v-model="formAAddress.name"
                            label="Tên người nhận"
                            :rules="[(value)=>{return value?true:'Vui lòng nhập dữ liệu'}]"
                            variant="outlined"
                            density="compact"
                            prepend-inner-icon="mdi-map-marker"
                            autocomplete="off">
              </v-text-field>
              <v-text-field v-model="formAAddress.phone_number"
                            label="Số điện thoại"
                            :rules="[rule_phone]"
                            variant="outlined"
                            density="compact"
                            prepend-inner-icon="mdi-phone-dial"
                            autocomplete="off">
              </v-text-field>
              <v-autocomplete
                  density="compact"
                  label="Tỉnh thành"
                  v-model="formAAddress.city"
                  :items="dataAddress"
                  :rules="[()=>{return formAAddress.city?true:'Vui lòng chọn dữ liệu'}]"
                  item-title="Name"
                  item-value="Name"
                  variant="outlined"
                  autocomplete="off"
              ></v-autocomplete>
              <v-autocomplete
                  density="compact"
                  label="Quận huyện"
                  v-model="formAAddress.district"
                  :items="listDistrict"
                  :rules="[()=>{return formAAddress.district?true:'Vui lòng chọn dữ liệu'}]"
                  item-title="Name"
                  item-value="Name"
                  variant="outlined"
                  autocomplete="off"
              ></v-autocomplete>
              <v-autocomplete
                  density="compact"
                  label="Phường xã"
                  v-model="formAAddress.ward"
                  :rules="[()=>{return formAAddress.ward?true:'Vui lòng chọn dữ liệu'}]"
                  :items="listWards"
                  item-title="Name"
                  item-value="Name"
                  variant="outlined"
                  autocomplete="off"
              ></v-autocomplete>
              <v-text-field v-model="formAAddress.address"
                            label="Địa chỉ số nhà"
                            variant="outlined"
                            :rules="[(value)=>{return value?true:'Vui lòng nhập dữ liệu'}]"
                            density="compact"
                            prepend-inner-icon="mdi-map-marker"
                            autocomplete="off">
              </v-text-field>
              <v-btn type="submit" color="red-darken-2" class="ma-2">
                Xác nhận
              </v-btn>
              <v-btn type="reset" color="blue-grey-darken-1" class="ma-2">Xoá</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card>
        <v-card-title class="font-weight-bold">
          Thông tin:
        </v-card-title>
        <v-card-item>
          <v-card-subtitle>Giỏ hàng:</v-card-subtitle>
          <div>
            <v-card
                v-if="siteStore.listCart.length"
                class="pa-2 scrollbar"
                elevation="0"
                style="max-height: 350px; overflow-y:auto"
            >
              <v-row v-for="(product, index) in siteStore.listCart" :key="index">
                <v-col cols="3">
                  <div> <v-img class="ma-auto" max-width="80" aspect-ratio="3/4" cover :src="'http://localhost:8000/'+product.info.image" @error="siteStore.errorImage(60,80)" :alt="product.info.name"></v-img></div>
                </v-col>
                <v-col cols="9" class="d-flex flex-column justify-space-between">
                  <v-card-title class="text-body-2 font-weight-bold" :title="product.info.name+' - '+product.info.name_variant">{{ product.info.name }}</v-card-title>

                  <v-card-text v-if="product.info.name_variant" class="pa-0">
                    <v-badge color="white" class="border rounded border-danger px-2 me-2"
                             v-for="variation in product.info.name_variant"
                             :key="variation" :content="variation" inline></v-badge>
                  </v-card-text>
                  <v-card-text v-if="product.info.name_variant" class="pa-0">
                    {{product.quantity}} x {{ formatPrice(product.info.discount_price??product.info.sell_price) }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <v-card-subtitle>Địa chỉ giao hàng:</v-card-subtitle>
          <div>
            <v-card elevation="0"
                v-if="siteStore.cartInfo.infoAddress.name"
                class="pa-2"
                @click="()=>{Object.assign(formAAddress , siteStore.cartInfo.infoAddress)}"
                :ripple="{ class: 'text-red' }"
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
        </v-card-item>
        <v-card-actions>
          <v-btn :disabled="!siteStore.cartInfo.infoAddress.name"
                 @click="siteStore.cartInfo.selectStep ='stepShipping'" block variant="flat" color="red">
            Vận chuyển & Mã giảm giá
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog
      v-model="modelAddress"
      persistent
      max-width="550"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="modelAddress = !modelAddress"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h5 font-weight-bold ms-3">Thêm địa chỉ mới</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="refFormC" @submit.prevent="submitCreate" validate-on="submit">
          <v-text-field v-model="formCAddress.name"
                        label="Tên địa chỉ"
                        :rules="[(value)=>{return value?true:'Vui lòng nhập dữ liệu'}]"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-map-marker"
                        autocomplete="off">
          </v-text-field>
          <v-text-field v-model="formCAddress.phone_number"
                        label="Số điện thoại"
                        :rules="[rule_phone]"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-phone-dial"
                        autocomplete="off">
          </v-text-field>
          <v-autocomplete
              density="compact"
              label="Tỉnh thành"
              v-model="formCAddress.city"
              :items="dataAddress"
              :rules="[()=>{return formCAddress.city?true:'Vui lòng chọn dữ liệu'}]"
              item-title="Name"
              item-value="Name"
              variant="outlined"
              autocomplete="off"
          ></v-autocomplete>
          <v-autocomplete
              density="compact"
              label="Quận huyện"
              v-model="formCAddress.district"
              :items="listDistrict"
              item-title="Name"
              item-value="Name"
              :rules="[()=>{return formCAddress.district?true:'Vui lòng chọn dữ liệu'}]"
              variant="outlined"
              autocomplete="off"
          ></v-autocomplete>
          <v-autocomplete
              density="compact"
              label="Phường xã"
              v-model="formCAddress.ward"
              :items="listWards"
              item-title="Name"
              :rules="[()=>{return formCAddress.ward?true:'Vui lòng chọn dữ liệu'}]"
              item-value="Name"
              variant="outlined"
              autocomplete="off"
          ></v-autocomplete>
          <v-text-field v-model="formCAddress.address"
                        label="Tên địa chỉ"
                        variant="outlined"
                        :rules="[(value)=>{return value?true:'Vui lòng nhập dữ liệu'}]"
                        density="compact"
                        prepend-inner-icon="mdi-map-marker"
                        autocomplete="off">
          </v-text-field>
          <v-btn color="red-darken-2" class="ma-2" type="submit">Thêm mới</v-btn>
          <v-btn @click="modelAddress = !modelAddress" color="blue-grey-darken-1" class="ma-2">Thoát</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>