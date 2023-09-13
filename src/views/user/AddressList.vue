<script setup>
import {onMounted, ref, watch, watchEffect} from "vue";
import axios from "@/axiosComfig";
import {siteData} from "@/stores/globals";
import dataAddress from "@/utils/data-address.json";
import {rule_phone} from "@/validators";

const siteStore = siteData();
const refFormC = ref();

const modelAddress = ref(false);
const editId = ref();
const formCAddress = ref({
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

const userListAddress = ref([]);

const clickEdit = (v) => {
  editId.value = v.id;
  modelAddress.value = true;
  formCAddress.value.name = v.name;
  formCAddress.value.phone_number = v.phone_number;
  formCAddress.value.address = v.address;
  formCAddress.value.city = v.city;
  setTimeout(() => {
    formCAddress.value.district = v.district;
  }, 100);
  setTimeout(() => {
    formCAddress.value.ward = v.ward;
  }, 200);
};
const clickExit = () => {
  editId.value = null;
  modelAddress.value = false;
  formCAddress.value.name = null;
  formCAddress.value.phone_number = null;
  formCAddress.value.address = null;
  formCAddress.value.city = null;
  setTimeout(() => {
    formCAddress.value.district = null;
  }, 100);
  setTimeout(() => {
    formCAddress.value.ward = null;
  }, 200);
};
const deleteAddress = async (v) => {
  siteStore.hasLoading();
  try {
    let res = await axios.delete(`deleteAddress/${v}`);
    siteStore.hasRes(res);
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
}
const addNewAddress = async () => {
  siteStore.hasLoading();
  try {
    let res;
    if (editId.value) {
      res = await axios.put(`editAddressByID/${editId.value}`, formCAddress.value);
    } else {
      res = await axios.post("createAddress", formCAddress.value);
    }
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
const submitCreate = () => {
  refFormC.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      addNewAddress();
      formCAddress.value = {};
    }
  });
};
onMounted(() => {
  fetchAddress();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="ps-4">
        <v-btn v-if="siteStore.isLogin" color="red-darken-2" @click="modelAddress=true">Thêm địa chỉ mới</v-btn>
      </div>
      <v-card v-if="userListAddress.length" elevation="0" class="pa-2">
        <v-card-title class="font-weight-bold">Địa chỉ của bạn:</v-card-title>
        <v-row class="ma-1">
          <v-col cols="12" md="6" v-for="(item,index) in userListAddress" :key="index">
            <v-card class="pa-2" :ripple="{ class: 'text-red' }">
              <v-card-title class="text-body-1 font-weight-bold">{{ item.name }} - {{ item.phone_number }}
              </v-card-title>
              <v-card-text>{{ item.address }} <br>
                {{ item.ward }}, {{ item.district }}, {{ item.city }}
              </v-card-text>
              <v-card-actions><v-btn @click="clickEdit(item)" variant="flat" color="red-darken-2">Sửa địa chỉ</v-btn><v-btn @click="deleteAddress(item.id)" variant="flat" color="blue-grey-darken-1">Xoá địa chỉ</v-btn></v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="clickExit"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h5 font-weight-bold ms-3">{{ editId ? "Sửa địa chỉ" : "Thêm địa chỉ mới" }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="refFormC" @submit.prevent="submitCreate" validate-on="submit">
          <v-text-field v-model="formCAddress.name"
                        label="Tên người nhận"
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
          <v-btn color="red-darken-2" class="ma-2" type="submit">{{ editId ? "Cập nhật" : "Thêm mới" }}</v-btn>
          <v-btn @click="clickExit" color="blue-grey-darken-1" class="ma-2">Thoát</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>