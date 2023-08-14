<script setup>
import { ref } from "vue";
import getSlugByName from "../../../utils/getSlugByName";
const articles = ref([
  {
    id: 1,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin sản phẩm"
  },
  {
    id: 2,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonathan Dang",
    type: "Tin sản phẩm"
  },
  {
    id: 3,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin sản phẩm"
  },
  {
    id: 4,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin thị trường"
  },
  {
    id: 5,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin thị trường"
  },
]);

const page = ref(1);

</script>

<template>
  <div v-if="articles.length > 0">
    <div class="d-flex justify-space-between my-5">
      <h3 class="da">Danh sách bài viết</h3>
      <v-btn color="info" variant="outlined" class="text-none">Thêm mới</v-btn>
    </div>
    <v-table hover class="post text-body-2">
      <thead>
        <tr>
          <th class="font-weight-bold text-center" style="width: 5%;">
            ID
          </th>
          <th class="font-weight-bold text-center" style="width: 35%;">
            Tiêu đề
          </th>
          <th class="font-weight-bold text-center" style="width: 10%;">
            Hình ảnh
          </th>
          <th class="font-weight-bold text-center" style="width: 10%">
            Tác giả
          </th>
          <th class="font-weight-bold text-center" style="width: 15%;">
            Ngày tạo
          </th>
          <th class="font-weight-bold text-center" style="width: 15%;">
            Loại tin tức
          </th>
          <th class="font-weight-bold text-center" style="width: 10%">
            Chức năng
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td class="text-center">
            <div>{{ item.id }}</div>
          </td>
          <td>
            <div class="more">{{ item.title }}</div>
          </td>
          <td class="text-center"> <v-img :src="item.image" width="75"></v-img></td>
          <td class="text-center">{{ item.author }}</td>
          <td class="text-center">{{ item.date }}</td>
          <td class="text-center">{{ item.type }}</td>
          <td>
            <div class="d-flex flex-column">
              <v-btn size="small" :variant="'tonal'" prepend-icon="mdi-newspaper-variant-outline" text="Chi tiết"
                color="info" class="text-none  my-1" :to="`/admincp/post/${getSlugByName(item.title)}`">
              </v-btn>
              <v-btn size="small" :variant="'tonal'" prepend-icon="mdi-trash-can-outline" text="Xóa"
                onclick="return confirm('Bạn muốn xóa bài viết này ?')" color="red-accent-4" class="text-none my-1">
              </v-btn>
            </div>

          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination v-model="page" :length="4" rounded="0"></v-pagination>
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