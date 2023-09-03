<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSEOTitle"
                        label="Title Website"
                        variant="outlined"
                        density="compact"
                        maxlength="55"
                        counter
                        persistent-hint
                        hint="Độ dài không vượt quá 55 ký tự."
                        autocomplete="off">
            <template #prepend-inner>
              <v-img :src="fileFavicon" alt="favicon" title="favicon" width="18"></v-img>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-hover v-slot="{ isHovering, props }">
            <div class="m-box active d-flex pa-3 justify-center position-relative bg-grey-lighten-3" v-bind="props"
                 @click="openModel()">
              <v-chip
                  v-if="!isHovering"
                  class="position-absolute"
                  density="compact"
                  color="red-darken-2"
                  style="top:0;left:0;margin-top:-8px"
                  variant="elevated">
                Ảnh hiển thị mạng xã hội
              </v-chip>
              <div>
                <v-img v-if="fileNew" :src="fileNew" alt="logo background" width="500"></v-img>
                <v-img v-else :src="oldImg" alt="logo background" width="500"></v-img>
              </div>
              <v-expand-transition>
                <div
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out bg-blue-grey-darken-1 v-card--reveal"
                    style="height: 100%;"
                >
                  <v-btn variant="plain" stacked class="text-h6 font-weight-bold w-100 h-100" color="white">
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
        <v-col cols="12">
          <v-textarea v-model="formSEODescription" label="Description Website" variant="outlined" persistent-hint
                      hint="Nội dung hiển thị ở Google Search và các website khác. Độ dài không vượt quá 160 ký tự."
                      maxlength="160" rows="3"
                      counter="160" persistent-counter></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-combobox
              variant="outlined"
              chips
              multiple
              v-model="formSEOKeywords"
              label="Keywords"
              autocomplete="off"
              clearable
              persistent-clear
              closable-chips
              maxlength="20"
              hint="Không vượt quá 8 keywords. Độ dài không quá 20 ký tự."
              counter
              persistent-counter
              persistent-hint
              :rules="[(value) => value.length <= 8 || 'Không vượt quá 8 keywords']"
          >
          </v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card
              class="mx-auto"
              prepend-icon="mdi-home"
          >
            <template #prepend>
              <v-avatar image="/assets/google_icon.png" size="30"></v-avatar>
            </template>
            <template v-slot:title>
              Google Search Virtual
            </template>
            <v-card-text>
              <v-skeleton-loader v-if="!doneGoogle"
                  class="mx-auto"
                  elevation="5"
                  max-width="400"
                  type="table-heading, list-item-two-line"
              ></v-skeleton-loader>
              <v-card v-else
                  class="pa-3 d-flex flex-column"
                  elevation="5"
                  max-width="400"
                  min-height="250px"
              >
                <v-card-title class="px-0">
                  <v-row class="d-flex flex-nowrap">
                    <v-col class="d-flex align-center justify-center p-1" style="max-width: fit-content;">
                      <v-avatar :image="fileFavicon" size="30"></v-avatar>
                    </v-col>
                    <v-col class="p-1 text-body-2" style="max-width:fit-content; overflow: hidden; text-overflow: ellipsis;">
                      Website Company<br>
                      {{showLink}}
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text class="ps-0 text-body-2 font-weight-bold text-blue-grey-darken-1 m-ellipsis">{{ formSEOTitle }}</v-card-text>
                <v-card-text class="pa-0 ma-0 ">{{ formSEODescription }}...</v-card-text>
                <v-card-text class="pa-0 ma-0 d-flex align-center"><v-rating
                    class="ma-0 pa-0"
                    density="compact"
                    model-value="5"
                    size="20"
                    readonly
                    active-color="yellow-darken-1"
                ></v-rating><span class="pt-1 ps-1">Xếp hạng: 5 · 12 phiếu bầu</span></v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card
              class="mx-auto"
              prepend-icon="mdi-home"
          >
            <template #prepend>
              <v-avatar image="/assets/facebook_icon.png" size="30"></v-avatar>
            </template>
            <template v-slot:title>
              Facebook Social Virtual
            </template>
            <v-card-text>
              <v-skeleton-loader
                  v-if="!doneFacebook"
                  class="mx-auto"
                  elevation="5"
                  max-width="400"
                  type="image,list-item-two-line"
              ></v-skeleton-loader>
              <v-card v-else
                      class="ma-0 pa-0 py-0"
                      elevation="5"
                      max-width="400"
                      min-height="250px"
              >
                <v-card-title class="pa-0 p-0">
                  <v-img v-if="fileNew" :src="fileNew" alt="logo background" ></v-img>
                  <v-img v-else :src="oldImg"> </v-img>
                </v-card-title>
                <v-card-text class="pa-2 ps-4 text-body-2 font-weight-bold text-blue-grey-darken-1">Website.com<br>{{ formSEOTitle }}</v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn color="red-darken-2 my-3" @click="updateSEOSetting">Lưu</v-btn>
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
            class="text-h5 font-weight-bold ms-3">Upload ảnh</span>
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
        <Cropper
            ref="cropArea"
            :src="uploadedImage"
            :stencil-props="{
				      aspectRatio: 1200/627,
	  		    }"
            :canvas="{
              width:1200,
              height:627
            }"
        />
      </v-card-text>
      <v-card-text>
        <v-btn @click="crop()" color="red-darken-2" class="ma-2">Cắt Ảnh</v-btn>
        <v-btn v-if="croppedImageData" @click="pickImage()" color="green" class="ma-2">Chọn Hình</v-btn>
        <v-btn @click="modelOpen = !modelOpen" color="blue-grey-darken-1" class="ma-2">Thoát</v-btn>
      </v-card-text>
      <v-card-text>
        <v-img :src="croppedImageData"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import {computed, onMounted, ref} from "vue";
import {Cropper} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import {siteData} from "@/stores/globals";
import axios from "@/axiosComfig";

const siteStore = siteData();

const showLink = ref(import.meta.env.VITE_PUBLIC_URL);
const fileNew = ref();
const fileInput = ref();
const uploadedImage = ref(null);
const cropArea = ref();
const croppedImageData = ref();

const formSEOTitle = ref();
const formSEODescription = ref();
const formSEOKeywords = ref([]);
const modelOpen = ref(false);

const fileFavicon = ref("https://dummyimage.com/18x18/dc3545/FFF.png&text=nz");
const oldImg = ref("https://dummyimage.com/1200x630/dc3545/FFF.png&text=Image Display Social");

const doneGoogle = computed(()=>formSEOTitle.value && formSEODescription.value)
const doneFacebook = computed(()=>fileNew.value || oldImg.value && formSEOTitle.value  )

const openModel = () => {
  modelOpen.value = true;
  uploadedImage.value = null;
  cropArea.value = null;
  croppedImageData.value = null;
  fileInput.value = null;
};
const getUploadedImage = (e) => {
  const file = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(file);
};
const crop = () => {
  const {canvas} = cropArea.value.getResult();
  croppedImageData.value = canvas.toDataURL();
};
const pickImage = () => {
  fileNew.value = croppedImageData.value;
  modelOpen.value = false;
};

const fetchSEOSetting = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.get("fetchSEOSetting");
    formSEOTitle.value = res.data.metaTagTitle;
    fileFavicon.value = res.data.favicon ? import.meta.env.VITE_PUBLIC_URL + res.data.favicon : "https://dummyimage.com/18x18/dc3545/FFF.png&text=nz";
    formSEODescription.value = res.data.metaTagDescription;
    formSEOKeywords.value = res.data.metaTagKeywords ? res.data.metaTagKeywords.split(",") : [];
    oldImg.value = res.data.metaTagSocialImg ? (import.meta.env.VITE_PUBLIC_URL + res.data.metaTagSocialImg) : "https://dummyimage.com/1200x630/dc3545/FFF.png&text=Image Display Social";
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
};
const updateSEOSetting = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put("updateSetting", {
      meta_tag_title: formSEOTitle.value,
      meta_tag_description: formSEODescription.value,
      meta_tag_social_img: fileNew.value,
      meta_tag_keywords: formSEOKeywords.value.join(","),
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    await fetchSEOSetting();
    siteStore.isLoading = false;
  }
};
onMounted(() => {
  fetchSEOSetting();
});
</script>
<style scoped>
.m-ellipsis{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.m-ellipsis::after {
  content: '...';
  display: inline-block;
  height: 1px;
  width: 1px;
}
</style>