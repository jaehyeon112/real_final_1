import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import LoadingPlugin from "./module/Overlay.js";
import mixins from "./mixins";
import store from "@/store/storage.js"
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App).use(store).use(router).use(LoadingPlugin).use(vuetify).mixin(mixins).mount("#app");
