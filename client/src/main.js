import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
<<<<<<< HEAD
import store from './store.js'
import mixin from './mixin'
import overlay from '@/module/Overlay.js'
loadFonts()
window.Kakao.init("8acdd93f5a6fa89a6d2fe9190ea23ff1");

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .use(overlay)
  .mixin(mixin)
  .mount('#app')

=======

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
