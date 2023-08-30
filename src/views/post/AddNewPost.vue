<script setup>
import { ref } from "vue";
import axios from "../../axiosComfig";
import { useRouter } from "vue-router";
import ContentEditor from "../../components/globals/ContentEditor.vue";

const router = useRouter();
const newPost = ref({
  title: "",
  author: "",
  image: [],
  content: "",
  type: "",
});
async function createPost() {
  const formData = new FormData();
  Object.entries(newPost.value).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, value[0]);
    }
    else {
      formData.append(key, value);
    }
  });
  try {
    const response = await axios.post("posts", formData);
    if (response.data.status === 201) {
      router.push("/admincp/post");
    }
  } catch (e) {
    console.log("error", e);
  }
};

function editContent(event) {
  newPost.value.content = event;
};
</script>

<style></style>

<template>
  <v-form
    ref="form"
    @submit.prevent="createPost"
  >
    <v-container class="m-card my-3">
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <h2>Chi tiết bài viết mới</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            variant="underlined"
            v-model="newPost.title"
            :rules="[v => !!v || 'Vui lòng không để trống.']"
            :counter="20"
            label="Tiêu đề bài viết:"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            variant="underlined"
            v-model="newPost.author"
            :rules="[v => !!v || 'Vui lòng không để trống.']"
            :counter="20"
            label="Tác giả:"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-file-input
            variant="underlined"
            v-model="newPost.image"
            counter
            multiple
            show-size
            prepend-inner-icon="mdi-image-outline"
          prepend-icon=""
          label="Upload hình ảnh:"
        >
        </v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          variant="underlined"
          v-model="newPost.type"
          :rules="[v => !!v || 'Vui lòng lựa chọn.']"
          label="Loại tin tức:"
          :items="['Tin sản phẩm', 'Tin thị trường']"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          name="editor"
          variant="underlined"
          v-model="newPost.content"
          :rules="[v => !!v || 'Vui lòng không để trống & không vượt quá 10000 ký tự..']"
          :counter="10000"
          label="Nội dung trang:"
        >
        </v-textarea>
        <ContentEditor
          :editorContent="newPost.content"
          @editContent="editContent"
        />
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
          color="info"
          variant="tonal"
        >Đăng bài</v-btn>
        <v-btn
          :to="`/admincp/post`"
          type="reset"
          color="text-darken-3"
          variant="tonal"
        >Hủy bỏ</v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-form></template>
