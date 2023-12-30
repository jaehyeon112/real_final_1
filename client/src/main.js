import {
  createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify'
<<<<<<< HEAD
import { loadFonts } from './plugins/webfontloader'
import store from './store.js'
import mixin from './mixin'
import overlay from '@/module/Overlay.js'
=======
import {
  loadFonts
} from './plugins/webfontloader'
import store from './store.js'
import mixin from './mixin'
import overlay from '@/module/Overlay.js'

>>>>>>> develop
loadFonts()
window.Kakao.init("8acdd93f5a6fa89a6d2fe9190ea23ff1");

window.Kakao.init("8acdd93f5a6fa89a6d2fe9190ea23ff1");


createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .use(overlay)
  .mixin(mixin)
<<<<<<< HEAD
  .mount('#app')
=======
  .mount('#app')
>>>>>>> develop
