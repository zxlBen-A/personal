<template>
  <!--pc-->
  <div v-if="!isShow" class="home-conter d-flex">
    <div v-if="information" class="introduce">
      <div class="card w-full p-4 bg-base-100 shadow-xl">
        <figure class="px-3">
          <label class="swap swap-flip">
            <input type="checkbox" />
            <div class="swap-off w-32">
              <img
                  :src="information.data[0].head_portrait"
                  alt="Shoes"
                  class="mask mask-squircle" />
            </div>
            <div class="swap-on w-32">
              <img :src="information.data[0].WeChat" alt="Shoes" class="" />
            </div>
          </label>
        </figure>
        <div class="card-body py-4 items-center text-center">
          <h2 class="card-title">
            {{ information.data[0].name }}
          </h2>
          <p>
            {{ information.data[0].occupation }}
          </p>
        </div>
      </div>
      <div class="card p-3 d-flex flex-d bg-base-100 mt-5 shadow-xl">
        <div class="font-semibold">友链</div>
        <div class="d-flex flex-d py-2">
          <div
              v-for="item in linkCollection"
              :key="item.id"
              class="d-flex jc-between p-2 my-2 rounded-2xl hover:bg-amber-50 cursor"
              @click="jumpLink(item.blog_url)">
            <div>
              {{ item.blog_name }}
            </div>
            <!--            <div >{{ item.blog_url }}</div>-->
            <div>😃😁🤓</div>
          </div>
        </div>
        <a href="https://beian.miit.gov.cn/" target="_blank">您的备案号</a>
        <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2022033642号-1</a>
      </div>
    </div>
    <div class="articleContent flex-1">
      <Article :total="total" />
    </div>
    <div class="nuggets">
      <div class="card d-flex flex-d bg-base-100 shadow-xl">
        <div class="p-4 pb-0 font-semibold">
          <span>掘金个人文章</span>
        </div>
        <div class="p-1 px-3">
          <div
              v-for="item in nuggetsTotal"
              :key="item.article_id"
              class="hover:bg-amber-50 p-2 my-2 rounded-2xl cursor"
              @click="Jump(item.article_id)">
            <h1 class="title overflow-omit1 font-normal">
              {{ item.article_info.title }}
            </h1>
            <div class="d-flex gap-2 text-gray-600">
              <div class="d-flex ai-center gap-1">
                <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  <path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                </svg>
                {{ item.article_info.view_count }}
              </div>
              <div class="d-flex ai-center gap-1">
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                </svg>
                {{ item.article_info.digg_count }}
              </div>
              <div class="d-flex ai-center gap-1">
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                </svg>
                {{ item.article_info.comment_count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Mobile-->
  <div v-else class="mobile">
    <Article :total="total" />
  </div>
</template>

<script lang="ts" setup>
import Article from "@/components/Article/index.vue";
import { getScrollHeight, getScrollTop, getWindowHeight } from "../utils/screen";
import isShow from "../utils/judgeTheClient";
import { personalInformation, friendshipChain, allArticles, nuggetsArticles } from "../api/index";

interface paginationType {
  pageSize: number;
  pageNum: number;
}

let information: any = ref<Array<object>>();
let nuggetsTotal: any = ref<Array<object>>();
let linkCollection: any = ref<Array<object>>();
let total: any = ref<Array<object>>([]);
let isItPossibleToRequest: any = ref<boolean>(true);
let pagination = reactive<paginationType>({
  pageSize: 5,
  pageNum: 1
});

//进页面就开始监听
onMounted(() => {
  window.addEventListener("scroll", load);
});

//个人信息
const personal = async () => {
  let { data } = await personalInformation();
  information.value = data;
};

//友链
const links = async () => {
  let {
    data: { data: newData }
  } = await friendshipChain();
  linkCollection.value = newData;
  console.log(newData, 1111);
};
const jumpLink = (url: string) => {
  window.open(`${url}`);
};

//所有文章
const getArticle = async () => {
  let { data }: any = await allArticles(pagination);
  total.value.push(...data.data);
  isItPossibleToRequest.value = data.turnOver;
};
const load = () => {
  //判断是否到页面的底部
  if (Math.ceil(getScrollTop() + getWindowHeight()) >= getScrollHeight()) {
    if (!isItPossibleToRequest.value) {
      return;
    }
    pagination.pageNum += 1;
    setTimeout(() => {
      getArticle();
    }, 1000);
  }
};

//掘金
const nuggets = async () => {
  let {
    data: {
      data: { data: newData }
    }
  } = await nuggetsArticles();

  nuggetsTotal.value = newData;
};
const Jump = (url: string) => {
  window.open(`https://juejin.cn/post/${url}`);
};

personal();
nuggets();
links();
getArticle();
//页面销毁取消监听
onUnmounted(() => {
  window.removeEventListener("scroll", load, false);
});
</script>

<style lang="scss">
.home-conter {
  padding-top: 20px;

  .articleContent {
    margin: 0 20px;
  }

  .introduce {
    width: 260px;
    flex-shrink: 0;
  }

  .nuggets {
    width: 260px;
    flex-shrink: 0;
  }
}

.mobile {
  margin: 20px;
}
</style>
