<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ props.details.col_name }}</h2>
      <p class="p-2">{{ props.details.col_describe }}</p>
      <div class="card-actions">
        <div class="stats w-full shadow" v-if="!props.details.specialColumn">
          <div class="stat">
            <div class="stat-title">专栏总数量</div>
            <div class="stat-value">{{ props.details.col_total }}</div>
          </div>
        </div>
        <div class="stats w-full shadow">
          <div class="stat">
            <div class="stat-title">文章总数量</div>
            <div class="stat-value">{{ props.details.col_article }}</div>
          </div>
        </div>
        <div class="stats w-full shadow">
          <div class="stat">
            <div class="stat-title">阅读总数量</div>
            <div class="stat-value">{{ shu(parseInt(props.details.col_volume)) }}</div>
          </div>
        </div>
        <div class="stats w-full shadow" v-if="props.details.specialColumn">
          <div class="stat">
            <div class="stat-title">专栏创建时间</div>
            <div class="stat-value">{{ shu(parseInt(props.details.col_volume)) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface parameterInterface {}

const props = defineProps({
  details: {
    type: Object,
    default: {}
  }
})
//数字格式化
const shu = (val) => {
  return val.toLocaleString()
}
</script>

<style scoped lang="scss"></style>
