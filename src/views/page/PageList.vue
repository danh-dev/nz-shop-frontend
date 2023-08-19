<script setup>
import { ref, computed } from "vue";
import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/globalpagination.vue";

const pages = ref([
  {
    id: 1,
    name: "Chính sách bảo hành",
    author: "Jonathan",
    date: "15/08/2023",
  },
  {
    id: 2,
    name: "Chính sách giao hàng",
    author: "Jonathan",
    date: "15/08/2023",
  },
  {
    id: 3,
    name: "Quy định về hóa đơn mua hàng",
    author: "Jonathan",
    date: "15/08/2023",
  },
  {
    id: 4,
    name: "Hướng dẫn mua hàng từ xa",
    author: "Jonathan",
    date: "15/08/2023",
  },
  {
    id: 5,
    name: "Liên hệ hợp tác kinh doanh",
    author: "Jonathan",
    date: "15/08/2023",
  },
  {
    id: 6,
    name: "Quy trình giao dịch",
    author: "Jonathan",
    date: "15/08/2023",
  },
  {
    id: 7,
    name: "Chính sách hủy giao dịch, đổi trả hàng",
    author: "Jonathan",
    date: "15/08/2023",
  },

]);
const page = ref(1);
const rowsPerPage = 7;

const numberOfPage = computed(() => {
  return Math.ceil(pages.value.length / rowsPerPage);
});

const updatePage = (event) => {
  page.value = event;
};


</script>

<template>
  <div v-if="pages.length > 0">
    <div class="d-flex justify-space-between my-5">
      <h3 class="da">Danh sách trang</h3>
      <v-btn :to="`/admincp/page/add`" color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
    </div>
    <v-table hover class="post text-body-2 m-card my-3">
      <thead>
        <tr>
          <th class="font-weight-bold text-center" style="width: 5%;">
            ID
          </th>
          <th class="font-weight-bold text-center" style="width: 35%;">
            Tên trang
          </th>
          <th class="font-weight-bold text-center" style="width: 20%">
            Tác giả
          </th>
          <th class="font-weight-bold text-center" style="width: 20%;">
            Ngày tạo
          </th>
          <th class="font-weight-bold text-center" style="width: 10%">
            Chức năng
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in pages.slice((page - 1) * rowsPerPage, page * rowsPerPage)" :key="item.id">
          <td class="text-center">
            <div>{{ item.id }}</div>
          </td>
          <td>
            <div class="text-center">{{ item.name }}</div>
          </td>
          <td class="text-center">{{ item.author }}</td>
          <td class="text-center">{{ item.date }}</td>
          <td>
            <div class="d-flex align-center justify-space-between">
              <v-btn size="small" variant="tonal" icon="mdi-text-box-edit-outline"
                color="success" class="text-none" :to="`/admincp/page/edit/${getSlugByName(item.name)}`">
              </v-btn>
              <v-btn size="small" variant="tonal" icon="mdi-trash-can-outline"
                color="red-accent-4" class="text-none" onclick="return confirm('Bạn muốn xóa bài viết này ?')" >
              </v-btn>
              <v-btn size="small" variant="text" icon="mdi-dots-vertical"
                class="text-none">
              </v-btn>
            </div>

          </td>
        </tr>
      </tbody>
    </v-table>
    <GlobalPagination v-if="pages.length > rowsPerPage" :page="page" :numberOfPages="numberOfPage"
      @update:page="updatePage" />
  </div>

  <div v-else class="d-flex flex-column justify-center align-center pa-5">
    <img src="../../../public/updating.png" alt="updating" class="w-25">
    <p>Đang cập nhật mới dữ liệu...</p>
  </div>
</template>
<style>
</style>