<template>
  <router-view v-slot="{Component}">
    <keep-alive :include="state.includeList">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>
<script setup>
import {useRoute} from 'vue-router'

const state = reactive({
  includeList: []
})

const route = useRoute()
watch(() => route, (newVal, oldVal) => {
  if (newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1) {
    state.includeList.push(newVal.name);
  }
}, {deep: true}) // 开启深度监听

</script>
