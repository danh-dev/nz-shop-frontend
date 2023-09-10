<script setup>
import { ref } from "vue";
import axios from "../../axiosComfig";
import { useRouter } from "vue-router";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
const router = useRouter();
// Begin: Upload & crop ảnh
const callModel = ref(false);
const fileInput = ref(null);
const cropperArea = ref(null);
const uploadedImage = ref(null);
const croppedImageData = ref();
const newImage = ref();
const getUploadedImage = (e) => {
  const file = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(file);
};
const crop = () => {
  const { canvas } = cropperArea.value.getResult();
  croppedImageData.value = canvas.toDataURL();
};
const done = () => {
  // nhiu tac vu khac
  newImage.value = croppedImageData.value;
  callModel.value = false;

};
// End: Upload & crop ảnh
const newSlider = ref({
  name: "",
  title: "",
  newImage: [],
});

import { siteData } from "@/stores/globals";
const siteStore = siteData();

async function createSlider() {
  const formData = new FormData();
  Object.entries(newSlider.value).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, value[0]);
    }
    else {
      formData.append(key, value);
    }
  });
  try {
    const response = await axios.post("sliders", {
      name: newSlider.value.name,
      title: newSlider.value.title,
      image: newImage.value
    });
    if (response.data.status === 201) {
      router.push("/admincp/slider");
      siteStore.hasRes({ data: { status: "ok", message: "Tạo mới thành công." } });
    }
  } catch (e) {
    siteStore.hasRes({ data: { status: "error", message: "Tạo mới thất bại." } });
    console.log("error", e);
  }
};
</script>

<style></style>

<template>
  <v-form
    ref="form"
    @submit.prevent="createSlider"
  >
    <v-container class="m-card my-3">
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <h2>Chi tiết Slider mới</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            variant="outlined"
            v-model="newSlider.name"
            :rules="[v => !!v || 'Vui lòng không được để trống.']"
            :counter="20"
            label="Tên:"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            variant="outlined"
            v-model="newSlider.title"
            :rules="[v => !!v || 'Vui lòng không được để trống.']"
            :counter="20"
            label="Tiêu đề:"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn
            width=""
            @click="callModel = !callModel"
          >Upload ảnh</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12"
          class="d-flex align-center"
        >
          <v-img
            v-if="newImage"
            :src="newImage"
            class="rounded-lg"
          ></v-img>
          <v-img
            v-else
            src="https://dummyimage.com/930x300/dddddd/cd3545&text=Upload+Image"
            class="rounded-lg"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-btn
            class="me-2"
            type="submit"
          >Hoàn tất</v-btn>
          <v-btn
            :to="`/admincp/slider`"
            href=""
            type="reset"
          >Hủy bỏ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

  <v-dialog
    v-model="callModel"
    width="auto"
  >
    <v-card class="rounded">
      <v-file-input
        type="file"
        id="image"
        ref="fileInput"
        prepend-inner-icon="mdi-image-outline"
        prepend-icon=""
        label="Upload ảnh:"
        @change="getUploadedImage"
        class="d-flex flex-column justify-center"
      />
      <Cropper
        ref="cropperArea"
        :src="uploadedImage"
        :stencil-props="{
          aspectRatio: 950 / 320,
        }"
        :canvas="{
          width: 950,
          height: 320
        }"
      />
      <br>
      <div>
        <v-img
          :src="croppedImageData"
          width="950"
          height="320"
        ></v-img>
      </div>
      <div class="d-flex justify-center my-5">
        <v-btn
          v-if="uploadedImage"
          @click="crop"
          append-icon="mdi-content-cut"
          variant="elevated"
          class="w-25 pa-2 border-double rounded-lg mx-1"
        >
          CẮT ẢNH
        </v-btn>

        <v-btn
          v-if="croppedImageData"
          @click="done"
          color="success"
          append-icon="mdi-check"
          variant="elevated"
          class="w-25 pa-2 border-double rounded-lg mx-1"
        >
          XÁC NHẬN
        </v-btn>

        <v-btn
          color="#c50000"
          variant="elevated"
          class="w-25 pa-2 border-double rounded-lg mx-1"
          append-icon="mdi-close-outline"
          @click="callModel = false"
        >ĐÓNG
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
