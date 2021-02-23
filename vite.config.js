/*
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-23 16:27:01
 * @LastEditors: zhanfenghai
 * @Description:
 * @FilePath: \my-vite2-app\vite.config.js
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import inject from "./plugins/vite-plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), inject()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      comps: path.resolve(__dirname, "src/components"),
      views: path.resolve(__dirname, "src/views"),
      styles: path.resolve(__dirname, "src/styles"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
});
