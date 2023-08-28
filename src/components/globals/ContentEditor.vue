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

<!-- <template>
  <div>
    <ckeditor :editor="editor" v-model="editorData" />
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content goes here</p>',
    };
  },
  mounted() {
    this.editor
      .create(document.querySelector('#editor'), {
        extraPlugins: ['imageUpload'],
        imageUpload: {
          uploadUrl: '/upload-image',
        },
      })
      .then(/* Handle editor creation */)
      .catch(/* Handle error */);
  },
};
</script> -->