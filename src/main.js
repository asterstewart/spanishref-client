import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import { domain, clientId, audience } from "../auth_config.json";

import { Auth0Plugin } from "./auth";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
