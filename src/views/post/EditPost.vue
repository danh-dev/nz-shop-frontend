<script>
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
};
</script>

<style></style>

<template>
  <v-form v-model="valid">
    <v-container class="m-card my-3">
      <h2>Chi tiết bài viết</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field v-model="title" :rules="nameRules" :counter="20" label="Tiêu đề bài viết:"
              required></v-text-field>
            <v-text-field v-model="author" :rules="nameRules" :counter="20" label="Tác giả:" required></v-text-field>
            <div class="d-flex mb-5">
              <label for="" class="text-body-2">Ảnh hiện tại: </label>
              <img
                src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png"
                alt="" class="w-25 h-25 mx-2 rounded">
            </div>
            <v-text-field v-model="image" type="file" label="Upload ảnh mới:" required></v-text-field>
            <v-text-field readonly v-model="date_created" type="date" required></v-text-field>
            <v-select label="Loại tin tức" :items="['Tin sản phẩm', 'Tin thị trường']"></v-select>
            <v-textarea v-model="content" :rules="contentlRules" :counter="3000" label="Nội dung bài viết:"
              required></v-textarea>

            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn :to="`/admincp/post`" href="" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
