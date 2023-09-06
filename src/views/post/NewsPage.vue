<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "../../axiosComfig";
import { useRoute } from "vue-router";
import getSlugByName from "../../utils/getSlugByName.js";

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

const commentsPost = ref([]);
const commentPost = ref("");
const createPostComment = async () => {
  try {
    await axios.post("post-comments", {
      // user_id: userData.id,
      user_id: 2,
      comment: commentPost.value,
      post_id: post.value.id,
    });
  }
  catch (e) {
    console.log(e);
  }
};

const fetchPost = async () => {
  try {
    const response = await axios.get("posts");
    if (response.data.status === 200) {
      posts.value = response.data.data;
      post.value = posts.value.find((post) => {
        return getSlugByName(post.title) === route.params.title;
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};


const fetchCommentsPost = async id => {
  try {
    const res = await axios.get(`posts/${id}/comments`);
    if (res.status === 200) {
      commentsPost.value = res.data.data.reverse();
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
              v-html="post.content"
            ></p>
          </v-sheet>

          <!-- Comments -->
          <v-sheet
            elevation="3"
            rounded="lg"
            class="my-3 order-last flex-md-fill"
          >
            <h4 class="px-4 py-2">Bình luận bài viết:</h4>
            <v-container class="d-flex flex-column px-3">
  						<div>
  							<v-textarea
  								v-model="commentPost"
  								variant="filled"
  								auto-grow
  								background="white"
  								placeholder="Bình luận:"
  							></v-textarea>
  							<v-btn
  								prepend-icon="mdi-send-circle"
  								color="red-accent-4"
  								class="text-white"
  								@click="createPostComment"
  							>Gửi</v-btn>
  						</div>

  						<v-sheet
  							class="my-2"
  							v-for="item in commentsPost"
  							:key="item.id"
  						>
  							<v-sheet class="d-flex justify-space-between py-2">
  								<v-sheet class="d-flex align-center">
  									<p class="bg-secondary rounded pa-2">{{ item.full_name.slice(0, 1) }}</p>
  									<h5 class="px-2">{{ item.full_name }}</h5>
  								</v-sheet>
  								<p class="text-caption">{{ item.created_at.slice(0, 19) }}</p>
  							</v-sheet>

  							<div
  								class="pa-2 text-caption d-flex justify-center flex-column rounded more"
  								style="background-color: rgb(247, 243, 243); margin-left: 3%;"
  							>
  								<p><b>Bình luận: </b>{{ item.comment }}</p>
  							</div>
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