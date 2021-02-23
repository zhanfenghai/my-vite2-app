/*
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-22 16:18:53
 * @LastEditors: zhanfenghai
 * @Description:
 * @FilePath: \my-vite2-app\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: "/", component: () => import("views/home.vue") }],
});

export default router;
