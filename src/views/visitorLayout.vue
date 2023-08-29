<template>
  <v-app>
    <v-overlay
        :model-value="siteStore.isLoading"
        class="align-center justify-center"
        scrim="#fff"
        :persistent="true"
    >
      <v-progress-circular
          color="red-darken-2"
          indeterminate
          size="72"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar v-for="(message, index) in siteStore.apiMessages"
                :key="index"
                v-model="message.show" transition="scroll-y-reverse-transition" location="bottom end"
                :color="message.status==='error'?'red-darken-1':'green-darken-1'"
                :style="{ bottom: `${index * 60}px` }"
    >
      {{ message.message }}
    </v-snackbar>
    <Header/>
    <v-main>
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import {RouterView} from "vue-router";
import {siteData} from "@/stores/globals";
import Header from "@/components/globals/Header.vue";

const siteStore = siteData();
</script>

<style scoped></style>