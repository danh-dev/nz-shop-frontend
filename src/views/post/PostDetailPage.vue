<script setup>
import { ref } from "vue";
const articles = ref([
  {
    id: 1,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg",
    photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg",
    title: "Đã có điểm thi đại học, dưới 10 triệu nên xin cha mẹ mua smartphone vừa hợp túi tiền vừa xịn?",
    author: "John",
    time: "04/08/2023",

  },
  {
    id: 2,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
    photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
    title: "Top smartphone tầm trung có màn hình lớn xem phim tốt nhất hiện nay.",
    author: "John",
    time: " 03/08/2023",

  },
  {
    id: 3,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg",
    photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg",
    title: "#Thời nghệ 18/5: Tìm hiểu giá iPhone trên Apple Store Online tại VN, HTC trở lại đường đua?",
    author: "John",
    time: " 01/08/2023",

  },
  {
    id: 4,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg",
    photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg",
    title: "Đánh giá chi tiết Xiaomi Redmi Note 12 Pro 5G: Xiaomi khác hay người dùng xưa và nay đã khác?",
    author: "John",
    time: "31/07/2023",

  },
  {
    id: 5,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/Xiaomi-13-Lite-cover.jpeg",
    photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/Xiaomi-13-Lite-cover.jpeg",
    title: "4 chiếc smartphone 5G cho trải nghiệm tuyệt vời giá dưới 10 triệu đáng mua nhất tháng 8.",
    author: "John",
    time: "31/07/2023",

  },

]);

</script>

<template>
  <v-sheet>
    <v-row class="container-fluid">
      <v-col cols="12" lg="3" md="3">
        <NewsSideBar />
      </v-col>

      <v-col :cols="12" lg="9" md="9">
        <div>
          <v-img :src="article.photo" class="rounded-lg mb-2" />
        </div>
        <v-sheet class="border rounded-lg px-4 text-justify mx-3" style="position: relative; top: -100px;">
          <v-btn color="danger" variant="flat" class="my-2 text-h6 text-white rounded-xl">Tin tức</v-btn>
          <h2>{{ article.title }}</h2>

          <div class="d-flex align-center my-3">
            <img src="/assets/unknow.png" class="rounded-circle" style="width: 40px; height: 40px;">
            <div class="mx-2">
              <h5 class="text-danger">SFORUM</h5>
              <p class="text-caption">{{ article.time }}</p>
            </div>
          </div>

          <div>
            <p class="py-2">{{ article.description }}</p>
          </div>

          <v-sheet>
            <h1 class="py-4"></h1>
            <div>
              <p></p>
              <div>
                <v-img class="rounded my-2" />
              </div>
            </div>
          </v-sheet>

        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>
a {
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: #c50000;
}

.more {
  white-space: wrap;
  /* overflow: hidden;
	text-overflow: ellipsis; */
}
</style>