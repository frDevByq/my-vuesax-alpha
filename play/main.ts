import { createApp } from 'vue'
import '@vuesax-alpha/theme-chalk/src/dark/css-vars.scss'
import '@vuesax-alpha/theme-chalk/src/loading.scss'
import '@vuesax-alpha/theme-chalk/src/inner-loading.scss'
import '@vuesax-alpha/components/confirm-dialog/style'
import '@vuesax-alpha/components/edit-dialog/style'
import '@vuesax-alpha/components/info-dialog/style'
import { createRouter, createWebHashHistory } from 'vue-router'
;(async () => {
  const apps = import.meta.glob('./src/*.vue')
  const name = location.pathname.replace(/^\//, '') || 'App'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'App'
    return
  }
  const router = createRouter({
    routes: [
      {
        path: '',
        component: apps,
      },
    ],
    history: createWebHashHistory(),
  })
  const App = (await file()).default
  const app = createApp(App).use(router)

  app.mount('#play')
})()
