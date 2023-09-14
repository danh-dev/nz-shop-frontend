<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "../../axiosComfig";
import { useRoute } from "vue-router";
import getSlugByName from "../../utils/getSlugByName.js";
import { siteData } from "@/stores/globals";
const siteStore = siteData();

const more = ref(false);
// Post API
const url = import.meta.env.VITE_PUBLIC_URL;
const route = useRoute();
const posts = ref([]);

const post = ref({
  title: "",
  author: "",
  image: "",
  content: "",
  created_at: ""
});

const comment = ref("");
const comments = ref([]);
const validate = ref([
  comment => {
    if (comment.length > 2) { return true; }
    return "Bình luận tối thiểu 2 ký tự.";
  },
]);
const createPostComment = async () => {
  try {
    await axios.post("post-comments", {
      user_id: siteStore.userInfo.user_id,
      post_id: post.value.id,
      comment: comment.value,
    });
    await fetchCommentsPost(post.value.id);
    siteStore.hasRes(res);
  }
  catch (e) {
    siteStore.hasRes({ data: { status: "error", message: "Xảy ra lỗi. Bình luận thất bại." } });
    console.log(e);
  }
};

const fetchPost = async () => {
  try {
    siteStore.isLoading = true;
    const response = await axios.get("posts");
    if (response.data.status === 200) {
      posts.value = response.data.data;
      post.value = posts.value.find((post) => {
        return getSlugByName(post.title) === route.params.title;
      });
      siteStore.isLoading = false;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const fetchCommentsPost = async id => {
  try {
    const res = await axios.get(`posts/${id}/comments`);
    if (res.status === 200) {
      comments.value = res.data.data.reverse();
    }
  }
  catch (e) {
    console.log(e);
  }
};

watch(post, () => {
  fetchCommentsPost(post.value.id);
});

onMounted(async () => {
  fetchPost();
});

</script>

<template>
  <v-sheet>
    <v-row>
      <v-col :cols="12">
        <div>
          <v-img
            :src="`${url}${post.image}`"
            class="rounded-xl mb-2"
          />
        </div>
        <v-sheet
          class="border rounded-xl px-4 text-justify mx-10"
          style="position: relative; top: -80px;"
        >
          <v-btn
            color="danger"
            variant="flat"
            class="my-2 text-h6 text-white rounded-xl"
          >Tin tức</v-btn>
          <h2>{{ post.title }}</h2>

          <v-sheet class="d-flex align-center my-3">
            <img
              src="/assets/unknow.png"
              class="rounded-circle"
              style="width: 40px; height: 40px;"
            >
            <div class="mx-2">
              <h5 class="text-uppercase text-danger">{{ post.author }}</h5>
              <p class="text-caption">{{ post.created_at.slice(0, 10) }}</p>
            </div>
          </v-sheet>

          <v-sheet>
            <p
              class="py-2"
              :style="!more && [{ height: '40rem', overflow: 'hidden' }]"
              v-html="post.content"
            ></p>
            <div
              class="d-flex align-center mt-4"
              v-if="!more"
            >
              <v-btn
                @click="more = true"
                color="red-accent-4"
                variant="elevated"
                class="text-white mx-auto mb-5"
                append-icon="mdi-chevron-down"
              >
                Xem thêm
              </v-btn>
            </div>
            <div
              class="d-flex align-center mt-4"
              v-if="more"
            >
              <v-btn
                @click="more = false"
                color="red-accent-4"
                variant="elevated"
                class="text-white mx-auto mb-5"
                append-icon="mdi-chevron-down"
              >
                Thu gọn nội dung
              </v-btn>
            </div>
          </v-sheet>

          <!-- Comments -->
          <v-sheet
            rounded="lg"
            class="my-3 order-last flex-md-fill"
          >
            <h4 class="pa-4">Bình luận bài viết</h4>
            <v-container class="d-flex flex-column px-3">
              <div>
                <v-textarea
                  v-model="comment"
                  variant="filled"
                  auto-grow
                  background="white"
                  :rules="validate"
                  placeholder="Bình luận:"
                ></v-textarea>
                <v-btn
                  prepend-icon="mdi-send-circle"
                  color="red-accent-4"
                  class="text-white my-2"
                  @click="createPostComment"
                >Gửi</v-btn>
              </div>
              <!-- Display comments -->
              <v-sheet
                class="mt-4 mb-2"
                v-for="item in comments"
                :key="item.id"
              >
                <v-sheet class="pa-4 text-body-2 rounded-lg border-left bg-grey-lighten-4">
                  <div class="text-uppercase d-flex align-center justify-space-between pb-2">
                    <p class="font-weight-bold">
                      <b class="text-h6 rounded-b-pill bg-amber pa-2">{{ item.full_name.slice(0, 1) }} </b> {{
                        item.full_name }}
                    </p>
                    <p class="text-caption">{{ item.created_at.slice(0, 19) }}</p>
                  </div>
                  <div class="more">
                    <p><b>Bình luận: </b>{{ item.comment }}</p>
                  </div>
                </v-sheet>
              </v-sheet>
            </v-container>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>
a {
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: red-accent-4;
}
</style>