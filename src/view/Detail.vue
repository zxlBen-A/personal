<template>
  <!--  pc-->
  <div v-if="!isShow" class="d-flex columnData">
    <div class="flex-1 mr-16">
      <Article :total="total" />
    </div>
    <div class="theColumnSection">
      <SpecialDescr :details="singleMessage" />
    </div>
  </div>
  <!--  移动端-->
  <div v-else class="mobile-detail">
    <Article />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Article from '@/components/Article/index.vue'
import SpecialDescr from '@/components/SpecialDescr/index.vue'
import isShow from '../utils/judgeTheClient'
import { getScrollHeight, getScrollTop, getWindowHeight } from '../utils/screen'
import { columnQuery, singleColumn } from '../api'

interface paginationParameters {
  pageSize: number
  pageNum: number
  condition: any
}

const router = useRouter()
let { specialColumn } = router.currentRoute.value.query
const total = ref<Array<object>>([])
let isItPossibleToRequest = ref<boolean>(true)
const singleMessage = ref<object>()
const pagination = reactive<paginationParameters>({
  pageSize: 5,
  pageNum: 1,
  condition: specialColumn
})

//进页面就开始监听
onMounted(() => {
  window.addEventListener('scroll', load)
})

const load = () => {
  //判断是否到页面的底部
  if (Math.ceil(getScrollTop() + getWindowHeight()) >= getScrollHeight()) {
    if (!isItPossibleToRequest.value) {
      return
    }
    pagination.pageNum += 1
    setTimeout(() => {
      allColumns()
    }, 1000)
  }
}

const allColumns = async () => {
  let { data } = await columnQuery(pagination)

  total.value.push(...data.data)
  isItPossibleToRequest.value = data.turnOver
}
//对应专栏数据
const columnData = async () => {
  let { data } = await singleColumn({ id: router.currentRoute.value.query.col_id })
  let digital = data.data[0]

  singleMessage.value = {
    col_name: digital.col_name,
    col_describe: digital.col_description,
    col_article: digital.col_columns,
    col_volume: digital.col_reading,
    col_times: digital.col_times,
    specialColumn
  }
}

allColumns()
columnData()
</script>

<style lang="scss">
.columnData {
  margin-top: 20px;
}

.mobile-detail {
  margin: 20px;
}

.theColumnSection {
  position: sticky;
  top: 74px;
  height: 350px;
}
</style>
