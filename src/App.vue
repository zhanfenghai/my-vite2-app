<!--
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-22 16:22:00
 * @LastEditors: zhanfenghai
 * @Description: 
 * @FilePath: \my-vite2-app\src\App.vue
-->
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <span>{{name}}</span>
  <router-view></router-view>
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
import {ref} from 'vue'
import HelloWorld from 'comps/HelloWorld.vue'
const name = ref('zhan')
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>