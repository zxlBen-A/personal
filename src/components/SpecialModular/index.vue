<template>
  <div v-for="item in props.total" :key="item.id"
       class="d-flex ai-center bg-base-100 column_Container rounded-2xl cursor"
       @click="forward(item.col_id,item.col_name)">
    <div class="img_content" :class="isShow ? 'mobile_img_content':''">
      <img :src="item.col_cover" class="img_row" alt="">
    </div>
    <div class="d-flex flex-d flex-1 jc-between column_right">
      <div class="title overflow-omit1">
        {{ item.col_name }}
      </div>
      <div class="contents overflow-omit1">{{ item.col_description }}</div>
      <div class="infos d-flex gap-5">
        <div>{{ item.col_times }}</div>
        <div v-if="!isShow">文章数：{{ item.col_columns }}</div>
        <div v-if="!isShow">阅读量：{{ item.col_reading }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import isShow from "../../utils/judgeTheClient";

const props = defineProps({
  total: {
    type: Array,
    default: []
  }
})

const router = useRouter()
const forward = (col_id: number, specialColumn: string) => {
  router.push({
    path: '/detail',
    query: {
      col_id,
      specialColumn
    }
  })
}
</script>

<style scoped lang="scss">
.column_Container {
  width: 100%;
  height: 160px;
  padding: 16px;
  margin-bottom: 14px;

  .img_content {
    width: 200px;
    height: 128px;
    flex-shrink: 0;

    .img_row {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .mobile_img_content {
    width: 150px;
    height: 128px;
    flex-shrink: 0;
  }


  .column_right {
    width: 100%;
    height: 100%;
    margin: 0 0 0 18px;

    .title {
      font-size: 18px;
      color: #1d2129;
    }

    .contents {
      font-size: 16px;
      color: #4e5969;
    }

    .infos {
      @extend .contents;
      color: #86909c;
    }
  }
}

</style>
