import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options";
import unocss from "unocss/vite";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	plugins: [
		vue(),
		DefineOptions.vite(),
		unocss()
	]
});
