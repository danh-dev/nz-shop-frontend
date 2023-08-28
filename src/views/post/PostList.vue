<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/GlobalPagination.vue";
// Post API
const url = "http://127.0.0.1:8000/";
const posts = ref([]);
const router = useRouter();
const filteredPosts = ref([]);
const selected = ref(null);

watch(selected, () => {
  if (selected.value) {
    filteredPosts.value = posts.value.filter(item => item.isDeleted);
  } else {
    filteredPosts.value = posts.value.filter(item => !item.isDeleted);
  }
});

const fetchPost = async () => {
  selected.value = null;
  try {
    const response = await axios.get(`${url}api/posts`);
    if (response.data.status === 200) {
      posts.value = response.data.data.reverse();
      filteredPosts.value = posts.value;
      selected.value = 0;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function deletePost(id) {
  try {
    await axios
      .delete(`http://127.0.0.1:8000/api/posts/delete/${id}`);
    fetchPost();
  } catch (error) {
    console.log("Error delete post: ", error);
  }
}
function editPost(id) {
  router.push(`post/edit/${id}`);
}

onMounted(fetchPost);

// Panigation
const page = ref(1);
const rowsPerPage = 10;
const numberOfPage = computed(() => {
  return Math.ceil(posts.value.length / rowsPerPage);
});
const updatePage = (event) => {
  page.value = event;
};
</script>

<template>
  <div>
    <div class="d-flex justify-space-between my-5">
      <h3 class="">Danh sách bài viết</h3>
      <v-select v-model="selected" label="Tình trạng" variant="outlined" :items="[{
        title: 'Hoạt động', value: 0}, { title: 'Đã xóa', value: 1, }]" density="compact" style="margin: 0 10%;">
      </v-select>
      <v-btn :to="`/admincp/post/add/`" color="info" variant="tonal" class="text-none">Thêm mới</v-btn>
    </div>
    <v-table hover class="post text-body-2 m-card my-3" v-if="posts.length > 0">
      <thead>
        <tr>
          <th class="font-weight-bold text-center" style="width: 20%;">
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
          <th class="font-weight-bold text-center">Trạng thái</th>
          <th class="font-weight-bold text-center" style="width: 10%">
            Chức năng
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filteredPosts.slice((page - 1) * rowsPerPage, page * rowsPerPage)" :key="item.id">
          <td>
            <p class="more">{{ item.title }}</p>
          </td>
          <td class="text-center">{{ item.author }}</td>
          <td> <img :src="url + item.image" width="80" :alt="item.title"
              class="rounded-lg  d-flex align-center justify-center" /></td>
          <td class="text-center">{{ item.created_at.slice(0, 10) }}</td>
          <td class="text-center">{{ item.type }}</td>
          <td class="text-center">{{ item.isDeleted ? 'Đã xóa' : 'Hoạt động' }}</td>
          <td>
            <div class="d-flex align-center justify-space-between">
              <v-btn @click="editPost(item.id)" size="x-small" variant="tonal" icon="mdi-pencil"
                color="success" class="text-none" :to="`/admincp/slider/edit/${item.id}`">
              </v-btn>
              <v-btn @click="deletePost(item.id)" size="x-small" variant="tonal" icon="mdi-trash-can-outline"
                color="red-accent-4" class="text-none" onclick="return confirm('Bạn muốn xóa bài viết này ?')">
              </v-btn>
              <v-btn size="x-small" variant="text" icon="mdi-dots-vertical" color="" class="text-none">
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <GlobalPagination v-if="posts.length > rowsPerPage" :page="page" :numberOfPages="numberOfPage"
      @update:page="updatePage" />
  </div>
</template>

<style>
.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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