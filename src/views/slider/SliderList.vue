<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "../../axiosComfig";
import { useRouter } from "vue-router";
import GlobalPagination from "@/components/globals/GlobalPagination.vue";
import { siteData } from "@/stores/globals";
const siteStore = siteData();

// Slider API
const url = import.meta.env.VITE_PUBLIC_URL;
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
  try {
    siteStore.isLoading = true;
    const response = await axios.get("sliders");
    if (response.data.status === 200) {
      sliders.value = response.data.data.reverse();
      filteredSliders.value = sliders.value;
      selected.value = 0;
      siteStore.isLoading = false;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function deleteSlider(id) {
  try {
    await axios
      .delete(`${url}/api/sliders/delete/${id}`);
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
const rowsPerPage = 5;
const numberOfPage = computed(() => {
  return Math.ceil(sliders.value.length / rowsPerPage);
});
const updatePage = (event) => {
  page.value = event;
};

</script>

<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <v-card class="m-card">
        <div class="d-flex justify-space-between ma-5">
          <h2 class="da">Danh sách Slider</h2>
          <v-btn
            :to="`/admincp/slider/add`"
            prepend-icon="mdi-plus"
          >Thêm mới</v-btn>
        </div>
        <div class="d-flex align-cente justify-end ma-5">
          <v-select
            v-model="selected"
            prepend-inner-icon="mdi-list-box-outline"
            label="Tình trạng"
            variant="outlined"
            :items="[{
              title: 'Hoạt động', value: 0
            }, { title: 'Tạm dừng', value: 1, }]"
            density="compact"
            style="max-width: 500px;"
          >
          </v-select>
        </div>
        <v-table
          hover
          v-if="sliders.length > 0"
        >
          <thead>
            <tr>
              <th style="width: 22.5%;">
                Tên
              </th>
              <th style="width: 22.5%;">
                Tiêu đề
              </th>
              <th style="width: 15%">
                Hình ảnh
              </th>
              <th style="width: 15%;">
                Ngày tạo
              </th>
              <th style="width: 15%;">Tình trạng</th>
              <th class="font-weight-bold">
                Chức năng
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for=" item in filteredSliders.slice((page - 1) * rowsPerPage, page * rowsPerPage) "
              :key="item.id"
            >
              <td>
                <div class="more text-uppercase">{{ item.name }}</div>
              </td>
              <td>{{ item.title }} </td>
              <td>
                <img
                  :src="url + item.image"
                  width="80"
                  class="rounded-lg d-flex align-center justify-center"
                  :alt="item.name"
                />
              </td>
              <td>{{ item.created_at.slice(0, 10) }}</td>
              <td>{{ item.isDeleted ? 'Tạm dừng' : 'Hoạt động' }}</td>
              <td>
                <div class="d-flex align-center justify-center">
                  <v-btn
                    @click="editSlider(item.id)"
                    size="x-small"
                    variant="tonal"
                    icon="mdi-pencil"
                    color="success"
                    class="text-none"
                    :to="`/admincp/slider/edit/${item.id}`"
                  >
                  </v-btn>
                  <v-btn
                    @click="deleteSlider(item.id)"
                    size="x-small"
                    variant="tonal"
                    icon="mdi-trash-can-outline"
                    color="red-accent-4"
                    class="text-none"
                    onclick="return confirm('Bạn muốn xóa slider này ?')"
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
        <!-- phân trang -->
        <GlobalPagination
          v-if="sliders.length > rowsPerPage"
          :page="page"
          :numberOfPages="numberOfPage"
          @update:page="updatePage"
          class="mt-2"
        />
      </v-card>
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