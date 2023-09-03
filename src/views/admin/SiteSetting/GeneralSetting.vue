<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formGSName"
                        label="Shop Name"
                        variant="outlined"
                        density="compact"
                        persistent-hint
                        hint="Click Favicon để update favicon"
                        autocomplete="off">
            <template #prepend-inner>
              <div @click="openModel('fileNewFavicon')">
              <v-img v-if="fileNewFavicon" :src="fileNewFavicon" alt="logo mini" title="logo mini" width="18"></v-img>
              <v-img v-else :src="oldLogoFA" alt="logo mini" title="logo mini" width="18"></v-img>
              </div>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <div class="m-box active d-flex pa-3 justify-center position-relative bg-grey-lighten-3" v-bind="props"
                 @click="openModel('fileNewLogoBG')">
              <v-chip
                  v-if="!isHovering"
                  class="position-absolute"
                  density="compact"
                  color="red-darken-2"
                  style="top:0;left:0;margin-top:-8px"
                  variant="elevated">
                Logo Website
              </v-chip>
              <div>
                <v-img v-if="fileNewLogoBG" :src="fileNewLogoBG" alt="logo background" width="180"></v-img>
                <v-img v-else :src="oldLogoBG" alt="logo background" width="180"></v-img>
              </div>
              <v-expand-transition>
                <div
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out bg-blue-grey-darken-1 v-card--reveal"
                    style="height: 100%;"
                >
                  <v-btn variant="plain" stacked class="text-h6 font-weight-bold w-100" color="white">
                    Click Upload
                    <template #prepend>
                      <v-icon icon="mdi-cloud-upload-outline" size="35"></v-icon>
                    </template>
                  </v-btn>
                </div>
              </v-expand-transition>
            </div>
          </v-hover>
        </v-col>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <div class="m-box active d-flex pa-3 justify-center position-relative bg-grey-lighten-3" v-bind="props"
                 @click="openModel('fileNewLogoWH')">
              <v-chip
                  v-if="!isHovering"
                  class="position-absolute"
                  density="compact"
                  color="red-darken-2"
                  style="top:0;left:0;margin-top:-8px"
                  variant="elevated">
                Logo Website
              </v-chip>
              <div>
                <v-img v-if="fileNewLogoWH" :src="fileNewLogoWH" alt="logo background" width="180"></v-img>
                <v-img v-else :src="oldLogoWH" alt="logo background" width="180"></v-img>
              </div>
              <v-expand-transition>
                <div
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out bg-blue-grey-darken-1 v-card--reveal"
                    style="height: 100%;"
                >
                  <v-btn variant="plain" stacked class="text-h6 font-weight-bold w-100" color="white">
                    Click Upload
                    <template #prepend>
                      <v-icon icon="mdi-cloud-upload-outline" size="35"></v-icon>
                    </template>
                  </v-btn>
                </div>
              </v-expand-transition>
            </div>
          </v-hover>
        </v-col>
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <div class="m-box active d-flex pa-3 justify-center position-relative bg-grey-lighten-3" v-bind="props" style="height: 100%"
                 @click="openModel('fileNewLogoMini')">
              <v-chip
                  v-if="!isHovering"
                  class="position-absolute"
                  density="compact"
                  color="red-darken-2"
                  style="top:0;left:0;margin-top:-8px"
                  variant="elevated">
                Favicon
              </v-chip>
              <div>
                <v-img v-if="fileNewLogoMini" :src="fileNewLogoMini" alt="logo mini" title="logo mini" width="40"></v-img>
                <v-img v-else :src="oldLogoMini" alt="logo mini" title="logo mini" width="40"></v-img>
              </div>
              <v-expand-transition>
                <div
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out bg-blue-grey-darken-1 v-card--reveal"
                    style="height: 100%;"
                >
                  <v-btn variant="plain" stacked class="text-h6 font-weight-bold w-100" color="white">
                    Click Upload
                    <template #prepend>
                      <v-icon icon="mdi-cloud-upload-outline" size="35"></v-icon>
                    </template>
                  </v-btn>
                </div>
              </v-expand-transition>
            </div>
          </v-hover>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
              clearable
              density="compact"
              label="Múi giờ"
              v-model="formGSTimeZone"
              :items="timezone"
              item-title="name"
              item-value="value"
              variant="outlined"
              autocomplete="off"
              hint="Tên quốc tế của thành phố"
              persistent-hint
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
              clearable
              density="compact"
              label="Mã ngôn ngữ"
              v-model="formGSLangCode"
              :items="langLocales"
              item-title="name"
              item-value="value"
              variant="outlined"
              autocomplete="off"
              hint="Tên quốc tế của ngôn ngữ"
              persistent-hint
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="formGSIdApp"
              label="ID Application"
              variant="outlined"
              density="compact"
              readonly
              autocomplete="off">
            <template #append-inner>
              <v-btn
                  icon="mdi-rename-box"
                  color="red-darken-2"
                  rounded
                  density="compact"
                  @click="()=>{ modelConfirm = !modelConfirm; }"
              >
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-if="returnKey"
                        type="text"
                        v-model="returnKey"
                        label="Secret Key"
                        variant="outlined"
                        density="compact"
                        readonly
                        autocomplete="off">
            <template #append-inner>
              <v-btn
                  icon="mdi-reload-alert"
                  color="red-darken-2"
                  rounded
                  density="compact"
                  @click="()=>{ modelConfirm = !modelConfirm; }"
              >
              </v-btn>
            </template>
          </v-text-field>
          <v-text-field
              v-else
              type="password"
              v-model="formGSKey"
              label="Secret Key"
              variant="outlined"
              density="compact"
              readonly
              autocomplete="off">
            <template #append-inner>
              <v-btn
                  icon="mdi-shield-key-outline"
                  color="red-darken-2"
                  rounded
                  density="compact"
                  @click="()=>{ modelConfirm = !modelConfirm; inputConfirmPassword.value = null; }"
              >
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-btn color="red-darken-2" @click="updateGSetting">Lưu</v-btn>
    </v-container>
  </v-form>
  <v-dialog
      v-model="modelOpen"
      persistent
      max-width="650"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="modelOpen = !modelOpen"></v-btn>
      </template>
      <v-card-title>
        <span
            class="text-h5 font-weight-bold ms-3">Upload {{
            selectedUpload === "fileNewFavicon" ? "Favicon" : selectedUpload === "fileNewLogoBG" ? "Logo có nền" : selectedUpload === "fileNewLogoWH" ? "Logo nền trắng hoặc không nền" : "Logo Mini"
          }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field ref="fileLogoInput" clearable label="Chọn file" variant="outlined"
                      prepend-inner-icon="mdi-file-image"
                      type="file"
                      accept="image/jpeg, image/png, image/gif, image/webp"
                      @change="getUploadedImage"
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <Cropper v-if="selectedUpload === 'fileNewFavicon'"
                 ref="cropArea"
                 :src="uploadedImage"
                 :stencil-props="{
				      aspectRatio: 1,
	  		    }"
                 :canvas="{
              width:18,
              height:18
            }"
        />
        <Cropper v-else-if="selectedUpload === 'fileNewLogoMini'"
                 ref="cropArea"
                 :src="uploadedImage"
                 :stencil-props="{
				      aspectRatio: 1,
	  		    }"
                 :canvas="{
              width:40,
              height:40
            }"
        />
        <Cropper v-else
                 ref="cropArea"
                 :src="uploadedImage"
                 :stencil-props="{
				      aspectRatio: 180/53,
	  		    }"
                 :canvas="{
              width:180,
              height:53
            }"
        />
      </v-card-text>
      <v-card-text>
        <v-btn @click="crop()" color="red-darken-2" class="ma-2">Cắt Ảnh</v-btn>
        <v-btn v-if="croppedImageData" @click="pickImage(selectedUpload)" color="green" class="ma-2">Chọn Hình</v-btn>
        <v-btn @click="modelOpen = !modelOpen" color="blue-grey-darken-1" class="ma-2">Thoát</v-btn>
      </v-card-text>
      <v-card-text>
        <v-img :src="croppedImageData"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog
      v-model="modelConfirm"
      persistent
      max-width="400"
  >
    <v-card v-if="returnKey">
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="modelConfirm = !modelConfirm"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h6 font-weight-bold ms-3 text-red-darken-2">
        <v-icon icon="mdi-shield-alert-outline"></v-icon> CẨN THẬN !!!</span>
      </v-card-title>
      <v-card-text class="ma-1">
        Tạo Key mới sẽ làm bạn mất kết nối với những app khác. Vui lòng xác nhận!
      </v-card-text>
      <v-card-text>
        <v-btn @click="newSecretKey" class="me-2" color="red-darken-2">Xác nhận</v-btn>
        <v-btn @click="modelConfirm=!modelConfirm" class="ms-2" color="blue-grey-darken-1">Thoát</v-btn>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="modelConfirm = !modelConfirm"></v-btn>
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
          <v-btn @click="modelConfirm=!modelConfirm" class="ms-2" color="blue-grey-darken-1">Thoát</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {Cropper} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import {siteData} from "@/stores/globals";
const siteStore = siteData();
import axios from "@/axiosComfig";
import timezone from "../../../utils/timezone-citys.json";
import langLocales from "../../../utils/lang-locales.json";

const fileNewLogoBG = ref();
const fileNewLogoWH = ref();
const fileNewFavicon = ref();
const fileNewLogoMini = ref();
const fileLogoInput = ref();
const uploadedImage = ref(null);
const cropArea = ref();
const croppedImageData = ref();

const formGSName = ref();
const formGSTimeZone = ref();
const formGSLangCode = ref();
const formGSIdApp = ref();
const formGSKey = ref("Oh! Are you cheating?");
const modelOpen = ref(false);
const selectedUpload = ref();

//
const modelConfirm = ref(false);
const inputConfirmPassword = ref();
const returnKey = ref();

const oldLogoBG = ref("https://dummyimage.com/180x53/dc3545/FFF.png&text=Logo");
const oldLogoWH = ref("https://dummyimage.com/180x53/ffffff/5d5a68.png&text=Logo");
const oldLogoFA = ref("https://dummyimage.com/18x18/dc3545/FFF.png&text=nz");
const oldLogoMini = ref("https://dummyimage.com/40x40/dc3545/FFF.png&text=nz");


// Function
const openModel = (value) => {
  modelOpen.value = true;
  selectedUpload.value = value;
  uploadedImage.value = null;
  cropArea.value = null;
  croppedImageData.value = null;
  fileLogoInput.value = null;
};
const getUploadedImage = (e) => {
  const file = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(file);
};
const crop = () => {
  const {canvas} = cropArea.value.getResult();
  croppedImageData.value = canvas.toDataURL();
};
const pickImage = (v) => {
  if (v === "fileNewLogoBG") {
    fileNewLogoBG.value = croppedImageData.value;
  }
  if (v === "fileNewLogoMini") {
    fileNewLogoMini.value = croppedImageData.value;
  }
  if (v === "fileNewLogoWH") {
    fileNewLogoWH.value = croppedImageData.value;
  }
  if (v === "fileNewFavicon") {
    fileNewFavicon.value = croppedImageData.value;
  }
  modelOpen.value = false;
};
const getSecretKey = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.post("getSecretKey", {
      password: inputConfirmPassword.value
    });
    returnKey.value = res.data.data;
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    modelConfirm.value = false;
    siteStore.doneLoading();
  }
};
const newSecretKey = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.get("newSecretKey");
    returnKey.value = res.data.data;
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    modelConfirm.value = false;
    siteStore.doneLoading();
  }
};
const fetchGSetting = async () => {
  siteStore.isLoading = true;
  try {
    const res = await axios.get("fetchGSetting");
    formGSName.value = res.data.siteName;
    oldLogoBG.value = res.data.logoBG ? import.meta.env.VITE_PUBLIC_URL+ res.data.logoBG : "https://dummyimage.com/180x53/dc3545/FFF.png&text=Logo";
    oldLogoWH.value = res.data.logoWH ? import.meta.env.VITE_PUBLIC_URL+ res.data.logoWH : "https://dummyimage.com/180x53/ffffff/5d5a68.png&text=Logo";
    oldLogoFA.value = res.data.favicon ? import.meta.env.VITE_PUBLIC_URL+ res.data.favicon : "https://dummyimage.com/16x16/dc3545/FFF.png&text=nz";
    oldLogoMini.value = res.data.logoMini ? import.meta.env.VITE_PUBLIC_URL+ res.data.logoMini : "https://dummyimage.com/40x40/dc3545/FFF.png&text=nz";
    formGSTimeZone.value = res.data.timeZone;
    formGSLangCode.value = res.data.langCode;
    formGSIdApp.value = res.data.idApp;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const updateGSetting = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put("updateSetting", {
      site_name: formGSName.value,
      logo_bg: fileNewLogoBG.value,
      logo_wh: fileNewLogoWH.value,
      logo_mini: fileNewLogoMini.value,
      favicon: fileNewFavicon.value,
      time_zone: formGSTimeZone.value,
      lang_code: formGSLangCode.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    await fetchGSetting();
    siteStore.isLoading = false;
  }
};
onMounted(() => {
  fetchGSetting();
});
</script>
<style scoped>

</style>