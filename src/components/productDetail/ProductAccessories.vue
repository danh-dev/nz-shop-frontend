<script setup>
import informations from "../../../public/informations.js";
</script>

<template>
	<!-- Begin : Phụ kiện mua cùng -->
	<v-sheet
		class="mx-auto d-lg-block d-none"
		elevation="3"
		rounded="2"
		max-width="100%"
		v-for="information in informations"
		:key="information.id"
	>
		<v-slide-group
			class="pa-1 my-2"
			selected-class=""
			mandatory
			show-arrows
		>
			<v-slide-group-item
				v-for="item in information.anotherAccessories"
				:key="item.id"
				v-slot="{ toggle, selectedClass }"
			>
				<v-card
					color=""
					:class="['ma-2', selectedClass]"
					width="180"
					@click="toggle"
				>
					<v-sheet>
						<v-img
							:src="item.image"
							class="w-100"
						/>
						<div class="px-1 text-center">
							<h5>{{ item.name }}</h5>
							<v-rating
								:model-value="item.rating"
								color="yellow-darken-3"
								readonly
								density="compact"
								size="small"
								class="mx-2"
							>
							</v-rating>
							<v-sheet
								class="p-2 text-center text-danger d-flex align-center justify-content-between"
							>
								<b>{{ item.price }}</b>
								<p class="text-muted text-decoration-line-through text-medium">
									{{ item.originPrice }}
								</p>
							</v-sheet>
						</div>
					</v-sheet>
				</v-card>
			</v-slide-group-item>
		</v-slide-group>
	</v-sheet>
</template>

<style></style>
