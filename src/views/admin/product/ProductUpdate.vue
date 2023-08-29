<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "../../../axiosComfig";
import { mapKeys, camelCase } from "lodash";

import ContentEditor from "@/components/globals/ContentEditor.vue";

const route = useRoute();
const router = useRouter();

const url = import.meta.env.VITE_PUBLIC_URL;
const loading = ref(false);

const categories = ref([]);
const products = ref([]);
const imagePath = ref("");
const galleryPath = ref("");

const mainForm = ref({
  category: {
    value: null,
  },
  name: {
    value: "",
    errorMessages: "",
  },
  image: {
    value: [],
    errorMessages: "",
  },
  gallery: {
    value: [],
    errorMessages: "",
  },
  description: {
    value: "",
    errorMessages: "",
  },
});

const submit = async () => {
  const formData = new FormData();

  if (mainForm.value.category.value) {
    formData.append("categoryId", mainForm.value.category.value);
  }
  formData.append("name", mainForm.value.name.value);
  if (mainForm.value.image.value.length > 0) {
    formData.append("image", mainForm.value.image.value[0]);
  }
  if (mainForm.value.gallery.value.length > 0) {
    for (const item of mainForm.value.gallery.value) {
      formData.append("gallery[]", item);
    }
  }
  formData.append("description", mainForm.value.description.value);
  formData.append("_method", "put");

  try {
    loading.value = true;
    const res = await axios.post(`products/update/${route.params.id}`, formData);
    loading.value = false;
    if (res.status === 200) {
      // status.value = true;
    }
  }
  catch ({ response: { status, data } }) {
    loading.value = false;
    if (status === 400) {
      for (const [key, value] of Object.entries(data.errors)) {
        mainForm.value[camelCase(key)].errorMessages = value;
      }
    }
    else {
      // push
      console.log(data);
    }
  }
};

const fetchData = async () => {
  loading.value = true;
  // status.value = null;

  try {
    const res = await axios.get(`categories`);
    if (res.status === 200) {
      categories.value = res.data.data.map(category => mapKeys(category, (value, key) => camelCase(key)));
    }
  }
  catch (e) {
    console.log(e);
  }

  try {
    const res = await axios.get(`products`);
    if (res.status === 200) {
      products.value = res.data.data.map(product => mapKeys(product, (value, key) => camelCase(key)));
      const product = products.value.find(item => item.id === +route.params.id);
      mainForm.value.category.value = product.categoryId;
      mainForm.value.name.value = product.name;
      mainForm.value.description.value = product.description;
      imagePath.value = product.image;
      galleryPath.value = product.gallery;
    }
    // selected.value = categories.value[0].id;

    // status.value = 0;
    loading.value = false;
  }
  catch (e) {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<template>
  <v-container class="m-card my-3">
    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12">
          <h2>Cập nhật sản phẩm</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            placeholder="Nhập để tìm kiếm"
            v-model="mainForm.category.value"
            :items="categories"
            item-title="name"
            item-value="id"
            label="Danh mục"
            variant="outlined"
            prepend-inner-icon="mdi-list-box-outline"
            hide-no-data
            hint="Không bắt buộc"
            persistent-hint
            clearable
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="mainForm.name.value"
            label="Tên sản phẩm"
            :error-messages="mainForm.name.errorMessages"
            variant="outlined"
            @update:model-value="mainForm.name.errorMessages = ''"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          class="d-flex"
        >
          <v-label>Ảnh hiện tại</v-label>
          <v-img
            :src="imagePath ? `${url}${imagePath}` : ''"
            max-width="100"
          ></v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="mainForm.image.value"
            label="Hình ảnh chính"
            :error-messages="mainForm.image.errorMessages"
            prepend-icon=""
            prepend-inner-icon="mdi-image-outline"
            variant="outlined"
            show-size
            @update:model-value="mainForm.image.errorMessages = ''"
          >
          </v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          class="d-flex"
        >
          <v-label>Ảnh trưng bày</v-label>
          <template v-if="galleryPath">
            <v-img
              v-for="file in galleryPath.split('|')"
              :key="file"
              :src="`${url}${file}`"
              max-width="100"
            ></v-img>
          </template>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="mainForm.gallery.value"
            label="Hình ảnh trưng bày"
            :error-messages="mainForm.gallery.errorMessages"
            prepend-icon=""
            prepend-inner-icon="mdi-image-multiple-outline"
            variant="outlined"
            show-size
            chips
            multiple
            counter
            @update:model-value="mainForm.gallery.errorMessages = ''"
          >
            <template v-slot:selection="{ fileNames }">
              <template
                v-for="(fileName, index) in fileNames"
                :key="fileName"
              >
                <v-chip
                  v-if="index < 3"
                  color="primary"
                  label
                  size="small"
                  class="me-2"
                >
                  {{ fileName }}
                </v-chip>

                <span
                  v-else-if="index === 3"
                  class="text-overline text-grey-darken-3 mx-2"
                >
                  +{{ mainForm.gallery.value.length - 3 }} File(s)
                </span>
              </template>
            </template>
          </v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="mainForm.description.value"
            label="Mô tả"
            :error-messages="mainForm.description.errorMessages"
            variant="outlined"
            @update:model-value="mainForm.description.errorMessages = ''"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label>Mô tả</v-label>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ContentEditor></ContentEditor>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn type="submit">Xác nhận</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style></style>