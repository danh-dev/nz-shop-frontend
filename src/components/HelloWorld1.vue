<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "../stores/counter";

const { count, doubleCount } = storeToRefs(useCounterStore());
const { increment } = useCounterStore();
</script>

<template>
	<v-btn @click="increment">count: {{ count }}</v-btn>
	<div>{{ doubleCount }}</div>
	<v-table
		fixed-header
		height="300px"
		hover
	>
		<thead>
			<tr>
				<th class="text-left">
					Tên Sản Phẩm
				</th>
				<th class="text-left">
					Giá
				</th>
				<th class="text-left">
					Số lượng
				</th>
				<th class="text-left">
					Ngày
				</th>
				<th class="text-left">
					Tổng tiền
				</th>
				<th class="text-left">
					Trạng thái
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="order in newOrders"
				:key="order.id"
			>
				<td>{{ order.name }}</td>
				<td>{{ order.price }}</td>
				<td>{{ order.quantity }}</td>
				<td>{{ order.date }}</td>
				<td>{{ order.price * order.quantity }}</td>
				<td class="d-flex align-center">
					<div>{{ order.status }}</div>
					<v-btn
						class="ml-auto"
						icon="mdi-close"
						variant="text"
						color="red-accent-4"
						size="small"
					></v-btn>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<style></style>
