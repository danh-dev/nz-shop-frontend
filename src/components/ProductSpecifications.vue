<script setup>
import ProductModal from "../components/ProductModal.vue";
</script>

<template>
	<!-- Chọn sản phẩm theo loại, màu -->
	<v-sheet class="d-flex">
		<v-radio-group style="font-size: 12px">
			<v-radio
				label="Note 12 Pro 5GB"
				color="danger"
				value="Note 12 Pro 5GB"
			></v-radio>
			<v-radio
				label="Note 12 Pro 4GB"
				color="danger"
				value="Note 12 Pro 4GB"
			></v-radio>
			<v-radio
				label="Note 12S"
				color="danger"
				value="Note 12S"
			></v-radio>
		</v-radio-group>
		<v-radio-group style="font-size: 12px">
			<v-radio
				label="Trắng"
				color="danger"
				value="Trắng"
			></v-radio>
			<v-radio
				label="Đen"
				color="danger"
				value="Đen"
			></v-radio>
			<v-radio
				label="Xanh dương"
				color="danger"
				value="Xanh dương"
			></v-radio>
		</v-radio-group>
	</v-sheet>

	<h1 class="text-danger">15.000.000đ</h1>

	<!-- Chương trình khuyến mãi -->
	<v-sheet
		border="1"
		class="my-2 p-2 rounded-lg border-danger"
	>
		<v-sheet class="d-flex">
			<v-icon
				size="20"
				color="danger"
				>mdi-gift</v-icon
			>
			<h5 class="text-uppercase text-danger px-1">Khuyến mãi</h5>
		</v-sheet>

		<p class="text-medium p-1">
			Nhận khuyến mãi giảm giá hoặc sim 4G Mobifone MAX90 6GB/ngày. Liên hệ
			<strong class="text-danger">Hotline: 1800.2097</strong> để được tư vấn và nhận báo giá tốt
			nhất.
		</p>

		<v-sheet
			class="rounded-lg"
			color="rgb(254, 192, 192)"
		>
			<p class="text-medium text-justify p-2">
				Hotsale từ ngày <b class="text-danger">20/07 - 30/07</b> giảm giá 10% (số lượng có hạn, áp
				dụng cùng các chương trình thanh toán khác).
			</p>
		</v-sheet>
	</v-sheet>

	<!-- Mua ngay, Thêm giỏ hàng -->
	<v-sheet class="action d-flex mt-2 w-100">
		<v-btn
			rounded="0"
			href="#"
			stacked
			color="danger"
			class="text-white text-none w-75 rounded-s-lg"
		>
			<h3 class="text-uppercase">Mua ngay</h3>
			<p class="text-small text-center px-1">Giao nhanh trong 2 giờ hoặc nhận tại cửa hàng</p>
		</v-btn>
		<v-btn
			rounded="0"
			href="#"
			color="danger"
			variant="outlined"
			stacked
			class="px-1 text-none w-25 rounded-e-lg"
		>
			<v-icon>mdi-cart-plus</v-icon>
			<p class="text-small text-center">Thêm giỏ hàng</p>
		</v-btn>
	</v-sheet>

	<!-- Ưu đãi thêm -->
	<v-sheet
		border="1"
		class="my-2 p-2 rounded-lg text-medium text-justify border-success"
	>
		<h5 class="text-uppercase text-medium text-danger fw-bold py-1">Ưu đãi thêm</h5>
		<v-sheet>
			<p class="py-1">
				<v-icon
					size="18"
					color="green"
					class="px-2"
					>mdi-check-circle</v-icon
				>&ensp;Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm).
			</p>
			<p class="py-1">
				<v-icon
					size="18"
					color="green"
					class="px-2"
					>mdi-check-circle</v-icon
				>
				&ensp;Từ 8/7 - 31/7: Tặng mã giảm giá 3% (tối đa 100.000đ) cho đơn hàng gia dụng tiếp theo.
			</p>
			<p class="py-1">
				<v-icon
					size="18"
					color="green"
					class="px-2"
					>mdi-check-circle</v-icon
				>&ensp;Giảm đến 100k khi thanh toán qua Shopee Pay.
			</p>
			<p class="py-1">
				<v-icon
					size="18"
					color="green"
					class="px-2"
					>mdi-check-circle</v-icon
				>&ensp;Giảm 500k đơn hàng từ 10 triệu (trừ các sản phẩm Apple).
			</p>
		</v-sheet>
	</v-sheet>

	<!-- Thông số kỹ thuật -->
	<v-table
		class="border-light py-2 text-medium"
		width="100%"
	>
		<tbody>
			<tr>
				<td colspan="2">
					<div class="d-flex align-center">
						<v-icon color="danger">mdi-information-outline</v-icon>
						<h3 class="px-1 fw-medium text-uppercase">Thông số kỹ thuật</h3>
					</div>
				</td>
			</tr>
			<tr>
				<th style="width: 40%">Kích thước màn hình</th>
				<td>6.67 inches</td>
			</tr>

			<tr>
				<th style="width: 40%">Độ phân giải màn hình</th>
				<td>1080 x 2400 pixels (FullHD+)</td>
			</tr>

			<tr>
				<th style="width: 40%">Hệ điều hành</th>
				<td>Android 12</td>
			</tr>

			<tr>
				<th style="width: 40%">Công nghệ màn hình</th>
				<td>AMOLED</td>
			</tr>

			<tr>
				<th style="width: 40%">Camera sau</th>
				<td>
					Camera góc rộng: 50MP, f/1.9, PDAF, OIS Camera góc siêu rộng: 8 MP, f/1.9, 119˚ Camera
					macro: 2 MP, f/2.4
				</td>
			</tr>

			<tr>
				<th style="width: 40%">Camera trước</th>
				<td>Camera góc rộng: 16 MP</td>
			</tr>

			<tr>
				<th style="width: 40%">Dung lượng RAM</th>
				<td>8 GB</td>
			</tr>

			<tr>
				<th style="width: 40%">Thẻ SIM</th>
				<td>2 SIM (Nano-SIM)</td>
			</tr>

			<tr>
				<th style="width: 40%">Pin</th>
				<td>5.000 mAh</td>
			</tr>

			<tr>
				<td colspan="2">
					<ProductModal />
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<style></style>