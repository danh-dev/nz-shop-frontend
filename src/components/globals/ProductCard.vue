<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import getSlugByName from "../../utils/getSlugByName";

defineProps({
  product: Object
});

const url = import.meta.env.VITE_PUBLIC_URL;

const { name, xs } = useDisplay();

const productImageWidth = computed(() => {
  switch (name.value) {
    case "xs":
      return 7;
    case "sm":
      return 8;
    case "md":
      return 8;
    case "xl":
      return 9;
    case "xxl":
      return 10;
    default:
      return 9;
  }
});

const love = ref(true);

</script>

<template>
  <v-card
    class="pt-8 overflow-hidden product-card"
    rounded="lg"
    v-ripple
    hover
    elevation="2"
    :href="`/${getSlugByName(product.name)}`"
  >
    <v-sheet>
      <v-sheet class="d-flex">
        <v-img
          :src="`${url}${product.image}`"
          :max-width="`${productImageWidth}rem`"
          class="mx-auto"
          :aspect-ratio="1"
          cover
        >
        </v-img>
      </v-sheet>
      <v-card-item>
        <v-card-title>
          <v-sheet
            class="text-subtitle-2 text-md-body-2 font-weight-bold text-wrap clamp-2 mb-2"
            style="line-height: 1.74rem;"
          >
            {{ product.name }}
          </v-sheet>

          <v-sheet class="d-flex align-center">
            <v-sheet class="me-2 text-body-2 text-md-body-1 text-red-accent-4 font-weight-bold">
              {{ product.variant?.discountPrice ?? product.variant?.sellPrice }}
            </v-sheet>
            <v-sheet
              v-if="product.variant?.discountPrice"
              class="text-caption text-md-body-2 text-decoration-line-through text-grey"
            >
              {{ product.variant?.sellPrice }}
            </v-sheet>
          </v-sheet>
        </v-card-title>

      </v-card-item>

      <v-card-text class="pb-0">
        <v-rating
          :model-value="3.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        >
        </v-rating>
      </v-card-text>
    </v-sheet>


    <v-card-actions class="d-flex align-center">
      <v-btn
        class="flex-1-1 text-body-2"
        variant="tonal"
        color="red-accent-4"
        @click.prevent.stop
        :append-icon="xs ? '' : 'mdi-cart-variant'"
      >
        <template #default>
          <span class="text-caption text-md-body-2">{{ xs ? '' : 'Thêm giỏ hàng' }}</span>
          <v-icon v-if="xs">
            mdi-cart-variant
          </v-icon>
        </template>
      </v-btn>

      <v-btn
        min-width="36px"
        class="px-0"
        color="red-accent-4"
        variant="tonal"
        @click.prevent.stop="love = !love"
      >
        <v-icon :icon="love ? 'mdi-heart-outline' : 'mdi-heart'"></v-icon>
      </v-btn>

    </v-card-actions>

    <v-sheet
      v-if="product.variant?.discountPrice"
      position="absolute"
      location="top left"
      color="red-accent-4"
      class="px-2"
      rounded="be-lg"
    >
      <v-sheet
        class="text-caption"
        color="transparent"
      >
        Giam {{ Math.round((1 - product.variant?.discountPrice / product.variant?.sellPrice) * 100) }}%
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style>
.clamp-2 {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>