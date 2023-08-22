<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

// Slider API
const url = "http://127.0.0.1:8000/";

const router = useRouter();
const route = useRoute();

const sliders = ref([]);

const slider = ref({
  name: "",
  title: "",
  image: "",
  status: "",
});

const newImage = ref([]);

watch(sliders, () => {
  slider.value = sliders.value.find(item => {
    return item.id === route.params.id;
  });
});

const fetchSlider = async () => {
  try {
    const response = await axios.get(`${url}api/sliders`);
    if (response.data.status === 200) {
      sliders.value = response.data.data.reverse();
    } else if (response.data.status === 404) {
      sliders.value = [];
      console.log("Something error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function updateSlider() {
  const formData = new FormData();
  Object.entries(slider.value).forEach(([key, value]) => {
    if (key !== "image") {
      formData.append(key, value);
    }
  });
  if (newImage.value.length > 0) {
    formData.append("image", newImage.value[0]);
  }

  formData.append("_method", "PUT");

  try {
    const response = await axios.post(`${url}api/sliders/edit/${slider.value.id}`, formData);
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
        <v-col cols="12" md="12">
          <h2>Chỉnh sửa Slider</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="slider.name" variant="underlined" :counter="20" label="Tên:" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="slider.title" variant="underlined" :counter="20" label="Tiêu đề:"
            required></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-img style="max-width: 200px;" :src="`${url}${slider.image}`"></v-img>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="12" md="12" class="d-flex align-center">
          <v-file-input v-model="newImage" variant="underlined" prepend-inner-icon="mdi-image-outline" prepend-icon=""
            label="Upload hình ảnh:"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-select v-model="slider.status" variant="underlined" label="Trạng thái:" :items="['Hoạt động', 'Tạm dừng']"
            required></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn class="me-2" type="submit" color="info" variant="tonal">Chỉnh sửa</v-btn>
          <v-btn :to="`/admincp/slider`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
