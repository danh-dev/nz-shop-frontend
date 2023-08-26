<template>
  <v-sheet class="d-flex justify-center text-body">
    <div class="d-flex align-center my-2 me-4">
      <v-icon size="x-small" color="red-accent-4">mdi-home-circle</v-icon>
      <v-btn :to="`/`" variant="text" class=" px-1" density="compact">Trang chủ</v-btn>
    </div>

    <div class="d-flex align-center my-2 me-4">
      <v-icon size="x-small" color="red-accent-4">mdi-headphones-box</v-icon>
      <v-btn href="tel:0909751772" variant="text" class=" px-1" density="compact">Tư vấn </v-btn>
    </div>

    <div class="d-flex align-center my-2 me-4">
      <v-icon size="x-small" color="red-accent-4">mdi-trending-up</v-icon>
      <v-btn :to="`/news`" variant="text" class=" px-1" density="compact">Thị trường </v-btn>
    </div>

    <div class="d-flex align-center my-2 me-4">
      <v-icon size="x-small" color="red-accent-4">mdi-newspaper-variant-multiple</v-icon>
      <v-btn :to="`/category`" variant="text" class=" px-1" density="compact">Sản phẩm </v-btn>
    </div>

    <div class="d-flex align-center my-2 me-4">
      <v-icon size="x-small" color="red-accent-4">mdi-tag-plus</v-icon>
      <v-btn :to="`coupon`" variant="text" class=" px-1" density="compact">Khuyến mãi </v-btn>
    </div>
  </v-sheet>
</template>

<style scoped>

</style>
