<script setup>
import { ref } from "vue";
import { component as CKEditor } from "@ckeditor/ckeditor5-vue";

import Editor from "ckeditor5-custom-build/build/ckeditor";


defineProps({
  editorContent: String
});

defineEmits(["editContent"]);


const onReady = editor => {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement()
  );
};

const editorConfig = ref({});
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