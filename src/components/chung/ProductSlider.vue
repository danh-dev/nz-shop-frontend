<script setup>
import ProductSliderArrow from "./ProductSliderArrow.vue";
import { onMounted, onUnmounted, ref, computed } from "vue";

const props = defineProps({
  products: Array,
  floors: {
    type: Number,
    default: 1,
  },
  productsPerFloor: {
    type: Number,
    default: 0,
  },
  productsShow: Number
}
);

const number = ref(0);
const percent = ref(0);
const px = ref(0);
const duration = 500;
const s = 100;
const interval = 5000;

const maxSlider = computed(() => {
  if (props.productsPerFloor) {
    return props.productsPerFloor - props.productsShow + 1;
  }
  return props.products.length - props.productsShow + 1;
});

const disabled = computed(() => {
  return percent.value % 100 !== 0 && px.value % 100 !== 0;
});

let startTime, elapsedTime = 0;
let animationId;

onMounted(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange);
  animationId = requestAnimationFrame(slideProductList);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});

const handleArrowButton = e => {
  if (e.currentTarget.id === "left" && number.value !== 0) {
    elapsedTime = (interval + duration) * (number.value - 1);
    cancelAnimationFrame(animationId);
    startTime = undefined;
    animationId = requestAnimationFrame(undo);
  }

  if (e.currentTarget.id === "right") {
    number.value++;
    elapsedTime = (interval + duration) * number.value;
    cancelAnimationFrame(animationId);
    startTime = undefined;
    animationId = requestAnimationFrame(slideProductList);
  }
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    startTime = undefined;
    cancelAnimationFrame(animationId);
  } else {
    animationId = requestAnimationFrame(slideProductList);
  }
};

const slideProductList = timeStamp => {
  if (startTime === undefined) {
    startTime = timeStamp;
  }
  const frameTime = timeStamp - startTime;
  elapsedTime += frameTime;

  if (number.value !== maxSlider.value) {
    // transition-duration = 0.5s = 500ms, s = 100% => speed = 100 / 500 = 0.2%/ms
    percent.value += s / duration * frameTime;
    if (percent.value >= s * number.value) {
      percent.value = s * number.value;
    }

    px.value += 8 / duration * frameTime;
    if (px.value >= 8 * number.value) {
      px.value = 8 * number.value;
    }
  }
  else {
    percent.value -= s * (maxSlider.value - 1) / duration * frameTime;
    if (percent.value <= 0) {
      percent.value = 0;
    }

    px.value -= 8 * (maxSlider.value - 1) / duration * frameTime;
    if (px.value <= 0) {
      px.value = 0;
    }

    if (percent.value === 0 && px.value === 0) {
      number.value = 0;
      elapsedTime = 0;
    }
  }

  if (elapsedTime > (interval + duration) * (number.value + 1)) {
    number.value++;
  }

  startTime = timeStamp;
  animationId = requestAnimationFrame(slideProductList);
};


const undo = timeStamp => {
  if (startTime === undefined) {
    startTime = timeStamp;
  }
  const frameTime = timeStamp - startTime;
  elapsedTime += frameTime;

  // transition-duration = 0.5s = 500ms, s = 100% => speed = 100 / 500 = 0.2%/ms
  percent.value -= s / duration * frameTime;
  if (percent.value <= s * (number.value - 1)) {
    percent.value = s * (number.value - 1);
  }

  px.value -= 8 / duration * frameTime;
  if (px.value <= 8 * (number.value - 1)) {
    px.value = 8 * (number.value - 1);
  }
  startTime = timeStamp;
  if (percent.value === s * (number.value - 1) && px.value === 8 * (number.value - 1)) {
    number.value--;
    animationId = requestAnimationFrame(slideProductList);
  }
  else {
    animationId = requestAnimationFrame(undo);
  }
};

</script>

<template>
  <v-sheet
    position="relative"
    rounded="lg"
    class="d-flex flex-column overflow-hidden pa-2"
  >
    <v-sheet
      v-for="i in floors"
      :key="i"
      :class="i !== floors ? 'mb-3' : ''"
      class="d-flex"
    >
      <template
        v-for="product in (floors > 1 ? products.slice(productsPerFloor * (i - 1), productsPerFloor * i) : products)"
        :key="product.id"
      >
        <slot :props="{ product, percent, px }"></slot>
      </template>


    </v-sheet>
    <ProductSliderArrow
      direction="left"
      :disabled="disabled"
      :class="!number ? 'd-none' : ''"
      @click="handleArrowButton"
    ></ProductSliderArrow>
    <ProductSliderArrow
      direction="right"
      :disabled="disabled"
      @click="handleArrowButton"
    ></ProductSliderArrow>
  </v-sheet>
</template>

<style>
#carousel {
  -ms-overflow-style: none;
  /* Hide the scrollbar for MS Edge */
  scrollbar-width: none;
  /* Hide the scrollbar for Mozilla Firefox */
}

#carousel::-webkit-scrollbar {
  display: none;
  /* Hide the scrollbar on Webkit based browsers (Chrome, Safari, etc) */
  -webkit-overflow-scrolling: touch;
  /* On touch screens the content continues to scroll for a while after finishing the scroll gesture */
}
</style>
