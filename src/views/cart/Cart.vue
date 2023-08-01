<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, computed } from "vue";
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = ref([
	{ title: "Sản phẩm", align: "start", sortable: false, key: "name" },
	{ title: "Giá", align: "end", key: "price_unit" },
	{ title: "Số lượng", align: "end", key: "quantity" },
	{ title: "Thành tiền", align: "end", key: "total_price" },
	{ title: "", align: "end", key: "action" }
]);
</script>

<template>
  <v-app>
	<v-container>
		<v-sheet
			class="mx-auto mt-8 rounded pa-3"
			elevation="3"
		>
			<v-row
				class="ma-3"
				no-gutters
			>
				<v-col class="col-8 rounded pa-3">
					<div class="cart-table">
						est
					</div>
				</v-col>
				<v-col class="col-4 bg-grey-lighten-3 rounded pa-3">
					<h4>Tạm tính:</h4>
					<v-card class="my-2 pa-3">
						<div class="order-summary-inner">
							<ul class="summary-list py-2">
								<li class="d-flex justify-content-between font-weight-medium py-2">
									<span class="summary-list-title">Tổng giá trị :</span>
									<span class="summary-list-text">$488</span>
								</li>
								<li class="d-flex justify-content-between font-weight-medium py-2">
									<span class="summary-list-title">Giảm giá :</span>
									<span class="summary-list-text">-$20</span>
								</li>
								<li class="d-flex justify-content-between font-weight-medium py-2">
									<span class="summary-list-title">Giao hàng :</span>
									<span class="summary-list-text">$30</span>
								</li>
							</ul>
							<span class="font-weight-medium">Mã giảm giá</span>
							<v-card-text>
								<v-text-field
									label="Mã giảm giá..."
									append-inner-icon="mdi-ticket-percent-outline"
								></v-text-field>
							</v-card-text>
							<div class="d-flex justify-content-between text-h6 font-weight-bold py-2">
								<span class="summary-list-title">Tổng tiền tạm tính :</span>
								<span class="summary-list-text">$30</span>
							</div>
						</div>
						<v-btn
							block=""
							variant="flat"
							size="large"
							class="w-75 bg-red-darken-2"
						>
							Tiến hành đặt hàng
						</v-btn>
					</v-card>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container></v-app>
</template>

<style scoped></style>
