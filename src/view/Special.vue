<template>
  <!--  pc端-->
  <div class="d-flex" v-if="!isShow">
    <div class="flex-1 mr-16" style="margin-top: 20px;">
      <SpecialModular></SpecialModular>
    </div>
    <div style="margin-top: 20px;">
      <SpecialDescr></SpecialDescr>
    </div>
  </div>
  <!--  移动端-->
  <div v-else class="mobile-special">
    <SpecialModular></SpecialModular>
  </div>
</template>

<script setup lang="ts">
import SpecialModular from '@/components/SpecialModular/index.vue'
import SpecialDescr from '@/components/SpecialDescr/index.vue'
import isShow from '../utils/judgeTheClient'

const name = ref<number>(111)
</script>

<style lang="scss">
.mobile-special {
  margin: 20px;
}
</style>
