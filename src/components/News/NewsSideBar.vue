<template>
  <v-sheet class="d-flex flex-column justify-center text-body display-fixed">
    <div class="d-flex align-center my-2">
      <v-icon size="24" color="red-accent-4">mdi-home-circle</v-icon>
      <a href="/" class=" px-1 link text-dark">Trang chủ</a>
    </div>

    <div class="d-flex align-center my-2">
      <v-icon size="24" color="red-accent-4">mdi-headphones-box</v-icon>
      <a href="#" class=" px-1 link text-dark">Tư vấn </a>
    </div>

    <div class="d-flex align-center my-2">
      <v-icon size="24" color="red-accent-4">mdi-trending-up</v-icon>
      <a href="/news" class=" px-1 link text-dark">Thị trường </a>
    </div>

    <div class="d-flex align-center my-2">
      <v-icon size="24" color="red-accent-4">mdi-newspaper-variant-multiple</v-icon>
      <a href="/news" class=" px-1 link text-dark">Công nghệ </a>
    </div>

    <div class="d-flex align-center my-2">
      <v-icon size="24" color="red-accent-4">mdi-tag-plus</v-icon>
      <a href="#" class=" px-1 link text-dark">Khuyến mãi </a>
    </div>
  </v-sheet>
</template>

<style>
.link:hover {
  border-bottom: 2px solid  #c50000;
}

.display-fixed {
  position: fixed;
  top: auto;
  left: auto;
}
</style>
