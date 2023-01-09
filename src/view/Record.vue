<template>
  <!--  pc-->
  <div v-if="!isShow" class="w-full" style="margin-top: 20px">
    <mapIndex d-height="82vh" d-width="100%" />
  </div>
  <!--  移动端-->
  <div v-else class="mobile-record">
    <mapIndex d-height="82vh" d-width="100%" />
  </div>
</template>

<script lang="ts" setup>
import mapIndex from "@/components/map/index.vue";
import isShow from "../utils/judgeTheClient";
</script>

<style lang="scss" scoped>
.mobile-record {
  margin: 20px;
}
</style>
