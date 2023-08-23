<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import useNewsStore from "../stores/useNewsStore.js";
import { storeToRefs } from "pinia";
import getSlugByName from "../utils/getSlugByName.js";
import NewsSideBar from "../components/news/NewsSideBar.vue";
import GlobalPagination from "../components/globals/GlobalPagination.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();
const { articles, slides, subArticles } = storeToRefs(useNewsStore());

const url = "http://127.0.0.1:8000/";
const posts = ref([]);
const fetchPost = async () => {
  try {
    const response = await axios.get(`${url}api/posts`);
    if (response.data.status === 200) {
      posts.value = response.data.data.reverse();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

onMounted(fetchPost);


// const articles = ref([]);
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
  <v-sheet>
    <v-row class="container-fluid">
      <v-col :cols="12" class="mb-5 d-none d-md-block d-lg-block">
        <NewsSideBar />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-sheet>
          <v-carousel cycle height="24rem" hide-delimiter-background show-arrows="hover">
            <v-carousel-item v-for="slide in slides" :key="slide.id"
              :style="xs ? { aspectRatio: 16 / 9 } : { aspectRatio: 3 / 2 }">
              <v-sheet height="100%" class="border rounded-lg">
                <div class="d-flex fill-height justify-center align-center mx-4">
                  <img class="w-75 h-75 rounded-lg" :src="slide.image" alt="" />
                  <div class="px-3 text-justify">
                    <a :href="`/news/${getSlugByName(slide.title)}`" class="text-body font-weight-bold">{{ slide.title
                    }}</a>
                    <p class="py-3 text-body-2">
                      {{ slide.description }}
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
          class="d-flex mb-3 text-body-1 border rounded-lg w-100" rounded="3" style="width: 60%;">
          <v-img class="w-50 me-2 rounded-lg" :src="item.image" />
          <div class="d-flex flex-column justify-space-between py-1">
            <a :href="`/news/${getSlugByName(item.title)}`" class="">{{ item.title }}</a>
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
          <div v-for="item in posts.slice(8, 12)" :key="item.id" class="my-2 w-75 px-2">
            <img :src="item.image" alt="" class="w-100 h-50 rounded-lg"/>
            <div>
              <a :href="`/news/${getSlugByName(item.title)}`" class="text-caption">{{ item.title }}</a>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <GlobalPagination v-if="posts.length > rowsPerPage" :numberOfPages="numberOfPage" :page="page"
      @update:page="updatePage" />
  </v-sheet>
</template>

<style></style>