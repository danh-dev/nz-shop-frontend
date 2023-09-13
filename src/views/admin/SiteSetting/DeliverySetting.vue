<template>
  <v-form @submit.prevent="updateDSetting">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item-title class="text-h6 font-weight-bold ma-2 pa-2 d-flex justify-space-between align-center">
              Phương thức giao hàng cố định:
              <v-btn class="ma-2" color="red-darken-2" @click="addNew">Thêm mới</v-btn>
            </v-list-item-title>
            <v-row class="ma-1 pa-2 font-weight-bold">
              <v-col cols="1" class="d-flex justify-center align-center">
                Icon
              </v-col>
              <v-col cols="3">
                Tên
              </v-col>
              <v-col cols="5">
                Chi Tiết
              </v-col>
              <v-col cols="2">
                Giá
              </v-col>
              <v-col cols="1" class="d-flex justify-center align-center">
              </v-col>
            </v-row>
            <v-list-item v-for="(item,index) in typeShipping" :key="index">
              <v-card elevation="2" class="ma-1 pa-5" rounded>
                <v-row>
                  <v-col cols="4">
                    <v-text-field density="compact" variant="outlined" v-model="item.name"
                                  :rules="[v => !!v || 'Name is required',v => v && v.length <= 20 || 'Name must be less than 20 characters']"
                    >
                      <template #prepend>
                        <v-icon size="35" :color="!item.icon?'red-darken-2':null"
                                @click="()=>{pickIcon=!pickIcon; selectedPicker=item.icon||'';iconIndex=index;}">{{
                            item.icon || "mdi-selection-search"
                          }}
                        </v-icon></template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field density="compact" variant="outlined" v-model="item.text" :rules="[v => !!v || 'Text is required',v => v && v.length <= 50 || 'Text must be less than 50 characters'
      ]"></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field density="compact" variant="outlined" v-model="item.value" suffix="đ"
                                  :rules="[v => !!v || 'Value is required',v => !isNaN(parseInt(v)) && v >= 0 || 'Value must be a number greater than or equal to 0']">
                      <template #append>
                        <v-btn  size="30" color="red-darken-2"
                               @click="()=>{typeShipping.splice(index, 1);}">
                          <v-icon size="25">mdi-delete-empty-outline</v-icon>
                        </v-btn></template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span class="text-h6 font-weight-bold ma-2 pa-2 d-flex justify-space-between align-center">Giao hàng đối tác API:</span>
          <v-card class="ma-3" elevation="2">
            <v-card-title class="text-body-1 font-weight-bold">Giao hàng nhanh:</v-card-title>
            <v-card-item>
              <v-row><v-col cols="8">
                <v-text-field density="compact" variant="outlined" label="API Giao Hàng Nhanh" v-model="apiGHN"
                              class="ma-2"></v-text-field></v-col><v-col cols="4">
                <v-text-field density="compact" variant="outlined" label="Shop ID" v-model="shopIDGHN"
                              class="ma-2"></v-text-field></v-col></v-row>
            </v-card-item>
            <v-card-item>
              <v-text-field density="compact" variant="outlined" label="URL API" v-model="apiGHN_URL"
                            class="ma-2"></v-text-field>
            </v-card-item>
          </v-card>
          <v-card class="ma-3" elevation="2">
            <v-card-title class="text-body-1 font-weight-bold">Giao hàng tiết kiệm:</v-card-title>
            <v-card-item>
              <v-text-field density="compact" variant="outlined" label="API Giao Hàng Tiết Kiệm" v-model="apiGHTK"
                            class="ma-2"></v-text-field>
            </v-card-item>
            <v-card-item>
              <v-text-field density="compact" variant="outlined" label="URL API" v-model="apiGHTK_URL"
                            class="ma-2"></v-text-field>
            </v-card-item>

          </v-card>
        </v-col>
      </v-row>
      <v-btn class="ma-3" color="red-darken-2" type="submit">Lưu</v-btn>
    </v-container>
  </v-form>
  <v-dialog
      v-model="pickIcon"
      max-width="650"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="()=>{pickIcon=!pickIcon}"></v-btn>
      </template>
      <v-card-title>
        <span
            class="text-h5 font-weight-bold ms-3">Chọn Icon:  </span>
        <v-icon>{{ selectedPicker }}</v-icon>
      </v-card-title>
      <v-card-text class="d-flex flex-wrap">
        <v-icon size="35" class="ma-3 pa-3" v-for="(icon,index) in allIcons" :key="index"
                @click="()=>{selectedPicker = allIcons[index]}">
          {{ icon }}
        </v-icon>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red-darken-2" variant="flat"
               @click="()=>{typeShipping[iconIndex].icon = selectedPicker; pickIcon=!pickIcon}">Save
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>
<script setup>
import {onMounted, ref} from "vue";
import "vue-advanced-cropper/dist/style.css";
import {siteData} from "@/stores/globals";
import axios from "@/axiosComfig";

const siteStore = siteData();
const pickIcon = ref(false);
const selectedPicker = ref(null);
const iconIndex = ref();
const typeShipping = ref([]);
const allIcons = ref([
  "mdi-truck-outline",
  "mdi-truck-fast-outline",
  "mdi-truck-plus-outline",
  "mdi-truck-delivery-outline",
  "mdi-moped-outline",
  "mdi-moped-electric-outline",
  "mdi-store-marker-outline",
  "mdi-storefront-outline",
  "mdi-dots-vertical-circle-outline",
  "mdi-square-rounded-badge-outline",
  "mdi-cloud-refresh-variant-outline",
  "mdi-clock-star-four-points-outline",
  "mdi-shield-account-variant-outline",
  "mdi-information-slab-circle-outline",
  "mdi-star-four-points-circle-outline",
  "mdi-badge-account-horizontal-outline",
  "mdi-card-account-details-star-outline",
  "mdi-file-document-arrow-right-outline",
  "mdi-information-variant-circle-outline",
  "mdi-numeric-9-plus-box-multiple-outline"]);
const apiGHN = ref("");
const apiGHN_URL = ref("");
const shopIDGHN = ref("");
const apiGHTK = ref("");
const apiGHTK_URL = ref("");
const addNew = () => {
  typeShipping.value.push({icon: "", name: "", text: "", value: ""});
};
const fetchDSetting = async () => {
  siteStore.isLoading = true;
  try {
    const res = await axios.get("fetchDSetting");
    typeShipping.value = JSON.parse(res.data.custom_Shipping)||[];
    shopIDGHN.value = JSON.parse(res.data.api_ghn).shopID||null;
    apiGHN.value = JSON.parse(res.data.api_ghn).key||null;
    apiGHN_URL.value = JSON.parse(res.data.api_ghn).url||null;
    apiGHTK.value = JSON.parse(res.data.api_ghtk).key||null;
    apiGHTK_URL.value = JSON.parse(res.data.api_ghtk).url||null;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const updateDSetting = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put("updateSetting", {
      custom_Shipping: JSON.stringify(typeShipping.value),
      api_ghtk: JSON.stringify({key:apiGHTK.value,url:apiGHTK_URL.value}),
      api_ghn: JSON.stringify({shopID:shopIDGHN.value,key:apiGHN.value,url:apiGHN_URL.value}),
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    await fetchDSetting();
    siteStore.isLoading = false;
  }
};
onMounted(()=>{
  fetchDSetting();
})
</script>
<style scoped>

</style>