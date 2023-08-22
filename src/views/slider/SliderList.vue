<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/globalpagination.vue";
// Slider API
const url = "http://127.0.0.1:8000/";
const sliders = ref([]);
const router = useRouter();

const fetchSlider = async () => {
  try {
    const response = await axios.get(`${url}api/sliders`);
    if (response.data.status === 200) {
      sliders.value = response.data.data.reverse();
    } else if (response.data.status === 404) {
      sliders.value = [];
      console.log("Something error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};


async function deleteSlider(id) {
  try {
    await axios
      .delete(`http://127.0.0.1:8000/api/sliders/delete/${id}`);
    fetchSlider();
  } catch (error) {
    console.log("Error delete post: ", error);
  }
}
function editSlider(name) {
  router.push(`slider/edit/${name}`);
}

onMounted(fetchSlider);

// pagination
const page = ref(1);
const rowsPerPage = 8;
const numberOfPage = computed(() => {
  return Math.ceil(sliders.value.length / rowsPerPage);
});
const updatePage = (event) => {
  page.value = event;
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div v-if="sliders.length > 0">
        <div class="d-flex justify-space-between my-5">
          <h3 class="da">Danh sách Slider</h3>
          <v-btn :to="`/admincp/slider/add`" color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
        </div>
        <v-table hover class="text-body-2 m-card my-3">
          <thead>
            <tr>
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
              <td>
                <div class="more text-uppercase text-left">{{ item.name }}</div>
              </td>
              <td class="text-center">{{ item.title }} </td>
              <td>
                <img :src="url + item.image" width="80"
                    class="rounded-lg d-flex align-center justify-center" :alt="item.name" />
              </td>
              <td class="text-center">{{ item.created_at.slice(0, 10) }}</td>
              <td class="text-center">
                <div v-if="item.status === 'Hoạt động' ? `class='text-success'` : `class='text-danger'`">
                  {{ item.status }}
                </div>
              </td>
              <td>
                <div class="d-flex align-center justify-center">
                  <v-btn @click="editSlider(item.id)" size="small" variant="tonal"
                    icon="mdi-text-box-edit-outline" color="success" class="text-none"
                    :to="`/admincp/slider/edit/${item.id}`">
                  </v-btn>
                  <v-btn @click="deleteSlider(item.id)" size="small" variant="tonal" icon="mdi-trash-can-outline"
                    color="red-accent-4" class="text-none" onclick="return confirm('Bạn muốn xóa slider này ?')">
                  </v-btn>
                  <v-btn size="small" variant="text" icon="mdi-dots-vertical" color="" class="text-none">
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
        <!-- <v-text-field color="success" variant="text" class="w-25" loading disabled></v-text-field> -->
        <p>Đang cập nhật mới dữ liệu...</p>
      </div>
    </v-col>
  </v-row>
</template>
<style>
.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>