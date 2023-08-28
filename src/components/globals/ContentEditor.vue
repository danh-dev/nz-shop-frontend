<script setup>
import { ref } from "vue";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { component as CKEditor } from "@ckeditor/ckeditor5-vue";
defineProps({
  editorContent: String
});
defineEmits(["editContent"]);
const editor = ref(DecoupledEditor);
function onReady(editor) {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement()
  );
}
const editorConfig = ref({
  
 });
</script>

<style></style>

<template>
  <v-sheet>
    <CKEditor @ready="onReady" :editor="editor" :model-value="editorContent"
      @update:model-value="$emit('editContent', $event)" :config="editorConfig" />
  </v-sheet>
  
</template>