<template>
  <div class="d-flex flex-d">
    <leftSide></leftSide>
    <div style="width: 100%" class="bg-base-200">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import leftSide from '@/components/leftSide/index.vue'

const name = $ref('hhh')
console.log(name, 1111111111);

</script>

<style scoped lang="scss">
.content {
  max-width: 1450px;
  min-width: 1200px;
  min-height: calc(100vh - 84px);
  padding: 0 48px;
  margin: 0 auto;
}
</style>
