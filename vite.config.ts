import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	plugins: [
		vue(),
		DefineOptions.vite(),
		dts({
			include: ["src/main.ts", "src/index.vue"],
			skipDiagnostics: true,
			beforeWriteFile(filePath, content) {
				filePath = filePath.replace("main.d.ts", "index.d.ts");
				return { filePath, content };
			},
		}),
	],
	optimizeDeps: {
		exclude: ["vue-demi"]
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/main.ts"),
			name: "MoneAdminLayout",
			fileName: (format) => `index.${format}.js`
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue"
				}
			}
		},
		sourcemap: false,
	}
});
