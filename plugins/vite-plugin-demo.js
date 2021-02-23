/*
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-23 16:20:38
 * @LastEditors: zhanfenghai
 * @Description:
 * @FilePath: \my-vite2-app\plugins\vite-plugin-demo.js
 */
export default function myDemo() {
  return {
    name: "my-demo",
    resolveId(source) {
      if (source === "virtual-module") {
        return source; // 返回source表明命中，vite不再询问其他插件处理该id请求
      }
      return null; // 返回null表明是其他id要继续处理
    },
    load(id) {
      if (id === "virtual-module") {
        return 'export default "This is virtual!"'; // 返回"virtual-module"模块源码
      }
      return null; // 其他id继续处理
    },
  };
}
