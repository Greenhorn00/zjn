import {createRouter, Router, RouteRecordRaw, createWebHashHistory} from 'vue-router';
// router/index.ts
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../components/Home.vue'),
    meta:{
        title:'首页'
    }
    
  },
  {
    path: '/Article_details',
    component: () => import('../components/Article_details.vue'),
    meta:{
        title:'Article_details'
    }
    
  },
  {
    path: '/plane',
    component: () => import('../components/plane.vue'),
    meta:{
        title:'Hello plane'
    }
    
  },
 
  {
  path: '/post_category',
  component: () => import('../components/post_category.vue'),
  meta:{
      title:'Hello World'
  }
  
},

  {
    path: '/new',
    component: () => import('../components/new_news.vue'),
    meta:{
        title:'Hello World'
    }
    
  },
  {
    path: '/search_page',
    component: () => import('../components/search_page.vue'),
    meta:{
        title:'search_page'
    }
    
  },

];
const router: Router = createRouter({
   history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

 // router/index.ts
 
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  console.log(to)
  console.log(from)
  next()
})
 
router.afterEach(() => {
  NProgress.done() // 进度条结束
})

export default router