<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import ContentEditor from "../../components/globals/ContentEditor.vue";

// Post API
const url = "http://127.0.0.1:8000/";

const router = useRouter();
const route = useRoute();

const pages = ref([]);

const page = ref({
  name: "",
  author: "",
  content: "",
});

const fetchPage = async () => {
  try {
    const response = await axios.get(`${url}api/pages`);
    if (response.data.status === 200) {
      pages.value = response.data.data;
      page.value = pages.value.find(item => {
        return item.id === +route.params.id;
      });
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
    if (key === "image") {
      formData.append(key, value[0]);
    }
    else {
      formData.append(key, value);
    }
  });

  formData.append("_method", "PUT");

  try {
    const response = await axios.post(`${url}api/pages/edit/${page.value.id}`, formData);
    if (response.data.status === 200) {
      router.push("/admincp/page");
    }
  } catch (e) {
    console.log("Error", e);
  }
};

function editContent(event) {
  page.value.content = event;
};

onBeforeMount(fetchPage);
</script>

<style></style>

<template>
  <v-form @submit.prevent="updatePage">
    <v-container class="m-card my-3">
      <v-row>
        <v-col cols="12" md="12">
          <h2>EditPage</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="page.name" :rules="[v => !!v || 'Vui lòng không để trống.']"
            :counter="20" label="Tên trang:"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="page.author" :rules="[v => !!v || 'Vui lòng không để trống.']"
            :counter="20" label="Tác giả:"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea name="editor" variant="underlined" v-model="page.content"
            :rules="[v => !!v || 'Vui lòng không để trống & không vượt quá 10000 ký tự..']" :counter="10000"
            label="Nội dung trang:">
          </v-textarea>
          <ContentEditor :editorContent="page.content" @editContent="editContent" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn class="me-2" type="submit" color="info" variant="tonal">Chỉnh sửa</v-btn>
          <v-btn :to="`/admincp/page`" href="" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form></template>
