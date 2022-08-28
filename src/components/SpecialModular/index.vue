<template>
  <div v-for="item in 5" class="d-flex ai-center bg-base-100 column_Container rounded-2xl cursor" @click="forward">
    <div class="img_content" :class="isShow ? 'mobile_img_content':''">
      <img src="../../assets/img/article/article.png" class="img_row" alt="">
    </div>
    <div class="d-flex flex-d flex-1 jc-between column_right">
      <div class="title overflow-omit1">
        你不知道系列as
      </div>
      <div class="contents overflow-omit1">致力更新好文章</div>
      <div class="infos d-flex gap-5">
        <div>2022-7-25</div>
        <div v-if="!isShow">文章数：7</div>
        <div v-if="!isShow">阅读量：7000</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import isShow from "../../utils/judgeTheClient";

const router = useRouter()
const forward = () => {
  router.push('/detail')
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
