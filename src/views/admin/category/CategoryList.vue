<script setup>
import { ref, watch } from "vue";
import axios from "../../../axiosComfig";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";
import useCategoryStore from "@/stores/category";

import { siteData } from "@/stores/globals.js";
const siteStore = siteData();

const url = import.meta.env.VITE_PUBLIC_URL;
const categoryStore = useCategoryStore();

const headers = [
  {
    title: "Tên danh mục",
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
    title: "Icon",
    sortable: false,
    key: "icon",
    align: "start",
    width: "20%"
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

const rowsPerPage = 7;
const numberOfPages = ref(0);
const currentPage = ref(1);

const alert = ref("");
const tempId = ref(0);

const status = ref(null);
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

const searchInput = ref("");
const name = ref(null);

const updatePage = event => {
  currentPage.value = event;
};

const confirmAlert = async () => {
  try {
    const res = await axios.delete(`categories/delete/${tempId.value}`);

    if (res.status === 200) {
      categoryStore.fetchCategories();
    }
  }
  catch (e) {
    console.log(e);
  }
  alert.value = "";
};

const handleEnableCategory = async id => {
  try {
    const res = await axios.put(`categories/enable/${id}`);

    if (res.status === 200) {
      categoryStore.fetchCategories();
    }
  }
  catch (e) {
    console.log(e);
  }
};

const handleDisableCategory = async id => {
  try {
    const res = await axios.put(`categories/disable/${id}`);

    if (res.status === 200) {
      categoryStore.fetchCategories();
    }
  }
  catch (e) {
    console.log(e);
  }
};

const handleDeleteButton = async (id, name) => {
  tempId.value = id;
  alert.value = `Bạn có muốn xoá danh mục ${name} không?`;
};

const search = () => {
  name.value = searchInput.value;
};

watch([status, name], () => {
  currentPage.value = 1;
});
watch([currentPage, status, name], () => categoryStore.fetchCategories());

</script>

<template>
  <v-card class="m-card">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center"
        >
          <h2>Danh sách danh mục</h2>
          <v-btn
            prepend-icon="mdi-plus"
            class="ms-auto"
            :to="{
              name: 'admin-category-create',
            }"
          >
            Thêm mới
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
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
            color="red-accent-4"
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
            :items="categoryStore.categories"
            class="elevation-1"
            item-value="name"
            hover
            no-data-text="Không có danh mục!"
          >
            <template #item.image="{ item }">
              <v-img
                :src="`${url}${item.columns.image}`"
                width="60"
              ></v-img>
            </template>
            <template #item.icon="{ item }">
              <v-icon>
                <v-img :src="item.columns.icon ? `${url}${item.columns.icon}` : ''"></v-img>
              </v-icon>

            </template>
            <template #item.isDisabled="{ item }">

              <v-switch
                color="red-accent-4"
                :model-value="!item.raw.isDisabled"
                @update:modelValue=" item.raw.isDisabled ? () => handleEnableCategory(item.raw.id) : () => handleDisableCategory(item.raw.id)"
                hide-details
              ></v-switch>
            </template>
            <template #item.action="{ item }">
              <div class="d-flex">
                <v-btn
                  size="x-small"
                  variant="tonal"
                  icon="mdi-pencil"
                  color="success"
                  :to="{
                    name: 'admin-category-update',
                    params: {
                      id: item.raw.id,
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
                      id: item.raw.id,
                    },
                  }"
                >
                </v-btn>
                <v-btn
                  v-if="item.raw.isDisabled"
                  size="x-small"
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
