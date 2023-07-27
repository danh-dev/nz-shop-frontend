<template>
	<div class="container mt-3 mb-3">
		<div class="pb-3">
			<strong class="text-large">Xiaomi Redmi Note 12 Pro</strong>
			<div class="d-flex align-center">
				<v-rating
					:model-value="4"
					color="yellow-darken-3"
					readonly
					density="compact"
					size="large"
				></v-rating>
				<p class="px-2">3,360 đánh giá</p>
			</div>
		</div>

		<div class="row">
			<div class="col-md-8 col-12">
				<!-- Mục: Slide hình ảnh về sản phẩm -->
				<div class="slideContainer">
					<div
						class="mySlides"
						id="myImg"
					>
						<img
							src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12s_4__1_2.jpg"
							class="d-block w-100 border-radius cursor"
							alt="Photo No.1"
						/>
					</div>

					<div class="mySlides">
						<img
							src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_1.jpg"
							class="d-block w-100 border-radius cursor"
							alt="Photo No.2"
						/>
					</div>

					<div class="mySlides">
						<img
							src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_6__1.jpg"
							class="d-block w-100 border-radius cursor"
							alt="Photo No.3"
						/>
					</div>

					<div class="mySlides">
						<img
							src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_1__1.jpg"
							class="d-block w-100 border-radius cursor"
							alt="Photo No.4"
						/>
					</div>

					<div class="mySlides">
						<img
							src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_8__1.jpg"
							class="d-block w-100 border-radius cursor"
							alt="Photo No.5"
						/>
					</div>

					<div class="mySlides">
						<img
							src="https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_10__1.jpg"
							class="d-block w-100 border-radius"
							alt="Photo No.6"
						/>
					</div>
					<!-- Next and previous buttons -->
					<a
						class="prevBtn"
						@click="plusSlides(-1)"
						>❮</a
					>
					<a
						class="nextBtn"
						@click="plusSlides(1)"
						>❯</a
					>
					<!-- Thumbnail images -->
					<div class="thumbnail-image">
						<div class="column">
							<img
								class="demo cursor d-block w-100 rounded-3"
								src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12s_4__1_2.jpg"
								@click="currentSlide(1)"
								alt="Photo No.1"
							/>
						</div>

						<div class="column">
							<img
								class="demo cursor d-block w-100 rounded-3"
								src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_1.jpg"
								@click="currentSlide(2)"
								alt="Photo No.2"
							/>
						</div>
						<div class="column">
							<img
								class="demo cursor d-block w-100 rounded-3"
								src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_6__1.jpg"
								@click="currentSlide(3)"
								alt="Photo No.3"
							/>
						</div>
						<div class="column">
							<img
								class="demo cursor d-block w-100 rounded-3"
								src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_1__1.jpg"
								@click="currentSlide(4)"
								alt="Photo No.4"
							/>
						</div>
						<div class="column">
							<img
								class="demo cursor d-block w-100 rounded-3"
								src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_8__1.jpg"
								@click="currentSlide(5)"
								alt="Photo No.5"
							/>
						</div>
						<div class="column">
							<img
								class="demo cursor d-block w-100 rounded-3"
								src="https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_10__1.jpg"
								@click="currentSlide(6)"
								alt="Photo No.6"
							/>
						</div>
					</div>
				</div>

				<!-- Muc: Thông tin sản phẩm -->
				<v-sheet class="border-light my-3">
					<h4 class="fw-medium py-3">Thông tin sản phẩm</h4>
					<v-sheet class="text-medium d-flex">
						<v-icon>mdi-cellphone</v-icon>
						<p class="px-2 pb-2">
							Mới, đầy đủ phụ kiện từ nhà sản xuất. Redmi Note 12 Pro 5G bao gồm phụ kiện: Sạc 67W,
							Cáp USB Type-C, Công cụ tháo SIM, Vỏ bảo vệ, Hướng dẫn bắt đầu nhanh, Thẻ bảo hành.
						</p>
					</v-sheet>

					<v-sheet class="text-medium d-flex">
						<v-icon>mdi-security</v-icon>
						<p class="px-2 pb-2">
							Bảo hành 18 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi
							phần cứng từ nhà sản xuất.
						</p>
					</v-sheet>
					<v-sheet class="text-medium d-flex">
						<v-icon>mdi-receipt-text</v-icon>
						<p class="px-2 pb-2">Giá sản phẩm đã bao gồm VAT.</p>
					</v-sheet>
				</v-sheet>

				<div class="call-to-action mt-2">
					<div class="d-flex justify-content-between">
						<div class="col-md-9 col-9 bg-danger text-center border-radius-left">
							<a
								href="https://cellphones.com.vn/xiaomi-redmi-note-12-pro-5g.html"
								class="text-center text-decoration-none text-white align-items-center"
							>
								<b class="text-uppercase">mua ngay</b>
								<dd class="text-medium">Giao nhanh trong 2 giờ hoặc nhận tại cửa hàng</dd>
							</a>
						</div>
						<div class="col-md-3 col-3 border-radius-right border border-danger">
							<a
								href="https://cellphones.com.vn/xiaomi-redmi-note-12-pro-5g.html"
								class="text-center text-decoration-none text-danger align-items-center"
							>
								<i
									class="fa fa-cart-plus text-large"
									style="margin: 0 46%"
								></i>
								<dd class="text-small">Thêm giỏ hàng</dd>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Chọn sản phẩm theo loại và màu -->
			<div class="col-md-4 col-12 bg-body">
				<!-- Chọn sản phẩm theo loại -->
				<div class="pt-2">
					<div class="d-flex justify-content-between align-items-center">
						<v-checkbox
							color="blue"
							label="Note 12 Pro 5GB"
						></v-checkbox>
						<v-checkbox
							color="blue"
							label="Note 12 Pro 4GB"
						></v-checkbox>
						<v-checkbox
							color="blue"
							label="Note 12S"
						></v-checkbox>
					</div>

					<!-- Chọn sản phẩm theo màu -->
					<h4 class="text-center pt-3">Chọn màu để xem giá</h4>
					<div class="">
						<div class="d-flex justify-content-between align-items-center">
							<v-checkbox
								color="blue"
								label="Trắng"
							></v-checkbox>
							<v-checkbox
								color="blue"
								label="Đen"
							></v-checkbox>
							<v-checkbox
								color="blue"
								label="Xanh Dương"
							></v-checkbox>

							<!-- <div class="form-check">
                <input type="checkbox" name="type1" id="type" class="form-check-input" checked>
                <label for="type1" class="text-medium"></label>
              </div>

              <div class="form-check">
                <input type="checkbox" name="type2" id="type" class="form-check-input">
                <label for="type2" class="text-medium"></label>
              </div>

              <div class="form-check">
                <input type="checkbox" name="type4" id="type" class="form-check-input">
                <label for="type4" class="text-medium"></label>
              </div> -->
						</div>
						<strong class="text-danger text-center text-large">15.000.000</strong>
					</div>

					<!-- Mục: Chương trình khuyến mãi -->
					<div class="bg-body my-2 p-2 border-radius border border-danger">
						<v-sheet class="d-flex align-center">
							<v-icon
								size="small"
								color="danger"
								>mdi-gift-outline</v-icon
							>
							<v-sheet class="text-uppercase text-danger fw-bold px-1">Khuyến mãi</v-sheet>
						</v-sheet>

						<p class="text-medium text-justify p-1">
							Nhận khuyến mãi giảm giá hoặc sim 4G Mobifone MAX90 6GB/ngày.Giá tốt liên hệ Hotline:
							1800.2097
						</p>

						<div
							class="border-radius"
							style="background-color: rgb(254, 192, 192)"
						>
							<p class="text-small text-justified p-2">
								Hotsale từ ngày <b class="text-danger">20/07 - 30/07</b> giảm giá 10% (số lượng có
								hạn, áp dụng cùng các chương trình thanh toán khác).
							</p>
						</div>
					</div>

					<!-- Mục: Mua ngay, Thêm giỏ hàng -->
					<div class="action">
						<div class="d-flex mt-2">
							<div class="col-md-9 col-9 bg-danger text-center border-radius-left py-2">
								<a
									href="#"
									class="text-white text-decoration-none"
								>
									<b class="text-uppercase">Mua ngay</b>
									<p class="text-small">Giao nhanh trong 2 giờ hoặc nhận tại cửa hàng.</p>
								</a>
							</div>
							<div class="col-md-3 col-3 border-radius-right border border-danger py-2">
								<a
									href="#"
									class="text-decoration-none text-danger text-center"
								>
									<v-icon color="danger">mdi-cart-arrow-down</v-icon>
									<dd class="text-small">Thêm giỏ hàng</dd>
								</a>
							</div>
						</div>
					</div>

					<!-- Mục: Ưu đãi thêm -->
					<div
						class="border border-success border-radius my-2 p-2 text-medium text-justify v-col-12"
					>
						<h5 class="text-uppercase text-medium text-danger fw-bold py-1">Ưu đãi thêm</h5>
						<v-sheet>
							<p>
								<v-icon
									size="small"
									color="green"
									class="px-2"
									>mdi-check-circle</v-icon
								>Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm).
							</p>
							<p>
								<v-icon
									size="small"
									color="green"
									class="px-2"
									>mdi-check-circle</v-icon
								>Từ 8/7 - 31/7: Tặng mã giảm giá 3% (tối đa 100.000đ) cho đơn hàng gia dụng tiếp
								theo.
							</p>
							<p>
								<v-icon
									size="small"
									color="green"
									class="px-2"
									>mdi-check-circle</v-icon
								>Giảm đến 100k khi thanh toán qua Shopee Pay.
							</p>
							<p>
								<v-icon
									size="small"
									color="green"
									class="px-2"
									>mdi-check-circle</v-icon
								>Giảm 500k đơn hàng từ 10 triệu (trừ các sản phẩm Apple).
							</p>
						</v-sheet>
					</div>
				</div>
			</div>
		</div>

		<!-- Mục: Phụ kiện gợi ý -->
		<h5 class="d-lg-block d-md-none d-none">Phụ kiện mua cùng</h5>
		<!-- <div class="row mt-3 d-flex recommended-accessories">
      <div class="card">
        <a href="#"><img src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_161_1_.png"
            class="card-img-top w-100" width="100%">
        </a>
        <div class="card-body">
          <h5 class="card-title">Tai nghe không dây Redmi Buds 4 Lite</h5>
          <p class="card-text">
            <span class="text-danger fw-bold">890.000đ</span> <strike class="text-muted">1.500.000đ</strike>
          </p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
        </div>
      </div>

      <div class="card">
        <a href="#"><img
            src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/golf_candy_10.000mah_g80_1.png"
            class="card-img-top w-100" width="100%">
        </a>
        <div class="card-body">
          <h5 class="card-title">Pin sạc dự phòng Golf Candy 10.000mAh G80</h5>
          <p class="card-text">
            <span class="text-danger fw-bold">230.000đ</span> <strike class="text-muted">380.000đ</strike>
          </p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
        </div>
      </div>

      <div class="card">
        <a href="#"><img src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_9_1_.png"
            class="card-img-top w-100" width="100%">
        </a>
        <div class="card-body">
          <h5 class="card-title">Củ sạc Xiaomi 20W cổng USB-C</h5>
          <p class="card-text">
            <span class="text-danger fw-bold">300.000đ</span> <strike class="text-muted">490.000đ</strike>
          </p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
        </div>
      </div>

      <div class="card">
        <a href="#"><img src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/f/r/frame_2_1_2.png"
            class="card-img-top w-100" width="100%">
        </a>
        <div class="card-body">
          <h5 class="card-title">Dán cường lực Xiaomi Redmi Note 12</h5>
          <p class="card-text">
            <span class="text-danger fw-bold">150.000đ</span>
          </p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
        </div>
      </div>

      <div class="card">
        <a href="#"><img src="https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/g/r/group_249_5_.png"
            class="card-img-top w-100" width="100%">
        </a>
        <div class="card-body">
          <h5 class="card-title">Dán cường lực Xiaomi Redmi Note 12 LikGlass</h5>
          <p class="card-text">
            <span class="text-danger fw-bold">120.000đ</span> <strike class="text-muted">150.000đ</strike>
          </p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
        </div>
      </div>
    </div> -->

		<!-- Mục: Đặc điểm nổi bật & Câu hỏi thường gặp -->
		<v-row class="mt-2">
			<v-col
				cols="8"
				class="border-radius text-justified"
			>
				<!-- Đặc điểm nổi bật -->
				<v-col
					cols="12"
					class="bg-body border-light my-3"
				>
					<h4 class="text-uppercase text-center text-danger fw-medium">đặc điểm nổi bật</h4>
					<v-col
						cols="12"
						class="text-medium"
					>
						<p class="py-1">
							<v-icon
								size="small"
								color="green"
								>mdi-check-circle</v-icon
							>
							Thiết kế hiện đại, trẻ trung với mặt lưng kính thời thượng và khung viền kim loại
							vuông vức sang trọng.
						</p>
						<p class="py-1">
							<v-icon
								size="small"
								color="green"
								>mdi-check-circle</v-icon
							>
							Tấm nền AMOLED cho khả năng hiển thị rõ nét, tần số quét 120Hz giúp mọi thao tác trở
							nên mượt mà.
						</p>
						<p class="py-1">
							<v-icon
								size="small"
								color="green"
								>mdi-check-circle</v-icon
							>
							Bắt trọn mọi khoảnh khắc với cảm biến chính, độ phân giải cao, hỗ trợ chống rung.
						</p>
					</v-col>
				</v-col>

				<div
					style="border-left: 4px solid gainsboro; padding-left: 8px"
				>
					<a
						href=""
						class="text-medium text-dark text-decoration-none"
					>
						<strong class="text-danger">Xiaomi Redmi Note 12 Pro</strong>
						sở hữu cấu hình vượt trội gồm chip MediaTek Dimensity 1080, hệ thống ba camera với cảm
						biến chính 50MP và mạng 5G. Ngoài ra, màn hình Note 12 Pro 5G có kích thước khá lớn
						khoảng 6.67 inch, tấm nền AMOLED, tần số quét 120Hz khiến chiếc điện thoại nổi bật trong
						tầm giá dưới 8 triệu.
					</a>
				</div>

				<!-- Câu hỏi thường gặp -->
				<div class="border-light bg-body my-3">
					<h4 class="text-uppercase text-danger text-center pt-3 fw-medium">câu hỏi thường gặp</h4>
					<div class="faq-content">
						<div class="faq-question">
							<input
								id="q1"
								type="checkbox"
								class="panel"
							/>
							<div class="plus">+</div>
							<label
								for="q1"
								class="panel-title"
								>Ưu đãi đặt trước Redmi Note 12 Pro 5G có gì hấp dẫn?</label
							>
							<div class="panel-content">
								Xiaomi Redmi Note 12 Pro 5G được đặt trước tại CellphoneS có giá chính thức
								9.490.000đ đi kèm nhiều ưu đãi hấp dẫn , bao gồm:
								<ul>
									<li>
										Tặng Tai nghe không dây Xiaomi Buds 3 trị giá 2.690.000đ HOẶC Giảm thẳng
										500.000đ
									</li>
									<li>Trả góp 0% - chỉ cần trả trước từ 1.000.000đ</li>
								</ul>
							</div>
						</div>
						<div class="faq-question">
							<input
								id="q2"
								type="checkbox"
								class="panel"
							/>
							<div class="plus">+</div>
							<label
								for="q2"
								class="panel-title"
								>Ưu đãi đặt trước Redmi Note 12 Pro 5G có gì hấp dẫn?</label
							>
							<div class="panel-content">
								Bạn hoàn toàn có thể tin tưởng vào chất lượng màn hình của chiếc điện thoại này khi
								mà Xiaomi đã trang bị trên màn hình 6.67 inch, tấm nền AMOLED đi cùng độ phân giải
								Full HD+ và tần số quét 120 Hz nhờ đó có thể hiển thị hình ảnh sắc nét và sống động.
							</div>
						</div>
						<div class="faq-question">
							<input
								id="q3"
								type="checkbox"
								class="panel"
							/>
							<div class="plus">+</div>
							<label
								for="q3"
								class="panel-title"
								>Camera Redmi Note 12 Pro có gì nổi bật?</label
							>
							<div class="panel-content">
								Redmi Note 12 Pro sở hữu cụm 3 camera sau chất lượng với camera chính 50MP và được
								hỗ trợ chống rung quang học IOS đem lại những khung hình sắc nét và chuyên nghiệp.
							</div>
						</div>
						<div class="faq-question">
							<input
								id="q4"
								type="checkbox"
								class="panel"
							/>
							<div class="plus">+</div>
							<label
								for="q4"
								class="panel-title"
								>Redmi Note 12 Pro chơi game có tốt không?</label
							>
							<div class="panel-content">
								Redmi Note 12 Pro sở hữu các yếu tố phù hợp để chơi game như: Chip xử lí MediaTek
								1080 (6nm) đa dụng, RAM 6GB, màn hình 120hz cuộn lướt mượt mà và pin trâu 5000mAh.
							</div>
						</div>
					</div>
				</div>

				<!-- Đánh giá & nhận xét -->
				<v-sheet
					color="fafafa"
					class="my-3"
				>
					<v-card
						class="d-flex flex-column py-3 rounded-lg"
						elevation="10"
						height="540"
						width="100%"
					>
						<p class="d-flex justify-center text-h6">Đánh giá & nhận xét sản phẩm</p>

						<div class="d-flex align-center flex-column">
							<div class="text-h2 mt-3">
								4
								<span class="text-h6 ml-n3">/5</span>
							</div>

							<v-rating
								:model-value="4"
								color="yellow-darken-3"
								half-increments
							></v-rating>
							<div class="px-3">3,360 đánh giá</div>
						</div>

						<v-list
							bg-color="transparent"
							class="d-flex flex-column-reverse"
							density="compact"
						>
							<v-list-item
								v-for="(rating, i) in 5"
								:key="i"
							>
								<v-progress-linear
									:model-value="rating * 15"
									class="mx-n5"
									color="danger"
									height="10"
									rounded
								></v-progress-linear>

								<template v-slot:prepend>
									<span>{{ rating }}</span>
									<v-icon
										icon="mdi-star"
										class="mx-2"
									></v-icon>
								</template>

								<template v-slot:append>
									<div class="rating-values">
										<span class="d-flex justify-end"> {{ rating * 224 }} </span>
									</div>
								</template>
							</v-list-item>
						</v-list>
						<v-sheet align="center">
							<p class="text-subtitle-1">Bạn đánh giá sao sản phẩm này ?</p>
							<LoginModal />
						</v-sheet>
					</v-card>
				</v-sheet>

				<!-- Mục: Hỏi đáp -->
				<div class="my-3 border-light">
					<h4 class="p-2 fw-medium">Hỏi và đáp</h4>
					<v-container class="d-flex">
						<v-textarea
							name=""
							class="mx-2"
							variant="filled"
							auto-grow
							background="white"
							model-value="Bình luận..."
						></v-textarea>
						<v-btn prepend-icon ="mdi-send-circle" color="danger" class="text-white">Gửi</v-btn>
					</v-container>					
				</div>
			</v-col>

			<!-- Muc: Thông số kỹ thuật & Tin tức -->
			<v-col
				cols="4"
				class="mt-2 bg-body"
			>
				<!-- Thông số kỹ thuật -->
				<div class="border-light d-flex flex-column align-center py-2">
					<h3 class="fw-medium text-uppercase">Thông số kỹ thuật</h3>
					<v-table class="table table-hover text-medium">
						<tbody>
							<tr>
								<td class="w-50">Kích thước màn hình</td>
								<td class="w-50">6.67 inches</td>
							</tr>

							<tr>
								<td class="w-50">Độ phân giải màn hình</td>
								<td class="w-50">1080 x 2400 pixels (FullHD+)</td>
							</tr>

							<tr>
								<td class="w-50">Hệ điều hành</td>
								<td class="w-50">Android 12</td>
							</tr>

							<tr>
								<td class="w-50">Công nghệ màn hình</td>
								<td class="w-50">AMOLED</td>
							</tr>

							<tr>
								<td class="w-50">Camera sau</td>
								<td class="w-50">
									Camera góc rộng: 50MP, f/1.9, PDAF, OIS Camera góc siêu rộng: 8 MP, f/1.9, 119˚
									Camera macro: 2 MP, f/2.4
								</td>
							</tr>

							<tr>
								<td class="w-50">Camera trước</td>
								<td class="w-50">Camera góc rộng: 16 MP</td>
							</tr>

							<tr>
								<td class="w-50">Dung lượng RAM</td>
								<td class="w-50">8 GB</td>
							</tr>

							<tr>
								<td class="w-50">Thẻ SIM</td>
								<td class="w-50">2 SIM (Nano-SIM)</td>
							</tr>

							<tr>
								<td class="w-50">Pin</td>
								<td class="w-50">5.000 mAh</td>
							</tr>
						</tbody>
					</v-table>
					<v-btn
						append-icon="mdi-chevron-down"
						color="danger" class="text-white my-1"
						@click="showProductModal"
					>
						Xem cấu hình chi tiết
					</v-btn>
				</div>

				<!-- Tin tức -->
				<div class="news border-light mt-3">
					<div class="d-flex px-2 my-3 align-center">
						<v-icon color="danger">mdi-newspaper-variant-multiple</v-icon>
						<h3 class="px-1">Tin tức về sản phẩm</h3>
					</div>
					<v-table>
						<tbody>
							<tr>
								<td style="width: 40%">
									<img
										class="border-radius w-100"
										src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg"
										href="#"
										alt="New No.1"
									/>
								</td>
								<td>
									<a
										class="text-medium text-decoration-none text-dark"
										href="#"
										>Tìm hiểu giá iPhone trên Apple Store Online tại VN, HTC trở lại đường đua?</a
									>
								</td>
							</tr>

							<tr>
								<td style="width: 40%">
									<img
										class="border-radius w-100"
										src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg"
										href="#"
										alt="New No.2"
									/>
								</td>
								<td>
									<a
										class="text-medium text-decoration-none text-dark"
										href="#"
										>Top smartphone tầm trung có màn hình lớn xem phim "đã" nhất hiện nay.
									</a>
								</td>
							</tr>

							<tr>
								<td style="width: 40%">
									<img
										class="border-radius w-100"
										src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg"
										href="#"
										alt="New No.3"
									/>
								</td>
								<td>
									<a
										class="text-medium text-decoration-none text-dark"
										href="#"
										>Đánh giá chi tiết Xiaomi Redmi Note 12 Pro 5G: Xiaomi khác hay người dùng xưa
										và nay đã khác?</a
									>
								</td>
							</tr>

							<tr>
								<td style="width: 40%">
									<img
										class="border-radius w-100"
										src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Xiaomi-Redmi-Note-12-Pro-25-e1680257603900-1.jpg"
										href="#"
										alt="New No.4"
									/>
								</td>
								<td>
									<a
										class="text-medium text-decoration-none text-dark"
										href="#"
										>Trên tay Redmi Note 12 Pro 5G: Thiết kế cao cấp, camera chất lượng cao, giá
										9.49 triệu đồng</a
									>
								</td>
							</tr>

							<tr>
								<td
									colspan="2"
									class="text-center"
								>
									<v-btn
										href="#"
										color="danger" class="text-white"
										append-icon="mdi-chevron-down"
									>
										Xem tất cả bài viết</v-btn
									>
								</td>
							</tr>
						</tbody>
					</v-table>
				</div>
			</v-col>
		</v-row>

		<!-- Begin: Detail Product Modal -->
		<div
			class="product-modal"
			ref="productModal"
			@click="hideProductModal"
		>
			<v-sheet
				position="relative"
				class="product-modal-container rounded-xl"
				@click.stop
			>
				<v-btn
					location="right top"
					position="absolute"
					variant="text"
					color="white"
					icon="mdi-close-circle"
					@click="hideProductModal"
				></v-btn>

				<div class="modal-header bg-danger d-flex align-center justify-center">
					<b class="fw-medium text-uppercase">Thông số kỹ thuật</b>
				</div>

				<v-table class="table table-hover text-medium modal-body mb-0">
					<tbody>
						<tr>
							<td
								colspan="2"
								class="fw-bold"
							>
								RAM & lưu trữ
							</td>
						</tr>
						<tr>
							<td class="w-50">Khe cắm thẻ nhớ</td>
							<td>Không</td>
						</tr>
						<tr>
							<td class="w-50">Dung lượng RAM</td>
							<td>8 GB</td>
						</tr>
						<tr>
							<td class="w-50">Bộ nhớ trong</td>
							<td>256 GB</td>
						</tr>

						<tr>
							<td
								colspan="2"
								class="fw-bold"
							>
								Màn hình
							</td>
						</tr>
						<tr>
							<td class="w-50">Kích thước màn hình</td>
							<td>6.67 inches</td>
						</tr>
						<tr>
							<td class="w-50">Công nghệ màn hình</td>
							<td>AMOLED</td>
						</tr>
						<tr>
							<td class="w-50">Độ phân giải màn hình</td>
							<td>1080 x 2400 pixels (FullHD+)</td>
						</tr>

						<tr>
							<td
								class="fw-bold"
								colspan="2"
							>
								Giao tiếp & kết nối
							</td>
						</tr>
						<tr>
							<td class="w-50">Hệ điều hành</td>
							<td>Android 12</td>
						</tr>
						<tr>
							<td class="w-50">Wi-Fi</td>
							<td>802.11 a/b/g/n/ac/6</td>
						</tr>
						<tr>
							<td class="w-50">Thẻ SIM</td>
							<td>2 SIM (Nano-SIM)</td>
						</tr>
						<tr>
							<td class="w-50">Jack tai nghe 3.5</td>
							<td>Có</td>
						</tr>
						<tr>
							<td class="w-50">Công nghệ NFC</td>
							<td>Có</td>
						</tr>
						<tr>
							<td class="w-50">Hỗ trợ mạng</td>
							<td>5G</td>
						</tr>
						<tr>
							<td class="w-50">Bluetooth</td>
							<td>v5.2</td>
						</tr>
						<tr>
							<td class="w-50">GPS</td>
							<td>GPS, GLONASS , BDS, GALILEO, QZSS</td>
						</tr>

						<tr>
							<td
								colspan="2"
								class="fw-bold"
							>
								Camera sau
							</td>
						</tr>
						<tr>
							<td class="w-50">Camera sau</td>
							<td>
								Camera góc rộng: 50MP, f/1.9, PDAF, OIS Camera góc siêu rộng: 8 MP, f/1.9, 119˚
								Camera macro: 2 MP, f/2.4
							</td>
						</tr>
						<tr>
							<td class="w-50">Tính năng camera</td>
							<td>
								Toàn cảnh (Panorama). Ban đêm (Night Mode). Siêu độ phân giải. Xóa phông. Trôi nhanh
								thời gian (Time Lapse).
							</td>
						</tr>
						<tr>
							<td class="w-50">Quay video</td>
							<td>4K@30fps, 1080p@30/60/120fps, 720p@960fps</td>
						</tr>

						<tr>
							<td
								colspan="2"
								class="fw-bold"
							>
								Camera trước
							</td>
						</tr>
						<tr>
							<td class="w-50">Camera trước</td>
							<td>Camera góc rộng: 16 MP</td>
						</tr>
						<tr>
							<td class="w-50">Quay video</td>
							<td>1080p@30/60fps</td>
						</tr>

						<tr>
							<td
								colspan="2"
								class="fw-bold"
							>
								Pin & công nghệ sạc
							</td>
						</tr>
						<tr>
							<td class="w-50">Công nghệ sạc</td>
							<td>67W có dây, PD3.0</td>
						</tr>
						<tr>
							<td class="w-50">Cổng sạc</td>
							<td>USB Type-C</td>
						</tr>
						<tr>
							<td class="w-50">Pin</td>
							<td>5.000 mAh</td>
						</tr>

						<tr>
							<td
								colspan="2"
								class="fw-bold"
							>
								Vi xử lý & đồ họa
							</td>
						</tr>
						<tr>
							<td class="w-50">Chipset</td>
							<td>MediaTek Dimensity 1080 8 nhân</td>
						</tr>
						<tr>
							<td class="w-50">Loại CPU</td>
							<td>2x2,6 GHz Cortex-A78 & 6x2,0 GHz Cortex-A55</td>
						</tr>

						<tr>
							<td
								colspan="2"
								class="fw-bold"
							>
								Thiết kế & Trọng lượng
							</td>
						</tr>
						<tr>
							<td class="w-50">Kích thước</td>
							<td>162,9 x 76 x 7,9 mm</td>
						</tr>
						<tr>
							<td class="w-50">Trọng lượng</td>
							<td>187 g</td>
						</tr>
					</tbody>
				</v-table>

				<v-sheet class="modal-footer d-flex justify-center align-center">
					<v-btn
						id="product-modal-close-btn"
						class="text-white"
						color="danger"
						type="submit"
						@click="hideProductModal"
						>Đóng</v-btn>
				</v-sheet>
			</v-sheet>
		</div>
		<!-- End: Detail Product Modal -->
		</div>
</template>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: var(--bs-font-sans-serif);
	}

	.fa-star-half-alt {
		color: goldenrod;
	}

	.fa-check-circle {
		color: green;
	}

	.text-large {
		font-size: 1.5rem;
	}

	.text-medium {
		font-size: 0.8rem;
	}

	.text-small {
		font-size: 0.65rem;
	}

	.text-justified {
		text-align: justify;
	}

	.form-check-input:hover {
		cursor: pointer;
	}

	.border-light {
		border: 1px solid gainsboro;
		border-radius: 8px;
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15), 0 8px 12px rgba(0, 0, 0, 0.28);
	}


	.border-light:hover{
		opacity: 0.8;
	}

	.border-radius {
		border-radius: 8px;
	}

	.border-radius-left {
		border-radius: 8px 0 0 8px;
	}

	.border-radius-right {
		border-radius: 0 8px 8px 0;
	}

	.product-cart {
		border: 1px solid gainsboro;
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
		border-radius: 5px;
		margin: 0 4px;
		padding: 10px;
	}

	/* BEGIN : FAQ Design */
	.faq-content {
		margin: 0 auto;
	}

	.faq-question {
		padding: 10px 0;
		border-bottom: 1px dotted #ccc;
		font-size: 1rem;
	}

	.panel-title {
		font-size: 0.85rem;
		font-weight: 600;
		width: 100%;
		position: relative;
		margin: 0;
		padding: 10px 10px 0 48px;
		display: block;
		cursor: pointer;
	}

	.panel-content {
		font-size: 0.8rem;
		/* padding: 0px 4px; */
		margin: 0 4px;
		height: 0;
		overflow: hidden;
		z-index: 1;
		position: relative;
		opacity: 0;
		-webkit-transition: 0.4s ease;
		-moz-transition: 0.4s ease;
		-o-transition: 0.4s ease;
		transition: 0.4s ease;
		background-color: rgb(247, 243, 243);
		border-radius: 5px;
	}

	.panel:checked ~ .panel-content {
		height: auto;
		opacity: 1;
		padding: 14px;
		margin: 4px 8px 0 8px;
	}

	.plus {
		position: absolute;
		margin-left: 10px;
		margin-top: 4px;
		/* z-index: 1; */
		font-size: 1.5rem;
		line-height: 100%;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-o-user-select: none;
		user-select: none;
		-webkit-transition: 0.2s ease;
		-moz-transition: 0.2s ease;
		-o-transition: 0.2s ease;
		transition: 0.2s ease;
	}

	.panel:checked ~ .plus {
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.panel {
		display: none;
	}

	/* END : FAQ Design */

	/* Begin: Rating star */
	.fa {
		font-size: 14px;
	}

	.checked {
		color: orange;
	}

	/* Three column layout */
	.side {
		float: left;
		width: 15%;
	}

	.middle {
		margin-top: 10px;
		float: left;
		width: 70%;
	}

	/* Place text to the right */
	.right {
		text-align: right;
	}

	/* Clear floats after the columns */
	.row:after {
		content: "";
		display: table;
		clear: both;
	}

	/* The bar container */
	.bar-container {
		width: 100%;
		background-color: #f1f1f1;
		text-align: center;
		color: white;
		border-radius: 10px;
	}

	.card {
		max-height: 500px;
		width: 240px;
		padding: 8px;
		margin-left: 8px;
		border-radius: 10px;
	}

	.card-title {
		font-size: 0.9rem;
		line-height: 24px;
	}

	.card:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.28);
	}

	.card .card-img-top:hover {
		transform: scale(0.9);
	}

	.new > img:hover {
		transform: scale(1.05);
	}

	@media screen and (max-width: 740px) {
		.recommended-accessories .card {
			display: none;
		}

		.call-to-action {
			display: none;
		}

		.action,
		.payment > .text-uppercase,
		.payment > p {
			font-size: 0.6rem;
		}

		.form-check > .form-check-input {
			width: 14px;
			height: 14px;
		}

		.form-check > label {
			font-size: 0.7rem;
		}

		.slideContainer > .prevBtn,
		.slideContainer > .nextBtn {
			font-size: 20px;
		}
	}

	@media screen and (min-width: 740px) and (max-width: 1024px) {
		.recommended-accessories .card {
			display: none;
		}

		.text-medium {
			font-size: 0.65rem;
		}

		.call-to-action {
			display: block;
		}

		.action,
		.payment,
		.news {
			display: none;
		}

		.slideContainer > .prevBtn,
		.slideContainer > .nextBtn {
			font-size: 24px;
		}
	}

	@media screen and (min-width: 1024px) {
		.call-to-action {
			display: none;
		}

		.payment .action {
			display: block;
		}
	}

	/* Position the image container (needed to position the left and right arrows) */
	.slideContainer {
		position: relative;
	}

	/* Hide the images by default */
	.mySlides {
		display: none;
	}

	.mySlides > img {
		vertical-align: middle;
	}

	/* Add a pointer when hovering over the thumbnail images */
	.cursor {
		cursor: pointer;
	}

	/* Next & previous buttons */
	.prevBtn,
	.nextBtn {
		cursor: pointer;
		position: absolute;
		top: 35%;
		width: auto;
		padding: 8px;
		/* margin-top: -50px; */
		color: rgba(255, 0, 0, 0.733);
		font-size: 30px;
		border-radius: 0 3px 3px 0;
		user-select: none;
		-webkit-user-select: none;
		text-decoration: none;
	}

	/* Position the "next button" to the right */
	.nextBtn {
		right: 0;
		border-radius: 3px 0 0 3px;
	}

	/* On hover, add a black background color with a little bit see-through */
	.prevBtn:hover,
	.nextBtn:hover {
		background-color: #2a28284b;
		color: #fff;
	}

	.thumbnail-image:after {
		content: "";
		display: table;
		clear: both;
	}

	/* Six columns side by side */
	.column {
		margin-top: 8px;
		float: left;
		width: 10%;
		margin: 8px 4px 8px 0;
	}

	/* Add a transparency effect for thumnbail images */
	.demo {
		opacity: 0.6;
	}

	.active,
	.demo:hover {
		opacity: 1;
	}

	/* Begin : Scroll bar */
	/* width */
	::-webkit-scrollbar {
		width: 4px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: rgba(255, 0, 0, 0.748);
		border-radius: 5px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #b30000;
	}

	/* End : Scroll bar */

	/* Begin : Design Login Modal */
	.modal.open,
	.product-modal.open {
		display: flex;
	}

	.modal,
	.product-modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
		display: none;
		align-items: center;
		justify-content: center;
		animation: fadeIn linear 0.5s;
	}

	.modal-container {
		max-width: 600px;
		min-height: 200px;
		z-index: 1;
	}

	.product-modal-container {
		max-width: 600px;
		min-width: calc(100%-100px);
		height: 600px;
		overflow: auto;
		z-index: 1;
	}

	.modal-close-btn,
	.product-modal-close-btn {
		/* top: 0; */
		opacity: 0.8;
	}

	.modal-close-btn:hover,
	.product-modal-close-btn:hover {
		opacity: 0.7;
	}

	.modal-header,
	.product-modal-header {
		height: 10%;
		color: #fff;
		font-size: 1.2rem;
	}

	.modal-body,
	.product-modal-body {
		padding: 16px;
		background-color: #fff;
		font-size: 0.9rem;
		height: 80%;
		overflow: auto;
	}

	.modal-label,
	.product-modal-label {
		display: block;
		padding: 16px;
	}

	.modal-footer {
		background-color: #fff;
		font-size: 0.9rem;
		height: auto;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	/* End : Design Modal */
</style>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import LoginModal from "../components/LoginModal.vue";
// Show Modal

const productModal = ref(null);


function showProductModal() {
	productModal.value.classList.add("open");
}

//Hide Modal
function hideProductModal() {
	productModal.value.classList.remove("open");
}
// Begin: Slideshow Gallery
onMounted(() => {
	let slideIndex = 1;
	showSlides(slideIndex);

	function plusSlides(n) {
		showSlides((slideIndex += n));
	}

	function currentSlide(n) {
		showSlides((slideIndex = n));
	}

	function showSlides(n) {
		let i;
		const slides = document.getElementsByClassName("mySlides");
		const dots = document.getElementsByClassName("demo");
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].className += " active";
	}
});
</script>
