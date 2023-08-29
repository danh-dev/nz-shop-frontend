<template>
  <div v-if="dataRes">
    {{dataRes}}
  </div>
  <div v-else>
    No
  </div>
</template>
<script setup>

import {onMounted, ref} from "vue";
import axios from "../axiosComfig";
import {useRoute} from "vue-router";

const route = useRoute();
const isLoading = ref();
const dataRes = ref();

async function verifyApi() {
  isLoading.value = true;
  try {
    const res = await axios.post("verify-email", {
      key: route.query.key,
    });
    dataRes.value = res.data;
    console.log(dataRes.value)
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  verifyApi();
});

</script>

<style scoped>

</style>