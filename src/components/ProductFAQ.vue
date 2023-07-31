<script setup></script>

<template>
	<v-sheet class="border-light my-3">
		<h4 class="text-uppercase text-danger text-center pt-3">câu hỏi thường gặp</h4>
		<div class="faq-content">
			<div class="faq-question">
				<input id="q1" type="checkbox" class="panel"/>
				<v-icon size="25" class="plus" >mdi-chevron-down</v-icon>
				<label for="q1" class="panel-title" >Ưu đãi đặt trước Redmi Note 12 Pro 5G có gì hấp dẫn?</label>
				<div class="panel-content">
					<p>
						Xiaomi Redmi Note 12 Pro 5G được đặt trước tại CellphoneS có giá chính thức 9.490.000đ
						đi kèm nhiều ưu đãi hấp dẫn, bao gồm:
					</p>
					<p class="px-1">
						<v-icon color="">mdi-circle-20</v-icon>Tặng Tai nghe không dây Xiaomi Buds 3 trị giá
						2.690.000đ HOẶC Giảm thẳng 500.000đ
					</p>
					<p class="px-1">
						<v-icon color="">mdi-circle-20</v-icon>Trả góp 0% - chỉ cần trả trước từ 1.000.000đ
					</p>
				</div>
			</div>

			<div class="faq-question">
				<input id="q2" type="checkbox" class="panel"/>
				<v-icon size="25" class="plus" >mdi-chevron-down</v-icon>
				<label for="q2" class="panel-title"
					>Ưu đãi đặt trước Redmi Note 12 Pro 5G có gì hấp dẫn?</label>
				<div class="panel-content">
					Bạn hoàn toàn có thể tin tưởng vào chất lượng màn hình của chiếc điện thoại này khi mà
					Xiaomi đã trang bị trên màn hình 6.67 inch, tấm nền AMOLED đi cùng độ phân giải Full HD+
					và tần số quét 120 Hz nhờ đó có thể hiển thị hình ảnh sắc nét và sống động.
				</div>
			</div>

			<div class="faq-question">
				<input id="q3" type="checkbox" class="panel"/>
				<v-icon size="25" class="plus" >mdi-chevron-down</v-icon>
				<label for="q3" class="panel-title" >Camera Redmi Note 12 Pro có gì nổi bật?</label>
				<div class="panel-content">
					Redmi Note 12 Pro sở hữu cụm 3 camera sau chất lượng với camera chính 50MP và được hỗ trợ
					chống rung quang học IOS đem lại những khung hình sắc nét và chuyên nghiệp.
				</div>
			</div>

			<div class="faq-question">
				<input id="q4" type="checkbox" class="panel"/>
				<v-icon size="25" class="plus" >mdi-chevron-down</v-icon>
				<label for="q4" class="panel-title" >Redmi Note 12 Pro chơi game có tốt không?</label>
				<div class="panel-content">
					Redmi Note 12 Pro sở hữu các yếu tố phù hợp để chơi game như: Chip xử lí MediaTek 1080
					(6nm) đa dụng, RAM 6GB, màn hình 120hz cuộn lướt mượt mà và pin trâu 5000mAh.
				</div>
      </div>
		</div>
	</v-sheet>
</template>

<style>
/* BEGIN : FAQ Design */
.faq-content {
	margin: 0 auto;
}

.faq-question {
	padding: 10px 0;
	border-bottom: 1px dotted #ccc;
	font-size: 1rem;
}

.panel-title:hover {
	color: goldenrod;
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
	margin: 8px 0 0 12px;
	font-size: 1.5rem;
	line-height: 100%;
}

.panel {
	display: none;
}

/* END : FAQ Design */
</style>