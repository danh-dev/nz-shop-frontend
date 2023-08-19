<!-- eslint-disable no-console -->
<!-- eslint-disable no-dupe-keys -->
<!-- eslint-disable camelcase -->
<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,

    title: "",
    author: "",
    nameRules: [
      value => {
        if (value) { return true; }

        return "Tiêu đề bài viết bắt buộc nhập.";
      },
      value => {
        if (value?.length <= 10) { return true; }

        return "Tác giả bắt buộc nhập.";
      },
    ],

    image: null,
    imageRules: [
      value => {
        if (value) { return true; }
        return "Dung lượng ảnh không vượt quá 2MB.";
      }
    ],

    content: "",
    contentlRules: [
      value => {
        if (value) { return true; }

        return "Nội dung bài viết nên nhiều hơn 500 từ.";
      },
    ],
  }),

  dataPost() {
    return {
      newPost: {
        title: "",
        author: "",
        image: "",
        date_created: "",
        type: "",
        content: "",
      }
    };
  },
  methods: {
    async createPost() {
      try {
        const response = await axios
          .post("http://127.0.0.1:8000/api/products", this.newPost);
        if (response.data.status === 201) {
          this.$router.push("/admincp/post");
        }
      } catch (error) {
        console.log("Error add new post: ", error);
      }
    }
  },
};

</script>

<style></style>

<template>
  <v-form v-model="valid">
    <v-container class="m-card my-3">
      <h2>Chi tiết bài viết mới</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field v-model="title" :rules="nameRules" :counter="20" label="Tiêu đề bài viết:"
              required></v-text-field>
            <v-text-field v-model="author" :rules="nameRules" :counter="20" label="Tác giả:" required></v-text-field>
            <v-text-field v-model="image" type="file" label="Upload hình ảnh:" required></v-text-field>
            <v-text-field v-model="date_created" type="date" required></v-text-field>
            <v-select label="Loại tin tức" :items="['Tin sản phẩm', 'Tin thị trường']"></v-select>
            <v-textarea v-model="content" :rules="contentlRules" :counter="3000" label="Nội dung bài viết:"
              required></v-textarea>

            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn href="" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
