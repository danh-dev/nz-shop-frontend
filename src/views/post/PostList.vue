<script setup>
import { ref, computed } from "vue";
import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/globalpagination.vue";

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
  {
    id: 6,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin sản phẩm"
  },
  {
    id: 7,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonathan Dang",
    type: "Tin sản phẩm"
  },
  {
    id: 8,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin sản phẩm"
  },
  {
    id: 9,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin thị trường"
  },
  {
    id: 10,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin thị trường"
  },
  {
    id: 11,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin sản phẩm"
  },
  {
    id: 12,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonathan Dang",
    type: "Tin sản phẩm"
  },
  {
    id: 13,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin sản phẩm"
  },
  {
    id: 14,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin thị trường"
  },
  {
    id: 15,
    title: "Cách cài đèn flash khi có cuộc gọi đến cho iPhone 13 giúp bạn không bỏ lỡ bất kỳ cuộc gọi nào",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/cach-cai-den-flash-cuoc-goi-den-5.jpg",
    date: "15/06/2023",
    author: "Jonh",
    type: "Tin thị trường"
  },
]);
const page = ref(1);
const rowsPerPage = 8;

const numberOfPage = computed(() => {
  return Math.ceil(articles.value.length / rowsPerPage);
});

const updatePage = (event) => {
  page.value = event;
};


</script>

<template>
  <div v-if="articles.length > 0">
    <div class="d-flex justify-space-between my-5">
      <h3 class="da">Danh sách bài viết</h3>
      <v-btn color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
    </div>
    <v-table hover class="post text-body-2 m-card my-3">
      <thead>
        <tr>
          <th class="font-weight-bold text-center" style="width: 5%;">
            ID
          </th>
          <th class="font-weight-bold text-center" style="width: 35%;">
            Tiêu đề
          </th>
          <th class="font-weight-bold text-center" style="width: 10%">
            Tác giả
          </th>
          <th class="font-weight-bold text-center" style="width: 10%;">
            Hình ảnh
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
        <tr v-for="item in articles.slice((page - 1) * rowsPerPage, page * rowsPerPage)" :key="item.id">
          <td class="text-center">{{ item.id }}</td>
          <td> <p class="more">{{ item.title }}</p> </td>
          <td class="text-center">{{ item.author }}</td>
          <td class="text-center"> <v-img :src="item.image" width="75" class="rounded-lg"/></td>
          <td class="text-center">{{ item.date }}</td>
          <td class="text-center">{{ item.type }}</td>
          <td>
            <div class="d-flex align-center justify-space-between">
              <!-- <v-btn size="small" variant="tonal" icon="mdi-newspaper-variant-outline"
                color="info" class="text-none" >
              </v-btn> -->
              <v-btn size="small" variant="tonal" icon="mdi-text-box-edit-outline" color="success" class="text-none"
                :to="`/admincp/page/${getSlugByName(item.title)}`">
              </v-btn>
              <v-btn size="small" variant="tonal" icon="mdi-trash-can-outline" color="red-accent-4" class="text-none"
                onclick="return confirm('Bạn muốn xóa bài viết này ?')">
              </v-btn>
              <v-btn size="small" variant="text" icon="mdi-dots-vertical" color=""
                class="text-none">
              </v-btn>
            </div>

          </td>
        </tr>
      </tbody>
    </v-table>
    <GlobalPagination v-if="articles.length > rowsPerPage" :page="page" :numberOfPages="numberOfPage"
      @update:page="updatePage" />
  </div>

  <div v-else class="d-flex flex-column justify-center align-center pa-5">
    <img src="../../../public/updating.png" alt="updating" class="w-25">
    <p>Đang cập nhật mới dữ liệu...</p>
  </div>
</template>
<style>
.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: auto;
  height: 100px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  top: auto;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: initial;
}
</style>