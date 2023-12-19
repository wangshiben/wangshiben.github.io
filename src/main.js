import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import VueAxios from "vue-axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App).use(ElementPlus).use(store).use(router).use(VueAxios, axios).mount('#app')

export default { app };

