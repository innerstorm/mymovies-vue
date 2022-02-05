import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'
import firebase from 'firebase'
import { firebaseConfig } from './firebase.config'
import './styles/main.css'

firebase.initializeApp(firebaseConfig)

createApp(App)
    .use(router)
    .component(VueFeather.name, VueFeather)
    .mount('#app')
