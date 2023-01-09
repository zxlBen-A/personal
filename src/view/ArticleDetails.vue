<template>
  <!--  html5的文章标签，配合tailwindcss插件-->
  <article
    v-if="details.length > 0"
    class="prose prose-lg prose-stone max-w-none"
    :class="[isShow ? 'article_cont_mobile' : 'article_cont']"
  >
    <div class="articleTitle d-flex jc-center">
      <div class="font-sans font-semibold" style="font-size: 24px">
        {{ details[0].art_title }}
      </div>
    </div>
    <div class="d-flex">
      <div class="bg-base-100 flex-1 rounded-2xl" style="padding: 24px">
        <Viewer :plugins="plugins" :value="article" />
      </div>
      <!--    目录-->
      <Catalogue :container="container" />
    </div>
  </article>
  <!--  评论-->
  <Disqus />
  <!--  <Gitalks></Gitalks>-->
  <!--  回到顶部-->
  <UpperApex />
</template>

<script setup lang="ts">
import type {Ref} from 'vue'
import {useRouter} from 'vue-router'
import gfm from '@bytemd/plugin-gfm'
import { Viewer } from '@bytemd/vue-next'
import highlight from '@bytemd/plugin-highlight'
import breaks from '@bytemd/plugin-breaks'
import gemoji from '@bytemd/plugin-gemoji'
import UpperApex from '@/components/UpperApex/index.vue'
import Disqus from '@/components/Disqus/index.vue' //评论
import Catalogue from '@/components/Catalogue/index.vue' //目录
import isShow from '../utils/judgeTheClient'
import { articleDetails } from '../api'
import 'highlight.js/styles/a11y-light.css' //高亮css
import 'bytemd/dist/index.min.css'

const router = useRouter()
const article: Ref<string> = ref('')
let details: Ref<any[]> = ref([])
let id = computed(() => router.currentRoute.value.params.id)
const container: Ref<string> = ref('.markdown')

//插件
const plugins = [breaks(), gfm(), highlight(), gemoji()]

//在dom元素更新完成后在进行修改值
watch(
  article,
  () => {
    container.value = '.markdown-body'
  },
  {
    flush: 'post'
  }
)

//获取文章详情
const detail = async (id) => {
  let { data } = await articleDetails(id.value)

  details.value = data.data
  article.value = data.data[0].art_content
}

const previousStep = () => {
  router.back()
}

onMounted(() => {
  detail(id)
})
</script>

<style scoped lang="scss">
.articleTitle {
  margin-bottom: 8px;
}

.article_cont {
  padding: 24px 38px 0 38px;
}

.article_cont_mobile {
  padding: 24px 20px 0 20px;
}

.thumbtack {
  position: sticky;
  top: 64px;
  width: 100vw;
  line-height: 38px;
  height: 38px;
  padding-left: 14px;
  backdrop-filter: saturate(50%) blur(8px);
}

.article-cont {
  padding: 24px 38px 0 38px;
}

.markdown-body {
  color: hsl(var(--p));
}
</style>
