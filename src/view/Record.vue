<template>
  <!--  pc-->
  <div v-if="!isShow" class="w-full" style="margin-top: 20px">
    <mapIndex d-width="100%" d-height="70vh" />
  </div>
  <!--  移动端-->
  <div v-else class="mobile-record">
    <mapIndex d-width="100%" d-height="70vh" />
  </div>
</template>

<script setup lang="ts">
import mapIndex from '@/components/map/index.vue'
import isShow from '../utils/judgeTheClient'
</script>

<style scoped lang="scss">
.mobile-record {
  margin: 20px;
}
</style>
