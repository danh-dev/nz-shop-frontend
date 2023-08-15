<script setup>
import { ref, computed } from "vue";
// import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/globalpagination.vue";
const sliders = ref([
  {
    id: 1,
    name: "z flip5|fold5",
    title: "Mở bán giá sốc",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 2,
    name: "xiaomi pad 6",
    title: "Mở bán giá tốt",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 3,
    name: "oppo renno 10",
    title: "Dẫn đầu xu hướng",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 4,
    name: "iphone 14 promax",
    title: "Mở bán từ 30.999 triệu",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 5,
    name: "ipl tour pro 2",
    title: "Ưu đãi cực khủng",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 6,
    name: "z flip5|fold5",
    title: "Mở bán giá sốc",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 7,
    name: "xiaomi pad 6",
    title: "Mở bán giá tốt",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 8,
    name: "oppo renno 10",
    title: "Dẫn đầu xu hướng",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 9,
    name: "iphone 14 promax",
    title: "Mở bán từ 30.999 triệu",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 10,
    name: "ipl tour pro 2",
    title: "Ưu đãi cực khủng",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 11,
    name: "z flip5|fold5",
    title: "Mở bán giá sốc",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 12,
    name: "xiaomi pad 6",
    title: "Mở bán giá tốt",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 13,
    name: "oppo renno 10",
    title: "Dẫn đầu xu hướng",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 14,
    name: "iphone 14 promax",
    title: "Mở bán từ 30.999 triệu",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  {
    id: 15,
    name: "ipl tour pro 2",
    title: "Ưu đãi cực khủng",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    status: "Đang hoạt động"
  },
  
]);

const page = ref(1);
const rowsPerPage = 10;

const numberOfPage = computed(() => {
  return Math.ceil(sliders.value.length / rowsPerPage);
});

const updatePage = (event) => {
  page.value = event;
};

</script>

<template>
  <div v-if="sliders.length > 0">
    <div class="d-flex justify-space-between my-5">
      <h3 class="da">Danh sách Slider</h3>
      <v-btn color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
    </div>
    <v-table hover class="text-body-2">
      <thead>
        <tr>
          <th class="font-weight-bold text-center" style="width: 5%;">
            ID
          </th>
          <th class="font-weight-bold text-center" style="width: 20%;">
            Tên
          </th>
          <th class="font-weight-bold text-center" style="width: 25%;">
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
          <th class="font-weight-bold text-center" style="width: 10%">
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
          <td class="text-center"> <v-img :src="item.image" width="75"></v-img></td>
          <td class="text-center">{{ item.date }}</td>
          <td class="text-center">{{ item.status }}</td>
          <td>
            <div class="d-flex flex-column">
              <v-btn href="#" size="small" :variant="'tonal'" prepend-icon="mdi-trash-can-outline" text="Xóa"
                onclick="return confirm('Bạn muốn xóa slider này ?')" color="red-accent-4" class="text-none my-1">
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <!-- phân trang -->
    <GlobalPagination :page="page" :numberOfPages="numberOfPage" @update:page="updatePage" />
  </div>

  <div v-if="sliders.length == 0" class="text-center text-uppercase pa-5">
    <p>Không có slider nào !!!</p>
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