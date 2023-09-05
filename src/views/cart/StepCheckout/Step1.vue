<script setup>
import {onMounted, ref, watch} from "vue";
import {siteData} from "@/stores/globals";
import dataAddress from "../../../utils/data-address.json";
import axios from "@/axiosComfig";

const siteStore = siteData();

const modelAddress = ref(false);
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

// const userListAddress = ref([
//   {
//     name: "Nhà riêng",
//     phone_number:"0359901221",
//     address: "372/30 Cách mạng tháng 8",
//     ward: "Phường 10",
//     district: "Quận 3",
//     city: "Hồ Chí Minh",
//   }, {
//     name: "FPT Aptech",
//     phone_number: "0359901221",
//     address: "391A Đ. Nam Kỳ Khởi Nghĩa",
//     ward: "Phường 8",
//     district: "Quận 3",
//     city: "Hồ Chí Minh",
//   },
// ]);

const addNewAddress = async () => {
  siteStore.hasLoading();
  try {
    let res = await axios.post("createAddress", formCAddress.value);
    siteStore.hasRes(res);
    modelAddress.value = false;
    await fetchAddress();
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
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
onMounted(() => {
  if(!siteStore.useGuest){
    fetchAddress();
  }
});
</script>

<template>
  <v-card v-if="userListAddress.length"  elevation="0" class="pa-2">
    <v-card-title class="font-weight-bold">Địa chỉ của bạn:</v-card-title>
    <v-row class="ma-1">
      <v-col cols="12" md="6" v-for="(item,index) in userListAddress" :key="index">
        <v-card class="pa-2" @click="()=>{siteStore.cartInfo.infoAddress = item}" :ripple="false"
                :class="siteStore.cartInfo.infoAddress===item?'address-selected':null">
          <v-card-title class="text-body-1 font-weight-bold">{{ item.name }} - {{ item.phone_number }}</v-card-title>
          <v-card-text>{{ item.address }} <br>
            {{ item.ward }}, {{ item.district }}, {{ item.city }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <div class="ma-4">
    <v-btn color="red-darken-2" @click="modelAddress=true">Thêm địa chỉ mới</v-btn>
  </div>
  <div>
    <!--  <v-form>-->
    <!--    <v-container>-->
    <!--      <v-row>-->
    <!--        <v-col cols="12">-->
    <!--          <v-text-field v-model="formGSName"-->
    <!--                        label="Shop Name"-->
    <!--                        variant="outlined"-->
    <!--                        density="compact"-->
    <!--                        persistent-hint-->
    <!--                        hint="Click Favicon để update favicon"-->
    <!--                        autocomplete="off">-->
    <!--          </v-text-field>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--      <v-row>-->
    <!--        <v-col cols="12" md="4">-->
    <!--          <v-hover v-slot="{ isHovering, props }">-->
    <!--            <div class="m-box active d-flex pa-3 justify-center position-relative bg-grey-lighten-3" v-bind="props"-->
    <!--                 @click="openModel('fileNewLogoBG')">-->
    <!--              <v-chip-->
    <!--                  v-if="!isHovering"-->
    <!--                  class="position-absolute"-->
    <!--                  density="compact"-->
    <!--                  color="red-darken-2"-->
    <!--                  style="top:0;left:0;margin-top:-8px"-->
    <!--                  variant="elevated">-->
    <!--                Logo Website-->
    <!--              </v-chip>-->
    <!--              <div>-->
    <!--                <v-img v-if="fileNewLogoBG" :src="fileNewLogoBG" alt="logo background" width="180"></v-img>-->
    <!--                <v-img v-else :src="oldLogoBG" alt="logo background" width="180"></v-img>-->
    <!--              </div>-->
    <!--              <v-expand-transition>-->
    <!--                <div-->
    <!--                    v-if="isHovering"-->
    <!--                    class="d-flex transition-fast-in-fast-out bg-blue-grey-darken-1 v-card&#45;&#45;reveal"-->
    <!--                    style="height: 100%;"-->
    <!--                >-->
    <!--                  <v-btn variant="plain" stacked class="text-h6 font-weight-bold w-100" color="white">-->
    <!--                    Click Upload-->
    <!--                    <template #prepend>-->
    <!--                      <v-icon icon="mdi-cloud-upload-outline" size="35"></v-icon>-->
    <!--                    </template>-->
    <!--                  </v-btn>-->
    <!--                </div>-->
    <!--              </v-expand-transition>-->
    <!--            </div>-->
    <!--          </v-hover>-->
    <!--        </v-col>-->
    <!--        <v-col cols="12" md="4">-->
    <!--          <v-hover v-slot="{ isHovering, props }">-->
    <!--            <div class="m-box active d-flex pa-3 justify-center position-relative bg-grey-lighten-3" v-bind="props"-->
    <!--                 @click="openModel('fileNewLogoWH')">-->
    <!--              <v-chip-->
    <!--                  v-if="!isHovering"-->
    <!--                  class="position-absolute"-->
    <!--                  density="compact"-->
    <!--                  color="red-darken-2"-->
    <!--                  style="top:0;left:0;margin-top:-8px"-->
    <!--                  variant="elevated">-->
    <!--                Logo Website-->
    <!--              </v-chip>-->
    <!--              <div>-->
    <!--                <v-img v-if="fileNewLogoWH" :src="fileNewLogoWH" alt="logo background" width="180"></v-img>-->
    <!--                <v-img v-else :src="oldLogoWH" alt="logo background" width="180"></v-img>-->
    <!--              </div>-->
    <!--              <v-expand-transition>-->
    <!--                <div-->
    <!--                    v-if="isHovering"-->
    <!--                    class="d-flex transition-fast-in-fast-out bg-blue-grey-darken-1 v-card&#45;&#45;reveal"-->
    <!--                    style="height: 100%;"-->
    <!--                >-->
    <!--                  <v-btn variant="plain" stacked class="text-h6 font-weight-bold w-100" color="white">-->
    <!--                    Click Upload-->
    <!--                    <template #prepend>-->
    <!--                      <v-icon icon="mdi-cloud-upload-outline" size="35"></v-icon>-->
    <!--                    </template>-->
    <!--                  </v-btn>-->
    <!--                </div>-->
    <!--              </v-expand-transition>-->
    <!--            </div>-->
    <!--          </v-hover>-->
    <!--        </v-col>-->
    <!--        <v-col cols="12" md="4">-->
    <!--          <v-hover v-slot="{ isHovering, props }">-->
    <!--            <div class="m-box active d-flex pa-3 justify-center position-relative bg-grey-lighten-3" v-bind="props"-->
    <!--                 style="height: 100%"-->
    <!--                 @click="openModel('fileNewLogoMini')">-->
    <!--              <v-chip-->
    <!--                  v-if="!isHovering"-->
    <!--                  class="position-absolute"-->
    <!--                  density="compact"-->
    <!--                  color="red-darken-2"-->
    <!--                  style="top:0;left:0;margin-top:-8px"-->
    <!--                  variant="elevated">-->
    <!--                Favicon-->
    <!--              </v-chip>-->
    <!--              <div>-->
    <!--                <v-img v-if="fileNewLogoMini" :src="fileNewLogoMini" alt="logo mini" title="logo mini"-->
    <!--                       width="40"></v-img>-->
    <!--                <v-img v-else :src="oldLogoMini" alt="logo mini" title="logo mini" width="40"></v-img>-->
    <!--              </div>-->
    <!--              <v-expand-transition>-->
    <!--                <div-->
    <!--                    v-if="isHovering"-->
    <!--                    class="d-flex transition-fast-in-fast-out bg-blue-grey-darken-1 v-card&#45;&#45;reveal"-->
    <!--                    style="height: 100%;"-->
    <!--                >-->
    <!--                  <v-btn variant="plain" stacked class="text-h6 font-weight-bold w-100" color="white">-->
    <!--                    Click Upload-->
    <!--                    <template #prepend>-->
    <!--                      <v-icon icon="mdi-cloud-upload-outline" size="35"></v-icon>-->
    <!--                    </template>-->
    <!--                  </v-btn>-->
    <!--                </div>-->
    <!--              </v-expand-transition>-->
    <!--            </div>-->
    <!--          </v-hover>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--      <v-row>-->
    <!--        <v-col cols="12" md="6">-->
    <!--          <v-autocomplete-->
    <!--              density="compact"-->
    <!--              label="Múi giờ"-->
    <!--              v-model="formGSTimeZone"-->
    <!--              :items="timezone"-->
    <!--              item-title="name"-->
    <!--              item-value="value"-->
    <!--              variant="outlined"-->
    <!--              autocomplete="off"-->
    <!--              hint="Tên quốc tế của thành phố"-->
    <!--              persistent-hint-->
    <!--          ></v-autocomplete>-->
    <!--        </v-col>-->
    <!--        <v-col cols="12" md="6">-->
    <!--          <v-autocomplete-->
    <!--              density="compact"-->
    <!--              label="Mã ngôn ngữ"-->
    <!--              v-model="formGSLangCode"-->
    <!--              :items="langLocales"-->
    <!--              item-title="name"-->
    <!--              item-value="value"-->
    <!--              variant="outlined"-->
    <!--              autocomplete="off"-->
    <!--              hint="Tên quốc tế của ngôn ngữ"-->
    <!--              persistent-hint-->
    <!--          ></v-autocomplete>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--      <v-row>-->
    <!--        <v-col cols="12" md="6">-->
    <!--          <v-text-field-->
    <!--              type="text"-->
    <!--              v-model="formGSColorMain"-->
    <!--              label="Màu chính website"-->
    <!--              variant="outlined"-->
    <!--              density="compact"-->
    <!--              readonly-->
    <!--              autocomplete="off">-->
    <!--            <template #prepend-inner>-->
    <!--              <v-btn-->
    <!--                  density="compact" :color="formGSColorMain"-->
    <!--                  @click="()=>{ modelColorPicker = !modelColorPicker; }"></v-btn>-->
    <!--            </template>-->
    <!--          </v-text-field>-->
    <!--        </v-col>-->
    <!--        <v-col cols="12" md="6">-->
    <!--          <v-autocomplete-->
    <!--              density="compact"-->
    <!--              label="Font website"-->
    <!--              v-model="formGSFontMain"-->
    <!--              :items="fontList"-->
    <!--              variant="outlined"-->
    <!--              autocomplete="off"-->
    <!--              persistent-hint-->
    <!--          ></v-autocomplete>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--      <v-row>-->
    <!--        <v-col cols="12" md="6">-->
    <!--          <v-text-field-->
    <!--              v-model="formGSIdApp"-->
    <!--              label="ID Application"-->
    <!--              variant="outlined"-->
    <!--              density="compact"-->
    <!--              readonly-->
    <!--              autocomplete="off">-->
    <!--            <template #append-inner>-->
    <!--              <v-btn-->
    <!--                  icon="mdi-rename-box"-->
    <!--                  color="red-darken-2"-->
    <!--                  rounded-->
    <!--                  density="compact"-->
    <!--                  @click="()=>{ modelConfirm = !modelConfirm; }"-->
    <!--              >-->
    <!--              </v-btn>-->
    <!--            </template>-->
    <!--          </v-text-field>-->
    <!--        </v-col>-->
    <!--        <v-col cols="12" md="6">-->
    <!--          <v-text-field v-if="returnKey"-->
    <!--                        type="text"-->
    <!--                        v-model="returnKey"-->
    <!--                        label="Secret Key"-->
    <!--                        variant="outlined"-->
    <!--                        density="compact"-->
    <!--                        readonly-->
    <!--                        autocomplete="off">-->
    <!--            <template #append-inner>-->
    <!--              <v-btn-->
    <!--                  icon="mdi-reload-alert"-->
    <!--                  color="red-darken-2"-->
    <!--                  rounded-->
    <!--                  density="compact"-->
    <!--                  @click="()=>{ modelConfirm = !modelConfirm; }"-->
    <!--              >-->
    <!--              </v-btn>-->
    <!--            </template>-->
    <!--          </v-text-field>-->
    <!--          <v-text-field-->
    <!--              v-else-->
    <!--              type="password"-->
    <!--              v-model="formGSKey"-->
    <!--              label="Secret Key"-->
    <!--              variant="outlined"-->
    <!--              density="compact"-->
    <!--              readonly-->
    <!--              autocomplete="off">-->
    <!--            <template #append-inner>-->
    <!--              <v-btn-->
    <!--                  icon="mdi-shield-key-outline"-->
    <!--                  color="red-darken-2"-->
    <!--                  rounded-->
    <!--                  density="compact"-->
    <!--                  @click="()=>{ modelConfirm = !modelConfirm; inputConfirmPassword.value = null; }"-->
    <!--              >-->
    <!--              </v-btn>-->
    <!--            </template>-->
    <!--          </v-text-field>-->
    <!--        </v-col>-->
    <!--      </v-row>-->
    <!--      <v-btn color="red-darken-2" @click="updateGSetting">Lưu</v-btn>-->
    <!--    </v-container>-->
    <!--  </v-form>--></div>
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
        <v-form>
          <v-text-field v-model="formCAddress.name"
                        label="Tên địa chỉ"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-map-marker"
                        autocomplete="off">
          </v-text-field>
          <v-text-field v-model="formCAddress.phone_number"
                        label="Số điện thoại"
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
              variant="outlined"
              autocomplete="off"
          ></v-autocomplete>
          <v-autocomplete
              density="compact"
              label="Phường xã"
              v-model="formCAddress.ward"
              :items="listWards"
              item-title="Name"
              item-value="Name"
              variant="outlined"
              autocomplete="off"
          ></v-autocomplete>
          <v-text-field v-model="formCAddress.address"
                        label="Tên địa chỉ"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-map-marker"
                        autocomplete="off">
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-btn @click="addNewAddress()" color="red-darken-2" class="ma-2">Thêm mới</v-btn>
        <v-btn @click="modelAddress = !modelAddress" color="blue-grey-darken-1" class="ma-2">Thoát</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.address-selected {
  border: 1px solid;
  border-color: #dc3545 !important;
}
</style>