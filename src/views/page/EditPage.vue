<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const url = "http://127.0.0.1:8000/";
const editPage = ref({
  id: null,
  name: "",
  author: "",
  content: ""
});

async function fetchPage() {
  try {
    const response = await axios
      .get(`${url}api/pages/${this.id}`);
    if (response.data.status === 200) {
      editPage.value = response.data.data;
    }
  } catch (error) {
    console.log("Error fetch page: ", error);
  }
}

async function updatePage() {
  try {
    const response = await axios
      .post(`${url}api/pages/edit/${this.id}`);
    if (response.data.status === 200) {
      this.$router.push("/admincp/page");
    }
  } catch (error) {
    console.log("Error update page: ", error);
  }
}

onMounted(() => {
  fetchPage();
  updatePage();
});
</script>

<style></style>

<template>
  <v-form @submit.prevent="updatePage">
    <v-container class="m-card my-3">
      <h2>EditPage</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field variant="underlined" v-model="editPage.name" :counter="20" label="Tên trang:"
              required></v-text-field>

            <v-text-field variant="underlined" v-model="editPage.author" :counter="20" label="Tác giả:"
              required></v-text-field>

            <v-textarea variant="underlined" v-model="editPage.content" :counter="5000" label="Nội dung trang:"
              required></v-textarea>

            <v-btn class="me-2" type="submit" color="info" variant="tonal">Chỉnh sửa</v-btn>
            <v-btn :to="`/admincp/page`" href="" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
