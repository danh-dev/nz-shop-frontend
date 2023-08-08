<script setup>
import HomeMainItem from "./HomeMainItem.vue";
defineProps({
  modal: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <v-list>
    <HomeMainItem
      :activatorClass="`phone-activator${modal} flex-1-1`"
      category="phone"
    >
      <template #icon>mdi-cellphone</template>
      <template #name>Điện thoại</template>
    </HomeMainItem>
    <HomeMainItem
      :activatorClass="`laptop-activator${modal} flex-1-1`"
      category="laptop"
    >
      <template #icon>mdi-laptop</template>
      <template #name>Laptop</template>
    </HomeMainItem>
    <HomeMainItem :activatorClass="`sound-activator${modal} flex-1-1`">
      <template #icon>mdi-earbuds-outline</template>
      <template #name>Âm thanh</template>
    </HomeMainItem>
    <HomeMainItem :activatorClass="`watch-activator${modal} flex-1-1`">
      <template #icon>mdi-watch-variant</template>
      <template #name>Đồng hồ</template>
    </HomeMainItem>
    <HomeMainItem :activatorClass="`usb-activator${modal} flex-1-1`">
      <template #icon>mdi-usb-flash-drive</template>
      <template #name>Phụ kiện</template>
    </HomeMainItem>
    <HomeMainItem
      :activatorClass="`pc-activator${modal} flex-1-1`"
      category="pc"
    >
      <template #icon>mdi-desktop-tower-monitor</template>
      <template #name>PC, Màn hình</template>
    </HomeMainItem>
    <HomeMainItem :activatorClass="`tv-activator${modal} flex-1-1`">
      <template #icon>mdi-television-classic</template>
      <template #name>Tivi</template>
    </HomeMainItem>
    <HomeMainItem :activatorClass="`sale-activator${modal} flex-1-1`">
      <template #icon>mdi-sale</template>
      <template #name>Khuyến mãi</template>
    </HomeMainItem>
    <HomeMainItem :activatorClass="`news-activator${modal} flex-1-1`">
      <template #icon>mdi-newspaper</template>
      <template #name>Tin tức</template>
    </HomeMainItem>
  </v-list>
</template>

<style></style>