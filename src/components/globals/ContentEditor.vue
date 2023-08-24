<script setup>
import { ref, watch } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Essentials } from "@ckeditor/ckeditor5-essentials";
// import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
// import { Link } from "@ckeditor/ckeditor5-link";
// import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { component as CKEditor } from "@ckeditor/ckeditor5-vue";
const editorData = ref(prop.modelValue || "");
const emit = defineEmits(["update:modelValue"]);
const editorConfig = ref({
      ckfinder: {
        uploadUrl: "https://page.com/api/uploadckeditor"
      },
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
          "|",
          "imageUpload",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "undo",
          "redo",
          "alignment",
          "codeBlock",
          "fontBackgroundColor",
          "fontColor",
          "fontFamily",
          "fontSize",
          "highlight",
          "horizontalLine",
          "htmlEmbed",
          "imageInsert",
          "pageBreak",
          "removeFormat",
          "strikethrough",
          "underline",
          "style"
        ]
      },
      language: "cs",
      image: {
        toolbar: [
          "imageTextAlternative",
          "imageStyle:inline",
          "imageStyle:block",
          "imageStyle:side",
          "imageStyle:alignLeft",
          "imageStyle:alignRight",
          "imageStyle:alignCenter",
          "imageStyle:alignBlockLeft",
          "imageStyle:alignBlockRight",
          "linkImage"
        ]
      },
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableCellProperties",
          "tableProperties"
        ]
      },
        fontFamily: {
            options: [
                "default",
                "indieflowerregular",
                "Arial, sans-serif",
                "Verdana, sans-serif",
                "Trebuchet MS",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
            ]
        },
      licenseKey: ""
});

const prop = defineProps({
  modelValue: String,
});

watch(editorData, () => {
  emit("update:modelValue", editorData.value);
});
</script>

<style></style>

<template>
  <v-sheet>
    <CKEditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"></CKEditor>
  </v-sheet>
</template>