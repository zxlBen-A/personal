<template>
  <el-affix class="thumbtack d-flex ai-center bg-base-100 bg-opacity-10" v-if="isShow">
    <div class="d-flex ai-center cursor-pointer hover:text-gray-500" @click="previousStep">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
           stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      <div>
        返回
      </div>
    </div>
  </el-affix>
  <!--  html5的文章标签，配合tailwindcss插件-->

  <article v-if="details" class="prose prose-lg prose-stone max-w-none"
           :class="[isShow ? 'article_cont_mobile' : 'article_cont']">
    <div class="d-flex jc-center">
      <h1>{{ details[0].art_title }}</h1>
    </div>
    <div v-html="article"></div>
  </article>
  <!--  评论-->
  <div id="disqus_thread"></div>
  <Gitalks></Gitalks>
  <!--  回到顶部-->
  <UpperApex></UpperApex>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {marked} from 'marked'
import UpperApex from '@/components/UpperApex/index.vue'
import Gitalks from '@/components/Gitalks/index.vue'; //评论
import isShow from '../utils/judgeTheClient'
import {articleDetails} from '../api/index'

const router = useRouter()
const article = ref<string>('')
let details = ref<Array<object>>()
let id = router.currentRoute.value.query.id


//获取文章详情
const detail = async (id) => {
  let {data} = await articleDetails(id)
  details.value = data.data
  article.value = marked.parse(data.data[0].art_content); // 调用marked()方法，将markdown转换成html
}

const previousStep = () => {
  router.back()
}

detail(id)
</script>

<style scoped lang="scss">
.article_cont {
  padding: 24px 38px 0 38px;
}

.article_cont_mobile {
  padding: 24px 20px 0 20px;
}

.thumbtack {
  position: sticky;
  top: 64px;
  width: 100%;
  line-height: 38px;
  height: 38px;
  padding-left: 14px;
  backdrop-filter: saturate(50%) blur(8px);
}

.article-cont {
  padding: 24px 38px 0 38px;
}
</style>
