<template>
  <div v-for="item in props.total" :key="item.id"
       class="article_component d-flex flex-d cursor-grabbing bg-base-100 shadow-xl rounded-2xl" @click="see(item.id)">
    <div class="d-flex ai-center title_cont title" :class="[isShow ? 'mobile-title' : 'pc-title']">
      <div class="title overflow-omit1">
        {{ item.art_name }}
      </div>
      <div class="special_column">
        {{ item.art_type }}
      </div>
    </div>
    <div class="d-flex flex-1 ai-center jc-between">
      <div class="article_content overflow-omit2">
        {{ item.art_description }}
      </div>
      <el-image :src="item.art_cover" fit="cover" class="img_row" v-if="!isShow"/>
    </div>
    <div class=" publish_events">
      {{ item.times }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import isShow from '../../utils/judgeTheClient'

const router = useRouter()
const props = defineProps({
  total: {
    type: Array,
    default: []
  }
})

const see = (id: number) => {
  router.push({
    path: '/articleDetails',
    query: {
      id: id
    }
  })
}
</script>

<style scoped lang="scss">
.article_component {
  height: 180px;
  padding: 10px 24px;
  margin-bottom: 14px;

  .title_cont {
    line-height: 38px;
  }

  .pc-title {
    margin-right: 150px;
  }

  .mobile-title {
    margin-right: 50px;
  }

  .title {
    height: 38px;
    font-weight: 700;
    font-size: 22px;
    //color: #1d2129;

    .special_column {
      position: relative;
      margin-left: 7px;
      padding: 0 10px;
      font-size: 16px;
      flex-shrink: 0;

      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 1px;
        height: 14px;
        background: #747786;
        content: " ";
      }
    }
  }

  .article_content {
    font-size: 16px;
    font-weight: 700;
    //color: #888888;
  }

  .img_row {
    flex-shrink: 0;
    width: 150px;
    height: 100px;
    border-radius: 3px;
    margin-left: 38px;
  }

  .publish_events {
    font-size: 16px;
    //color: #4e5969;
  }
}
</style>
