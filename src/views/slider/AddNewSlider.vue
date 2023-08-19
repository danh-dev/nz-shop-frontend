<script>
export default {
  data: () => ({
    valid: false,

    name: "",
    title: "",
    status: "",
    nameRules: [
      value => {
        if (value?.length <= 10) { return true; }

        return "Tên bắt buộc nhập.";
      },
      value => {
        if (value) { return true; }

        return "Tiêu đề bài viết bắt buộc nhập.";
      },
      value => {
        if (value) { return true; }

        return "Vui lòng lựa chọn trạng thái.";
      },
    ],

    image: null,
    imageRules: [
      value => {
        if (value) { return true; }
        return "Dung lượng ảnh không vượt quá 2MB.";
      }
    ],
  }),
};
</script>

<style></style>

<template>
  <v-form v-model="valid">
    <v-container class="m-card my-3">
      <h2>Chi tiết Slider mới</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field v-model="name" :rules="nameRules" :counter="20" label="Tiêu đề:" required></v-text-field>
            <v-text-field v-model="title" :rules="nameRules" :counter="20" label="Tiêu đề:" required></v-text-field>
            <v-text-field v-model="image" type="file" label="Upload hình ảnh:" required></v-text-field>
            <v-text-field v-model="date_created" type="date" required></v-text-field>
            <v-select label="Trạng thái:" :items="['Hoạt động', 'Tạm dừng']"></v-select>
            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn :to="`/admincp/slider`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
