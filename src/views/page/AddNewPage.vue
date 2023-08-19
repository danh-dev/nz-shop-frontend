<script>
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
      <h2>Chi tiết trang mới:</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field v-model="title" :rules="nameRules" :counter="20" label="Tên trang:" required></v-text-field>
            <v-text-field v-model="author" :rules="nameRules" :counter="20" label="Tác giả:" required></v-text-field>
            <v-text-field v-model="date_created" type="date" required></v-text-field>
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
