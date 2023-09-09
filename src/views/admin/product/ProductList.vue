<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "../../../axiosComfig";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";
import useCategoryStore from "@/stores/category";

import { siteData } from "@/stores/globals.js";
const siteStore = siteData();

const url = import.meta.env.VITE_PUBLIC_URL;
const categoryStore = useCategoryStore();

const headers = [
  {
    title: "Tên sản phẩm",
    align: "start",
    key: "name",
    width: "30%",
  },
  {
    title: "Hình ảnh",
    sortable: false,
    key: "image",
    align: "start",
    width: "15%",
  },
  {
    title: "Giá",
    key: "price",
    align: "start",
    width: "10%"
  },
  {
    title: "Số lượng",
    key: "quantity",
    align: "start",
    width: "10%"
  },
  {
    title: "Đang hoạt động",
    key: "isDisabled",
    sortable: false,
    width: "10%",
    align: "start"
  },
  {
    title: "Chức năng",
    sortable: false,
    key: "action",
    align: "start",
    width: "10%",
  },
];

const products = ref([]);
const rowsPerPage = 7;
const numberOfPages = ref(0);
const currentPage = ref(1);

const alert = ref("");

const tempId = ref(0);
const tempStatus = ref(null);

const statuses = [
  {
    title: "Tất cả",
    value: null,
  },
  {
    title: "Đang hoạt động",
    value: false,
  },
  {
    title: "Ngừng hoạt động",
    value: true,
  }
];
const status = ref(null);

const categories = ref([
  {
    title: "Tất cả",
    value: null,
  }
]);
const category = ref(null);

const searchInput = ref("");
const name = ref(null);

const fetchProducts = async () => {
  try {
    let url = `product-pagination/?page=${currentPage.value}&per_page=${rowsPerPage}`;
    if (status.value !== null) {
      url += `&is_disabled=${status.value}`;
    }
    if (category.value !== null) {
      url += `&category_id=${category.value}`;
    }
    if (name.value !== null) {
      url += `&name=${name.value}`;
    }
    siteStore.hasLoading();
    const res = await axios.get(url);

    if (res.status === 200) {
      products.value = res.data.data.products.map(product => mapKeys(product, (value, key) => camelCase(key)));
      numberOfPages.value = res.data.data.numberOfPages;
    }
  }
  catch (e) {
    console.log(e);
  }
  finally {
    siteStore.doneLoading();
  }
};

const updatePage = event => {
  currentPage.value = event;
};

const confirmAlert = async () => {

  try {
    const res = await axios.delete(`products/delete/${tempId.value}`);

    if (res.status === 200) {
      await fetchProducts();
    }
  }
  catch (e) {
    console.log(e);
  }
  alert.value = "";
};

const handleToggleButton = async id => {
  try {
    const res = await axios.put(`products/toggle/${id}`);

    if (res.status === 200) {
      fetchProducts();
    }
  }
  catch (e) {
    console.log(e);
  }
};

const handleDeleteButton = async (id, name) => {
  tempId.value = id;
  alert.value = `Bạn có muốn xoá sản phẩm ${name} không?`;
};

const search = () => {
  name.value = searchInput.value;
};

watch([status, category, name], () => {
  currentPage.value = 1;
});
watch([currentPage, status, category, name], fetchProducts);

watch(() => categoryStore.categories, (newVal) => {
  for (const category of newVal) {
    categories.value.push({
      title: category.name,
      value: category.id,
    });
  }
});

onMounted(fetchProducts);
</script>

<template>
  <v-card class="m-card">
    <v-container>

      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center"
        >
          <h2>Danh sách sản phẩm</h2>
          <v-btn
            prepend-icon="mdi-plus"
            class="ms-auto"
            :to="{
              name: 'admin-product-create',
            }"
          >
            Thêm mới
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          sm="4"
        >
          <v-autocomplete
            color="red-accent-4"
            prepend-inner-icon="mdi-list-box-outline"
            density="compact"
            label="Danh mục"
            :items="categories"
            v-model="category"
            variant="outlined"
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            color="red-accent-4"
            density="compact"
            label="Trạng thái"
            :items="statuses"
            v-model="status"
            variant="outlined"
            hide-details
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="searchInput"
            density="compact"
            append-inner-icon="mdi-magnify"
            label="Tìm kiếm theo tên"
            variant="outlined"
            hide-details
            clearable
            @click:append-inner="search"
            @keyup.enter="search"
          ></v-text-field>

        </v-col>
      </v-row>
      <v-row v-if="alert">
        <v-col>
          <v-alert
            type="warning"
            :text="alert"
            :model-value="!!alert"
            variant="tonal"
          >
            <template #append>
              <v-btn
                density="compact"
                color="red-accent-4"
                icon="mdi-window-close"
                variant="flat"
                class="mr-2"
                @click="alert = ''"
              ></v-btn>
              <v-btn
                density="compact"
                color="success"
                icon="mdi-check"
                variant="flat"
                @click="confirmAlert"
              ></v-btn>
            </template>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :items-per-page="rowsPerPage"
            :page="currentPage"
            :headers="headers"
            :items="products"
            class="elevation-1"
            item-value="name"
            hover
            no-data-text="Không có sản phẩm!"
          >
            <template #item.price="{ item }">
              <div>
                {{ formatPrice(item.raw.discountPrice || item.raw.discountPrice) }}

                <v-tooltip
                  activator="parent"
                  location="right"
                  class="d-flex flex-column"
                >
                  <p>
                    Giá gốc: {{ formatPrice(item.raw.originPrice) }}
                  </p>

                </v-tooltip>
              </div>
            </template>
            <template #item.image="{ item }">
              <v-img
                :src="`${url}${item.columns.image}`"
                width="60"
              ></v-img>
            </template>
            <template #item.isDisabled="{ item }">

              <v-switch
                color="red-accent-4"
                :model-value="!item.raw.isDisabled"
                @update:modelValue="() => handleToggleButton(item.raw.id)"
                hide-details
              ></v-switch>
            </template>
            <template #item.action="{ item }">
              <div class="d-flex">
                <v-btn
                  size="small"
                  variant="tonal"
                  icon="mdi-information-variant"
                  color="info"
                  :to="{
                    name: 'admin-product-detail',
                    params: {
                      id: item.raw.id,
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
                      id: item.raw.id,
                    },
                  }"
                >
                </v-btn>
                <v-btn
                  v-if="item.raw.isDisabled"
                  size="small"
                  variant="tonal"
                  icon="mdi-trash-can-outline"
                  color="red-accent-4"
                  @click="() => handleDeleteButton(item.raw.id, item.raw.name)"
                >
                </v-btn>
              </div>
            </template>
            <template #bottom>
              <GlobalPagination
                v-if="numberOfPages > 1"
                :numberOfPages="numberOfPages"
                :page="currentPage"
                @update:page="updatePage"
              ></GlobalPagination>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

    </v-container>
  </v-card>
</template>
<style>
.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
