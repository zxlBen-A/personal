<template>
  <div class="button d-flex ai-center jc-center" @click="recur">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
         stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
const recur = () => {
  let top = document.documentElement.scrollTop || document.body.scrollTop
  // 实现滚动效果
  const timeTop = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50
    if (top <= 0) {
      clearInterval(timeTop)
    }
  }, 10)
  //直接回到顶部
  // document.body.scrollTop = document.documentElement.scrollTop = 0;
}
</script>

<style scoped lang="scss">
.button {
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 8px;
  right: 8px;
  background: #f72359;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  border-radius: 50%;
}
</style>
