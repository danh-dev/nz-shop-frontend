<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "../../../axiosComfig";
import GlobalLoader from "../../../components/globals/GlobalLoader.vue";

const route = useRoute();
const router = useRouter();

const url = import.meta.env.VITE_PUBLIC_URL;

const loading = ref(false);
const status = ref(false);

const categories = ref([]);

const mainForm = ref({
  name: {
    label: "Tên danh mục",
    value: "",
    errorMessages: "",
  },
  image: {
    label: "Hình ảnh",
    value: [],
    icon: "mdi-image-outline",
    errorMessages: "",
  },
  description: {
    label: "Mô tả",
    value: "",
    errorMessages: "",
  },
  parentCategoryId: {
    label: "Danh mục cha",
    value: null,
  },
  icon: {
    label: "Icon",
    value: [],
    icon: "mdi-image-outline",
    errorMessages: "",
  },
  isBrand: {
    label: "Thương hiệu",
    value: false,
  },
});

const imagePath = ref("");
const iconPath = ref("");

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
  formData.append("_method", "PUT");

  try {
    loading.value = true;
    const res = await axios.post(`categories/update/${route.params.id}`, formData);
    loading.value = false;
    if (res.status === 200) {
      status.value = true;
    }
  }
  catch ({ response: { status, data } }) {
    loading.value = false;
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
  try {
    const res = await axios.get("categories");
    if (res.status === 200) {
      categories.value = res.data.data;

      const category = categories.value.find(item => item.id === +route.params.id);
      mainForm.value.name.value = category.name;
      mainForm.value.description.value = category.description;
      mainForm.value.parentCategoryId.value = category.parentCategoryId;
      mainForm.value.isBrand.value = !!category.isBrand;
      imagePath.value = category.image;
      iconPath.value = category.icon;
    }
  }
  catch (e) {
    console.log(e);
  }
});

const handleInput = (input) => {
  input.errorMessages = "";
  status.value = false;
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
          <h1>Sửa danh mục</h1>
        </v-col>
      </v-row>

      <v-row v-if="status">
        <v-col cols="12">
          <v-alert
            density="compact"
            text="Sửa danh mục thành công!"
            type="success"
            variant="tonal"
            closable
            prominent
            v-model="status"
          >
            <template #append>
              <v-btn
                color="success"
                variant="outlined"
                :to="{ name: 'admin-category' }"
              >Xem danh sách
              </v-btn>
            </template>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="mainForm.name.value"
            :label="mainForm.name.label"
            :error-messages="mainForm.name.errorMessages"
            variant="outlined"
            @update:model-value="() => handleInput(mainForm.name)"
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
            :label="mainForm.image.label"
            :error-messages="mainForm.image.errorMessages"
            prepend-icon=""
            :prepend-inner-icon="mainForm.image.icon"
            variant="outlined"
            show-size
            @update:model-value="() => handleInput(mainForm.image)"
          >
          </v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="mainForm.description.value"
            :label="mainForm.description.label"
            :error-messages="mainForm.description.errorMessages"
            variant="outlined"
            @update:model-value="() => handleInput(mainForm.description)"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="mainForm.parentCategoryId.value"
            :items="categories"
            item-title="name"
            item-value="id"
            :label="mainForm.parentCategoryId.label"
            variant="outlined"
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
            :label="mainForm.icon.label"
            :error-messages="mainForm.icon.errorMessages"
            prepend-icon=""
            :prepend-inner-icon="mainForm.icon.icon"
            variant="outlined"
            show-size
            @update:model-value="() => handleInput(mainForm.icon)"
          >
            <template
              v-if="mainForm.icon.value.length === 0"
              #append-inner
            ><v-icon><v-img :src="iconPath ? `${url}${iconPath}` : ''"></v-img></v-icon></template>
          </v-file-input>
          <v-checkbox
            v-else
            v-model="mainForm.isBrand.value"
            :label="mainForm.isBrand.label"
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
  <GlobalLoader :loading="loading"></GlobalLoader>
</template>

<style></style>
