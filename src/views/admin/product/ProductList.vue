<script setup>
import { ref, onMounted, computed } from "vue";

const products = ref([]);
const categories = ref([]);
const page = ref(1);
const sort = ref(0);
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
      date: "20/10/2001",
    },
    {
      id: 2,
      code: "ABCDEB",
      name: "Samsung Galaxy S23 Ultra 256GB",
      image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
      price: 10000000,
      date: "20/10/2001",
    },
    {
      id: 3,
      code: "ABCDEC",
      name: "Samsung Galaxy S23 Ultra 256GB",
      image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
      price: 10000000,
      date: "20/10/2001",
    },
    {
      id: 4,
      code: "ABCDED",
      name: "Samsung Galaxy S23 Ultra 256GB",
      image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
      price: 10000000,
      date: "20/10/2001",
    },
  ];
});

//const newProducts = computed(() => [...products.value].sort((a )))
</script>

<template>
  <div v-if="products.length > 0">
    <div class="d-flex align-center">
      <h1>Product List</h1>
      <v-autocomplete
        prepend-inner-icon="mdi-list-box-outline"
        density="compact"
        label="Danh mục"
        :items="categories"
        item-title="name"
        item-value="id"
        :model-value="categories[0].id"
        variant="outlined"
        hide-no-data
        hide-details
        style="max-width: 500px;"
      ></v-autocomplete>
      <v-btn
        prepend-icon="mdi-plus"
        class="ms-auto"
      >Thêm mới</v-btn>
    </div>
    <v-table hover>
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
            class="text-left font-weight-bold"
            style="width: 10%"
          >
            Giá bán
          </th>
          <th
            class="text-left font-weight-bold"
            style="width: 20%;"
          >
            Ngày
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
          v-for="item in products"
          :key="item.id"
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
                :to="`/admincp/product/${item.code}`"
              >
              </v-btn>
            </div>

          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="page"
      :length="4"
      rounded="0"
    ></v-pagination>
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
