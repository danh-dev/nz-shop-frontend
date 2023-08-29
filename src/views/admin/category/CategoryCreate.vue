<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useLoadingStore from "@/stores/loading";

import ContentEditor from "@/components/globals/ContentEditor.vue";
import SuccessAlert from "@/components/globals/SuccessAlert.vue";

const url = "http://127.0.0.1:8000/";

const loadingStore = useLoadingStore();
const status = ref(false);

const categories = ref([]);

const mainForm = ref({
  name: {
    value: "",
    errorMessages: "",
  },
  image: {
    value: [],
    errorMessages: "",
  },
  description: {
    value: "",
    errorMessages: "",
  },
  parentCategoryId: {
    value: null,
  },
  icon: {
    value: [],
    errorMessages: "",
  },
  isBrand: {
    value: false,
  },
});

const submit = async () => {
  const formData = new FormData();

  formData.append("name", mainForm.value.name.value);
  if (mainForm.value.image.value.length > 0) {
    formData.append("image", mainForm.value.image.value[0]);
  }
  formData.append("description", mainForm.value.description.value);
  if (mainForm.value.parentCategoryId.value) {
    formData.append("parentCategoryId", mainForm.value.parentCategoryId.value);
  }
  else if (mainForm.value.icon.value.length > 0) {
    formData.append("icon", mainForm.value.icon.value[0]);
  }
  if (mainForm.value.isBrand.value) {
    formData.append("isBrand", mainForm.value.isBrand.value);
  }

  try {
    loadingStore.loading = true;
    const res = await axios.post(`${url}api/categories`, formData);
    loadingStore.loading = false;
    if (res.status === 201) {
      status.value = true;
      mainForm.value.name.value = "";
      mainForm.value.image.value = [];
      mainForm.value.description.value = "";
      mainForm.value.parentCategoryId.value = null;
      mainForm.value.icon.value = [];
      mainForm.value.isBrand.value = false;
    }
  }
  catch ({ response: { status, data } }) {
    loadingStore.loading = false;
    if (status === 400) {
      for (const [key, value] of Object.entries(data.errors)) {
        mainForm.value[key].errorMessages = value;
      }
    }
    else {
      console.log(data);
    }
  }
};

onMounted(async () => {
  const res = await axios.get(`${url}api/categories`);
  if (res.status === 200) {
    categories.value = res.data.data;
  }
});

const handleInput = input => {
  input.errorMessages = "";
  status.value = false;
};

const editContent = event => {
  mainForm.value.description.value = event;
};
</script>

<template>
  <v-container class="m-card my-3">
    <v-form
      validate-on="submit lazy"
      @submit.prevent="submit"
    >
      <v-row>
        <v-col cols="12">
          <h1>Danh mục mới</h1>
        </v-col>
      </v-row>

      <v-row v-if="status">
        <v-col cols="12">
          <SuccessAlert
            :show="status"
            title="Thêm danh mục thành công!"
            :to="{
              name: 'admin-category'
            }"
          >
          </SuccessAlert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="mainForm.name.value"
            label="Tên danh mục"
            :error-messages="mainForm.name.errorMessages"
            variant="outlined"
            @update:model-value="() => handleInput(mainForm.name)"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="mainForm.image.value"
            label="Hình ảnh"
            :error-messages="mainForm.image.errorMessages"
            prepend-icon=""
            prepend-inner-icon="mdi-image-outline"
            variant="outlined"
            show-size
            @update:model-value="() => handleInput(mainForm.image)"
          >
          </v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ContentEditor
            :editorContent="mainForm.description.value"
            @editContent="editContent"
          ></ContentEditor>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="mainForm.parentCategoryId.value"
            :items="categories"
            item-title="name"
            item-value="id"
            label="Danh mục cha"
            prepend-inner-icon="mdi-list-box-outline"
            hide-no-data
            hint="Không bắt buộc"
            persistent-hint
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-file-input
            v-if="!mainForm.parentCategoryId.value"
            v-model="mainForm.icon.value"
            label="Icon"
            :error-messages="mainForm.icon.errorMessages"
            prepend-icon=""
            prepend-inner-icon="mdi-image-outline"
            variant="outlined"
            show-size
            @update:model-value="() => handleInput(mainForm.icon)"
          >
          </v-file-input>
          <v-checkbox
            v-else
            v-model="mainForm.isBrand.value"
            label="Thương hiệu"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn
            type="submit"
            class="mt-2"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>

<style></style>
