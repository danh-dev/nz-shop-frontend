<script setup>
import {ref} from "vue";
const articles = ref([
  
]);

</script>

<template>
  <v-sheet>
    <v-row class="container-fluid">
      <v-col cols="12" lg="3" md="3">
        <NewsSideBar />
      </v-col>

      <v-col :cols="12" lg="9" md="9">
        <div>
          <v-img :src="article.photo" class="rounded-lg mb-2" />
        </div>
        <v-sheet class="border rounded-lg px-4 text-justify mx-3" style="position: relative; top: -100px;">
          <v-btn color="danger" variant="flat" class="my-2 text-h6 text-white rounded-xl">Tin tức</v-btn>
          <h2>{{ article.title }}</h2>

          <div class="d-flex align-center my-3">
            <img src="/assets/unknow.png" class="rounded-circle" style="width: 40px; height: 40px;">
            <div class="mx-2">
              <h5 class="text-danger">SFORUM</h5>
              <p class="text-caption">{{ article.time }}</p>
            </div>
          </div>

          <div>
            <p class="py-2">{{ article.description }}</p>
          </div>

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
              <a :href="`/news/${getSlugByName(relatedArticle.title)}`" class="text-caption px-1">{{
                relatedArticle.title }}</a>
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
  color: #c50000;
}

.more {
  white-space: wrap;
  /* overflow: hidden;
	text-overflow: ellipsis; */
}
</style>