<template>
  <!--  html5的文章标签，配合tailwindcss插件-->
  <div
      v-if="details.length > 0"
      :class="[isShow ? 'article_cont_mobile' : 'article_cont']">
    <div class="d-flex">
      <div class="essay bg-base-100 flex-1 rounded-2xl">
        <div class="headline font-sans font-semibold">
          {{ details[0].art_title }}
        </div>
        <div class="introduce d-flex ai-center">
          <img alt="" class="headPortrait" src="../assets/img/article/touxiang1.jpg">
          <div>
            <a class="introduce">赵小磊Ben</a>
          </div>
        </div>
        <Viewer :plugins="plugins" :value="article" />
      </div>
      <!--    目录-->
      <Catalogue :container="container" class="directory" />
    </div>
  </div>
  <!--  评论-->
  <Disqus />
  <!--  回到顶部-->
  <UpperApex />
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";
import gemoji from "@bytemd/plugin-gemoji";
import UpperApex from "@/components/UpperApex/index.vue";
import Disqus from "@/components/Disqus/index.vue"; //评论
import Catalogue from "@/components/Catalogue/index.vue"; //目录
import isShow from "../utils/judgeTheClient";
import { articleDetails } from "../api";
import "bytemd/dist/index.css";
import "../styles/markdown/index.less";
// import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/styles/a11y-light.css";

const router = useRouter();
const article: Ref<string> = ref("");
let details: Ref<any[]> = ref([]);
let id = computed(() => router.currentRoute.value.params.id);
const container: Ref<string> = ref(".markdown");

//插件
const plugins = [breaks(), gfm(), highlight(), gemoji()];

//在dom元素更新完成后在进行修改值
watch(
    article,
    () => {
      container.value = ".markdown-body";
    },
    {
      flush: "post"
    }
);

//获取文章详情
const detail = async (id) => {
  let { data } = await articleDetails(id.value);

  details.value = data.data;
  article.value = data.data[0].art_content;
};

onMounted(() => {
  detail(id);
});
</script>

<style lang="scss" scoped>
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
  //color: hsl(var(--p));
}

.directory {
  flex-shrink: 0;
}

.essay {
  width: 856px !important;
  padding: 24px;

  .headline {
    margin-bottom: 8px;
    font-size: 32px;
  }
}

.introduce {
  margin-bottom: 18px;

  .headPortrait {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border-radius: 50%;
  }

  .introduce {
    font-size: 16px;
    margin-right: 20px;
  }
}

.prose pre {
  background: none !important;
}
</style>
