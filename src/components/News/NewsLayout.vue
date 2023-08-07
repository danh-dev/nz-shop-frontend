<script setup>
import { ref } from "vue";
import NewsHeader from "../News/NewsHeader.vue";
import NewsSideBar from "../News/NewsSideBar.vue";

const articles = ref([
  {
    id: 1,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg",
    title: "Đã có điểm thi đại học, dưới 10 triệu nên xin cha mẹ mua smartphone vừa hợp túi tiền vừa xịn?",
    link: "/home/news/market",
    time: "04/08/2023"
  },
  {
    id: 2,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
    title: "Top smartphone tầm trung có màn hình lớn xem phim tốt nhất hiện nay.",
    link: "",
    time: " 03/08/2023"
  },
  {
    id: 3,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg",
    title: "#Thời nghệ 18/5: Tìm hiểu giá iPhone trên Apple Store Online tại VN, HTC trở lại đường đua?",
    link: "",
    time: " 01/08/2023"
  },
  {
    id: 4,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg",
    title: "Đánh giá chi tiết Xiaomi Redmi Note 12 Pro 5G: Xiaomi khác hay người dùng xưa và nay đã khác?",
    link: "",
    time: "31/07/2023"
  },
  {
    id: 5,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/Xiaomi-13-Lite-cover.jpeg",
    title: "4 chiếc smartphone 5G cho trải nghiệm tuyệt vời giá dưới 10 triệu đáng mua nhất tháng 8.",
    link: "",
    time: "31/07/2023"
  },
  {
    id: 6,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
    title: "Top smartphone tầm trung có màn hình lớn xem phim tốt nhất hiện nay.",
    link: "",
    time: "28/07/2023"
  },
  {
    id: 7,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Dien-thoai-Android-hay-iPhone-3.jpg",
    title: "Điện thoại Android hay iPhone sẽ dễ chai pin hơn?",
    link: "",
    time: "20/07/2023"
  },
  {
    id: 8,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/samsung-galaxy-tab-s9-ultra-14.jpg",
    title: "Galaxy Tab S9 Ultra: Lý do xứng đáng là một trong những dòng premium tablet hàng đầu trên thị trường",
    link: "",
    time: "20/07/2023"
  },
  {
    id: 9,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/iPhone-15-Pro-nguon-cung.jpeg",
    title: "Những thông tin bạn cần biết về màn hình viền mỏng hơn của dòng iPhone 15 Pro và vấn đề sản xuất",
    link: "",
    time: "18/07/2023"
  },
  {
    id: 10,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Xiaomi-MIX-Fold-3-cover.jpeg",
    title: "Điểm danh loạt smartphone sẽ ra mắt trong tháng 8/2023: Galaxy F34, Redmi 12 5G, Xiaomi MIX Fold 3,...",
    link: "",
    time: "17/07/2023"
  },
  {
    id: 11,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/dien-thoai-nho-10-1.jpg",
    title: "Tưởng như đã hết thời, điện thoại kích thước nhỏ đang quay trở lại mạnh mẽ hơn",
    link: "",
    time: "15/07/2023"
  },
  {
    id: 12,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/OPPO-Reno10-5.jpeg",
    title: "Điểm danh 5 nâng cấp mạnh mẽ của OPPO Reno10 trước thềm ra mắt",
    link: "",
    time: "15/07/2023"
  },
  {
    id: 13,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Samsung-Galaxy-Z-Fold5-30-2.jpg",
    title: "Điểm danh loạt smartphone sẽ ra mắt trong tuần tới: Redmi 12 5G, Realme 11 4G và còn gì nữa?",
    link: "",
    time: "12/07/2023"
  },
  {
    id: 14,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
    title: "5 nâng cấp, cải tiến đáng giá của Galaxy Z Fold5 mới ra mắt",
    link: "",
    time: "10/07/2023"
  },
  {
    id: 15,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/samsung-galaxy-tab-s8-ultra-12-e1690273333984-1.jpg",
    title: "iPad dẫn đầu thị trường hơn một thập niên, cơ hội nào cho Galaxy Tab của Samsung?",
    link: "",
    time: "08/07/2023"
  }


]);

const subArticles = ref([
  {
    id: 1,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/tinh-nang-iOS-16-6-1.jpeg",
    link: "#",
    content: "Bên cạnh các bản beta của iOS 17, Apple hiện cũng đang tung ra các bản thử nghiệm của iOS 16.6 cho các nhà phát triển.",
  },
  {
    id: 2,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/thong-tin-Galaxy-S24-Ultra-cover.jpeg",
    link: "#",
    content: "Chúng ta đã biết gì về bộ ba Galaxy S24, Galaxy S24 Plus và Galaxy S24 Ultra?",
  },
  {
    id: 3,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Sony-Xperia-1V-15.jpg",
    link: "#",
    content: "Sony Xperia 1 V có giá bán ngang ngửa iPhone Pro Max, điều gì khiến thương hiệu Nhật tự tin đến vậy?",
  },
  {
    id: 4,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Xiaomi-MIX-Fold-3-cover.jpeg",
    link: "#",
    content: "Điểm danh loạt smartphone sẽ ra mắt trong tháng 8/2023: Galaxy F34, Redmi 12 5G, Xiaomi MIX Fold 3,...",
  },
]);

const slides = ref([
  {
    id: 1,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg",
    title: "Đã có điểm thi đại học, dưới 10 triệu nên xin cha mẹ mua smartphone vừa hợp túi tiền vừa xịn?",
    description: "Không cần phải Flagship mới sang xịn mịn mà những chiếc smartphone dưới 10 triệu cũng sở hữu những ưu điểm nổi bật không kém từ thiết kế, cấu hình cũng như camera.Có thể nói, trong phân khúc dưới 10 triệu thì người dùng chúng ta sẽ có nhiều sự lựa chọn ứng với nhu cầu sử dụng.",
    link: "/home/news/market",
  },
  {
    id: 2,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/samsung-galaxy-tab-s8-ultra-12-e1690273333984-1.jpg",
    title: "iPad dẫn đầu thị trường hơn một thập niên, cơ hội nào cho Galaxy Tab của Samsung?",
    description: "Theo báo cáo của công ty nghiên cứu thị trường IDC, trong quý 4 năm 2022, Apple đã bán được 61.8 triệu chiếc iPad, chiếm 38.0% thị phần toàn cầu. Trong khi đó, Samsung chỉ bán được 30.3 triệu chiếc Galaxy Tab, chiếm 18,6% thị phần. Đây là một khoảng cách khá lớn và không có dấu hiệu thu hẹp trong những năm qua.",
    link: "",
  },
  {
    id: 3,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/samsung-galaxy-tab-s9-ultra-14.jpg",
    title: "Galaxy Tab S9 Ultra: Lý do xứng đáng là một trong những dòng premium tablet hàng đầu trên thị trường",
    description: "So với thế hệ trước, Galaxy Tab S9 Ultra sở hữu hàng loạt cải tiến và tính năng mới. Chính vì vậy mà trong bài viết dưới đây, hãy cùng Sforum.vn điểm qua những lý do vì sao đây xứng đáng là một trong những dòng premium tablet hàng đầu trên thị trường.",
    link: "#",
  },
  {
    id: 4,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/dien-thoai-nho-10-1.jpg",
    title: "Tưởng như đã hết thời, điện thoại kích thước nhỏ đang quay trở lại mạnh mẽ hơn",
    description: "Những chiếc điện thoại màn hình nhỏ đang dần quay trở lại và chắc chắn sẽ mang tới nhiều điều thú vị hơn cho thị trường công nghệ trong thời gian sắp tới. Chính vì cội nguồn của những chiếc điện thoại màn hình lớn lại là những chiếc điện thoại màn hình cực kỳ bé mang tới nhiều ưu điểm trong di chuyển.",
    link: "#",
  },
  {
    id: 5,
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/iPhone-15-Pro-nguon-cung.jpeg",
    title: "Những thông tin bạn cần biết về màn hình viền mỏng hơn của dòng iPhone 15 Pro và vấn đề sản xuất",
    description: "iPhone 15 Pro và iPhone 15 Pro Max sắp ra mắt của Apple được đồn đại là có viền xung quanh màn hình mỏng hơn so với các model hiện tại, nhưng thay đổi này được cho là đã dẫn đến sự cố sản xuất trước khi thiết bị ra mắt.",
    link: "#",
  },
]);

</script>
<template>
  <v-sheet>
    <v-row>
      <v-col cols="12">
        <NewsHeader />
      </v-col>
    </v-row>

    <v-row class="container-fluid">
      <v-col :cols="12" lg="2" md="2">
        <NewsSideBar />
      </v-col>

      <v-col :cols="12" lg="10" md="10" style="border-left: 1px solid gainsboro; margin-left: -6px;">
        <v-sheet>
          <v-carousel cycle height="24rem" hide-delimiter-background show-arrows="hover">
            <v-carousel-item v-for="slide in slides" :key="slide.id">
              <v-sheet height="100%" class="border rounded">
                <div class="d-flex fill-height justify-center align-center mx-4">
                  <img class="w-50 h-75 rounded" :src="slide.image" alt="" />
                  <div class="px-3 text-justify">
                    <a :href="slide.link" class="text-h5">
                      {{ slide.title }}
                    </a>
                    <p class="py-3" style="font-size: small;">
                      {{ slide.description }}
                    </p>
                  </div>
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col :cols="12" lg="2" md="2" style="border-right: 1px solid gainsboro;"></v-col>
      <v-col :cols="12" lg="7" md="7">
        <h4 class="py-2 text-danger">Tin tức cập nhật</h4>
        <v-sheet v-for="article in articles" :key="article.id" class="d-flex mb-3 text-body-1 border w-100" rounded="3"
          style="width: 60%;">
          <img class="w-50 me-2 rounded-lg" :src="article.image" />
          <div class="d-flex flex-column justify-content-between py-1">
            <a :href="article.link" class="">{{ article.title }}</a>
            <div class="d-flex align-center text-muted">
              <v-icon size="16">mdi-clock-outline</v-icon>
              <p class="px-1">{{ article.time }}</p>
            </div>
          </div>
        </v-sheet>
        <!-- <v-sheet class="text-center">
          <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination>
        </v-sheet> -->
      </v-col>

      <v-col :cols="4" lg="3" md="3">
        <h4 class="px-2 py-1 text-danger">Xem nhiều tuần qua</h4>
        <div v-for="subArticle in subArticles" :key="subArticle.id" class="my-2 w-75 px-2">
          <img :src="subArticle.image" alt="" class="w-100 h-50 rounded-lg">
          <div>
            <a :href="subArticle.link" class="" style="font-size: smaller;">{{ subArticle.content }}</a>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>
a {
  color: #333;
  text-decoration: none;
}

a:hover {
  color: #cd3545;
}

.more {
  white-space: wrap;
  /* overflow: hidden;
	text-overflow: ellipsis; */
}

.link:hover {
  background: gainsboro;
  padding: 8px;
  border-radius: 8px;
}
</style>