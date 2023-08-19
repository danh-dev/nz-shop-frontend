<script>
// import {ref} from "vue";
// const pages = ref([
//   {
//     id: 1,
//     name: "Chính sách bảo hành",
//     author: "Jonathan",
//     date: "15/08/2023",
//   },
//   {
//     id: 2,
//     name: "Chính sách giao hàng",
//     author: "Jonathan",
//     date: "15/08/2023",
//   },
//   {
//     id: 3,
//     name: "Quy định về hóa đơn mua hàng",
//     author: "Jonathan",
//     date: "15/08/2023",
//   },
//   {
//     id: 4,
//     name: "Hướng dẫn mua hàng từ xa",
//     author: "Jonathan",
//     date: "15/08/2023",
//   },
//   {
//     id: 5,
//     name: "Liên hệ hợp tác kinh doanh",
//     author: "Jonathan",
//     date: "15/08/2023",
//   },
//   {
//     id: 6,
//     name: "Quy trình giao dịch",
//     author: "Jonathan",
//     date: "15/08/2023",
//   },
//   {
//     id: 7,
//     name: "Chính sách hủy giao dịch, đổi trả hàng",
//     author: "Jonathan",
//     date: "15/08/2023",
//   },

// ]);

export default {
  data: () => ({
    valid: false,

    name: "",
    author: "",
    nameRules: [
      value => {
        if (value) { return true; }

        return "Tên trang bắt buộc nhập.";
      },
      value => {
        if (value?.length <= 10) { return true; }

        return "Tác giả bắt buộc nhập.";
      },
    ],

    content: "",
    contentlRules: [
      value => {
        if (value) { return true; }

        return "Nội dung trang nên nhiều hơn 500 từ.";
      },
    ],
  }),
};
</script>

<style></style>

<template>
  <v-form v-model="valid">
    <v-container class="m-card my-3">
      <h2>EditPage</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field v-model="title" :rules="nameRules" :counter="20" label="Tên trang:" required></v-text-field>
            <v-text-field v-model="author" :rules="nameRules" :counter="20" label="Tác giả:" required></v-text-field>
            <v-text-field readonly v-model="date_created" type="date" required></v-text-field>
            <v-textarea v-model="content" :rules="contentlRules" :counter="3000" label="Nội dung trang:"
              required></v-textarea>
            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn href="" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
