<template>
  <div class="d-flex flex-d">
    <!--    <alert></alert>-->
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
import alert from '@/components/Alert/index.vue'
</script>

<style scoped lang="scss">
.content {
  max-width: 1450px;
  min-width: 1200px;
  min-height: calc(100vh - 64px);
  padding: 0 48px;
  margin: 0 auto;
}
</style>
