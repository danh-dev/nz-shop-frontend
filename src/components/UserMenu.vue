<script setup>
defineProps({
	user: Object
});
</script>
<template>
	<v-card variant="flat">
		<v-list-item class="d-flex flex-column align-center">
			<v-avatar
				class="mb-3"
				variant="elevated"
				size="160"
				image="https://tse4.mm.bing.net/th?id=OIF.KkNJGnjHefW6cs0H12qmpw&pid=Api&P=0&h=180"
			></v-avatar>
			<v-list-item-title class="text-body-2 font-weight-bold text-center"> {{ user.name }} </v-list-item-title>
		</v-list-item>
		<v-list class="d-flex flex-column pa-0">

			<v-list-item
				:to="{
					name: `user-home`,
				}"
				class="px-2 py-0"
				value="home"
				color="red-accent-4"
			>
				<template v-slot:prepend>
					<v-icon
						class="mr-1"
						icon="mdi-home-outline"
					></v-icon>
				</template>

				<v-list-item-title> Trang chủ </v-list-item-title>
			</v-list-item>
			<v-list-item
				:to="{ name: `user-history` }"
				class="px-2 py-0"
				value="history"
				color="red-accent-4"
			>
				<template v-slot:prepend>
					<v-icon
						class="mr-1"
						icon="mdi-clipboard-text-clock-outline"
					></v-icon>
				</template>

				<v-list-item-title> Lịch sử mua hàng </v-list-item-title>
			</v-list-item>
			<v-list-item
				:to="{ name: `user-promotion` }"
				class="px-2 py-0"
				value="gift"
				color="red-accent-4"
			>
				<template v-slot:prepend>
					<v-icon
						class="mr-1"
						icon="mdi-gift-outline"
					></v-icon>
				</template>

				<v-list-item-title> Ưu đãi của bạn </v-list-item-title>
			</v-list-item>
			<v-list-item
				:to="{ name: `user-account` }"
				class="px-2 py-0"
				value="account"
				color="red-accent-4"
			>
				<template v-slot:prepend>
					<v-icon
						class="mr-1"
						icon="mdi-account"
					></v-icon>
				</template>

				<v-list-item-title> Tài khoản của bạn </v-list-item-title>
			</v-list-item>
			<v-list-item
				class="px-2 py-0"
				value="note"
				color="red-accent-4"
			>
				<template v-slot:prepend>
					<v-icon
						class="mr-1"
						icon="mdi-note-edit-outline"
					></v-icon>
				</template>

				<v-list-item-title> Góp ý - Phản đối </v-list-item-title>
			</v-list-item>
			<v-list-item
				class="px-2 py-0"
				value="exit"
				color="red-accent-4"
			>
				<template v-slot:prepend>
					<v-icon
						class="mr-1"
						icon="mdi-exit-to-app"
					></v-icon>
				</template>

				<v-list-item-title> Thoát tài khoản </v-list-item-title>
			</v-list-item>

		</v-list>

	</v-card>
</template>

