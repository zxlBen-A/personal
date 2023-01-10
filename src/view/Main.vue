<template>
  <div class="d-flex flex-d">
    <leftSide />
    <div class="bg-base-200">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import leftSide from "@/components/leftSide/index.vue";
</script>

<style lang="scss" scoped>
.content {
  max-width: 1450px;
  min-width: 1200px;
  min-height: calc(100vh - 64px);
  padding: 0 48px;
  margin: 20px auto 0;
}
</style>
