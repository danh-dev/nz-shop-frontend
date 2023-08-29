<script setup>
import FooterButton from "../FooterButton.vue";
</script>

<template>
  <v-bottom-navigation
    color="red-accent-4"
    grow
    class="d-flex d-sm-none"
  >
    <FooterButton value="home">
      <template #icon>mdi-home-outline</template>
      <template #label>Trang chủ</template>
    </FooterButton>
    <FooterButton
      id="category"
      value="category"
    >
      <template #icon>mdi-list-box-outline</template>
      <template #label>Danh mục</template>
    </FooterButton>
    <FooterButton value="store">
      <template #icon>mdi-store-outline</template>
      <template #label>Cửa hàng</template>
    </FooterButton>

    <FooterButton
      class="account"
      value="account"
    >
      <template #icon>mdi-account-circle-outline</template>
      <template #label>Đăng nhập</template>
    </FooterButton>

    <FooterButton value="detail">
      <template #icon>mdi-dots-horizontal</template>
      <template #label>Xem thêm</template>
    </FooterButton>
  </v-bottom-navigation>
</template>

<style></style>