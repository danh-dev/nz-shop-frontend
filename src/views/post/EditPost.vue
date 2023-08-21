<!-- <script>
import axios from "axios";
export default {
  data() {
    return {
      id: null,
      editPost: {
        title: "",
        author: "",
        image: [],
        type: "",
        content: "",
      }
    }
    created() {
      id = $route.params.id;
      fetchPost();
    }
    methods: {
      async fetchPost() {
        try {
          const response = await axios
            .get(`http://127.0.0.1:8000/api/posts/${this.id}`);
          if (response.data.status == 200) {
            this.editPost = response.data.data;
          }
        } catch (error) {
          console.log("Error fetch post: ", error);
        }
      },
      async updatePost() {
        try {
          let response = await axios
            .put(`http://127.0.0.1:8000/api/post/edit/${this.productId}`,
              this.productEdit);
          if (response.data.status == 200) {
            this.$router.push("/");
          }
        } catch (error) {
          console.log("Error update post: ", error);
        }
      }
    };
  }
}
</script> -->

<style></style>

<template>
  <v-form>
    <v-container class="m-card my-3">
      <h2>Chi tiết bài viết</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field variant="underlined" :counter="20" label="Tiêu đề bài viết:"></v-text-field>
            <v-text-field :counter="20" label="Tác giả:"></v-text-field>
            <v-file-input variant="underlined" prepend-inner-icon="mdi-image-outline" prepend-icon=""
              label="Upload hình ảnh:"></v-file-input>
            <v-select variant="underlined" label="Loại tin tức" :items="['Tin sản phẩm', 'Tin thị trường']"></v-select>
            <v-textarea variant="underlined" :counter="5000" label="Nội dung bài viết:"></v-textarea>
            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn :to="`/admincp/post`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
