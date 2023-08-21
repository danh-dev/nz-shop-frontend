<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const newSlider = ref({
  name: "",
  title: "",
  image: [],
  status: "",
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
      <h2>Chi tiết Slider mới</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field variant="underlined" v-model="newSlider.name" :rules="[v => !!v || 'Tên bắt buộc nhập.']"
              :counter="20" label="Tên:"></v-text-field>

            <v-text-field variant="underlined" v-model="newSlider.title" :rules="[v => !!v || 'Tiêu đề bắt buộc nhập.']"
              :counter="20" label="Tiêu đề:"></v-text-field>

            <v-file-input variant="underlined" v-model="newSlider.image" counter multiple show-size
              :rules="['Dung lượng ảnh tối đa 2 MB']" prepend-inner-icon="mdi-image-outline" prepend-icon=""
              label="Upload hình ảnh:"></v-file-input>

            <v-select variant="underlined" v-model="newSlider.status" :rules="[v => !!v || 'Vui lòng chọn.']"
              label="Trạng thái:" :items="['Hoạt động', 'Tạm dừng']"></v-select>

            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn :to="`/admincp/slider`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
