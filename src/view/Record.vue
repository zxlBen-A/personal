<template>
  <!--  pc-->
  <div class="w-full" v-if="!isShow" style="margin-top: 20px">
    <mapIndex dWidth="100%" dHeight="70vh"></mapIndex>
  </div>
  <!--  移动端-->
  <div v-else class="mobile-record">
    <mapIndex dWidth="100%" dHeight="70vh"></mapIndex>
  </div>
</template>

<script setup lang="ts">
import mapIndex from '@/components/map/index.vue'
import isShow from "../utils/judgeTheClient";

</script>

<style scoped lang="scss">
.mobile-record {
  margin: 20px;
}
</style>
