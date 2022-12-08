<template>
  <div id="comment"></div>
</template>

<script setup lang="ts">
let disq = new iDisqus('comment', {
  forum: '博客',
  api: 'http://api.fooleap.org/disqus', //需要换成后台地址
  site: 'http://zxlben.top',
  mode: 1,
  timeout: 3000,
  init: true
});
disq.count() //查看评论数
console.log(disq, 111)
</script>

<style scoped lang="scss">
@import "../../../public/disqus/iDisqus.css";

#comment {
  height: 200px;
}
</style>
