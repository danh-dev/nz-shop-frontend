<template>
  <input
    type="file"
    id="image"
    ref="fileInput"
    @change="getUploadedImage"
  >
  <Cropper
    ref="cropperArea"
    :src="uploadedImage"
    :stencil-props="{
      aspectRatio: 1,
    }"
  />
  <br>
  Du lieu gui di: {{ croppedImageData }}
  <v-img
    :src="croppedImageData"
    width="500px"
  ></v-img>
  <button
    v-if="uploadedImage"
    @click="crop"
    type="button"
  >
    Crop Image
  </button>
  <button
    v-if="croppedImageData"
    @click="done"
    type="button"
  >
    Xac nhan gui du lieu
  </button>
</template>

<script setup>
import { Cropper } from "vue-advanced-cropper";
import { ref } from "vue";
import "vue-advanced-cropper/dist/style.css";

const fileInput = ref(null);
const cropperArea = ref(null);
const uploadedImage = ref(null);
const newImage = ref();
const croppedImageData = ref();
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
};

// :stencil-props="{
// aspectRatio: 180/53,
// }"
// :canvas="{
// width:180,
//     height:53
// }"
</script>