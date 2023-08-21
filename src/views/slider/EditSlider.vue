<script>
export default {
  // data: () => ({
  //   valid: false,

  //   name: "",
  //   nameRules: [
  //     value => {
  //       if (value) { return true; }
  //       return "Tên bắt buộc nhập.";
  //     },
  //   ],

  //   title: "",
  //   titleRules: [
  //     value => {
  //       if (value) { return true; }
  //       return "Tiêu đề bắt buộc nhập.";
  //     },
  //   ],

  //   date_created: "",
  //   dateRules: [
  //     value => {
  //       if (value) { return true; }
  //       return "Vui lòng lựa chọn.";
  //     },
  //   ],
  //   status: "",
  //   statusRules: [
  //     value => {
  //       if (value) { return true; }
  //       return "Vui lòng lựa chọn.";
  //     },
  //   ],

  //   image: null,
  //   imageRules: [
  //     value => {
  //       if (value) { return true; }
  //       return "Vui lòng chọn ảnh. Dung lượng ảnh không vượt quá 2MB.";
  //     }
  //   ],
  // }),
};
</script>

<style></style>

<template>
  <v-form >
    <v-container class="m-card my-3">
      <h2>Chỉnh sửa Slider</h2>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <v-text-field variant="underlined" :counter="20" label="Tên:" required></v-text-field>
            <v-text-field variant="underlined" :counter="20" label="Tiêu đề:" required></v-text-field>
            <v-file-input variant="underlined" prepend-inner-icon="mdi-image-outline" prepend-icon="" label="Upload hình ảnh:" ></v-file-input>
            <v-select variant="underlined" label="Trạng thái:" :items="['Hoạt động', 'Tạm dừng']" required></v-select>
            <v-btn class="me-2" type="submit" color="info" variant="tonal">Chỉnh sửa</v-btn>
            <v-btn :to="`/admincp/slider`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
