<script setup>
import { ref, onBeforeMount } from "vue";
import router from "../router/index.js";
import useNewsStore from "../stores/useNewsStore.js";
import { storeToRefs } from "pinia";
import getSlugByName from "../utils/getSlugByName.js";
import NewsSideBar from "../components/news/NewsSideBar.vue";

const { relatedArticles } = storeToRefs(useNewsStore());

const article = ref(null);

const { findArticleBySlug } = useNewsStore();

onBeforeMount(() => {
  const newsName = router.currentRoute.value.params.newsName;
  article.value = findArticleBySlug(newsName);
});


</script>

<template>
  <v-sheet>
    <v-row class="container-fluid">
      <v-col cols="12" lg="3" md="3">
        <NewsSideBar />
      </v-col>

      <v-col :cols="12" lg="9" md="9">
        <div>
          <v-img :src="article.image" class="rounded-lg mb-2" />
        </div>
        <v-sheet class="border rounded-xl px-4 text-justify mx-10" style="position: relative; top: -80px;">
          <v-btn color="danger" variant="flat" class="my-2 text-h6 text-white rounded-xl">Tin tức</v-btn>
          <h2>{{ article.title }}</h2>

          <v-sheet class="d-flex align-center my-3">
            <img src="/assets/unknow.png" class="rounded-circle" style="width: 40px; height: 40px;">
            <div class="mx-2">
              <h5>{{ article.author }}</h5>
              <p class="text-caption">{{ article.time }}</p>
            </div>
          </v-sheet>

          <v-sheet>
            <p class="py-2">{{ article.description }}</p>
          </v-sheet>

          <v-sheet>
            <h1 class="py-4"></h1>
            <div>
              <p></p>
              <div>
                <v-img class="rounded my-2" />
              </div>
            </div>
          </v-sheet>

          <v-btn color="danger" variant="flat" class="mt-3 text-h6 rounded-xl">Bài viết liên quan</v-btn>
          <v-sheet>
            <div class="d-flex align-center w-50 my-3" v-for="relatedArticle in relatedArticles" :key="relatedArticle.id">
              <img :src="relatedArticle.image" class="w-25 rounded" />
              <a :href="`/news/${ getSlugByName(relatedArticle.title) }`" class="text-caption px-1">{{ relatedArticle.title }}</a>
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
}
</style>