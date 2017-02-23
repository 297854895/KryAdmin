import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './components/Index/Index.vue';
import NotFound from './components/NotFound/NotFound.vue';
import Login from './components/Login/Login.vue';
import PublishArticle from './components/Admin/PublishArticle';
import ManageArticle from './components/Admin/ManageArticle';
import PublishNovel from './components/Admin/PublishNovel';
import ManageNovel from './components/Admin/ManageNovel';
import ManageComment from './components/Admin/ManageComment';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/publishArticle',
          component: PublishArticle
        },
        {
          path: '/manageArticle',
          component: ManageArticle
        },
        {
          path: '/publishNovel',
          component: PublishNovel
        },
        {
          path: '/manageNovel',
          component: ManageNovel
        },
        {
          path: '/manageComment',
          component: ManageComment
        },
        {
          path: '/',
          component: PublishArticle
        }
      ]
    }, {
      path: '/login',
      component: Login
    }, {
      path: '*',
      component: NotFound
    }
  ]
});
