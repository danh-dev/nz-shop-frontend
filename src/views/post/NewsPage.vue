<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import getSlugByName from "../../utils/getSlugByName.js";
// Post API
defineProps({
  posts: Array,
});
const url = "http://127.0.0.1:8000/";
const route = useRoute();
const posts = ref([]);
const post = ref({
  title: "",
  author: "",
  image: "",
  content: "",
  created_at: ""
});



const fetchPost = async () => {
  try {
    const response = await axios.get(`${url}api/posts`);
    // loading.value = false;
    if (response.data.status === 200) {
      posts.value = response.data.data;
      post.value = posts.value.find((post) => {
        return getSlugByName(post.title) === route.params.title;
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    // loading.value = false;
  }
};

onMounted(fetchPost);

</script>

<template>
  <v-sheet>
    <!-- <v-row class="container-fluid">
      <v-col :cols="12" class="">
        <NewsSideBar />
      </v-col>
    </v-row> -->

    <v-row>
      <v-col :cols="12">
        <div>
          <v-img
            :src="`${url}${post.image}`"
            width="100%"
            height="80%"
            class="rounded-xl mb-2"
          />
        </div>
        <v-sheet
          class="border rounded-xl px-4 text-justify mx-10"
          style="position: relative; top: -80px;"
        >
          <v-btn
            color="danger"
            variant="flat"
            class="my-2 text-h6 text-white rounded-xl"
          >Tin tức</v-btn>
          <h2>{{ post.title }}</h2>

          <v-sheet class="d-flex align-center my-3">
            <img
              src="/assets/unknow.png"
              class="rounded-circle"
              style="width: 40px; height: 40px;"
            >
            <div class="mx-2">
              <h5 class="text-uppercase text-danger">{{ post.author }}</h5>
              <p class="text-caption">{{ post.created_at.slice(0, 10) }}</p>
            </div>
          </v-sheet>

          <v-sheet>
            <p
              class="py-2"
              v-html="post.content"
            ></p>
          </v-sheet>

          <v-btn
            color="danger"
            variant="flat"
            class="mt-3 text-h6 rounded-xl"
          >Bài viết liên quan</v-btn>
          <v-sheet>
            <div
              class="d-flex align-center w-50 my-3"
              v-for="item in posts.slice(5, 9)"
              :key="item.id"
            >
              <img
                :src="`${url}${item.image}`"
                class="w-25 rounded"
              />
              <a
                :href="`/news/${getSlugByName(item.title)}`"
                class="text-caption px-1"
              >{{
                item.title }}</a>
            </div>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>
a {
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: red-accent-4;
}

.more {
  white-space: wrap;
  /* overflow: hidden;
	text-overflow: ellipsis; */
}</style>