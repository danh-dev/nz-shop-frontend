<script setup>

import { ref } from "vue";

const open = ref(["Users"]);

const admins = ref([
  ["Management", "mdi-account-multiple-outline"],
  ["Settings", "mdi-cog-outline"],
  ["Posts", "mdi-newspaper-variant-multiple"],
  ["Sliders", "mdi-image-multiple-outline"],
  ["Pages", ""]
]);

const cruds = ref([
  ["Create", "mdi-plus-outline"],
  ["Read", "mdi-file-outline"],
  ["Update", "mdi-update"],
  ["Delete", "mdi-delete"],
]);
</script>

<template>
  <v-list v-model:opened="open">
    <v-list-item
      prepend-icon="mdi-home"
      title="Home"
    ></v-list-item>

    <v-list-group
      v-model="open"
      value="Users"
    >
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-circle"
          title="Users"
        ></v-list-item>
      </template>

      <v-list-group
        v-model="open"
        value="Admin"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Admin"
          ></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon], i) in admins"
          :key="i"
          :title="title"
          :prepend-icon="icon"
          :value="title"
        ></v-list-item>
      </v-list-group>

      <v-list-group
        v-model="open"
        value="Actions"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Actions"
          ></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon], i) in cruds"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        ></v-list-item>
      </v-list-group>


    </v-list-group>
    <!-- Admin Category -->
    <v-list-item
      prepend-icon="mdi-list-box-outline"
      :to="{
        name: 'admin-category'
      }"
    >Category</v-list-item>
    <!-- Admin Product -->
    <v-list-item
      prepend-icon="mdi-package-variant-closed"
      :to="{
        name: 'admin-product'
      }"
    >Product</v-list-item>


    <!-- Begin:  Posts -->
    <v-list-item :to="`/admincp/post`" title="Posts">
      <template v-slot:prepend>
        <v-icon>mdi-newspaper-variant-multiple</v-icon>
      </template>
    </v-list-item>
    <!-- Begin:  Sliders -->
    <v-list-item :to="`/admincp/slider`" title="Sliders">
      <template v-slot:prepend>
        <v-icon>mdi-image-multiple-outline</v-icon>
      </template>
    </v-list-item>
    <!-- Begin:  Pages -->
    <v-list-item :to="`/admincp/page`" title="Pages">
      <template v-slot:prepend>
        <v-icon>mdi-book-open-page-variant-outline</v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>