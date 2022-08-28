<template>
  {{ name }}
</template>
<script lang="ts" setup>

const name = ref<string>('Hello World')//可以通过范型显示约束 Ref<string[]>
defineProps<{ msg: string, aut: Array<number> }>()

</script>
<style scoped>

</style>
