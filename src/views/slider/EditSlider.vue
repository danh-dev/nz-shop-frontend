<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "../../axiosComfig";
import { useRouter, useRoute } from "vue-router";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

// Slider API

const router = useRouter();
const route = useRoute();
const url = import.meta.env.VITE_PUBLIC_URL;
const sliders = ref([]);
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

const slider = ref({
  name: "",
  title: "",
  image: "",
});

watch(sliders, () => {
  slider.value = sliders.value.find(item => {
    return item.id === +route.params.id;
  });
});

const fetchSlider = async () => {
  try {
    const response = await axios.get("sliders");
    if (response.data.status === 200) {
      sliders.value = response.data.data;
    } else if (response.data.status === 404) {
      sliders.value = [];
      console.log("Something error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function updateSlider() {
  try {
    const response = await axios.put(`sliders/edit/${slider.value.id}`, {
      name: slider.value.name,
      title: slider.value.title,
      image: newImage.value,
    });
    if (response.data.status === 200) {
      router.push("/admincp/slider");
    }
  } catch (e) {
    console.log("error", e);
  }
};

onMounted(fetchSlider);
</script>

<style></style>

<template>
  <v-form @submit.prevent="updateSlider">
    <v-container class="m-card my-3">
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <h2>Chỉnh sửa Slider</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="slider.name"
            :rules="[v => !!v || 'Vui lòng không được để trống.']"
            variant="outlined"
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
            v-model="slider.title"
            :rules="[v => !!v || 'Vui lòng không được để trống.']"
            variant="outlined"
            :counter="20"
            label="Tiêu đề:"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn
            width=""
            @click="callModel = !callModel"
          >Upload ảnh mới</v-btn>
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
            :src="`${url}${slider.image}`"
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
  <!-- callModel to upload new image -->
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

<style>
.modal.open {
  display: flex;
}
</style>
