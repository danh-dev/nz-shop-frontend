<script setup>
import { ref, onMounted, watch, computed } from "vue";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";

const products = ref([]);
const filteredProducts = ref([]);
const sortedProducts = ref([]);
const categories = ref([]);
const page = ref(1);
const sort = ref({
  column: "",
  ascending: 0,
});
const selected = ref(0);
const rowsPerPage = 10;

const numberOfPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / rowsPerPage);
});

const sortIcon = computed(() => {
  return sort.value.ascending === 0 ? "" : sort.value.ascending < 0 ? "mdi-chevron-down" : "mdi-chevron-up";
});
onMounted(() => {
  categories.value = [
    {
      id: 1,
      name: "Điện thoại",
    },
    {
      id: 2,
      name: "Laptop",
    },
    {
      id: 3,
      name: "Máy tính bảng",
    }
    , {
      id: 4,
      name: "PC",
    }
  ];
  //call API by categories
  products.value = [
    {
      id: 1,
      code: "ABCDEA",
      name: "Samsung Galaxy S23 Ultra 256GB abcdef adasd ádasdas adasdsa  ádsaá đâsd ádasdasdas  ádsaá đâsd ádasdasdas  ádsaá đâsd ádasdasdas  ádsaá đâsd ádasdasdas",
      image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
      price: 10000000,
      date: "20/10/2002",
      categoryId: 1,
    },
    {
      id: 2,
      code: "ABCDEB",
      name: "Samsung Galaxy S23 Ultra 256GB",
      image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
      price: 9000000,
      date: "20/10/2001",
      categoryId: 1,
    },
    {
      id: 3,
      code: "ABCDEC",
      name: "Samsung Galaxy S23 Ultra 256GB",
      image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
      price: 10000000,
      date: "20/10/2001",
      categoryId: 2,
    },
    {
      id: 4,
      code: "ABCDED",
      name: "Samsung Galaxy S23 Ultra 256GB",
      image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
      price: 10000000,
      date: "20/10/2001",
      categoryId: 2,
    },
  ];
  filteredProducts.value = products.value;
  sortedProducts.value = filteredProducts.value;
  selected.value = categories.value[0].id;
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

const handleClickToSort = (event) => {
  if (sort.value.column !== event.target.dataset.name) {
    sort.value.column = event.target.dataset.name;
    sort.value.ascending = 1;
  }
  else {
    if (sort.value.ascending === -1) {
      sort.value.ascending = 1;
    }
    else {
      sort.value.ascending--;
    }
  }
};
</script>

<template>
  <div>
    <div class="d-flex align-center my-5">
      <h1>Product List</h1>
      <v-autocomplete
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
      ></v-autocomplete>
      <v-btn
        prepend-icon="mdi-plus"
        class="ms-auto"
        :to="{
          name: 'admin-product-create',

        }"
      >Thêm mới</v-btn>
    </div>
    <v-table
      hover
      v-if="sortedProducts.length > 0"
    >
      <thead>
        <tr>
          <th
            class="text-left font-weight-bold"
            style="width: 20%;"
          >
            Mã sản phẩm
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 35%;"
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
            data-name="price"
            class="text-left font-weight-bold"
            style="width: 10%; cursor: pointer;"
            @click="handleClickToSort"
          >
            <div
              class="d-flex"
              data-name="price"
            >Giá bán <v-icon
                v-if="sort.column === 'price'"
                :icon="sortIcon"
              ></v-icon></div>
          </th>
          <th
            data-name="date"
            class="text-left font-weight-bold"
            style="width: 20%; cursor: pointer;"
            @click="handleClickToSort"
          >
            <div
              class="d-flex"
              data-name="date"
            >Ngày nhập kho <v-icon
                v-if="sort.column === 'date'"
                :icon="sortIcon"
              ></v-icon></div>
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
          v-for="item in sortedProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage)"
          :key="item.code"
        >
          <td>
            <div>{{ item.code }}</div>
          </td>
          <td>
            <div class="more">{{ item.name }}</div>
          </td>
          <td> <v-img
              :src="item.image"
              width="60"
            ></v-img></td>
          <td>{{ item.price }}</td>
          <td>{{ item.date }}</td>
          <td>
            <div class="d-flex flex-column">

              <v-btn
                size="small"
                :variant="'tonal'"
                prepend-icon="mdi-trash-can-outline"
                text="xoa"
                color="red-accent-4"
                class="text-none my-1"
              >
              </v-btn>

              <v-btn
                size="small"
                :variant="'tonal'"
                prepend-icon="mdi-trash-can-outline"
                text="chi tiết"
                color="info"
                class="text-none  my-1"
                :to="{
                  name: 'admin-product-detail',
                  params: {
                    code: item.code
                  }
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
