<template>
  <v-row>
    <v-col>
      <v-card class="m-card pa-2">
        <h2>Danh sách từ khoá cấm comment:</h2>
        <v-combobox
            variant="outlined"
            chips
            multiple
            v-model="formBadWords"
            label="Từ cấm"
            autocomplete="off"
            persistent-clear
            closable-chips
            hide-details
            class="ma-2"
        >
        </v-combobox>
        <v-card-actions>
          <v-btn variant="flat" color="red-darken-2" @click="updateBadWords">Cập nhật</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {siteData} from "@/stores/globals";
import axios from "@/axiosComfig";

const siteStore = siteData();
const formBadWords = ref();
const fetchBadWords = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.get("fetchBadWords");
    formBadWords.value = res.data.bad_words? res.data.bad_words.split(","): [];
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
};
const updateBadWords = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put("updateSetting", {
      bad_words: formBadWords.value.join(","),
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    await fetchBadWords();
    siteStore.isLoading = false;
  }
};
onMounted(() => {
  fetchBadWords();
});
</script>

<style lang="scss" scoped>

</style>