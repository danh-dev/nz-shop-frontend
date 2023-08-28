<script setup>
import { ref } from "vue";
import { component as CKEditor } from "@ckeditor/ckeditor5-vue";

import Editor from "ckeditor5-custom-build/build/ckeditor";

defineProps({
  editorContent: String
});

defineEmits(["editContent"]);

const url = "http://127.0.0.1:8000/";

const onReady = editor => {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement()
  );
};

const editorConfig = ref({
  simpleUpload: {
    // The URL that the images are uploaded to.
    uploadUrl: `${url}api/description`,

    // Enable the XMLHttpRequest.withCredentials property.
    // withCredentials: true,

    // Headers sent along with the XMLHttpRequest to the upload server.
    headers: {
      "X-CSRF-TOKEN": "CSRF-Token",
      Authorization: "Bearer <JSON Web Token>"
    }
  },
  image: {
    upload: {
      types: ["jpeg", "png", "jpg", "gif", "webp", "svg+xml", "bmp"],
    }
  }
});
</script>

<style></style>

<template>
  <v-sheet>
    <CKEditor
      @ready="onReady"
      :editor="Editor"
      :model-value="editorContent"
      @update:model-value="$emit('editContent', $event)"
      :config="editorConfig"
    />
  </v-sheet>
</template>