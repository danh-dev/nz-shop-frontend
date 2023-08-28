<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";
import GlobalLoader from "../../../components/globals/GlobalLoader.vue";

const route = useRoute();
const router = useRouter();
const url = "http://127.0.0.1:8000/";

const status = ref(null);

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
const categoryId = ref(null);
const products = ref([]);
const product = ref({});
const variants = ref([]);
const newVariants = ref([]);
const filteredVariants = ref([]);

const page = ref(1);
const rowsPerPage = 5;

const numberOfPages = computed(() => {
  return Math.ceil(filteredVariants.value.length / rowsPerPage);
});

watch(status, () => {
  if (status.value) {
    filteredVariants.value = newVariants.value.filter(item => item.isDeleted);
  }
  else {
    filteredVariants.value = newVariants.value.filter(item => !item.isDeleted);
  }
});

const updatePage = event => {
  page.value = event;
};

const fetchData = async () => {
  loading.value = true;
  status.value = null;
  try {
    const res = await axios.get(`${url}api/categories`);
    if (res.status === 200) {
      categories.value = res.data.data;
    }

  }
  catch (e) {
    console.log(e);
  }

  try {
    const res = await axios.get(`${url}api/products`);
    if (res.status === 200) {
      products.value = res.data.data.map(product => mapKeys(product, (value, key) => camelCase(key)));
      product.value = products.value.find(item => item.id === +route.params.id);
      categoryId.value = categories.value.find(item => item.id === product.value.categoryId);
    }

  }
  catch (e) {
    console.log(e);
  }

  try {
    const res = await axios.get(`${url}api/products/${route.params.id}/variants`);
    if (res.status === 200) {
      variants.value = res.data.data.variants.map(variant => mapKeys(variant, (value, key) => camelCase(key)));
    }
    newVariants.value = variants.value;
    filteredVariants.value = newVariants.value;
    status.value = 0;
    loading.value = false;
  }
  catch (e) {
    loading.value = false;
    console.log(e);
  }
};

const handleDeleteRecoverButton = id => {
  const action = status.value ? "Khôi phục" : "Xoá";
  alert.value[0].text = `Bạn chắc chắn muốn ${lowerFirst(action)} biến thể này?`;
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
    const res = await axios.put(`${url}api/variants/${action}/${tempId.value}`);

    if (res.status === 200) {
      await fetchData();
      alert.value[2].show = true;
      setTimeout(() => {
        alert.value[2].show = false;
      }, 5000);
    }
    if (res.status === 202) {
      alert.value[1].text = `Muốn khôi phục biến thể này thì phải khôi phục sản phẩm ${res.data.name}. Bạn có muốn khôi phục sản phẩm ${res.data.name} không?`;
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
    const res = await axios.put(`${url}api/variants/force-recover/${tempId.value}`);

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

const handleUpdateCategory = async () => {
  try {
    const res = await axios.put(
      `${url}api/products/${route.params.id}/category`,
      {
        categoryId: categoryId.value,
      }
    );
    if (res.status === 200) {
      console.log("thanh cong!");
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
      <h1>Chi tiết sản phẩm</h1>
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
      v-if="variants.length > 0"
    >
      <thead>
        <tr>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            SKU
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Kiểu
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Số lượng
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Giá gốc
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Giá bán
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Giá khuyến mãi
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
          v-for="item in variants.slice((page - 1) * rowsPerPage, page * rowsPerPage)"
          :key="item.id"
        >
          <td>
            <div class="more">{{ item.sku }}</div>
          </td>
          <td>
            <v-chip
              v-for="chip in item.value.split('|')"
              :key="chip"
            >
              {{ chip }}</v-chip>
          </td>
          <td>
            <div class="more">{{ item.quantity }}</div>
          </td>
          <td>
            <div class="more">{{ item.originPrice }}</div>
          </td>
          <td>
            <div class="more">{{ item.sellPrice }}</div>
          </td>
          <td>
            <div class="more">{{ item.discountPrice }}</div>
          </td>
          <td>
            <div class="d-flex">
              <v-btn
                size="small"
                variant="tonal"
                :icon="status ? 'mdi-restore' : 'mdi-trash-can-outline'"
                :color="status ? 'success' : 'red-accent-4'"
                @click="() => handleDeleteRecoverButton(item.id)"
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
                  name: 'admin-product-detail-variant',
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
      text="Không có"
      type="info"
      variant="tonal"
    ></v-alert>

    <GlobalPagination
      v-if="variants.length > rowsPerPage"
      :numberOfPages="numberOfPages"
      :page="page"
      @update:page="updatePage"
    ></GlobalPagination>

    <v-autocomplete
      prepend-inner-icon="mdi-list-box-outline"
      density="compact"
      label="Danh mục"
      :items="categories"
      item-title="name"
      item-value="id"
      v-model="categoryId"
      variant="outlined"
      hide-no-data
      hide-details
      style="max-width: 500px;"
      clearable
    ></v-autocomplete>
    <v-btn
      text="Cập nhật"
      @click="handleUpdateCategory"
    ></v-btn>

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
