import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist' //持久化存储
import Skeleton from '@x-ui-vue3/skeleton' //骨架屏
import App from './App.vue'
import router from './router/index'
import I18n from './language/i18n' //语言
import { mouse } from './utils/mouseClick'
import { forbidF12 } from './utils/forbid'
import './styles/index.css'
import './styles/md.scss'
import './styles/waline.css'
import './styles/APlayer.min.css'

mouse()
// forbidF12()

const store = createPinia()

store.use(piniaPluginPersist)

const app = createApp(App)

app.use(router).use(store).use(I18n).use(Skeleton).mount('#app')
