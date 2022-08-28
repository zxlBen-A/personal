<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">专栏</h2>
      <p class="p-2">人生就是由欲望不满足而痛苦和满足之后无趣这两者所构成。你满心期待着未来的某个快乐，未必理智认知到了它是短暂的而不会持久。人的一生的本质是痛苦，快乐只是昙花一现。</p>
      <div class="card-actions">
        <div class="stats w-full shadow">
          <div class="stat">
            <div class="stat-title">专栏总数量</div>
            <div class="stat-value">5</div>
          </div>
        </div>
        <div class="stats w-full shadow ">
          <div class="stat">
            <div class="stat-title">文章总数量</div>
            <div class="stat-value">25</div>
          </div>
        </div>
        <div class="stats w-full shadow">
          <div class="stat">
            <div class="stat-title">阅读总数量</div>
            <div class="stat-value">{{ shu(89401) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


//数字格式化
const shu = (val) => {
  return val.toLocaleString()
}
</script>

<style scoped lang="scss">

</style>
