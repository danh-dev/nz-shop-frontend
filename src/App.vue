<script setup>
import {RouterView, useRoute} from "vue-router";
import ScrollToTop from "@/components/globals/ScrollToTop.vue";
import {siteData} from "@/stores/globals";
import {useHead, useSeoMeta} from "@unhead/vue";
import {onMounted} from "vue";

const siteStore = siteData();
const route = useRoute();

onMounted(async () => {
  await siteStore.fetchSettingSite()
  const rootElement = document.documentElement;
  rootElement.style.setProperty("--main-color", siteStore.siteSetings.main_color);
  if (siteStore.siteSetings.main_font) {
    rootElement.style.setProperty("font-family", `"` + siteStore.siteSetings.main_font + `", sans-serif`);
    const styleElement = document.createElement("style");
    styleElement.textContent = `
    .text-body-2, .text-body-1, .text-h1,.text-h2,.text-h3,.text-h4,.text-h5,.text-h6 {
      font-family: ` + siteStore.siteSetings.main_font + `, sans-serif !important ;
    }
  `;
    document.head.appendChild(styleElement);
  }
});
useHead({
  htmlAttrs: {
    lang: siteStore.siteSetings.lang_code,
  },
  link: [{
    rel: "icon",
    type: "image/png",
    href: import.meta.env.VITE_PUBLIC_URL + siteStore.siteSetings.favicon,
  }, {
    rel: "stylesheet",
    href: `https://fonts.googleapis.com/css2?family=` + siteStore.siteSetings.main_font + `&display=swap`,
  }]
});
useSeoMeta({
  title: siteStore.siteSetings.meta_tag_title,
  description: siteStore.siteSetings.meta_tag_description,
  keywords: siteStore.siteSetings.meta_tag_keywords,
  "og:image": import.meta.env.VITE_PUBLIC_URL + siteStore.siteSetings.meta_tag_social_img,
});
</script>
<template>
  <v-overlay :model-value="siteStore.isLoading" class="align-center justify-center" scrim="#fff" :persistent="true">
    <v-progress-circular color="red-darken-2" indeterminate size="72"></v-progress-circular>
  </v-overlay>
  <v-snackbar v-for="(message, index) in siteStore.apiMessages" :key="index" v-model="message.show"
              transition="scroll-y-reverse-transition" location="bottom end"
              :color="message.status === 'error' ? 'red-darken-1' : 'green-darken-1'"
              :style="{ bottom: `${index * 60}px` }">
    {{ message.message }}
  </v-snackbar>
  <RouterView/>
  <ScrollToTop/>
</template>

<style>
.m-pointer {
  cursor: pointer;
}

.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.extra {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

a {
  color: #333;
  text-decoration: none;
}

.border-left {
  border-left: 2px solid #d50000;
}

.text-danger {
  color: #c50000;
}

.font-bold {
  font-weight: bold;
}

.m-card {
  background: #fff;
  border-radius: 0.5rem !important;
  box-shadow: 0 2px 9px -2px rgba(50, 71, 92, 0.06), 0 4px 9px 1px rgba(50, 71, 92, 0.04), 0 2px 6px 4px rgba(50, 71, 92, 0.02) !important;
}

.m-box {
  border: 1px solid #cccccc;
  border-radius: 5px;
}

.active {
  border-color: #dc3545 !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.ck-editor__editable {
  height: 300px;
  border: 1px solid rgb(211, 211, 211) !important;
}

@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
}
</style>
