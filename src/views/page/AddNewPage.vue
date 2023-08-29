<script setup>
import { ref } from "vue";
import axios from "../../axiosComfig";
import { useRouter } from "vue-router";
import ContentEditor from "../../components/globals/ContentEditor.vue";

const router = useRouter();
const newPage = ref({
  name: "",
  author: "",
  content: "",
});

async function createPage() {
  const formData = new FormData();
  Object.entries(newPage.value).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, value[0]);
    }
    else {
      formData.append(key, value);
    }
  });
  try {
    const response = await axios.post("pages", formData);
    if (response.data.status === 201) {
      router.push("/admincp/page");
    }
  } catch (e) {
    console.log("error", e);
  }
};

function editContent(event) {
  newPage.value.content = event;
};
</script>

<style></style>

<template>
  <v-form @submit.prevent="createPage">
    <v-container class="m-card my-3">
      <v-row>
        <v-col cols="12" md="12">
          <h2>Chi tiết trang mới:</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="newPage.name" :rules="[v => !!v || 'Vui lòng không để trống.']"
            :counter="20" label="Tên trang:">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field variant="underlined" v-model="newPage.author" :rules="[v => !!v || 'Vui lòng không để trống.']"
            :counter="20" label="Tác giả:">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea name="editor" variant="underlined" v-model="newPage.content"
            :rules="[v => !!v || 'Vui lòng không để trống & không vượt quá 10000 ký tự..']" :counter="10000"
            label="Nội dung trang:">
          </v-textarea>
          <ContentEditor :editorContent="newPage.content" @editContent="editContent" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn class="me-2" type="submit" color="info" variant="tonal">Đăng bài</v-btn>
          <v-btn :to="`/admincp/page`" type="reset" color="text-darken-3" variant="tonal">Hủy bỏ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
