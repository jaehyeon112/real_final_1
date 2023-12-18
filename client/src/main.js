import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import LoadingPlugin from "./module/Overlay.js";

createApp(App).use(router).use(LoadingPlugin).mount("#app");
