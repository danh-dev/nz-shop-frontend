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
    <v-snackbar v-model="isSuccess" transition="scroll-y-reverse-transition" location="top end"
                color="green-darken-1"
                :timeout="2000">
      {{ siteStore.Message}}
    </v-snackbar>
    <v-snackbar v-model="isError" transition="scroll-y-reverse-transition" location="bottom end"
                color="red-darken-1"
                :timeout="2000">
      {{ siteStore.Message }}
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
import { siteData } from "@/stores/globals";
import Header from "@/components/globals/Header.vue";
import {computed} from "vue";
const siteStore = siteData();


const isError = computed(()=>String(siteStore.Status).toLowerCase()==="error")
const isSuccess = computed(()=>String(siteStore.Status).toLowerCase()==="ok")
</script>

<style scoped></style>