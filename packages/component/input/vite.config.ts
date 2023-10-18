import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "suiInput",
      fileName: "sui-input",
    },
    minify: false,
    rollupOptions: {
      external: [/@sui.*/, "vue"],
    },
  },
});