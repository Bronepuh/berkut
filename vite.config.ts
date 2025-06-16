import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

const root = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: "/berkut/",
	resolve: {
		alias: {
			"@/": root + "/",
			"@shared/": root + "/shared/**/*",
			"@assets/": root + "/assets/**/*",
		},
		extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
	},
	build: {
		outDir: "dist",
	},
});
