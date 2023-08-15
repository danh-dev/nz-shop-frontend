<script setup>
import { ref, computed } from "vue";
import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/globalpagination.vue";
const sliders = ref([
  {
    id: 1,
    name: "z flip5|fold5",
    title: "Mở bán giá sốc",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 2,
    name: "xiaomi pad 6",
    title: "Mở bán giá tốt",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/mo-ban-xiaomi-pad-6-slide.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 3,
    name: "oppo renno 10",
    title: "Dẫn đầu xu hướng",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/78FD7174-0C85-4E5D-A07D-4BD660CAF818.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 4,
    name: "remi watch 3 active",
    title: "Mở bán giá hấp dẫn",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/redmi%20watch%203%20acitve%20sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 5,
    name: "ipl tour pro 2",
    title: "Ưu đãi cực khủng",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/pre-tai-nghe-jbl-tour-pro2-slide.jpg",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 6,
    name: "z flip5|fold5",
    title: "Mở bán giá sốc",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 7,
    name: "xiaomi pad 6",
    title: "Mở bán giá tốt",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 8,
    name: "oppo renno 10",
    title: "Dẫn đầu xu hướng",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 9,
    name: "iphone 14 promax",
    title: "Mở bán từ 30.999 triệu",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 10,
    name: "ipl tour pro 2",
    title: "Ưu đãi cực khủng",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 11,
    name: "z flip5|fold5",
    title: "Mở bán giá sốc",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 12,
    name: "xiaomi pad 6",
    title: "Mở bán giá tốt",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 13,
    name: "oppo renno 10",
    title: "Dẫn đầu xu hướng",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 14,
    name: "iphone 14 promax",
    title: "Mở bán từ 30.999 triệu",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
  {
    id: 15,
    name: "ipl tour pro 2",
    title: "Ưu đãi cực khủng",
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-flip-5-sliding.png",
    date: "15/06/2023",
    status: "Hoạt động"
  },
]);
// Code for pagination
const page = ref(1);
const rowsPerPage = 8;

const numberOfPage = computed(() => {
  return Math.ceil(sliders.value.length / rowsPerPage);
});

const updatePage = (event) => {
  page.value = event;
};
// Code for pagination

</script>

<template>
  <div v-if="sliders.length > 0">
    <div class="d-flex justify-space-between my-5">
      <h3 class="da">Danh sách Slider</h3>
      <v-btn color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
    </div>
    <v-table hover class="text-body-2 m-card my-3">
      <thead>
        <tr>
          <th class="font-weight-bold text-center" style="width: 5%;">
            ID
          </th>
          <th class="font-weight-bold text-center" style="width: 20%;">
            Tên
          </th>
          <th class="font-weight-bold text-center" style="width: 23.5%;">
            Tiêu đề
          </th>
          <th class="font-weight-bold text-center" style="width: 10%">
            Hình ảnh
          </th>
          <th class="font-weight-bold text-center" style="width: 15%;">
            Ngày tạo
          </th>
          <th class="font-weight-bold text-center" style="width: 15%;">
            Tình trạng
          </th>
          <th class="font-weight-bold text-center">
            Chức năng
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in sliders.slice((page - 1) * rowsPerPage, page * rowsPerPage)" :key="item.id">
          <td class="text-center">
            <div>{{ item.id }}</div>
          </td>
          <td>
            <div class="more text-uppercase text-center">{{ item.name }}</div>
          </td>
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center"> <v-img :src="item.image" width="75" class="rounded-lg" /></td>
          <td class="text-center">{{ item.date }}</td>
          <td class="text-center">{{ item.status }}</td>
          <td>
            <div class="d-flex align-center justify-center">
              <v-btn size="small" variant="tonal" icon="mdi-text-box-edit-outline" color="success" class="text-none"
                :to="`/admincp/slider/${getSlugByName(item.name)}`">
              </v-btn>
              <v-btn href="#" size="small" variant="tonal" icon="mdi-trash-can-outline" color="red-accent-4"
                class="text-none" onclick="return confirm('Bạn muốn xóa slider này ?')">
              </v-btn>
              <v-btn size="small" variant="text" icon="mdi-dots-vertical" color=""
                class="text-none">
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <!-- phân trang -->
    <GlobalPagination v-if="sliders.length > rowsPerPage" :page="page" :numberOfPages="numberOfPage"
      @update:page="updatePage" class="mt-2" />
  </div>

  <div v-else class="d-flex flex-column justify-center align-center pa-5">
    <img src="../../../public/updating.png" alt="updating" class="w-25">
    <p>Đang cập nhật mới dữ liệu...</p>
  </div>
</template>
<style>
.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>