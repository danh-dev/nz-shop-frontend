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
      <h2>Edit Slider</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field v-model="name" :rules="nameRules" :counter="20" label="Tiêu đề:" required></v-text-field>
            <v-text-field v-model="title" :rules="nameRules" :counter="20" label="Tiêu đề:" required></v-text-field>
            <div class="d-flex mb-5">
              <label for="" class="text-body-2">Ảnh hiện tại: </label>
              <img
                src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png"
                alt="" class="w-25 h-25 mx-2 rounded">
            </div>

            <v-text-field v-model="image" type="file" label="Upload hình ảnh:" required></v-text-field>

            <v-text-field readonly v-model="date_created" type="date" required></v-text-field>
            <v-select label="Trạng thái:" :items="['Hoạt động', 'Tạm dừng']" required></v-select>
            <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
            <v-btn :to="`/admincp/slider`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
