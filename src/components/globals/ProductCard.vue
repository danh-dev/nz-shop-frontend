<script setup>
import axios from "axios";
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { siteData } from "@/stores/globals";
const siteStore = siteData();

defineProps({
  product: Object,
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

const changeLove = async id => {
  try {
    const res = await axios.post("wishlists", {
      user_id: siteStore.userInfo.user_id,
      product_id: id,
    });
  }

  catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <v-card
    class="pt-8 overflow-hidden product-card"
    rounded="lg"
    v-ripple
    hover
    elevation="2"
    position="relative"
    height="350px"
  >
    <v-sheet class="d-flex">
      <v-img
        v-if="product.image"
        :src="`${url}${product.image}`"
        :max-width="`${productImageWidth}rem`"
        :height="`${productImageWidth * 4 / 3}rem`"
        class="mx-auto"
        cover
      />
      <slot
        v-else
        name="image"
        :maxWidth="`${productImageWidth}rem`"
        :height="`${productImageWidth * 4 / 3}rem`"
      ></slot>

      <v-btn
        class="ma-1"
        rounded="circle"
        style="position: absolute; top: 0; right: 0;"
        color="red-accent-3"
        variant="text"
        @click.prevent.stop="changeLove(product.id)"
        size="20"
      >
        <v-icon
          :icon="!product.love ? 'mdi-heart-outline' : 'mdi-heart'"
          size="20"
        ></v-icon>
      </v-btn>

    </v-sheet>
    <v-card-item>
      <v-card-title>
        <v-sheet
          class="text-subtitle-2 text-md-body-2 font-weight-bold text-wrap clamp-2 mb-2"
          height="3.3rem"
          style="line-height: 1.74rem;"
        >
          {{ product.name }}
        </v-sheet>
      </v-card-title>
    </v-card-item>

    <v-card-actions
      style="position: absolute; bottom: 0;"
      class="flex-column align-start px-3"
    >
      <v-sheet>
        <v-sheet class="d-flex align-center">
          <v-sheet class="me-2 text-body-2  text-red-accent-4 font-weight-bold">
            {{ +product.discountPrice ? formatPrice(+product.discountPrice) :
              formatPrice(+product.sellPrice || 0) }}
          </v-sheet>
          <v-sheet
            v-if="+product.discountPrice"
            class="text-caption text-decoration-line-through text-grey"
          >
            {{ +product.sellPrice ? formatPrice(+product.sellPrice) : "" }}
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <div
        v-if="product?.rating"
        class="py-0 d-flex align-center"
      >
        <v-rating
          :model-value="product?.rating"
          color="amber"
          half-increments
          readonly
          density="compact"
          size="small"
        >
        </v-rating>
        <div class="text-caption ms-7">{{ product?.ratingCount }} đánh giá</div>
      </div>
    </v-card-actions>
    <v-sheet
      v-if="+product.sellPrice > +product.discountPrice && +product.discountPrice"
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
        Giam {{ Math.round((1 - +product.discountPrice / +product.sellPrice) * 100) }}%
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