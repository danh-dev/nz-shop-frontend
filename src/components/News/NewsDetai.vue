<script setup>
// import {ref} from "vue";
import NewsHeader from "./NewsHeader.vue";
import NewsSideBar from "./NewsSideBar.vue";
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

      <v-col :cols="12" lg="10" md="10">
        <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-6-1.jpg"
          class="rounded-lg mb-2" />
        <v-sheet class="w-75 border rounded-lg px-4 text-justify" style="position: absolute; top: 80%; margin: 0 35px;" >
          <p class="text-h5 py-4">Đã có điểm thi đại học, dưới 10 triệu nên xin cha mẹ mua smartphone vừa hợp túi tiền vừa
            xịn?</p>
          <b class="py-4">Không cần phải Flagship mới sang xịn mịn mà những chiếc smartphone dưới 10 triệu cũng sở hữu
            những ưu điểm
            nổi bật không kém từ thiết kế, cấu hình cũng như camera. Có thể nói, trong phân khúc dưới 10 triệu thì người
            dùng chúng ta sẽ có nhiều sự lựa chọn ứng với nhu cầu sử dụng.
          </b>
          <p class="py-4">
            Mình thấy việc chọn lựa cho mình một em điện thoại thông minh cũng khá là "hack não" khi đứng giữa một rừng
            smartphone với vô vàn giá cả, mẫu mã, cấu hình cũng như tính năng này nọ vô cùng đa dạng. ài viết hôm nay mình
            sẽ tổng hợp lại top 5 chiếc smartphone dưới 10 triệu có đầy đủ và cân mọi
            nhu cầu và tính năng của một học sinh, sinh viên, cùng mình khám phá bên dưới nhé.
          </p>

          <v-sheet class="d-flex flex-column border rounded w-50 p-4 my-2">
            <a href="#Samsung-Galaxy-S21-FE">1. Samsung Galaxy S21 FE</a>
            <a href="#Samsung-Galaxy-A54-5G">2. Samsung Galaxy A54 5G</a>
            <a href="#3PPO-Reno8-T-5G">3. OPPO Reno8 T 5G</a>
            <a href="#Xiaomi-Redmi-Note-12Pro-5G">4. Xiaomi Redmi Note 12 Pro 5G</a>
          </v-sheet>

          <v-sheet id="Samsung-Galaxy-S21-FE">
            <h1 class="py-4">Samsung Galaxy S21 FE</h1>
            <p>Samsung Galaxy S21 FE nổi bật khi đây là chiếc máy tầm trung được trang bị nhiều tính năng, cấu hình của
              một
              chiếc flagship. Tuy đã ra mắt cũng được hai năm tuổi rồi nhưng sau khi dùng thử và trải nghiệm một thời gian
              thì mình thấy Galaxy S21 FE với con chip Exynos 2100 vẫn có thể mang đến hiệu năng mạnh mẽ khi có thể cân
              được
              các tựa game trên với mức cấu hình cao.
              Đi kèm với đó là máy được trang bị RAM 8GB, bộ nhớ trong 128GB giúp người dùng có thể tha hồ đa nhiệm và lưu
              trữ tài liệu, nhạc, ảnh, video các kiểu.
            </p>
            <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/galaxy-s21-fe-a.jpg"
              class="rounded my-2" />
            <p>
              Ngoài ra camera của thiết bị được trang bị 3 camera đa dụng với cảm biến chính với độ phân giải 12MP
              (f/1.8), camera góc siêu rộng 12MP (khẩu độ f/2.2) và một camera tele 8MP. Bên cạnh đó là nhiều tính năng
              cao cấp để phục vụ tốt cho nhu cầu chụp ảnh của người dùng với chất lượng , màu sắc ảnh chụp tốt nhất.
            </p>
            <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/galaxy-s21-fe-.jpg"
              class="rounded my-2" />
            <p>
              Nếu nói về smartphone dưới 10 triệu thì Galaxy S21 FE sở hữu nhiều ưu điểm đáng để cho chúng ta sở hữu, hiện
              tại em nó đang được bán với giá là 10 triệu 990 nhưng bạn sẽ nhận thêm ưu đãi phiếu mua hàng 1 triệu đồng và
              giá em nó chỉ còn 9 triệu 990.
            </p>
          </v-sheet>

          <v-sheet id="Samsung-Galaxy-A54-5G">
            <h1 class="py-4">Samsung Galaxy A54 5G</h1>
            <p>
              Tân binh mới tinh của gia đình Galaxy A, Galaxy A54 5G nổi bật khi có thiết kế mới thời trang hơn, các góc
              bo tròn, màn hình kích thước 6,4 inch không quá to hay quá nhỏ vừa phải mang đến cho mình sự gọn gàng và cơ
              động cần thiết rất thích hợp để cầm nắm, sử dụng thường xuyên.
              Màu tím là màu đẹp nhất trên Galaxy A54 5G, nếu chọn mua thì mình nghĩ mua màu tím sẽ đẹp hơn vì trông nổi
              bật, mới lạ hơn phải nói, nam nữ ai cũng hợp, ai cũng dùng được.
            </p>
            <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Samsung-Galaxy-A54-sforumcover.jpg"
              class="rounded-lg my-2" />
            <p>
              Khả năng hiển thị là điểm sáng của máy, Galaxy A54 5G sử dụng tấm nền AMOLED với độ phân giải FullHD+ cho
              khả năng hiển thị đẹp mắt thích hợp giải trí xem phim, tần số quét 120Hz giúp trải nghiệm vuốt chạm mượt mà.
              Về cấu hình thì em nó sử dụng con chip Exynos 1380 tiến trình 5nm, RAM 8GB, ROM 128GB hoặc 256GB, dư sức đáp
              ứng được mọi nhu cầu sử dụng hằng ngày và chiến được ngon lành các tựa game đang có trên thị trường.
            </p>
            <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Samsung-Galaxy-A54-sforum-7.jpg"
              class="rounded-lg my-2" />
            <p>
              Samsung Galaxy A54 5G sẽ là chiếc smartphone dưới 10 triệu cho người dùng khả năng chụp ảnh với chất lượng
              không cần phải edit nhiều, thiết kế thân thiện, gọn gàng cho trải nghiệm cầm nắm thoải mái, cấu hình sử dụng
              lâu dài đáp ứng tốt các nhu cầu sử dụng của người dùng đa tác vụ.
            </p>
          </v-sheet>

          <v-sheet id="3PPO-Reno8-T-5G">
            <h1 class="py-4">OPPO Reno8 T 5G</h1>
            <p>
              Nếu các bạn thích một thiết bị có thiết kế đẹp mắt, tinh tế mang đến sự sang trọng và nổi bật cho người sử
              dùng thì OPPO Reno8 T 5G sẽ là thiết bị không làm bạn thất vọng. Nổi bật với màn hình cong, trong tầm giá
              smartphone dưới 10 triệu thì hiếm có thiết bị nào được trang bị màn hình cong đẹp mắt.
            </p>
            <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/OPPO-Reno-8T-5G-14-3.jpg"
              class="rounded-lg my-2" />
            <p>
              Với mức giá từ 9 triệu OPPO Reno8 T 5G dường như là thiết bị có ngoại hình ấn tượng, mới lạ. Bên cạnh đó
              thiết
              bị được tối ưu khả năng hiển thị đẹp mắt, màn hình to 6.7 inch, tấm nền AMOLED 1 tỉ màu, độ phân giải Full
              HD+, mang đến khả năng hiển thị vô cùng ấn tượng, màu sắc sống động, rực rỡ, chi tiết sắc nét, rõ ràng.
              Về phần hiệu năng thì OPPO Reno8 T 5G được trang bị con chip Snapdragon 695, đủ để đáp ứng nhu cầu giải trí,
              chơi game, học tập một cách mượt mà và ổn định. Bên cạnh đó máy có RAM 8GB có thể mở rộng ra thêm 8GB nữa
              tổng
              là 16GB, bộ nhớ trong 128GB.
            </p>
            <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/OPPO-Reno-8T-5G-8-4.jpg"
              class="rounded-lg my-2" />
            <p>
              OPPO Reno8 T 5G với viên pin 4,800 mAh máy cho thời gian sử dụng rất tốt trong hơn một ngày khi dùng với các
              tác vụ cơ bản như lướt mạng xã hội, gọi điện, Netflix and chill này nọ.
              Khả năng chụp ảnh cũng rất nổi bật với cảm biến chính 108MP, camera hỗ trợ đo chiều sâu, xóa phông độ phân
              giải 2 MP cho chất lượng ảnh chụp đẹp mắt, chi tiết cao, ngoài ra thì em nó còn có camera hiển vi 2MP cho
              người dùng trải nghiệm chụp ảnh thêm thú vị.
            </p>
          </v-sheet>

          <v-sheet id="Xiaomi-Redmi-Note-12Pro-5G">
            <h1 class="py-4">Xiaomi Redmi Note 12 Pro 5G</h1>
            <p>Tiếp đến là ứng cử viên cho top smartphone dưới 10 triệu đến từ nhà Xiaomi, Redmi Note 12 Pro có hai phiên
              bản 5G và 4G nhưng nếu lựa chọn thì hãy chọn phiên bản 5G, vì phiên bản này thật sự mang đến trải nghiệm sử
              dụng tốt hơn hẳn từ thiết kế cho đến cấu hình.
              Xiaomi Redmi Note 12 Pro 5G sở hữu ngoại hình đẹp mắt với các cạnh được vát phẳng vô cùng bắt trend, mặt
              lưng
              đẹp mắt nhất là phiên bản màu xanh trông nổi bật.
            </p>
            <v-img
              src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Danh-gia-Xiaomi-Redmi-Note-12-Pro-5G-4.jpg"
              class="rounded-lg my-2" />
            <p>
              Cấu hình nổi bật với con chip Mediatek 1080, đi kèm RAM 8GB và 256GB bộ nhớ trong mang đến cho chúng ta trải
              nghiệm sử dụng hằng ngày với các tác vụ giải trí thông thường máy đều đáp ứng tốt, mượt mà, bên cạnh đó em
              nó có thể chơi được mượt mà những tựa game đang có trên thị trường.
              Xiaomi Redmi Note 12 Pro được trang bị viên pin 5.000mAh cho người dùng thời gian sử dụng lâu trong một ngày
              làm việc, học tập, sạc nhanh 67W tiết kiệm thời gian sạc pin của người dùng.
            </p>
            <v-img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/Hieu-nang-Xiaomi-Redmi-Note-12-Pro-4.jpg"
              class="rounded-lg my-2" />

            <p>
              Về camera thì Xiaomi Redmi Note 12 Pro được trang bị camera chính 50 MP, camera góc siêu rộng 8MP, camera
              macro 2MP cùng nhiều tính năng chụp ảnh vô cùng thú vị và hiện đại để mang đến cho người dùng nhiếp ảnh ấn
              tượng.
              Có thể nói Xiaomi Redmi Note 12 Pro là thiết bị cân bằng được mọi yếu tố cần thiết để trở thành một chiếc
              máy đa dụng với thiết kế bắt trend đẹp mắt, cấu hình tốt, camera chân thực, pin cho thời gian sử dụng lâu.
            </p>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>
a {
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
}</style>