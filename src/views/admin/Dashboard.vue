<template>
  <v-container>
    <v-row>
<<<<<<< HEAD
      <v-col cols="6">
        <v-card
          class="m-card"
          height="350px"
        >
          <v-list v-if="outStockCount">
            <v-list-item
              v-for="item in outStock"
              :key="item.id"
            >
              <template #prepend>
                <v-img
                  min-width="30"
                  min-height="40"
                  class="flex-grow-0"
                  :src="`${url}${item.image}`"
                ></v-img>
              </template>
              <template #title>
                <div class="ms-3">{{ item.name }}</div>
              </template>
              <template #subtitle>
                <div class="ms-3">Số lượng: {{ item.quantity }}</div>
              </template>
            </v-list-item>
          </v-list>

          <v-sheet v-else>Không có dữ liệu</v-sheet>

        </v-card>
      </v-col>
    </v-row>


  </v-container>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useSeoMeta } from "@unhead/vue";
import { useRoute } from "vue-router";
=======
      <v-col cols="6"><v-container style="max-width: 500px">
        <v-text-field
            v-model="newTask"
            label="What are you working on?"
            variant="solo"
            @keydown.enter="create"
        >
          <template v-slot:append-inner>
            <v-fade-transition>
              <v-btn
                  v-show="newTask"
                  icon="mdi-plus-circle"
                  variant="text"
                  @click="create"
              ></v-btn>
            </v-fade-transition>
          </template>
        </v-text-field>

        <h2 class="text-h4 text-success ps-4">
          Tasks:&nbsp;
          <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>

        <v-row
            class="my-1"
            align="center"
        >
          <strong class="mx-4 text-info-darken-2">
            Remaining: {{ remainingTasks }}
          </strong>

          <v-divider vertical></v-divider>

          <strong class="mx-4 text-success-darken-2">
            Completed: {{ completedTasks }}
          </strong>

          <v-spacer></v-spacer>

          <v-progress-circular
              v-model="progress"
              class="me-2"
          ></v-progress-circular>
        </v-row>

        <v-divider class="mb-4"></v-divider>

        <v-card v-if="tasks.length > 0">
          <v-slide-y-transition
              class="py-0"
              group
              tag="v-list"
          >
            <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
              <v-divider
                  v-if="i !== 0"
                  :key="`${i}-divider`"
              ></v-divider>

              <v-list-item @click="task.done = !task.done">
                <template v-slot:prepend>
                  <v-checkbox-btn v-model="task.done" color="grey"></v-checkbox-btn>
                </template>

                <v-list-item-title>
                  <span :class="task.done ? 'text-grey' : 'text-primary'">{{ task.text }}</span>
                </v-list-item-title>

                <template v-slot:append>
                  <v-expand-x-transition>
                    <v-icon v-if="task.done" color="success">
                      mdi-check
                    </v-icon>
                  </v-expand-x-transition>
                </template>
              </v-list-item>
            </template>
          </v-slide-y-transition>
        </v-card>
      </v-container></v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import {useSeoMeta} from "@unhead/vue";
import {useRoute} from "vue-router";

import { computed, ref } from 'vue'

const tasks = ref([
  {
    done: false,
    text: 'Foobar',
  },
  {
    done: false,
    text: 'Fizzbuzz',
  },
])
const newTask = ref(null)

const completedTasks = computed(() => {
  return tasks.value.filter(task => task.done).length
})
const progress = computed(() => {
  return completedTasks.value / tasks.value.length * 100
})
const remainingTasks = computed(() => {
  return tasks.value.length - completedTasks.value
})

function create () {
  tasks.value.push({
    done: false,
    text: newTask.value,
  })
  newTask.value = null
}

>>>>>>> 67bf556c9ce76cebabefc4f0ca7c3d0de2c744f4
const route = useRoute();
const url = import.meta.env.VITE_PUBLIC_URL;

route.meta.title = "Dashboard";
useSeoMeta({
  title: route.meta.title,
});

const outStock = ref([]);
const outStockCount = ref(0);

const fetchOutStock = async () => {
  try {
    const res = await axios.get("out-stock");
    if (res.status === 200) {
      outStock.value = res.data.data.products;
      outStockCount.value = res.data.data.count;
    }
  }
  catch (e) {
    console.log(e);
  }
};
onMounted(() => {
  fetchOutStock();
});
</script>
<style scoped></style>;