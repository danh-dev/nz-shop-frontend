<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/globalpagination.vue";
// Page API
const url = "http://127.0.0.1:8000/";
const pages = ref([]);
const router = useRouter();
const fetchPage = async () => {
  try {
    const response = await axios.get(`${url}api/pages`);
    if (response.data.status === 200) {
      pages.value = response.data.data.reverse();
    } else if (response.data.status === 404) {
      pages.value = [];
      console.log("Something error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function deletePage(id) {
  try {
    await axios
      .delete(`http://127.0.0.1:8000/api/pages/delete/${id}`);
    fetchPage();
  } catch (error) {
    console.log("Error delete page: ", error);
  }
}
function editPage(id) {
  router.push(`page/edit/${id}`);
}

onMounted(fetchPage);

// Panigation
const page = ref(1);
const rowsPerPage = 10;
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
          <!-- <th class="font-weight-bold text-center" style="width: 5%;">
            ID
          </th> -->
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
          <!-- <td class="text-center">
            <div>{{ item.id }}</div>
          </td> -->
          <td>
            <div class="">{{ item.name }}</div>
          </td>
          <td class="text-center">{{ item.author }}</td>
          <td class="text-center">{{ item.created_at.slice(0, 10) }}</td>
          <td>
            <div class="d-flex align-center justify-space-between">
              <v-btn @click="editPage(item.id)" size="small" variant="tonal"
                icon="mdi-text-box-edit-outline" color="success" class="text-none"
                :to="`/admincp/page/edit/${getSlugByName(item.name)}`">
              </v-btn>
              <v-btn @click="deletePage(item.id)" size="small" variant="tonal" icon="mdi-trash-can-outline"
                color="red-accent-4" class="text-none" onclick="return confirm('Bạn muốn xóa bài viết này ?')">
              </v-btn>
              <v-btn size="small" variant="text" icon="mdi-dots-vertical" color="" class="text-none">
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
    <!-- <v-text-field color="success" variant="text" class="w-25" loading disabled></v-text-field> -->
    <p>Đang cập nhật mới dữ liệu...</p>
  </div>
</template>
<style></style>