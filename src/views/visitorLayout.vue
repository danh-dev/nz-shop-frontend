<script setup>
import { useDisplay } from "vuetify";
import { RouterView } from "vue-router";

import Header from "@/components/globals/Header.vue"
import TheFooter from "@/components/layouts/TheFooter.vue";
import FullscreenModal from "@/components/modals/FullscreenModal.vue";
import MenuModal from "@/components/modals/MenuModal.vue";

const { lgAndUp } = useDisplay();
</script>

<template>
  <v-layout>
    <Header />

    <v-main
      style="position: relative"
      id="modal-container"
    >
      <v-container :fluid="!lgAndUp">
        <RouterView />
      </v-container>
    </v-main>

    <TheFooter />

    <FullscreenModal
      location-strategy="static"
      scroll-strategy="close"
      :scrim="false"
      transition="dialog-bottom-transition"
      activator="#category"
      absolute
      content-class="position-fixed"
      attach="#modal-container"
      width="100%"
      height="calc(100vh - 56px)"
    />

    <MenuModal
      style="top: 64px"
      location-strategy="static"
      scroll-strategy="none"
      activator="#categories"
      attach="#modal-container"
      transition="fade-transition"
      width="100%"
      absolute
      content-class="position-fixed"
    />
  </v-layout>
</template>

<style></style>