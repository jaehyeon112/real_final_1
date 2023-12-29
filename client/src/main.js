import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import mixin from './mixin.js'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mixin(mixin)
  .mount('#app')
