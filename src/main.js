import "./assets/main.css";

import Vant from "vant";
import "vant/lib/index.css";
import '@vant/touch-emulator';

import { createApp } from "vue";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(Vant);
app.use(ElementPlus)
app.mount("#app");
