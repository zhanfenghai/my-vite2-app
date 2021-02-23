<!--
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-22 16:53:24
 * @LastEditors: zhanfenghai
 * @Description: 
 * @FilePath: \my-vite2-app\src\views\home.vue
-->
<template>
  <h1>{{ state.count }}</h1>
  <el-button @click="dotest">提示</el-button>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import request from 'utils/request'

defineProps({
  msg: String
})

const state = reactive({ count: 10 })
const dotest = () => {
  request({
    url: '/testurl'
  })

}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>