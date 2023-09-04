<script setup>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

defineEmits(["crop", "getUploadedImage", "changeCropper"]);

defineProps({
  aspectRatio: Number,
  dialog: Boolean,
  imageUrl: String,
  file: Array,
});

</script>

<template>
  <v-dialog
    :model-value="dialog"
    persistent
  >
    <v-card
      width="500"
      class="ma-auto"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-file-input
              color="red-accent-4"
              density="compact"
              :model-value="file"
              label="Hình ảnh chính"
              prepend-icon=""
              prepend-inner-icon="mdi-image-outline"
              variant="outlined"
              show-size
              id="image"
              @update:model-value="$emit('getUploadedImage', $event)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <Cropper
              v-if="file.length !== 0"
              class="cropper"
              :src="imageUrl"
              :stencil-props="{
                aspectRatio: 3 / 3,
              }"
              @change="$emit('changeCropper', $event)"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
          color="red-accent-4"
          variant="tonal"
          @click="$emit('crop')"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style>
.cropper {
  background: #DDD;
}
</style>

