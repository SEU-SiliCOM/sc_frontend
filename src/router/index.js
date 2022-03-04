import {createRouter, createWebHistory} from 'vue-router'
import HomeWrap from "views/home/HomeWrap";
import HomePage from "views/home/HomePage";

const routes = [
  {
    path: '',
    redirect: "/home",
  },
  {
    path: '/home',
    title: 'Home',
    component: HomeWrap,
    children: [
      {
        path: "",
        component: HomePage,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.return = function (path) {
  return (!window.history.state.back && path) ? router.replace(path) : router.back()
}

export default router
