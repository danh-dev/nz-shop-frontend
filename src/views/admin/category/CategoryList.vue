<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "../../../axiosComfig";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";
import GlobalLoader from "../../../components/globals/GlobalLoader.vue";

const url = import.meta.env.VITE_PUBLIC_URL;
const loading = ref(false);

const alert = ref([
  {
    text: "",
    show: false,
  },
  {
    text: "",
    show: false,
  },
  {
    text: "",
    show: false,
  },
]);

const tempId = ref(0);

const filter = ref([
  {
    title: "Đang hoạt động",
    value: 0
  },
  {
    title: "Đã xoá",
    value: 1,
  }
]);

const categories = ref([]);
const newCategories = ref([]);
const filteredCategories = ref([]);

const page = ref(1);

const status = ref(null);
const rowsPerPage = 5;

const numberOfPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / rowsPerPage);
});

watch(status, () => {
  if (status.value) {
    filteredCategories.value = newCategories.value.filter(item => item.isDeleted);
  }
  else {
    filteredCategories.value = newCategories.value.filter(item => !item.isDeleted);
  }
});

const updatePage = event => {
  page.value = event;
};

const fetchData = async () => {
  loading.value = true;
  status.value = null;
  try {
    const res = await axios.get("categories");
    if (res.status === 200) {
      categories.value = res.data.data.map(category => mapKeys(category, (value, key) => camelCase(key)));
    }
    newCategories.value = categories.value.filter(item => !item.parentCategoryId);
    filteredCategories.value = newCategories.value;
    status.value = 0;
    loading.value = false;
  }
  catch (e) {
    loading.value = false;
  }
};

const handleDeleteRecoverButton = (id, name) => {
  const action = status.value ? "Khôi phục" : "Xoá";
  alert.value[0].text = `Bạn muốn ${lowerFirst(action)} danh mục ${name}?`;
  alert.value[2].text = `${action} thành công!`;
  alert.value[0].show = true;
  alert.value[1].show = false;
  alert.value[2].show = false;
  tempId.value = id;
};

const confirmFirstAlert = async () => {
  alert.value[0].show = false;
  try {
    const action = status.value ? "recover" : "delete";
    const res = await axios.put(`categories/${action}/${tempId.value}`);

    if (res.status === 200) {
      await fetchData();
      alert.value[2].show = true;
      setTimeout(() => {
        alert.value[2].show = false;
      }, 5000);
    }
    if (res.status === 202) {
      alert.value[1].text = status.value ? "Muốn khôi phục danh mục này phải khôi phục danh mục cha của nó, bạn có muốn thực hiện không?" : "Danh mục này có các danh mục con. Bạn có muốn xoá tất cả danh mục con của nó không?";
      alert.value[1].show = true;
    }
  }
  catch (e) {
    console.log(e);
  }
};

const confirmSecondAlert = async () => {
  alert.value[1].show = false;
  try {
    const action = status.value ? "recover" : "delete";
    const res = await axios.put(`categories/${action}-recursively/${tempId.value}`);

    if (res.status === 200) {
      await fetchData();
      alert.value[2].show = true;
      setTimeout(() => {
        alert.value[2].show = false;
      }, 5000);
    }
  }
  catch (e) {
    console.log(e);
  }
};

onMounted(fetchData);
</script>

<template>
  <div>
    <div class="d-flex align-center my-5">
      <h1>Danh sách danh mục</h1>
      <v-btn
        prepend-icon="mdi-plus"
        class="ms-auto"
        :to="{
          name: 'admin-category-create',
        }"
      >Thêm mới</v-btn>
    </div>
    <div class="d-flex align-center my-5">
      <v-autocomplete
        class="ms-auto"
        prepend-inner-icon="mdi-list-box-outline"
        density="compact"
        label="Trạng thái"
        :items="filter"
        v-model="status"
        variant="outlined"
        hide-no-data
        hide-details
        style="max-width: 500px;"
      ></v-autocomplete>
    </div>

    <v-alert
      type="warning"
      :text="alert[0].text"
      v-model="alert[0].show"
      variant="tonal"
    >
      <template #append>
        <v-btn
          density="compact"
          color="red-accent-4"
          icon="mdi-window-close"
          variant="flat"
          class="mr-2"
          @click="alert[0].show = false"
        ></v-btn>
        <v-btn
          density="compact"
          color="success"
          icon="mdi-check"
          variant="flat"
          @click="confirmFirstAlert"
        ></v-btn>
      </template>
    </v-alert>
    <v-alert
      type="error"
      :text="alert[1].text"
      v-model="alert[1].show"
      variant="tonal"
    >
      <template #append>
        <v-btn
          density="compact"
          color="red-accent-4"
          icon="mdi-window-close"
          variant="flat"
          class="mr-2"
          @click="alert[1].show = false"
        ></v-btn>
        <v-btn
          density="compact"
          color="success"
          icon="mdi-check"
          variant="flat"
          @click="confirmSecondAlert"
        ></v-btn>
      </template>
    </v-alert>
    <v-alert
      type="success"
      :text="alert[2].text"
      v-model="alert[2].show"
      variant="tonal"
      closable
    >
    </v-alert>
    <v-table
      hover
      v-if="filteredCategories.length > 0"
    >
      <thead>
        <tr>
          <th
            class="text-left font-weight-bold"
            style="width: 15%;"
          >
            Tên danh mục
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Hình ảnh
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Icon
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Chức năng
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredCategories.slice((page - 1) * rowsPerPage, page * rowsPerPage)"
          :key="item.id"
        >
          <td>
            <div class="more">{{ item.name }}</div>
          </td>
          <td>
            <v-img
              :src="`${url}${item.image}`"
              width="60"
            ></v-img>
          </td>
          <td>
            <v-icon>
              <v-img :src="`${url}${item.icon}`"></v-img>
            </v-icon>
          </td>
          <td>
            <div class="d-flex">
              <v-btn
                size="x-small"
                variant="tonal"
                icon="mdi-pencil"
                color="success"
                :to="{
                  name: 'admin-category-update',
                  params: {
                    id: item.id,
                  },
                }"
              >
              </v-btn>
              <v-btn
                size="x-small"
                variant="tonal"
                icon="mdi-information-variant"
                color="info"
                :to="{
                  name: 'admin-subcategory',
                  params: {
                    id: item.id,
                  },
                }"
              >
              </v-btn>
              <v-btn
                size="x-small"
                variant="tonal"
                :icon="status ? 'mdi-restore' : 'mdi-trash-can-outline'"
                :color="status ? 'success' : 'red-accent-4'"
                @click="() => handleDeleteRecoverButton(item.id, item.name)"
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
      text="Không có danh mục"
      type="info"
      variant="tonal"
    ></v-alert>

    <GlobalPagination
      v-if="filteredCategories.length > rowsPerPage"
      :numberOfPages="numberOfPages"
      :page="page"
      @update:page="updatePage"
    ></GlobalPagination>

    <GlobalLoader :loading="loading"></GlobalLoader>
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
