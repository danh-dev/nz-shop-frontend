<script setup>
import { ref, onMounted } from "vue";
import axios from "../../axiosComfig";
import { useRoute } from "vue-router";
import getSlugByName from "../../utils/getSlugByName.js";
import { siteData } from "@/stores/globals";
const siteStore = siteData();

// Page API
const route = useRoute();
const pages = ref([]);
const page = ref({
  name: "",
  author: "",
  content: "",
  created_at: ""
});

const fetchPage = async () => {
  siteStore.isLoading = true;
  const response = await axios.get("pages");
  if (response.data.status === 200) {
    pages.value = response.data.data;
    page.value = pages.value.find((page) => {
      return getSlugByName(page.name) === route.params.name;
    });
    siteStore.isLoading = false;
  }
};

onMounted(fetchPage);
</script>
<style></style>

<template>
  <v-row>
    <v-col :cols="12">
      <v-sheet class="border rounded-xl px-4 text-justify mx-10">
        <v-btn
          color="danger"
          variant="flat"
          class="my-2 text-h6 text-white rounded-xl"
        >Tin tức</v-btn>
        <h2 class="text-center text-danger text-uppercase">{{ page.name }}</h2>

        <v-sheet class="d-flex align-center my-3">
          <img
            src="/assets/unknow.png"
            class="rounded-circle"
            style="width: 40px; height: 40px;"
          >
          <div class="mx-2">
            <h5 class="text-uppercase text-danger">{{ page.author }}</h5>
            <p class="text-caption">{{ page.created_at.slice(0, 10) }}</p>
          </div>
        </v-sheet>

        <v-sheet>
          <p
            class="py-2"
            v-html="page.content"
          ></p>
        </v-sheet>
      </v-sheet>
    </v-col>
  </v-row>
</template>