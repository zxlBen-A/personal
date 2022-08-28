<template>
  <!--  评论-->
  <div id="container" class="comments"></div>
</template>

<script setup lang="ts">
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

const gitalk = new Gitalk({
  id: location.pathname,      // 文章id
  clientID: 'b57edafd807521a50039',
  clientSecret: 'f399d6f40297b2eac8b03b0215436cb759fef80c',//注册的id
  repo: 'commentSystem',      // 仓库名
  owner: 'zhaoyanjiao-com',
  admin: ['zhaoyanjiao-com'],
  // perPage: 50,
  labels: ['zhaoyanjiao-com'],
  distractionFreeMode: false  // Facebook-like distraction free mode
})

onMounted(() => {
  gitalk.render('container')
})
</script>
<style scoped lang="scss">
.comments {
  margin: 0 20px;
}
</style>