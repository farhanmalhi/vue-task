// import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import * as VueGoogleMaps from 'vue2-google-maps';
import "./plugins/bootstrap-vue";
import store from "./store/Store";
import router from "./router/Router";
import "./assets/scss/style.scss";
import 'vue-search-select/dist/VueSearchSelect.css'

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
    load: {
    }
  });
  

new Vue({ store, router, render: (h) => h(App) }).$mount("#app");
