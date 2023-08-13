<script setup>
import useNewsStore from "../stores/useNewsStore.js";
import { storeToRefs } from "pinia";
import getSlugByName from "../utils/getSlugByName.js";
import NewsSideBar from "../components/news/NewsSideBar.vue";
const { articles, slides, subArticles } = storeToRefs(useNewsStore());



</script>

<template>
  <v-sheet>
    <v-row class="container-fluid">
      <v-col :cols="12" lg="2" md="2">
        <NewsSideBar class="display" />
      </v-col>

      <v-col cols="12" lg="10" md="10">
        <v-sheet>
          <v-carousel cycle height="24rem" hide-delimiter-background show-arrows="hover">
            <v-carousel-item v-for="slide in slides" :key="slide.id">
              <v-sheet height="100%" class="border rounded-lg">
                <div class="d-flex fill-height justify-center align-center mx-4">
                  <img class="w-50 h-75 rounded-lg" :src="slide.image" alt="" />
                  <div class="px-3 text-justify">
                    <a :href="`/news/${ getSlugByName(slide.title) }`" class="text-h6">
                      {{ slide.title }}
                    </a>
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
      <v-col :cols="12" lg="2" md="2"></v-col>
      <v-col :cols="12" lg="7" md="7">
        <h4 class="py-2 text-danger">Tin tức cập nhật</h4>
        <v-sheet v-for="article in articles" :key="article.id" class="d-flex mb-3 text-body-1 border rounded-lg w-100" rounded="3"
          style="width: 60%;">
          <img class="w-50 me-2 rounded-lg" :src="article.image" />
          <div class="d-flex flex-column justify-space-between py-1">
            <a :href="`/news/${ getSlugByName(article.title) }`" class="">{{ article.title }}</a>
            <div class="d-flex align-center text-muted">
              <v-icon size="16">mdi-clock-outline</v-icon>
              <p class="px-1 text-caption">{{ article.time }}</p>
            </div>
          </div>
        </v-sheet>
        <v-btn color="red-accent-4" variant="elevated" class="text-white" href="#">Xem thêm</v-btn>
      </v-col>

      <v-col cols="12" lg="3" md="3" class="">
        <div class="col-12">
          <h4 class="px-2 py-1 text-danger">Xem nhiều tuần qua</h4>
          <div v-for="subArticle in subArticles" :key="subArticle.id" class="my-2 w-75 px-2">
            <img :src="subArticle.image" alt="" class="w-100 h-50 rounded-lg">
            <div>
              <a :href="`/news/${ getSlugByName(subArticle.title) }`" class="text-caption">{{ subArticle.title }}</a>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>

</style>