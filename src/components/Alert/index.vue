<template>
  <div v-if="isShow" class="w-auto h-14 alert alert-warning shadow-lg alert-hint">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
      <span>Warning: Invalid email address!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

let isShow = ref(false)
onMounted(() => {
  setTimeout(() => {
    isShow.value = true
  }, 3000)
})
</script>

<style scoped lang="scss">
.alert-hint {
  position: fixed;
  left: 50%;
  top: 30px;
  padding: 0 8px;
  transform: translate(-50%);
  opacity: 1;
  z-index: 9999;
  animation-name: fadenum;
  animation-duration: 4s;
  animation-fill-mode: forwards
}

@keyframes fadenum {
  0% {
    opacity: 1;
    display: block;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
</style>
