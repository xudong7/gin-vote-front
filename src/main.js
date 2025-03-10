import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

createApp(App).use(router).use(axios).mount('#app')

