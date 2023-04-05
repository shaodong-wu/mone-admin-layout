import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv, BuildOptions } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import defineOptions from "unplugin-vue-define-options";
import unocss from "unocss/vite";

export default defineConfig((configEnv: ConfigEnv) => {
	const viteEnv = loadEnv(configEnv.mode, `.env.${configEnv.mode}`);
	const library = viteEnv.VITE_IS_LIB === "true";

	/**
	 * @description 库构建模式
	 */
	const libraryBuild = (): BuildOptions => ({
		lib: {
			entry: path.resolve(__dirname, "src/main.ts"),
			name: "MoneAdminLayout",
			fileName: (format: string) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
		sourcemap: false,
	});

	/**
	 * @description 项目构建模式
	 */
	const projectBuild = (): BuildOptions => ({
		outDir: "docs",
		sourcemap: false,
	});

	return {
		base: "./",
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			host: "0.0.0.0",
			port: 3000,
		},
		plugins: [
			vue(),
			defineOptions.vite(),
			unocss({
				configFile: "uno.config.ts",
				include: ["src/example/*.vue"],
			}),
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
			exclude: ["vue-demi"],
		},
		build: library ? libraryBuild() : projectBuild(),
	};
});
