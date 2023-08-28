<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const newSlider = ref({
  name: "",
  title: "",
  image: [],
});
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
    const response = await axios.post("http://127.0.0.1:8000/api/sliders", formData);
    if (response.data.status === 201) {
      router.push("/admincp/slider");
    }
  } catch (e) {
    console.log("error", e);
  }
};
</script>

<style></style>

<template>
  <v-form ref="form" @submit.prevent="createSlider">
    <v-container class="m-card my-3">
      <v-row>
        <v-col cols="12" md="12">
          <h2>Chi tiết Slider mới</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="newSlider.name"
          :rules="[v => !!v || 'Vui lòng không được để trống.']"
            :counter="20" label="Tên:"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="newSlider.title"
            :rules="[v => !!v || 'Vui lòng không được để trống.']"
            :counter="20" label="Tiêu đề:"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-file-input variant="underlined" v-model="newSlider.image" counter multiple show-size
            prepend-inner-icon="mdi-image-outline" prepend-icon=""
            label="Upload hình ảnh:"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn class="me-2" type="submit">Xác nhận</v-btn>
          <v-btn :to="`/admincp/slider`" type="reset">Hủy bỏ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
