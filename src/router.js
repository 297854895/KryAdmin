import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './components/Index/Index.vue';
import NotFound from './components/NotFound/NotFound.vue';
import Login from './components/Login/Login.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    }, {
      path: '/Login',
      component: Login
    }, {
      path: '*',
      component: NotFound
    }
  ]
});
