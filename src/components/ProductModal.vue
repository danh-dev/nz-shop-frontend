<script setup>
import { ref } from "vue";

const productModal = ref(null);

function hideProductModal() {
	productModal.value.classList.remove("open");
}

function showProductModal() {
	productModal.value.classList.add("open");
}
</script>

<template>
	<v-btn
		append-icon="mdi-chevron-down"
		color="danger"
		class="text-white"
		@click="showProductModal()"
		location="center"
	>
		Xem cấu hình chi tiết
	</v-btn>

	<!-- Begin: Detail Product Modal -->
	<div
		class="product-modal"
		ref="productModal"
		@click="hideProductModal()"
		style="z-index: 2"
	>
		<v-sheet
			position="relative"
			class="product-modal-container"
			@click.stop
		>
			<v-btn
				location="right top"
				position="absolute"
				variant="text"
				color="white"
				icon="mdi-close-circle"
				@click="hideProductModal()"
			></v-btn>

			<v-sheet color="danger" rounded="3" class="modal-header d-flex align-center justify-center">
				<b class="fw-medium text-uppercase">Thông số kỹ thuật</b>
			</v-sheet>

			<v-table class="text-medium modal-body mb-0">
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
							Camera góc rộng: 50MP, f/1.9, PDAF, OIS Camera góc siêu rộng: 8 MP, f/1.9, 119˚ Camera
							macro: 2 MP, f/2.4
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
					@click="hideProductModal()"
					>Đóng</v-btn
				>
			</v-sheet>
		</v-sheet>
	</div>
	<!-- End: Detail Product Modal -->
</template>

<style></style>
