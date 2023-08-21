<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/globalpagination.vue";
// Post API
const url = "http://127.0.0.1:8000/";
const posts = ref([]);
const router = useRouter();
onMounted(async () => {
  const response = await axios.get(`${url}api/posts`);
  posts.value = response.data.data;
});

async function deletePost(id) {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}`);
  } catch (error) {
    console.log("Error delete post: ", error);
  }
}
function editPost(title) {
  router.push(`post/edit/${getSlugByName(title)}`);
}


// Panigation
const page = ref(1);
const rowsPerPage = 8;
const numberOfPage = computed(() => {
  return Math.ceil(posts.value.length / rowsPerPage);
});
const updatePage = (event) => {
  page.value = event;
};
</script>

<template>
  <div v-if="posts.length > 0">
    <div class="d-flex justify-space-between my-5">
      <h3 class="">Danh sách bài viết</h3>
      <v-btn :to="`/admincp/post/add/`" color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
    </div>
    <v-table hover class="post text-body-2 m-card my-3">
      <thead>
        <tr>
          <!-- <th class="font-weight-bold text-center" style="width: 5%;">
            ID
          </th> -->
          <th class="font-weight-bold text-center" style="width: 30%;">
            Tiêu đề
          </th>
          <th class="font-weight-bold text-center" style="width: 15%">
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
        <tr v-for="item in posts.slice((page - 1) * rowsPerPage, page * rowsPerPage)" :key="item.id">
          <!-- <td class="text-center">{{ item.id }}</td> -->
          <td>
            <p class="more">{{ item.title }}</p>
          </td>
          <td class="text-center">{{ item.author }}</td>
          <td class="text-center d-flex align-center justify-center"> <img :src="url + item.image" width="80"
              :alt="item.title" class="rounded-lg" /></td>
          <td class="text-center">{{ item.created_at }}</td>
          <td class="text-center">{{ item.type }}</td>
          <td>
            <div class="d-flex align-center justify-space-between">
              <v-btn @click="editPost(getSlugByName(item.title))" size="small" variant="tonal" icon="mdi-text-box-edit-outline"
                color="success" class="text-none" :to="`/admincp/post/edit/${getSlugByName(item.title)}`">
              </v-btn>
              <v-btn @click="deletePost(item.id)" size="small" variant="tonal" icon="mdi-trash-can-outline"
                color="red-accent-4" class="text-none" onclick="return confirm('Bạn muốn xóa bài viết này ?')">
              </v-btn>
              <v-btn size="small" variant="text" icon="mdi-dots-vertical" color="" class="text-none">
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <GlobalPagination v-if="posts.length > rowsPerPage" :page="page" :numberOfPages="numberOfPage"
      @update:page="updatePage" />
  </div>

  <div v-else class="d-flex flex-column justify-center align-center pa-5">
    <!-- <v-text-field color="success" variant="text" class="w-25" loading disabled></v-text-field> -->
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