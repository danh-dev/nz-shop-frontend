<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "../../axiosComfig";
import { useRouter } from "vue-router";
// import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/GlobalPagination.vue";
// Post API
const posts = ref([]);
const router = useRouter();
const filteredPosts = ref([]);
const selected = ref(null);
const url = import.meta.env.VITE_PUBLIC_URL;

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
    const response = await axios.get("posts");
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
      .delete(`${url}api/posts/delete/${id}`);
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
const rowsPerPage = 6;
const numberOfPage = computed(() => {
  return Math.ceil(posts.value.length / rowsPerPage);
});
const updatePage = (event) => {
  page.value = event;
};
</script>

<template>
  <v-card class="m-card">
    <div class="d-flex justify-space-between ma-5">
      <h2 class="">Danh sách bài viết</h2>
      <v-btn
        :to="`/admincp/post/add/`"
        prepend-icon="mdi-plus"
      >Thêm mới</v-btn>
    </div>
    <div class="d-flex align-cente justify-end ma-5">
      <v-select
        v-model="selected"
        prepend-inner-icon="mdi-list-box-outline"
        label="Tình trạng"
        variant="outlined"
        :items="[{
          title: 'Hoạt động', value: 0
        }, { title: 'Tạm dừng', value: 1, }]"
        density="compact"
        clearable
        style="max-width: 500px;"
      >
      </v-select>
    </div>
    <v-table
      hover
      v-if="posts.length > 0"
    >
      <thead>
        <tr>
          <th
           
            style="width: 50%;"
          >
            Tiêu đề
          </th>
          <!-- <th
           
            style="width: 15%"
          >
            Tác giả
          </th> -->
          <th
           
            style="width: 10%;"
          >
            Hình ảnh
          </th>
          <th
           
            style="width: 15%;"
          >
            Ngày tạo
          </th>
          <th>Trạng thái</th>
          <th
            style="width: 10%"
          >
            Chức năng
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in filteredPosts.slice((page - 1) * rowsPerPage, page * rowsPerPage)"
          :key="item.id"
        >
          <td>
            <v-tooltip
              activator="parent"
              location="center left"
              width="400px"
              close-delay="5"
            >
              <p class="text-caption">{{ item.title }}</p>
            </v-tooltip>
            <p class="extra">{{ item.title }}</p>
          </td>

          <!-- <td class="">{{ item.author }}</td> -->

          <td>
            <img
              :src="`${url}${item.image}`"
              width="80"
              :alt="item.title"
              class="rounded-lg  d-flex align-center justify-center"
            />
          </td>
          <td class="">{{ item.created_at.slice(0, 10) }}</td>
          <td class="">{{ item.isDeleted ? 'Tạm dừng' : 'Hoạt động' }}</td>
          <td>
            <div class="d-flex align-center justify-space-between">
              <v-btn
                @click="editPost(item.id)"
                size="x-small"
                variant="tonal"
                icon="mdi-pencil"
                color="success"
                class="text-none"
                :to="`/admincp/slider/edit/${item.id}`"
              >
              </v-btn>
              <v-btn
                @click="deletePost(item.id)"
                size="x-small"
                variant="tonal"
                icon="mdi-trash-can-outline"
                color="red-accent-4"
                class="text-none"
                onclick="return confirm('Bạn muốn xóa bài viết này ?')"
              >
              </v-btn>
              <v-btn
                size="x-small"
                variant="text"
                icon="mdi-dots-vertical"
                color=""
                class="text-none"
              >
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <GlobalPagination
      v-if="posts.length > rowsPerPage"
      :page="page"
      :numberOfPages="numberOfPage"
      @update:page="updatePage"
    />
  </v-card>
</template>

<style scoped></style>