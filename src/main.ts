import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "./assets/styles/main.scss";

import axios from "axios";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import PrimeVue from "primevue/config";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import ToastService from 'primevue/toastservice';
import PerfectScrollbar from 'vue3-perfect-scrollbar';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URI

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

const pinia = createPinia();
const app = createApp(App);

app.use(router);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);
app.use(PerfectScrollbar, {
  watchOptions: true,
  options: {
    wheelPropagation: false,
  }
});

app.mount("#app");
