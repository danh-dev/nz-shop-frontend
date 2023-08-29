<script setup>
import { ref } from "vue";
import { mapKeys, camelCase } from "lodash";
import axios from "axios";

const url = "http://127.0.0.1:8000/";
const loading = ref(false);

const form = ref({
  phone: {
    value: "",
    errorMessages: "",
  },
  orderCode: {
    value: "",
    errorMessages: "",
  },
});

const submit = async () => {
  const data = {
    phone: form.value.phone.value,
    orderCode: form.value.orderCode.value,
  };

  try {
    const res = await axios.post(`${url}/tracking`, data);

  }
  catch ({ response: { status, data } }) {
    if (status === 400) {
      for (const [key, value] of Object.entries(mapKeys(data.errors, (value, key) => camelCase(key)))) {
        form.value[key].errorMessages = value;
      }
    }
  }
};
</script>

<template>
  <v-container class="m-card my-3">
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12">
          <v-text-field
            color="red-accent-4"
            v-model="form.phone.value"
            label="Số điện thoại"
            :error-messages="form.phone.errorMessages"
            variant="outlined"
            @update:model-value="form.phone.errorMessages = ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            color="red-accent-4"
            v-model="form.orderCode.value"
            label="Mã đơn hàng"
            :error-messages="form.orderCode.errorMessages"
            variant="outlined"
            @update:model-value="form.orderCode.errorMessages = ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            text="Kiểm tra"
            type="submit"
          >
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style></style>