import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView'),
    meta: {
      title: '首页'
    }
  }
]

const router = new Router({routes})

//跳转前改变标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
