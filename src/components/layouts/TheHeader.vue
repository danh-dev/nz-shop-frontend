<script setup>
import { useDisplay } from "vuetify";
import { useCartStore } from "@/stores/cart";
import { userData } from "@/stores/userData";

import HeaderButton from "../HeaderButton.vue";
import HeaderLogo from "../HeaderLogo.vue";

const { lgAndUp, mdAndUp } = useDisplay();
const cartStore = useCartStore();
const userStore = userData();


</script>

<template>
	<v-app-bar
		elevation="4"
		color="red-accent-4"
		scroll-behavior="elevate"
	>
		<v-container
			class="d-flex align-center justify-space-between py-0"
			:fluid="!lgAndUp"
		>
			<HeaderLogo class="order-first" />
			<HeaderButton
				class="d-none d-sm-block"
				id="categories"
			>
				<template #icon>mdi-list-box-outline</template>
				<template #label>Danh mục</template>
			</HeaderButton>

			<v-row style="max-width: 380px; min-width: 250px">
				<v-col cols="12">
					<v-text-field
						variant="solo"
						hide-details
						prepend-inner-icon="mdi-magnify"
						label="Bạn cần tìm gì?"
						single-line
						density="compact"
					/></v-col>
			</v-row>


			<!-- <HeaderButton class="d-none d-sm-block pa-1">
				<template #icon>mdi-phone</template>
				<template #label>Gọi mua hàng</template>
			</HeaderButton>

			<HeaderButton class="order-first order-sm-0 pa-1">
				<template #icon>mdi-store</template>
				<template #label>Cửa hàng gần bạn</template>
			</HeaderButton> -->

			<HeaderButton href="/tracking">
				<template #icon>mdi-truck-fast</template>
				<template #label>Tra cứu đơn hàng</template>
			</HeaderButton>

			<HeaderButton href="/cart">
				<template #icon>mdi-shopping-outline</template>
				<template #label>Giỏ hàng</template>
				<template #badge>
					<v-badge
						:content="cartStore.totalUnit"
						color="primary"
						max="9"
						:offset-y="mdAndUp ? 0 : -10"
						:inline=mdAndUp
						:floating=!mdAndUp
					/>
				</template>
			</HeaderButton>

			<HeaderButton
				:stacked="true"
				class="d-none d-sm-flex pa-1"
				href="/login"
			>
				<template #icon>mdi-account-circle-outline</template>
				<template #label>{{ userStore.full_name ? userStore.full_name : "Đăng nhập" }}</template>
			</HeaderButton>
		</v-container>
	</v-app-bar>

	<!-- <v-dialog
		transition="dialog-bottom-transition"
		width="300px"
		activator=".account"
	>
		<template v-slot:default="{ isActive }">
			<v-card
				position="relative"
				rounded="lg"
				class="pa-3"
			>
				<v-card-title class="text-center text-h5 font-weight-black text-red-accent-4 pa-0 mb-2">Smember</v-card-title>
				<v-card-text class="text-body-1 font-weight-bold pa-0 mb-2">
					Vui lòng đăng nhập tài khoản Smember để có trải nghiệm mua sắm tốt hơn
				</v-card-text>

				<v-sheet class="d-flex pa-0 h-50">
					<v-btn
						color="red-accent-4"
						variant="flat"
						class="flex-1-1 me-2"
					>
						Đăng nhập ngay
					</v-btn>
					<v-btn
						variant="outlined"
						color="red-accent-4"
						class="flex-1-1"
					>
						Đăng kí
					</v-btn>
				</v-sheet>

				<v-btn
					icon="mdi-close-circle"
					color="red"
					variant="plain"
					@click="isActive.value = false"
					:ripple="false"
					density="compact"
					position="absolute"
					location="top right"
					rounded="circle"
				></v-btn>
			</v-card>
		</template>
	</v-dialog> -->
</template>

<style></style>
