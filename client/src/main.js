import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import globalMethods from "@/module/Overlay";
loadFonts();

createApp(App).use(router).use(vuetify).use(globalMethods).mount("#app");
