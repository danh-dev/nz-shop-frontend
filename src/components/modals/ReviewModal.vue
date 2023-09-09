<script setup>
import { ref } from "vue";
import axios from "axios";
const props = defineProps({
  productId: Number,

});





</script>

<template>
  <!-- Begin : Review Modal  -->
  <v-dialog
    v-model="reviewModal"
    activator="#reviewModalButton"
    width="auto"
  >
    <v-card
      width="500"
      class="mx-auto"
    >
      <v-sheet class="py-1 d-flex flex-column align-center justify-center text-body-2">
        <img
          src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
          class="w-25 h-25"
        >
        <p>Bạn thấy sản phẩm này như thế nào ?</p>
      </v-sheet>

      <v-textarea
        v-model="comment"
        class="ma-2"
        rounded="lg"
        cols="30"
        rows="5"
        placeholder="Xin mời chia sẻ cảm nhận về sản phẩm"
      >
      </v-textarea>

      <v-rating
        v-model="rating"
        class="text-caption mx-auto"
        :item-labels="['Bad', 'So so', 'Ok', 'Good', 'Great']"
        item-label-position="top"
        color="yellow-darken-3"
        denity="comfortable"
      >
      </v-rating>
      <v-card-actions>
        <v-btn
          append-icon="mdi-check-outline"
          color="success"
          variant="elevated"
          class="w-50 text-white rounded-xl"
          @click="createReview"
        >
          Gửi đánh giá
        </v-btn>
        <v-btn
          append-icon="mdi-close-outline"
          color="red-accent-4"
          variant="elevated"
          class="ms-1 w-50 text-white rounded-xl"
          @click="done"
        >
          Đóng
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
  <!-- End : Review Modal  -->
</template>

<style></style>