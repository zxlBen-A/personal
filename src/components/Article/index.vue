<template>
  <div
      v-for="item in props.total"
      :key="item.id"
      class="article_component d-flex cursor-grabbing bg-base-100 shadow-xl rounded-2xl"
      @click="jumpTheArticle(item.id)">
    <div class="d-flex flex-d flex-1">
      <div
          :class="[isShow ? 'mobile-title' : 'pc-title']"
          class="d-flex ai-center title_cont title">
        <div class="title overflow-omit1">
          {{ item.art_name }}
        </div>
      </div>
      <div class="d-flex flex-1 ai-center jc-between">
        <div class="article_content overflow-omit2">
          {{ item.art_description }}
        </div>
      </div>
      <div class="publish_events d-flex ai-center jc-between">
        <span class="d-flex ai-center">
          <svg class="w-4 h-4 scriptwriter" fill="none" stroke="currentColor" stroke-width="1.5"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span>
            {{ item.is_original }}
          </span>
        </span>
        <span class="d-flex ai-center">
          <svg class="w-4 h-4 scriptwriter" fill="none" stroke="currentColor" stroke-width="1.5"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ item.times }}
        </span>
        <span class="special_column d-flex ai-center">
          <svg class="w-4 h-4 scriptwriter" fill="none" stroke="currentColor" stroke-width="1.5"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

        {{ item.art_type }}
        </span>
      </div>
    </div>
    <div class="d-flex ai-center jc-center">
      <img v-if="!isShow" :src="item.art_cover" class="img_row" fit="cover" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import isShow from "../../utils/judgeTheClient";

const router = useRouter();
const props = defineProps({
  total: {
    type: Array,
    default: []
  }
});

const jumpTheArticle = (id: number) => {
  router.push({
    name: "articleDetails",
    params: {
      id: id
    }
  });
};
</script>

<style lang="scss" scoped>
.article_component {
  width: auto;
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
    font-weight: 600;
    font-size: 20px;
    //color: #1d2129;

    .special_column {
      position: relative;
      margin-left: 7px;
      padding: 0 10px;
      font-size: 14px;
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
        content: ' ';
      }
    }
  }

  .article_content {
    font-size: 16px;
    //font-weight: 500;
    //color: #888888;
  }

  .img_row {
    flex-shrink: 0;
    width: 180px;
    height: 120px;
    border-radius: 3px;
    margin-left: 38px;
  }

  .publish_events {
    font-size: 14px;
  }
}

.scriptwriter {
  margin-right: 3px;
}
</style>
