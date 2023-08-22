<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

// Post API
const url = "http://127.0.0.1:8000/";

const router = useRouter();
const route = useRoute();

const pages = ref([]);

const page = ref({
  name: "",
  title: "",
  image: "",
  status: "",
});

const newImage = ref([]);

watch(pages, () => {
  page.value = pages.value.find(item => {
    return item.id === route.params.id;
  });
});

const fetchPage = async () => {
  try {
    const response = await axios.get(`${url}api/posts`);
    if (response.data.status === 200) {
      pages.value = response.data.data.reverse();
    } else if (response.data.status === 404) {
      pages.value = [];
      console.log("Something error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function updatePage() {
  const formData = new FormData();
  Object.entries(page.value).forEach(([key, value]) => {
    if (key !== "image") {
      formData.append(key, value);
    }
  });
  if (newImage.value.length > 0) {
    formData.append("image", newImage.value[0]);
  }

  formData.append("_method", "PUT");

  try {
    const response = await axios.post(`${url}api/sliders/edit/${page.value.id}`, formData);
    if (response.data.status === 200) {
      router.push("/admincp/pages");
    }
  } catch (e) {
    console.log("Error", e);
  }
};

onMounted(fetchPage);
</script>

<style></style>

<template>
  <v-form @submit.prevent="updatePage">
    <v-container class="m-card my-3">
      <h2>EditPage</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field variant="underlined" v-model="editPage.name" :counter="20" label="Tên trang:"></v-text-field>

            <v-text-field variant="underlined" v-model="editPage.author" :counter="20" label="Tác giả:"></v-text-field>

            <v-textarea variant="underlined" v-model="editPage.content" :counter="5000"
              label="Nội dung trang:"></v-textarea>

            <v-btn class="me-2" type="submit" color="info" variant="tonal">Chỉnh sửa</v-btn>
            <v-btn :to="`/admincp/page`" href="" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
