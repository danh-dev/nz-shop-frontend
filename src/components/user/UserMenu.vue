<script setup>
import {siteData} from "@/stores/globals";

const siteStore = siteData();

const clickAction = () => {
    siteStore.logout();
};
</script>
<template>
	<v-card variant="flat">
		<v-list-item class="d-flex flex-column align-center">
			<v-avatar
				class="mb-3"
				variant="elevated"
				size="160"
				image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMFBAYB/8QALRAAAgEDAgQEBgMBAAAAAAAAAAECAwQRUpEFEyExEiJBURUyYXFygTNioUL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APeAA0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIADIAAAAAAAAAAAAAAAAAB9gW2tLn3MKXo31+wHRY8PddKpUbjTfZLuzUp2VvTWFSi/wAupfGKikkkkuiPplVM7S3msOjD9Izb3hvLTqW+Wl3i+/6NgMDy2QdPEaCo3LwvLLqjmNIAAAAAAAAAAAAAB38FSd3Jvuo9DgO7g81G7a9ZRwSq2wAQAABl8cisUZeuWjKNTjk1mlD1WWZZYgACgAAAAAAAAAABKlN0qsake8XkiAPTUKsa1KNSHytEzz1rd1LWWY+aD7xNWjxK2nFOU/A/aRlXYfJyUIuTeEjlqcRtoxyqil9I9TLvb6dy/DHy0/b3Aqu67r3Epp+XsvsVBIGkAAAAAAAAAAAALbehO4qKFNfd+woqTy8JZZ0U7C5q9VDC/s8Gxa2VK3XljmfrJ9zpwTVYi4VcY+anuPhNxqp7s2wQYnwm41U92PhNx7w3NsAYFTh9zDr4FL8Wc0lKDxJNP6nqCi4tqVeOKkcv0fqi6POgvu7WdrPElmL+WRQVAAAAAAAADDbSj1b7I9DZW8baio48z6yfuZHDKfjvIt9oLJt56kqrMjJXkZILMjJXkZAsyMleRkCzIyV5GQPlejCvSlTn2f8Ah52rTlSqyhJdYno8mTxeGK0Ki/6WGWDgABUAAABHmQ1LceOGpbgaPCP5qn4o08mPwutCNxJOS80fc1ebDXHcgnkZIc2GuO45sNcdwJ5GSHNhrjuObDXHcCeRkhzYa47jmw1x3Cp5GSHNhrjuObDXHcCeTg4t/FTfr4mdnNhrjuZ3Fa9N8uCmm857gcII8yGpbjxw1LcqJAjzIalufQP/2Q=="
			></v-avatar>
			<v-list-item-title class="text-body-2 font-weight-bold text-center"> {{ siteStore.userInfo.full_name }} </v-list-item-title>
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
				:to="{ name: `user-address` }"
				class="px-2 py-0"
				value="gift"
				color="red-accent-4"
			>
				<template v-slot:prepend>
					<v-icon
						class="mr-1"
						icon="mdi-text-account"
					></v-icon>
				</template>

				<v-list-item-title> Danh sách địa chỉ </v-list-item-title>
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
				:to="{ name: `user-feedback` }"
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

				<v-list-item-title @click="clickAction"> Thoát tài khoản </v-list-item-title>
			</v-list-item>

		</v-list>

	</v-card>
</template>

