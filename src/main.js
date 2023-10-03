
import 'normalize.css'
import './assets/css/index.css'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './stores'
import "default-passive-events";	

const app = createApp(App)

app.use(router).use(pinia)
app.mount('#app')
