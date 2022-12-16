import { defineStore } from 'pinia'

export const mainStore = defineStore('navigation', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment(val: number) {
      this.count = val
    }
  },
  //持久化存储（下载插件，配置即可）
  persist: {
    enabled: true
  }
})

export const useStore = defineStore('use', {
  state: () => ({
    selectedTopic: 1
  }),
  actions: {
    toggleSelected(val: number) {
      this.selectedTopic = val
    }
  },
  //持久化缓存（下载插件，配置即可）
  persist: {
    enabled: true
  }
})
