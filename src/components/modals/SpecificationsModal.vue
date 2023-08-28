<script setup>
import { ref } from "vue";

const productModal = ref(null);

function hideProductModal() {
	productModal.value.classList.remove("open");
}

function showProductModal() {
	productModal.value.classList.add("open");
}

const title1s = ref([
	{ id: 1, title: "Khe cắm thẻ nhớ", name: "Không" },
	{ id: 2, title: "Dung lượng RAM", name: "8 GB" },
	{ id: 3, title: "Bộ nhớ trong", name: "256 GB" },
]);

const title2s = ref([
	{ id: 1, title: "Kích thước màn hình", name: "6.67 inches" },
	{ id: 2, title: "Công nghệ màn hình", name: "AMOLED" },
	{ id: 3, title: "Độ phân giải màn hình", name: "1080 x 2400 pixels (FullHD+)" },
]);

const title3s = ref([
	{ id: 1, title: "Hệ điều hành", name: "Android 12" },
	{ id: 2, title: "Wi-Fi", name: "802.11 a/b/g/n/ac/6" },
	{ id: 3, title: "Thẻ SIM", name: "2 SIM (Nano-SIM)" },
	{ id: 4, title: "Jack tai nghe 3.5", name: "Có" },
	{ id: 5, title: "Công nghệ NFC", name: "Có" },
	{ id: 6, title: "Hỗ trợ mạng", name: "5G" },
	{ id: 7, title: "Bluetooth", name: "v5.2" },
	{ id: 8, title: "GPS", name: "GPS, GLONASS , BDS, GALILEO, QZSS" },
]);

const title4s = ref([
	{ id: 1, title: "Camera sau", name: "Camera góc rộng: 50MP, f/1.9, PDAF, OIS Camera góc siêu rộng: 8 MP, f/1.9, 119˚ Camera macro: 2 MP, f/2.4" },
	{ id: 2, title: "Tính năng camera", name: "Toàn cảnh (Panorama). Ban đêm (Night Mode). Siêu độ phân giải. Xóa phông. Trôi nhanh thời gian (Time Lapse)." },
	{ id: 3, title: "Quay video", name: "4K@30fps, 1080p@30/60/120fps, 720p@960fps" }
]);

const title5s = ref([
	{ id: 1, title: "Camera trước", name: "Camera góc rộng: 16 MP" },
	{ id: 2, title: "Quay video", name: "1080p@30/60fps" }
]);

const title6s = ref([
	{ id: 1, title: "Công nghệ sạc", name: "67W có dây, PD3.0" },
	{ id: 2, title: "Cổng sạc", name: "USB Type-C" },
	{ id: 3, title: "Pin", name: "5.000 mAh" }
]);

const title7s = ref([
	{ id: 1, title: "Chipset", name: "MediaTek Dimensity 1080 8 nhân" },
	{ id: 2, title: "Loại CPU", name: "2x2,6 GHz Cortex-A78 & 6x2,0 GHz Cortex-A55" }
]);

const title8s = ref([
	{ id: 1, title: "Kích thước", name: "162,9 x 76 x 7,9 mm" },
	{ id: 2, title: "Trọng lượng", name: "187 g" }
]);

</script>

<template>
	<v-btn append-icon="mdi-chevron-down" color="red-accent-4" class="text-white" @click="showProductModal()"
		location="center">
		Xem cấu hình chi tiết
	</v-btn>

	<!-- Begin: Detail Specifications Modal -->
	<div class="productModal" rounded="lg" ref="productModal" @click="hideProductModal()" style="z-index: 2">
		<v-sheet position="relative" class="productModal-container" @click.stop>

			<v-btn location="right top" position="absolute" variant="text" color="white" icon="mdi-close-circle"
				@click="hideProductModal()">
			</v-btn>

			<v-sheet color="red-accent-4" rounded="lg" class="modal-header d-flex align-center justify-center">
				<b class="text-uppercase">Thông số kỹ thuật</b>
			</v-sheet>

			<v-table rounded="lg" class="text-body-2 modal-body">
				<tbody>
					<tr>
						<td colspan="2" class="font-bold text-danger">RAM & lưu trữ</td>
					</tr>
					<tr v-for="title1 in title1s" :key="title1.id">
						<td class="w-50">{{ title1.title }}</td>
						<td>{{ title1.name }}</td>
					</tr>

					<tr>
						<td colspan="2" class="font-bold text-danger">Màn hình</td>
					</tr>
					<tr v-for="title2 in title2s" :key="title2.id">
						<td class="w-50">{{ title2.title }}</td>
						<td>{{ title2.name }}</td>
					</tr>

					<tr>
						<td colspan="2" class="font-bold text-danger">Giao tiếp & kết nối</td>
					</tr>
					<tr v-for="title3 in title3s" :key="title3.id">
						<td class="w-50">{{ title3.title }}</td>
						<td>{{ title3.name }}</td>
					</tr>

					<tr>
						<td colspan="2" class="font-bold text-danger">Camera sau</td>
					</tr>
					<tr v-for="title4 in title4s" :key="title4.id">
						<td class="w-50">{{ title4.title }}</td>
						<td>{{ title4.name }}</td>
					</tr>

					<tr>
						<td colspan="2" class="font-bold text-danger">Camera trước</td>
					</tr>
					<tr v-for="title5 in title5s" :key="title5.id">
						<td class="w-50">{{ title5.title }}</td>
						<td>{{ title5.name }}</td>
					</tr>

					<tr>
						<td colspan="2" class="font-bold text-danger">Pin & công nghệ sạc</td>
					</tr>
					<tr v-for="title6 in title6s" :key="title6.id">
						<td class="w-50">{{ title6.title }}</td>
						<td>{{ title6.name }}</td>
					</tr>

					<tr>
						<td colspan="2" class="font-bold text-danger">Vi xử lý & đồ họa</td>
					</tr>
					<tr v-for="title7 in title7s" :key="title7.id">
						<td class="w-50">{{ title7.title }}</td>
						<td>{{ title7.name }}</td>
					</tr>

					<tr>
						<td colspan="2" class="font-bold text-danger">Thiết kế & Trọng lượng</td>
					</tr>
					<tr v-for="title8 in title8s" :key="title8.id">
						<td class="w-50">{{ title8.title }}</td>
						<td>{{ title8.name }}</td>
					</tr>
				</tbody>
			</v-table>

			<v-sheet class="d-flex justify-center">
				<v-btn id="productModal-close-btn" class="text-white w-25" color="red-accent-4" type="submit"
					@click="hideProductModal()">Đóng
				</v-btn>
			</v-sheet>
		</v-sheet>
	</div>
	<!-- End: Detail Specifications Modal -->
</template>

<style></style>
