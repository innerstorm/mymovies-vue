import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'
import store from './store/index'

// suppa stylin!
import './styles/main.css'

createApp(App)
    .use(router)
    .use(store)
    .component(VueFeather.name, VueFeather)
    .mount('#app')
