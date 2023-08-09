import { defineStore } from "pinia";
import { ref, computed } from "vue";
import getSlugByName from "../utils/getSlugByName.js";
const useNewsStore = defineStore("news", () => {
  const articles = ref([
    {
      id: 1,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg",
      title: "Đã có điểm thi đại học, dưới 10 triệu nên xin cha mẹ mua smartphone vừa hợp túi tiền vừa xịn?",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg"
    },
    {
      id: 2,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
      title: "Top smartphone tầm trung có màn hình lớn xem phim tốt nhất hiện nay.",
      time: " 03/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg"
    },
    {
      id: 3,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg",
      title: "#Thời nghệ 18/5: Tìm hiểu giá iPhone trên Apple Store Online tại VN, HTC trở lại đường đua?",
      time: " 01/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg"
    },
    {
      id: 4,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg",
      title: "Đánh giá chi tiết Xiaomi Redmi Note 12 Pro 5G: Xiaomi khác hay người dùng xưa và nay đã khác?",
      time: "31/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg"
    },
    {
      id: 5,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/Xiaomi-13-Lite-cover.jpeg",
      title: "4 chiếc smartphone 5G cho trải nghiệm tuyệt vời giá dưới 10 triệu đáng mua nhất tháng 8.",
      time: "31/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/Xiaomi-13-Lite-cover.jpeg"
    },
    {
      id: 6,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
      title: "Top smartphone tầm trung có màn hình lớn xem phim tốt nhất hiện nay.",
      time: "28/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg"
    },
    {
      id: 7,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Dien-thoai-Android-hay-iPhone-3.jpg",
      title: "Điện thoại Android hay iPhone sẽ dễ chai pin hơn?",
      time: "20/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Dien-thoai-Android-hay-iPhone-3.jpg"
    },
    {
      id: 8,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/samsung-galaxy-tab-s9-ultra-14.jpg",
      title: "Galaxy Tab S9 Ultra: Lý do xứng đáng là một trong những dòng premium tablet hàng đầu trên thị trường",
      time: "20/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/samsung-galaxy-tab-s9-ultra-14.jpg"
    },
    {
      id: 9,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/iPhone-15-Pro-nguon-cung.jpeg",
      title: "Những thông tin bạn cần biết về màn hình viền mỏng hơn của dòng iPhone 15 Pro và vấn đề sản xuất",
      time: "18/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/iPhone-15-Pro-nguon-cung.jpeg"
    },
    {
      id: 10,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Xiaomi-MIX-Fold-3-cover.jpeg",
      title: "Điểm danh loạt smartphone sẽ ra mắt trong tháng 8/2023: Galaxy F34, Redmi 12 5G, Xiaomi MIX Fold 3,...",
      time: "17/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Xiaomi-MIX-Fold-3-cover.jpeg"
    },
    {
      id: 11,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/dien-thoai-nho-10-1.jpg",
      title: "Tưởng như đã hết thời, điện thoại kích thước nhỏ đang quay trở lại mạnh mẽ hơn",
      time: "15/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/dien-thoai-nho-10-1.jpg"
    },
    {
      id: 12,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/OPPO-Reno10-5.jpeg",
      title: "Điểm danh 5 nâng cấp mạnh mẽ của OPPO Reno10 trước thềm ra mắt",
      time: "15/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/OPPO-Reno10-5.jpeg"
    },
    {
      id: 13,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Samsung-Galaxy-Z-Fold5-30-2.jpg",
      title: "Điểm danh loạt smartphone sẽ ra mắt trong tuần tới: Redmi 12 5G, Realme 11 4G và còn gì nữa?",
      time: "12/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Samsung-Galaxy-Z-Fold5-30-2.jpg"
    },
    {
      id: 14,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
      title: "5 nâng cấp, cải tiến đáng giá của Galaxy Z Fold5 mới ra mắt",
      time: "10/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg"
    },
    {
      id: 15,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/samsung-galaxy-tab-s8-ultra-12-e1690273333984-1.jpg",
      title: "iPad dẫn đầu thị trường hơn một thập niên, cơ hội nào cho Galaxy Tab của Samsung?",
      time: "08/07/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/samsung-galaxy-tab-s8-ultra-12-e1690273333984-1.jpg"
    },
    {
      id: 16,
      subArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/tinh-nang-iOS-16-6-1.jpeg",
      title: "Bên cạnh các bản beta của iOS 17, Apple hiện cũng đang tung ra các bản thử nghiệm của iOS 16.6 cho các nhà phát triển.",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/tinh-nang-iOS-16-6-1.jpeg",
    },
    {
      id: 17,
      subArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/thong-tin-Galaxy-S24-Ultra-cover.jpeg",
      title: "Chúng ta đã biết gì về bộ ba Galaxy S24, Galaxy S24 Plus và Galaxy S24 Ultra?",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/thong-tin-Galaxy-S24-Ultra-cover.jpeg",
    },
    {
      id: 18,
      subArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Sony-Xperia-1V-15.jpg",
      title: "Sony Xperia 1 V có giá bán ngang ngửa iPhone Pro Max, điều gì khiến thương hiệu Nhật tự tin đến vậy?",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Sony-Xperia-1V-15.jpg",
    },
    {
      id: 19,
      subArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Xiaomi-MIX-Fold-3-cover.jpeg",
      title: "Điểm danh loạt smartphone sẽ ra mắt trong tháng 8/2023: Galaxy F34, Redmi 12 5G, Xiaomi MIX Fold 3,...",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/Xiaomi-MIX-Fold-3-cover.jpeg",
    },
    {
      id: 20,
      slide: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg",
      title: "Đã có điểm thi đại học, dưới 10 triệu nên xin cha mẹ mua smartphone vừa hợp túi tiền vừa xịn?",
      description: "Không cần phải Flagship mới sang xịn mịn mà những chiếc smartphone dưới 10 triệu cũng sở hữu những ưu điểm nổi bật không kém từ thiết kế, cấu hình cũng như camera.Có thể nói, trong phân khúc dưới 10 triệu thì người dùng chúng ta sẽ có nhiều sự lựa chọn ứng với nhu cầu sử dụng.",
    },
    {
      id: 22,
      slide: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/samsung-galaxy-tab-s8-ultra-12-e1690273333984-1.jpg",
      title: "iPad dẫn đầu thị trường hơn một thập niên, cơ hội nào cho Galaxy Tab của Samsung?",
      description: "Theo báo cáo của công ty nghiên cứu thị trường IDC, trong quý 4 năm 2022, Apple đã bán được 61.8 triệu chiếc iPad, chiếm 38.0% thị phần toàn cầu. Trong khi đó, Samsung chỉ bán được 30.3 triệu chiếc Galaxy Tab, chiếm 18,6% thị phần. Đây là một khoảng cách khá lớn và không có dấu hiệu thu hẹp trong những năm qua.",
    },
    {
      id: 22,
      slide: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/samsung-galaxy-tab-s9-ultra-14.jpg",
      title: "Galaxy Tab S9 Ultra: Lý do xứng đáng là một trong những dòng premium tablet hàng đầu trên thị trường",
      description: "So với thế hệ trước, Galaxy Tab S9 Ultra sở hữu hàng loạt cải tiến và tính năng mới. Chính vì vậy mà trong bài viết dưới đây, hãy cùng Sforum.vn điểm qua những lý do vì sao đây xứng đáng là một trong những dòng premium tablet hàng đầu trên thị trường.",
    },
    {
      id: 23,
      slide: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/dien-thoai-nho-10-1.jpg",
      title: "Tưởng như đã hết thời, điện thoại kích thước nhỏ đang quay trở lại mạnh mẽ hơn",
      description: "Những chiếc điện thoại màn hình nhỏ đang dần quay trở lại và chắc chắn sẽ mang tới nhiều điều thú vị hơn cho thị trường công nghệ trong thời gian sắp tới. Chính vì cội nguồn của những chiếc điện thoại màn hình lớn lại là những chiếc điện thoại màn hình cực kỳ bé mang tới nhiều ưu điểm trong di chuyển.",
    },
    {
      id: 24,
      slide: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/iPhone-15-Pro-nguon-cung.jpeg",
      title: "Những thông tin bạn cần biết về màn hình viền mỏng hơn của dòng iPhone 15 Pro và vấn đề sản xuất",
      description: "iPhone 15 Pro và iPhone 15 Pro Max sắp ra mắt của Apple được đồn đại là có viền xung quanh màn hình mỏng hơn so với các model hiện tại, nhưng thay đổi này được cho là đã dẫn đến sự cố sản xuất trước khi thiết bị ra mắt.",
    },
    {
      id: 25,
      productArticle: true,
      image: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg",
      title: "Tìm hiểu giá iPhone trên Apple Store Online tại VN, HTC trở lại đường đua?",
      time: "04/08/2023",
      photo: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg",
    },
    {
      id: 26,
      productArticle: true,
      image: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
      title: "Top smartphone tầm trung có màn hình lớn xem phim tốt nhất hiện nay.",
      time: "04/08/2023",
      photo: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
    },
    {
      id: 27,
      productArticle: true,
      image: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg",
      title: "Đánh giá chi tiết Xiaomi Redmi Note 12 Pro 5G: Xiaomi khác hay người dùng xưa và nay đã khác?",
      time: "04/08/2023",
      photo: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg",
    },
    {
      id: 28,
      productArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Xiaomi-Redmi-Note-12-Pro-25-e1680257603900-1.jpg",
      title: "Trên tay Redmi Note 12 Pro 5G: Thiết kế cao cấp, camera chất lượng cao, giá 9.49 triệu đồng",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Xiaomi-Redmi-Note-12-Pro-25-e1680257603900-1.jpg",
    },
    {
      id: 29,
      relatedArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/apple-watch-series-9-1.jpeg",
      title: "Chip S9 sẽ là nâng cấp lớn nhất của Apple Watch Series 9",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/apple-watch-series-9-1.jpeg",
    },
    {
      id: 30,
      relatedArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/refurbished-airpods-3-cover.jpeg",
      title: "Apple bắt đầu bán AirPods 3 refurbished với giá rẻ hơn",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/refurbished-airpods-3-cover.jpeg",
    },
    {
      id: 31,
      relatedArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/iPhone-16-Pro.jpeg",
      title: "Kuo: Dòng iPhone 16 Pro sẽ có thiết kế cảm biến camera xếp chồng lên nhau",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/iPhone-16-Pro.jpeg",
    },
    {
      id: 32,
      productArticle: true,
      image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/redmi-note-12-4g-cover.jpeg",
      title: "Redmi Note 12 series sắp ra mắt có gì hấp dẫn?",
      time: "04/08/2023",
      photo: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/redmi-note-12-4g-cover.jpeg",
    }
  ]);

  const slides = computed(() => {
    return articles.value.filter(article => article.slide);
  });

  const subArticles = computed(() => {
    return articles.value.filter(article => article.subArticle);
  });

  const relatedArticles = computed(() => {
    return articles.value.filter(article => article.relatedArticle);
  });

  const productArticles = computed(() => {
    return articles.value.filter(article => article.productArticle);
  });

  const findArticleBySlug = (slug) => {
    return articles.value.find(article => getSlugByName(article.title) === slug);
  };
  return { articles, slides, subArticles, relatedArticles, productArticles, findArticleBySlug };
});

export default useNewsStore;