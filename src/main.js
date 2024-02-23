import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueCookies, {expires: '1d'})
app.use(createPinia())
app.use(router)

app.mount('#app')
