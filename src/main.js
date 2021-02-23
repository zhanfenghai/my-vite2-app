/*
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-22 16:42:51
 * @LastEditors: zhanfenghai
 * @Description:
 * @FilePath: \my-vite2-app\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "styles/index.scss";
import elements from "../plugins/element3";

const app = createApp(App);
app.use(router);
elements(app);
app.use(store);
app.mount("#app");
