<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "../../axiosComfig";
import { useRouter } from "vue-router";
// import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/GlobalPagination.vue";
// Page API
const url = import.meta.env.VITE_PUBLIC_URL;
const pages = ref([]);
const router = useRouter();
const filteredPages = ref([]);
const selected = ref(null);

watch(selected, () => {
  if (selected.value) {
    filteredPages.value = pages.value.filter(item => item.isDeleted);
  } else {
    filteredPages.value = pages.value.filter(item => !item.isDeleted);
  }
});

const fetchPage = async () => {
  try {
    const response = await axios.get("pages");
    if (response.data.status === 200) {
      pages.value = response.data.data.reverse();
      filteredPages.value = pages.value;
      selected.value = 0;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function deletePage(id) {
  try {
    await axios
      .delete(`${url}api/pages/delete/${id}`);
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
const rowsPerPage = 5;
const numberOfPage = computed(() => {
  return Math.ceil(pages.value.length / rowsPerPage);
});
const updatePage = (event) => {
  page.value = event;
};


</script>

<template>
  <v-row class="">
    <v-col
      aria-colspan="12"
      md="12"
    >
      <v-card class="m-card">
        <div class="d-flex justify-space-between ma-5">
          <h2 class="">Danh sách trang</h2>
          <v-btn
            prepend-icon="mdi-plus"
            :to="`/admincp/page/add`"
          >Thêm mới</v-btn>
        </div>
        <v-table
          hover
          v-if="pages.length > 0"
        >
          <thead>
            <tr>
              <th style="width: 55%;">
                Tên trang
              </th>
              <!-- <th
                style="width: 20%"
              >
                Tác giả
              </th> -->
              <th style="width: 15%;">
                Ngày tạo
              </th>
              <th style="width: 15%;">
                Tình trạng</th>
              <th style="width: 10%">
                Chức năng
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in pages.slice((page - 1) * rowsPerPage, page * rowsPerPage)"
              :key="item.id"
            >
              <td>
                <div class="extra">{{ item.name }}</div>
              </td>
              <!-- <td>{{ item.author }}</td> -->
              <td>{{ item.created_at.slice(0, 10) }}</td>
              <td>{{ item.isDeleted ? 'Đã xóa' : 'Hoạt động' }}</td>
              <td>
                <div class="d-flex align-center justify-space-between">
                  <v-btn
                    @click="editPage(item.id)"
                    size="x-small"
                    variant="tonal"
                    icon="mdi-pencil"
                    color="success"
                    class="text-none"
                  >
                  </v-btn>
                  <v-btn
                    @click="deletePage(item.id)"
                    size="x-small"
                    variant="tonal"
                    icon="mdi-trash-can-outline"
                    color="red-accent-4"
                    class="text-none"
                    onclick="return confirm('Bạn muốn xóa trang này ?')"
                  >
                  </v-btn>
                  <v-btn
                    size="x-small"
                    variant="text"
                    icon="mdi-dots-vertical"
                    color=""
                    class="text-none"
                  >
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-alert
          v-else
          density="compact"
          text="Không có thông tin trang"
          type="info"
          variant="tonal"
        ></v-alert>
        <GlobalPagination
          v-if="pages.length > rowsPerPage"
          :page="page"
          :numberOfPages="numberOfPage"
          @update:page="updatePage"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
<style></style>