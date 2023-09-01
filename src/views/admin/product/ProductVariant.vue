<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import axios from "@/axiosComfig.js";

import SuccessAlert from "@/components/globals/SuccessAlert.vue";

const route = useRoute();

const status = ref(false);
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

const variantValue = ref("");

const fetchVariant = async () => {
  try {
    const res = await axios.get(`variants/${+route.params.id}`);

    if (res.status === 200) {
      const data = mapKeys(res.data.data, (value, key) => camelCase(key));
      variant.value.sku.value = data.sku;
      variant.value.quantity.value = data.quantity;
      variant.value.originPrice.value = data.originPrice;
      variant.value.sellPrice.value = data.sellPrice;
      variant.value.discountPrice.value = data.discountPrice;
      variantValue.value = data.value;
    }
  }
  catch (e) {
    console.log(e);
  }
};

const submit = async () => {
  const data = {
    sku: variant.value.sku.value,
    quantity: variant.value.quantity.value,
    originPrice: variant.value.originPrice.value,
    sellPrice: variant.value.sellPrice.value,
    discountPrice: variant.value.discountPrice.value || null,
  };
  try {
    const res = await axios.put(`variants/update/${route.params.id}`, data);

    if (res.status === 200) {
      status.value = true;
    }
  }
  catch ({ response: { status, data } }) {
    if (status === 400) {
      for (const [key, value] of Object.entries(mapKeys(data.errors, (value, key) => camelCase(key)))) {
        variant.value[key].errorMessages = value;
      }
    }
    else {
      console.log(data);
    }
  }
};

const handleInput = (input) => {
  input.errorMessages = "";
  status.value = false;
};


onMounted(fetchVariant);
</script>

<template>
  <v-container class="m-card my-3">
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12">
          <v-chip
            v-for="variantType in variantValue.split('|')"
            :key="variantType"
          >
            {{ variantType }}
          </v-chip>
        </v-col>
      </v-row>

      <v-row v-if="status">
        <v-col cols="12">
          <SuccessAlert
            :show="status"
            title="Cập nhật biến thể thành công!"
            :to="{
              name: 'admin-product-detail',
              params: { ...route.params },
            }"
          >
          </SuccessAlert>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Mã sản phẩm"
            v-model="variant.sku.value"
            :error-messages="variant.sku.errorMessages"
            class="mr-2"
            variant="outlined"
            @update:model-value="() => handleInput(variant.sku)"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Số lượng"
            v-model="variant.quantity.value"
            :error-messages="variant.quantity.errorMessages"
            class="mr-2"
            variant="outlined"
            @update:model-value="() => handleInput(variant.quantity)"
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
            @update:model-value="() => handleInput(variant.originPrice)"
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
            @update:model-value="() => handleInput(variant.sellPrice)"
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
            @update:model-value="() => handleInput(variant.discountPrice)"
            hint="Không bắt buộc"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            text="Xác nhận"
            type="submit"
          ></v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style></style>