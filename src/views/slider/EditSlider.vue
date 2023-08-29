<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "../../axiosComfig";
import { useRouter, useRoute } from "vue-router";

// Slider API

const router = useRouter();
const route = useRoute();

const sliders = ref([]);

const slider = ref({
  name: "",
  title: "",
  image: "",
});

const newImage = ref([]);

watch(sliders, () => {
  slider.value = sliders.value.find(item => {
    return item.id === +route.params.id;
  });
});

const fetchSlider = async () => {
  try {
    const response = await axios.get(`sliders`);
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
    const response = await axios.post(`sliders/edit/${slider.value.id}`, formData);
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
          <v-text-field v-model="slider.name" :rules="[v => !!v || 'Vui lòng không được để trống.']" variant="underlined" :counter="20" label="Tên:"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="slider.title" :rules="[v => !!v || 'Vui lòng không được để trống.']" variant="underlined" :counter="20" label="Tiêu đề:"
            required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex">
          <v-label>Ảnh hiện tại:</v-label>
          <v-img style="max-width: 200px;" :src="`${url}${slider.image}`" class="ms-3 rounded-lg"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="d-flex align-center">
          <v-file-input v-model="newImage" variant="underlined" prepend-inner-icon="mdi-image-outline" prepend-icon=""
           label="Upload ảnh mới:"></v-file-input>
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
