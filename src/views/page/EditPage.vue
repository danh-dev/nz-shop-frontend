<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "../../axiosComfig";
import { useRouter, useRoute } from "vue-router";
import ContentEditor from "../../components/globals/ContentEditor.vue";

// Post API
const url = import.meta.env.VITE_PUBLIC_URL;

const router = useRouter();
const route = useRoute();

const pages = ref([]);

const page = ref({
  name: "",
  author: "",
  content: "",
});

const fetchPage = async () => {
  try {
    const response = await axios.get(`pages`);
    if (response.data.status === 200) {
      pages.value = response.data.data;
      page.value = pages.value.find(item => {
        return item.id === +route.params.id;
      });
    } else if (response.data.status === 404) {
      pages.value = [];
      console.log("Something error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function updatePage() {
  const formData = new FormData();
  Object.entries(page.value).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, value[0]);
    }
    else {
      formData.append(key, value);
    }
  });

  formData.append("_method", "PUT");

  try {
    const response = await axios.post(`pages/edit/${page.value.id}`, formData);
    if (response.data.status === 200) {
      router.push("/admincp/page");
    }
  } catch (e) {
    console.log("Error", e);
  }
};

function editContent(event) {
  page.value.content = event;
};

onBeforeMount(fetchPage);
</script>

<style></style>

<template>
  <v-form @submit.prevent="updatePage">
    <v-container class="m-card my-3">
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <h2>EditPage</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            variant="underlined"
            v-model="page.name"
            :rules="[v => !!v || 'Vui lòng không để trống.']"
            label="Tên trang:"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            variant="underlined"
            v-model="page.author"
            :rules="[v => !!v || 'Vui lòng không để trống.']"
            label="Tác giả:"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
        <v-label class="text-caption">Nội dung trang:</v-label>
          <ContentEditor
            :rules="[v => !!v || 'Vui lòng không để trống.']"
            :editorContent="page.content"
            @editContent="editContent"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-btn
            class="me-2"
            type="submit"
          >Hoàn tất</v-btn>
          <v-btn
            :to="`/admincp/page`"
            href=""
            type="reset"
          >Hủy bỏ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
