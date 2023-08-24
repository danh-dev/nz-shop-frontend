<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import ContentEditor from "../../components/globals/ContentEditor.vue";

// Post API
const url = "http://127.0.0.1:8000/";

const router = useRouter();
const route = useRoute();

const posts = ref([]);

const post = ref({
  title: "",
  author: "",
  image: "",
  content: "",
  type: "",
});

const newImage = ref([]);

watch(posts, () => {
  post.value = posts.value.find(item => {
    return item.id === +route.params.id;
  });
});

const fetchPost = async () => {
  try {
    const response = await axios.get(`${url}api/posts`);
    if (response.data.status === 200) {
      posts.value = response.data.data;
    } else if (response.data.status === 404) {
      posts.value = [];
      console.log("Something error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function updatePost() {
  const formData = new FormData();
  Object.entries(post.value).forEach(([key, value]) => {
    if (key !== "image") {
      formData.append(key, value);
    }
  });
  if (newImage.value.length > 0) {
    formData.append("image", newImage.value[0]);
  }

  formData.append("_method", "PUT");

  try {
    const response = await axios.post(`${url}api/posts/edit/${post.value.id}`, formData);
    if (response.data.status === 200) {
      router.push("/admincp/post");
    }
  } catch (e) {
    console.log("error", e);
  }
};

onMounted(fetchPost);
</script>

<style></style>

<template>
  <v-form @submit.prevent="updatePost">
    <v-container class="m-card my-3">
      <v-row>
        <v-col cols="12" md="12">
          <h2>Chi tiết bài viết</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="post.title" :counter="20" label="Tiêu đề bài viết:"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="post.author" :counter="20" label="Tác giả:"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex">
          <v-label>Ảnh hiện tại:</v-label>
          <v-img style="max-width: 200px;" :src="`${url}${post.image}`" class="ms-3 rounded-lg"></v-img>
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
          <v-select variant="underlined" v-model="post.type" label="Loại tin tức" :items="['Tin sản phẩm', 'Tin thị trường']"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea variant="underlined" v-model="post.content" :counter="5000" label="Nội dung bài viết:"></v-textarea>
          <ContentEditor variant="underlined" v-model="post.content" :counter="5000" :rules="[v => !!v || 'Nội dung không quá 5000 ký.']"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
          <v-btn :to="`/admincp/post`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
