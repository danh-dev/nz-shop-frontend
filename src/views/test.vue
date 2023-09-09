<template>
  <v-card elevation="3" class="ma-5">
    <v-btn @click="addCreate()">
      Thêm biến thể
    </v-btn>
    <v-list>
      <v-list-item v-for="(item,index) in listCreate" :key="index">
        <v-row>
          <v-col cols="3">
            <v-text-field v-model="item.name"></v-text-field>
          </v-col>
          <v-col cols="9">
            <v-combobox
                chips
                multiple
                v-model="item.giatri"
                label="List"
            ></v-combobox>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    Giá trị: {{ listCreate }}<br>
    In:{{ printNhanh }}
    Giá trị: {{ bienthe }}<br>

  </v-card>
  <v-card elevation="3" class="ma-5">
    <v-btn @click="addBienthe()">
      Magic Button
    </v-btn>
    <v-btn @click="addOneMore()">One</v-btn>
    <v-list>
      <v-list-item v-for="(item,index) in bienthe" :key="index">
        <v-combobox
            chips
            multiple
            v-model="item.name"
            label="List"
        ></v-combobox>
        {{ index }}
      </v-list-item>
    </v-list>
  </v-card>
  <v-btn @click="vnpay">VNPAY</v-btn>
  <a :href="url">zxczxc</a>
</template>

<script setup>
import {computed, onMounted, ref, watchEffect} from "vue";
import axios from "@/axiosComfig";

const url= ref();
const getLink = async () => {
  try {
    const res = await axios.get('vnpay',{
    });
    url.value = res.data.data
  } catch (error) {
    console.error(error);
  }
};

const run = async () => {
  try {
    const res = await axios.get(url.value);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

onMounted(()=>{
  getLink();
})

const listCreate = ref([]);
const bienthe = ref([]);
const addCreate = () => {
  listCreate.value.push({
    name: "",
    giatri: []
  });
};

function generateCombinations(array) {
  let result = [];

  const firstProperty = array[0].name;
  const firstValues = array[0].giatri;

  if (array.length === 1) {
    for (let value of firstValues) {
      result.push({ name: [`${firstProperty}:${value}`], gia: "" });
    }
  } else {
    const remainingArray = array.slice(1);
    const combinations = generateCombinations(remainingArray);

    for (let value of firstValues) {
      for (let combination of combinations) {
        result.push({ name: [`${firstProperty}:${value}`, ...combination.name], gia: "" });
      }
    }
  }

  return result;
}


const printNhanh = computed(() => {
  if (listCreate.value[0]) {
    return listCreate.value[0].giatri.length;
  }
});


const addOneMore = () => {
  bienthe.value.push(
      {name: [], gia: ""});
};
const addBienthe = () => {
  bienthe.value = generateCombinations(listCreate.value);
};
watchEffect(() => {
  console.log(bienthe.value);
});
</script>