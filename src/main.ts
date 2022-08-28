import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import {createPinia} from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist' //持久化存储
import I18n from './language/i18n'//语言
import './styles/index.css'
import {mouse} from './utils/mouseClick'

mouse()

const store = createPinia()
store.use(piniaPluginPersist)

const app = createApp(App)
app.use(router).use(store).use(I18n).mount('#app')

