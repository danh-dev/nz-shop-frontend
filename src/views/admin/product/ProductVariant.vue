<script setup>
import { ref } from "vue";
const variant = ref(
  {
    sku: {
      value: "",
      errorMessages: "",
    },
    quantity: {
      value: "",
      errorMessages: "",
    },
    originPrice: {
      value: "",
      errorMessages: "",
    },
    sellPrice: {
      value: "",
      errorMessages: "",
    },
    discountPrice: {
      value: "",
      errorMessages: "",
    },
  }
);
</script>

<template>
  <v-container class="m-card my-3">
    <v-form>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Mã sản phẩm"
            v-model="variant.sku.value"
            :error-messages="variant.sku.errorMessages"
            class="mr-2"
            variant="outlined"
            @update:model-value="variant.sku.errorMessages = ''"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Số lượng"
            v-model="variant.quantity.value"
            :error-messages="variant.quantity.errorMessages"
            class="mr-2"
            variant="outlined"
            @update:model-value="variant.quantity.errorMessages = ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Giá gốc"
            v-model="variant.originPrice.value"
            :error-messages="variant.originPrice.errorMessages"
            class="mr-2"
            variant="outlined"
            persistent-hint
            @update:model-value="variant.originPrice.errorMessages = ''"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Giá bán"
            v-model="variant.sellPrice.value"
            :error-messages="variant.sellPrice.errorMessages"
            class="mr-2"
            variant="outlined"
            persistent-hint
            @update:model-value="variant.sellPrice.errorMessages = ''"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Giá khuyến mãi"
            v-model="variant.discountPrice.value"
            :error-messages="variant.discountPrice.errorMessages"
            class="mr-2"
            variant="outlined"
            persistent-hint
            @update:model-value="variant.discountPrice.errorMessages = ''"
            hint="Không bắt buộc"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn text="Xác nhận"></v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style></style>