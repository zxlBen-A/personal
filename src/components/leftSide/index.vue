<template>
  <div class="headers bg-base-100">
    <div class="tabbar d-flex ai-center jc-between bg-base-100">
      <!--      <a class="italic mark">zxlBen</a>-->
      <ul class="flex-1 menu menu-horizontal bg-base-100 rounded-box p-2 pl-0">
        <li class="mx-2 ml-0" @click="cutover(0, '/')">
          <a :class="contrast === 0 ? 'active' : ''">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {{ $t('message.home') }}
          </a>
        </li>
        <li class="mx-2" @click="cutover(1, 'special')">
          <a :class="contrast === 1 ? 'active' : ''">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ $t('message.specialColumn') }}
          </a>
        </li>
        <li class="mx-2" @click="cutover(2, '/record')">
          <a :class="contrast === 2 ? 'active' : ''">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            {{ $t('message.record') }}
          </a>
        </li>
        <li class="mx-2" @click="cutover(3, '/about')">
          <a :class="contrast === 3 ? 'active' : ''">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            {{ $t('message.about') }}
          </a>
        </li>
      </ul>
      <div class="flex justify-around">
        <div class="dropdown dropdown-bottom">
          <button tabindex="0" class="btn gap-1 normal-case btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            {{ $t('message.theme') }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            class="dropdown-content bg-slate-100 text-base-content rounded-t-box rounded-b-box top-px w-56 overflow-y-auto shadow-2xl mt-16"
          >
            <div tabindex="0" class="grid grid-cols-1 gap-3 p-3">
              <div
                class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline"
                data-set-theme="garden"
                data-act-class="outline"
              >
                <div
                  data-theme="garden"
                  class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                >
                  <div class="grid grid-cols-5 grid-rows-3">
                    <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                      <div class="flex-grow text-sm font-bold">garden</div>
                      <div class="flex flex-shrink-0 flex-wrap gap-1">
                        <div class="bg-primary w-2 rounded" />
                        <div class="bg-secondary w-2 rounded" />
                        <div class="bg-accent w-2 rounded" />
                        <div class="bg-neutral w-2 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                data-set-theme="dark"
                data-act-class="outline"
              >
                <div
                  data-theme="dark"
                  class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                >
                  <div class="grid grid-cols-5 grid-rows-3">
                    <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                      <div class="flex-grow text-sm font-bold">dark</div>
                      <div class="flex flex-shrink-0 flex-wrap gap-1">
                        <div class="bg-primary w-2 rounded" />
                        <div class="bg-secondary w-2 rounded" />
                        <div class="bg-accent w-2 rounded" />
                        <div class="bg-neutral w-2 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                data-set-theme="retro"
                data-act-class="outline"
              >
                <div
                  data-theme="retro"
                  class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                >
                  <div class="grid grid-cols-5 grid-rows-3">
                    <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                      <div class="flex-grow text-sm font-bold">retro</div>
                      <div class="flex flex-shrink-0 flex-wrap gap-1">
                        <div class="bg-primary w-2 rounded" />
                        <div class="bg-secondary w-2 rounded" />
                        <div class="bg-accent w-2 rounded" />
                        <div class="bg-neutral w-2 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-bottom dropdown-end">
          <button tabindex="0" class="btn gap-1 normal-case btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            class="dropdown-content bg-slate-100 text-base-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto shadow-2xl"
          >
            <ul class="menu menu-compact gap-1 p-3" tabindex="0">
              <li @click="changeLang('en', 0)">
                <button class="flex" :class="selectedTopic == 0 ? 'active' : ''">
                  <img
                    loading="lazy"
                    width="20"
                    height="20"
                    alt="English"
                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg"
                  />
                  <span class="flex flex-1 justify-between">English </span>
                </button>
              </li>
              <li @click="changeLang('cn', 1)">
                <button class="flex" :class="selectedTopic == 1 ? 'active' : ''">
                  <img
                    loading="lazy"
                    width="20"
                    height="20"
                    alt="中文"
                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1e8-1f1f3.svg"
                  />
                  <span class="flex flex-1 justify-between">中文</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!--      <button class="btn focus:bg-slate-900" @click="switchThemes('garden')">切换主题</button>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
import { useI18n } from 'vue-i18n' //主题切换
import { useRouter } from 'vue-router'
import { mainStore, useStore } from '../../store'

//路由
const router = useRouter()
//pinia
const main = mainStore()
const store = useStore()
//左侧选中menu
const contrast = ref(main.count)
//主题切换
const { locale } = useI18n()
//选中主题
const selectedTopic = computed(() => store.selectedTopic)

//menu选中的切换
const cutover = (val: number, url: string) => {
  contrast.value = val
  main.increment(val)
  router.push(url)
}
//主题色的切换

onMounted(() => {
  themeChange(false)
})
//语言切换
const changeLang = (val: string, item: number) => {
  locale.value = val
  store.toggleSelected(item)
  localStorage.setItem('lang', val)
}
</script>

<style lang="scss">
.headers {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1111;

  .tabbar {
    min-width: 1200px;
    max-width: 1450px;
    padding: 0 48px;
    margin: 0 auto;

    .mark {
      margin-right: 28px;
    }
  }
}
</style>
