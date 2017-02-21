import Vue from 'vue';

import Kui from '../kui';
import Index from './components/Index/Index.vue';
import store from './store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<Index/>',
  components: { Index }
});
