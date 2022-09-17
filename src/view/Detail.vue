<template>
  <!--  pc-->
  <div class="d-flex columnData" v-if="!isShow">
    <div class="flex-1 mr-16">
      <Article :total="total"></Article>
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
import {useRouter} from "vue-router";
import Article from '@/components/Article/index.vue'
import SpecialDescr from '@/components/SpecialDescr/index.vue'
import isShow from "../utils/judgeTheClient";
import {getScrollHeight, getScrollTop, getWindowHeight} from "../utils/screen";
import {columnQuery} from "../api";


interface paginationParameters {
  pageSize: number,
  pageNum: number,
  condition: any
}

const router = useRouter()
const total = ref<Array<object>>([])
let isItPossibleToRequest = ref<boolean>(true)
const pagination = reactive<paginationParameters>({
  pageSize: 5,
  pageNum: 1,
  condition: router.currentRoute.value.query.specialColumn
})

//进页面就开始监听
onMounted(() => {
  window.addEventListener('scroll', load);
})

const load = () => {
  //判断是否到页面的底部
  if (Math.ceil(getScrollTop() + getWindowHeight()) >= getScrollHeight()) {
    if (!isItPossibleToRequest.value) return
    pagination.pageNum += 1
    setTimeout(() => {
      allColumns()
    }, 1000)
  }
}

const allColumns = async () => {
  let {data} = await columnQuery(pagination)
  total.value.push(...data.data)
  isItPossibleToRequest.value = data.turnOver
}
allColumns()
</script>

<style lang="scss">
.columnData {
  margin-top: 20px
}

.mobile-detail {
  margin: 20px;
}
</style>
