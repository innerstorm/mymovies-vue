import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'

import './styles/main.css'

createApp(App)
    .use(router)
    .component(VueFeather.name, VueFeather)
    .mount('#app')
