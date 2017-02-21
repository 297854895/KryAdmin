import Vue from 'vue';

import Kui from '../kui';
import App from './App.vue';
import store from './store';
import router from './router.js';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
