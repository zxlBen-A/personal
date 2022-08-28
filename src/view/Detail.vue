<template>
  <!--  pc-->
  <div class="d-flex" style="margin-top: 20px" v-if="!isShow">
    <div class="mr-16">
      <Article></Article>
    </div>
    <div>
      <SpecialDescr></SpecialDescr>
    </div>
  </div>
  <!--  移动端-->
  <div v-else class="mobile-detail">
    <Article></Article>
  </div>
</template>

<script setup lang="ts">
import Article from '@/components/Article/index.vue'
import SpecialDescr from '@/components/SpecialDescr/index.vue'
import isShow from "../utils/judgeTheClient";

</script>

<style scoped lang="scss">
.mobile-detail {
  margin: 20px;
}
</style>
