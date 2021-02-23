/*
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-22 16:51:56
 * @LastEditors: zhanfenghai
 * @Description:
 * @FilePath: \my-vite2-app\vite.config.js
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import element3 from "./plugins/element3.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
