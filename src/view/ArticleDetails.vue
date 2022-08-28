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
  <article class="prose prose-lg prose-stone max-w-none" :class="[isShow ? 'article_cont_mobile' : 'article_cont']">
    <div v-html="article"></div>
  </article>
  <!--  评论-->
  <Gitalks></Gitalks>
  <!--  回到顶部-->
  <UpperApex></UpperApex>
</template>

<script setup lang="ts">
import axios from 'axios'
import {useRouter} from 'vue-router'
import {marked} from 'marked'
import UpperApex from '@/components/UpperApex/index.vue'
import Gitalks from '@/components/Gitalks/index.vue'; //评论
import isShow from '../utils/judgeTheClient'

const router = useRouter()
const article = ref<string>('')
console.log(router.currentRoute.value.query);

axios({
  method: 'get',
  url: 'http://localhost:3000/src/assets/marked/VUE3.0学习.md',
}).then(({data}) => {
  console.log(data);
  article.value = marked.parse(data);  // 调用marked()方法，将markdown转换成html
}).catch(err => {
  console.log(err)
})


const previousStep = () => {
  router.back()
}

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
