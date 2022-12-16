<template>
  <div id="waline" class="comment" />
</template>

<script setup>
import { init } from '@/utils/useWaline.mjs'

onMounted(() => {
  init({
    el: '#waline',
    serverURL: 'https://www.zxlben.xyz/',
    // 设置 emoji 为微博与哔哩哔哩
    emoji: [
      '//unpkg.com/@waline/emojis@1.1.0/weibo',
      '//unpkg.com/@waline/emojis@1.1.0/bilibili',
      '//unpkg.com/@waline/emojis@1.1.0/bmoji',
      '//unpkg.com/@waline/emojis@1.1.0/qq',
      '//unpkg.com/@waline/emojis@1.1.0/tieba',
      '//unpkg.com/@waline/emojis@1.1.0/tw-emoji'
    ],
    // 表情包搜索
    search: true,
    // 文章反应
    reaction: true,
    // 浏览量统计
    pageview: false,
    // 评论数统计
    comment: false
  })
})
</script>
<style scoped lang="scss">
.comment {
  margin: 18px 38px;
}
</style>
