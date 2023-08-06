<script setup>
import { ref, reactive } from "vue";

// Create ref variables using ref() for simple data types
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const formTitle = ref("");

// Create reactive object using reactive() for complex data types
const editedItem = reactive({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});

// Create an array of desserts using reactive() to make it reactive
const desserts = reactive([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
]);

// Create an array of table headers
const headers = [
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories" },
  { title: "Fat (g)", key: "fat" },
  { title: "Carbs (g)", key: "carbs" },
  { title: "Protein (g)", key: "protein" },
  { title: "Actions", key: "actions", sortable: false },
];

// Function to initialize desserts array with initial data
const initialize = () => {
  desserts.push(
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    }
  );
};

// Function to edit an item
const editItem = (item) => {
  editedIndex.value = desserts.indexOf(item);
  editedItem.name = item.name;
  editedItem.calories = item.calories;
  editedItem.fat = item.fat;
  editedItem.carbs = item.carbs;
  editedItem.protein = item.protein;
  dialog.value = true;
};

// Function to delete an item
const deleteItem = (item) => {
  editedIndex.value = desserts.indexOf(item);
  editedItem.name = item.name;
  editedItem.calories = item.calories;
  editedItem.fat = item.fat;
  editedItem.carbs = item.carbs;
  editedItem.protein = item.protein;
  dialogDelete.value = true;
};

// Function to confirm item deletion
const deleteItemConfirm = () => {
  desserts.splice(editedIndex.value, 1);
  closeDelete();
};

// Function to close the dialog
const close = () => {
  dialog.value = false;
  resetEditedItem();
};

// Function to close the delete dialog
const closeDelete = () => {
  dialogDelete.value = false;
  resetEditedItem();
};

// Function to reset editedItem to its default values
const resetEditedItem = () => {
  editedItem.name = "";
  editedItem.calories = 0;
  editedItem.fat = 0;
  editedItem.carbs = 0;
  editedItem.protein = 0;
  editedIndex.value = -1;
};

// Function to save the edited item
const save = () => {
  if (editedIndex.value > -1) {
    // If the item already exists in the desserts array, update it
    Object.assign(desserts[editedIndex.value], editedItem);
  } else {
    // If the item is new, add it to the desserts array
    desserts.push({ ...editedItem });
  }
  close();
};
</script>


<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item.raw)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>