<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import useCategoryStore from "@/stores/category";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";
import GlobalLoader from "../../../components/globals/GlobalLoader.vue";

const url = "http://127.0.0.1:8000/";
const categoryStore = useCategoryStore();

const loading = ref(false);
const status = ref(null);

const alert = ref([
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

const products = ref([]);
const filteredProducts = ref([]);
const sortedProducts = ref([]);
const categoryId = ref(null);
const page = ref(1);
const sort = ref({
  column: "",
  ascending: 0,
});
const selected = ref(0);
const rowsPerPage = 5;

const numberOfPages = computed(() => {
  return Math.ceil(products.value.length / rowsPerPage);
});

const sortIcon = computed(() => {
  return sort.value.ascending === 0 ? "" : sort.value.ascending < 0 ? "mdi-chevron-down" : "mdi-chevron-up";
});


const updatePage = event => {
  page.value = event;
};

watch(selected, () => {
  filteredProducts.value = products.value.filter(item => item.categoryId === selected.value);
  sortedProducts.value = filteredProducts.value;
});

watch([() => sort.value.column, () => sort.value.ascending], () => {
  sortedProducts.value = [...filteredProducts.value].sort((a, b) => a[sort.value.column] > b[sort.value.column] ? sort.value.ascending * 1 : sort.value.ascending * -1);
});

watch(() => categoryStore.parentCategories, () => {
  selected.value = categoryStore.parentCategories[0].id;
});

const handleDeleteRecoverButton = (id, name) => {
  const action = status.value ? "Khôi phục" : "Xoá";
  alert.value[0].text = `${action} sản phẩm ${name} sẽ ${lowerFirst(action)} tất cả các biến thể của sản phẩm này. Bạn chắc chắn chứ?`;
  alert.value[1].text = `${action} thành công!`;
  alert.value[0].show = true;
  alert.value[1].show = false;
  tempId.value = id;
};

const confirmFirstAlert = async () => {
  alert.value[0].show = false;
  try {
    const action = status.value ? "recover" : "delete";
    const res = await axios.put(`${url}api/products/${action}/${tempId.value}`);

    if (res.status === 200) {
      await fetchData();
      alert.value[1].show = true;
      setTimeout(() => {
        alert.value[1].show = false;
      }, 5000);
    }
  }
  catch (e) {
    console.log(e);
  }
};

const fetchData = async () => {
  loading.value = true;
  status.value = null;

  try {
    const res = await axios.get(`${url}api/products`);
    if (res.status === 200) {
      products.value = res.data.data.map(product => mapKeys(product, (value, key) => camelCase(key)));
    }

    filteredProducts.value = products.value;
    sortedProducts.value = filteredProducts.value;

    status.value = 0;
    loading.value = false;
  }
  catch (e) {
    loading.value = false;
  }
};

const getCategoryNameById = id => {
  return categoryStore.parentCategories.find(item => item.id === id)?.name;
};

onMounted(fetchData);
</script>

<template>
  <div>
    <div class="d-flex align-center my-5">
      <h1>Danh sách sản phẩm</h1>
      <!-- <v-autocomplete
        prepend-inner-icon="mdi-list-box-outline"
        density="compact"
        label="Danh mục"
        :items="categories"
        item-title="name"
        item-value="id"
        v-model="selected"
        variant="outlined"
        hide-no-data
        hide-details
        style="max-width: 500px;"
      ></v-autocomplete> -->
      <v-btn
        prepend-icon="mdi-plus"
        class="ms-auto"
        :to="{
          name: 'admin-product-create',

        }"
      >
        Thêm mới
      </v-btn>
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
      type="success"
      :text="alert[1].text"
      v-model="alert[1].show"
      variant="tonal"
      closable
    >
    </v-alert>
    <v-table
      hover
      v-if="products.length > 0"
    >
      <thead>
        <tr>
          <th
            class="text-left font-weight-bold"
            style="width: 15%;"
          >
            Tên sản phẩm
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
            Danh mục
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
          v-for="item in products.slice((page - 1) * rowsPerPage, page * rowsPerPage)"
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
            <div class="more">{{ getCategoryNameById(item.categoryId) }}</div>
          </td>
          <td>
            <div class="d-flex">
              <v-btn
                size="small"
                variant="tonal"
                :icon="status ? 'mdi-restore' : 'mdi-trash-can-outline'"
                :color="status ? 'success' : 'red-accent-4'"
                @click="() => handleDeleteRecoverButton(item.id, item.name)"
              >
              </v-btn>

              <v-btn
                size="small"
                variant="tonal"
                icon="mdi-information-variant"
                color="info"
                :to="{
                  name: 'admin-product-detail',
                  params: {
                    id: item.id,
                  },
                }"
              >
              </v-btn>
              <v-btn
                size="small"
                variant="tonal"
                icon="mdi-pencil"
                color="primary"
                :to="{
                  name: 'admin-product-update',
                  params: {
                    id: item.id,
                  },
                }"
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
      text="Không có sản phẩm"
      type="info"
      variant="tonal"
    ></v-alert>

    <GlobalPagination
      v-if="products.length > rowsPerPage"
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
