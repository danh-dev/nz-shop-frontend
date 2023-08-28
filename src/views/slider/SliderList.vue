<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/GlobalPagination.vue";
// Slider API
const url = "http://127.0.0.1:8000/";
const sliders = ref([]);
const router = useRouter();
const filteredSliders = ref([]);
const selected = ref(null);

watch(selected, () => {
  if (selected.value) {
    filteredSliders.value = sliders.value.filter(item => item.isDeleted);
  } else {
    filteredSliders.value = sliders.value.filter(item => !item.isDeleted);
  }
});

const fetchSlider = async () => {
  selected.value = null;
  try {
    const response = await axios.get(`${url}api/sliders`);
    if (response.data.status === 200) {
      sliders.value = response.data.data.reverse();
      filteredSliders.value = sliders.value;
      selected.value = 0;
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
    console.log("Error delete slider: ", error);
  }
}
function editSlider(id) {
  router.push(`slider/edit/${id}`);
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
      <div>
        <div class="d-flex justify-space-between my-5">
          <h3 class="da">Danh sách Slider</h3>
          <v-select v-model="selected" label="Tình trạng" variant="outlined"
            :items="[{ title: 'Hoạt động', value: 0 }, { title: 'Đã xóa', value: 1, }]" density="compact"
            style="margin: 0 10%;">
          </v-select>
          <v-btn :to="`/admincp/slider/add`" color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
        </div>

        <v-table hover class="text-body-2 m-card my-3" v-if="sliders.length > 0">
          <thead>
            <tr>
              <th class="font-weight-bold text-center" style="width: 25%;">
                Tên
              </th>
              <th class="font-weight-bold text-center" style="width: 20%;">
                Tiêu đề
              </th>
              <th class="font-weight-bold text-center" style="width: 10%">
                Hình ảnh
              </th>
              <th class="font-weight-bold text-center" style="width: 15%;">
                Ngày tạo
              </th>
              <th class="font-weight-bold text-center">Tình trạng</th>
              <th class="font-weight-bold text-center" style="width: 10%">
                Chức năng
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for=" item in filteredSliders.slice((page - 1) * rowsPerPage, page * rowsPerPage) " :key="item.id">
              <td>
                <div class="more text-uppercase text-left">{{ item.name }}</div>
              </td>
              <td class="text-center">{{ item.title }} </td>
              <td>
                <img :src="url + item.image" width="80" class="rounded-lg d-flex align-center justify-center"
                  :alt="item.name" />
              </td>
              <td class="text-center">{{ item.created_at.slice(0, 10) }}</td>
              <td class="text-center">{{ item.isDeleted ? 'Đã xóa' : 'Hoạt động' }}</td>
              <td>
                <div class="d-flex align-center justify-center">
                  <v-btn @click="editSlider(item.id)" size="x-small" variant="tonal" icon="mdi-pencil" color="success"
                    class="text-none" :to="`/admincp/slider/edit/${item.id}`">
                  </v-btn>
                  <v-btn @click="deleteSlider(item.id)" size="x-small" variant="tonal" icon="mdi-trash-can-outline"
                    color="red-accent-4" class="text-none" onclick="return confirm('Bạn muốn xóa slider này ?')">
                  </v-btn>
                  <v-btn size="x-small" variant="text" icon="mdi-dots-vertical" color="" class="text-none">
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
    </v-col>
  </v-row>
</template>
<style>
</style>