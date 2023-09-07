<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "../../axiosComfig";
import getSlugByName from "../../utils/getSlugByName.js";
import GlobalPagination from "../../components/globals/GlobalPagination.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();
// Post API
const url = import.meta.env.VITE_PUBLIC_URL;
const posts = ref([]);
const randomPosts = ref([]);

// fetch all posts
const fetchPost = async () => {
  try {
    const response = await axios.get(`${url}api/posts`);
    if (response.data.status === 200) {
      posts.value = response.data.data.reverse().filter(item => {
        return !item.isDeleted;
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

// fetch random posts
const fetchRandomPosts = async () => {
  try {
    const response = await axios.get("randomPosts");
    if (response.data.status === 200) {
      randomPosts.value = response.data.data.filter(item => {
        return !item.isDeleted;
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

onMounted(async () => {
  fetchPost();
  fetchRandomPosts();
});

// Pagination
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
  <v-row>
    <v-col cols="12">
      <v-carousel
        cycle
        height="25rem"
        color="red"
        hide-delimiter-background
        show-arrows="hover"
        class="border rounded-xl"
      >
        <v-carousel-item
          v-for="item in randomPosts"
          :key="item.id"
          :style="xs ? { aspectRatio: 16 / 9 } : { aspectRatio: 3 / 2 }"
        >
          <v-sheet
            class="d-flex fill-height justify-center align-center  ms-3"
            style="margin:-45px 0;"
          >
            <img
              class="w-75 h-75 rounded-xl"
              :src="`${url}${item.image}` || 'https://th.bing.com/th/id/OIP.AC9frN1qFnn-I2JCycN8fwHaEK?w=312&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7'"
              :alt="item.title"
            />
            <div class="px-3 text-justify">
              <a
                :href="`/news/${getSlugByName(item.title)}`"
                class="text-body font-weight-bold"
              >
                {{ item.title }}
                <p class="py-3 text-body-2">
                  {{ item.description }}
                </p>
              </a>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>

  <v-row>
    <v-col
      :cols="12"
      lg="8"
      md="8"
      v-if="posts.length > 0"
    >
      <h4 class="py-2 text-danger">Tin tức cập nhật</h4>
      <v-sheet
        v-for="item in posts.slice((page - 1) * rowsPerPage, page * rowsPerPage)"
        :key="item.id"
        class="d-flex mb-3 text-body-1 border rounded-xl w-100"
        rounded="3"
        style="width: 60%;"
      >
        <img
          class="w-50 me-2 rounded-xl"
          :src="`${url}${item.image}`"
        />
        <div class="d-flex flex-column justify-space-between py-1">
          <p class="pa-3 text-justify">{{ item.title }}</p>
          <p class="text-caption text-justify px-3">{{ item.description }}</p>

          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center text-muted pa-3">
              <v-icon size="16">mdi-clock-outline</v-icon>
              <p class="text-caption">{{ item.created_at.slice(0, 10) }}</p>
            </div>
            <v-btn
              class="text-none text-caption"
              color="#c50000"
              variant="text"
              :to="`/news/${getSlugByName(item.title)}`"
            >Xem thêm >></v-btn>
          </div>
        </div>
      </v-sheet>
    </v-col>

    <v-col
      cols="12"
      lg="4"
      md="4"
      style="position: relative; right: 0;"
    >
      <v-sheet>
        <h4 class="px-2 py-1 text-danger text-right">Xem nhiều tuần qua</h4>
        <div
          v-for="item in randomPosts"
          :key="item.id"
          class="my-2 w-75 float-right"
        >
          <img
            :src="`${url}${item.image}`"
            :alt="item.title"
            class="w-100 h-50 rounded-xl"
          />
          <div>
            <a
              :href="`/news/${getSlugByName(item.title)}`"
              class="text-caption"
            >{{ item.title }}</a>
          </div>
          <v-btn
            class="text-none text-caption"
            color="#c50000"
            variant="text"
            width="100%"
            :to="`/news/${getSlugByName(item.title)}`"
          >Xem thêm >></v-btn>
        </div>
      </v-sheet>
    </v-col>
  </v-row>

  <GlobalPagination
    v-if="posts.length > rowsPerPage"
    :numberOfPages="numberOfPage"
    :page="page"
    @update:page="updatePage"
  />
</template>

<style scoped>
a:hover {
  color: #c50000;
}
</style>