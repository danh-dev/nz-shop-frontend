<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
// import useNewsStore from "../stores/useNewsStore.js";
// import { storeToRefs } from "pinia";
import getSlugByName from "../../utils/getSlugByName.js";
import NewsSideBar from "../../components/news/NewsSideBar.vue";
import GlobalPagination from "../../components/globals/GlobalPagination.vue";
import GlobalLoader from "../../components/globals/GlobalLoader.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();
const loading = ref(false);
// Post API
const url = "http://127.0.0.1:8000/";
const posts = ref([]);
// get posts []
const fetchPost = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${url}api/posts`);
    loading.value = false;
    if (response.data.status === 200) {
      posts.value = response.data.data.reverse().filter(item => {
        return !item.isDeleted;
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    loading.value = false;
  }
};

onMounted(fetchPost);

// Pagination
const page = ref(1);
const rowsPerPage = 10;
const numberOfPage = computed(() => {
  return Math.ceil(posts.value.length / rowsPerPage);
});
const updatePage = (event) => {
  page.value = event;
};

// const reName = (value) => {
//   return `http://127.0.0.1:8000/${value}`;
// };
</script>

<template>
  <v-sheet>
    <v-row class="container-fluid">
      <v-col :cols="12" class="mb-5 d-none d-md-block d-lg-block">
        <NewsSideBar />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-sheet>
          <v-carousel cycle height="25rem" hide-delimiter-background show-arrows="hover">
            <v-carousel-item v-for="item in posts.slice(1,6)" :key="item.id"
              :style="xs ? { aspectRatio: 16 / 9 } : { aspectRatio: 3 / 2 }">
              <v-sheet class="border rounded-xl h-100">
                <div class="d-flex fill-height justify-center align-center mx-4">
                  <img class="w-75 h-75 rounded-xl" :src="`${url}${item.image}`" alt="" />
                  <div class="px-3 text-justify">
                    <a :href="`/news/${getSlugByName(item.title)}`" class="text-body font-weight-bold">
                    {{ item.title }}</a>
                    <p class="py-3 text-body-2">
                      {{ item.content }}
                    </p>
                  </div>
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col :cols="12" lg="8" md="8" v-if="posts.length > 0">
        <h4 class="py-2 text-danger">Tin tức cập nhật</h4>
        <v-sheet v-for="item in posts.slice((page - 1) * rowsPerPage, page * rowsPerPage)" :key="item.id"
          class="d-flex mb-3 text-body-1 border rounded-xl w-100" rounded="3" style="width: 60%;">
          <v-img class="w-50 me-2 rounded-xl" :src="`${url}${item.image}`" />
          <div class="d-flex flex-column justify-space-between py-1">
            <a :href="`/news/${getSlugByName(item.title)}`" class="pa-3 text-justify">{{ item.title }}</a>
            <div class="d-flex align-center text-muted">
              <v-icon size="16">mdi-clock-outline</v-icon>
              <p class="px-1 text-caption">{{ item.created_at.slice(0, 10) }}</p>
            </div>
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" lg="4" md="4">
        <v-sheet class="col-12">
          <h4 class="px-2 py-1 text-danger">Xem nhiều tuần qua</h4>
          <div v-for="item in posts.slice(5, 10)" :key="item.id" class="my-2 w-75 px-2">
            <img :src="`${url}${item.image}`" alt="" class="w-100 h-50 rounded-xl" />
            <div>
              <a :href="`/news/${getSlugByName(item.title)}`" class="text-caption">{{ item.title }}</a>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <GlobalPagination v-if="posts.length > rowsPerPage" :numberOfPages="numberOfPage" :page="page"
      @update:page="updatePage" />
      <GlobalLoader :loading="loading" />
  </v-sheet>
</template>

<style scoped>
a:hover {
  color:  #c50000;
}
</style>