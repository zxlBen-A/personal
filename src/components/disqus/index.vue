<template>
  <div id="comment"></div>
</template>

<script setup lang="ts">
import iDisqus from '../../../public/disqus/iDisqus.min.js'

let disq = new iDisqus('comment', {
  forum: 'ifool',
  api: 'http://api.fooleap.org/disqus',
  site: 'http://blog.fooleap.org',
  mode: 1,
  timeout: 3000,
  init: true
});

</script>
<!--<script src="../../../public/disqus/iDisqus.min.js"></script>-->

<style scoped lang="scss">
@import "../../../public/disqus/iDisqus.min.css";
</style>