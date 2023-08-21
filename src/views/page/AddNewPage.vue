<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const newPage = ref({
  name: "",
  author: "",
  content: "",
});

async function createPage() {
  const formData = new FormData();
  Object.entries(newPage.value).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, value[0]);
    }
    else {
      formData.append(key, value);
    }
  });
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/pages", formData);
    if (response.data.status === 201) {
      router.push("/admincp/page");
    }
  } catch (e) {
    console.log("error", e);
  }
};

// const validate = ref({
//   valid: false,
//     name: "",
//     nameRules: [
//       value => {
//         if (value) { return true; }
//         return "Tên trang bắt buộc nhập.";
//       },
//     ],

//     author: "",
//     authorRules: [
//       value => {
//         if (value) { return true; }
//         return "Tác giả bắt buộc nhập.";
//       },
//     ],

//     content: "",
//     contentlRules: [
//       value => {
//         if (value) { return true; }

//         return "Nội dung trang nên nhiều hơn 500 từ.";
//       },
//     ],
//   });
</script>

<style></style>

<template>
  <v-form @submit.prevent="createPage">
    <v-container class="m-card my-3">
      <h2>Chi tiết trang mới:</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field variant="underlined" v-model="newPage.name" :rules="[v => !!v || 'Tên trang bắt buộc nhập.']"
              :counter="20" label="Tên trang:"></v-text-field>

            <v-text-field variant="underlined" v-model="newPage.author" :rules="[v => !!v || 'Tác giả bắt buộc nhập.']"
              :counter="20" label="Tác giả:"></v-text-field>

            <v-textarea variant="underlined" v-model="newPage.content"
              :rules="[v => !!v || 'Nội dung không quá 5000 ký tự.']" :counter="5000" label="Nội dung trang:"
              required></v-textarea>

            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn :to="`/admincp/page`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
