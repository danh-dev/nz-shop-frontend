import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vuetify from "vite-plugin-vuetify";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		vuetify(),
		svgLoader(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	optimizeDeps: {
		include: ["ckeditor5-custom-build/build/ckeditor"],
	},
	build: {
		commonjsOptions: {
			include: ["ckeditor5-custom-build/build/ckeditor"],
		},
	}
});
