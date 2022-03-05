import {createRouter, createWebHistory} from 'vue-router'
import HomeWrap from "views/home/HomeWrap";
import HomePage from "views/home/HomePage";

const routes = [
  {
    path: "",
    redirect: "/home",
  },

  {
    path: "/home",
    component: HomeWrap,
    children: [
      {
        path: "",
        meta: {
          title: "首页",
        },
        component: HomePage,
      },
      {
        path: "404",
        meta: {
          title: "页面不见了",
        },
        component: () => import("views/home/NotFound")
      }
    ]
  },

  {
    path: "/user",
    component: () => import("views/user/UserWrap"),
    children: [
      {
        path: "",
        meta: {
          title: "用户信息",
          auth: true
        },
        component: () => import("views/user/UserInfo"),
      },
      {
        path: "login",
        meta: {
          title: "登录",
        },
        component: () => import("views/user/Login"),
      },
      {
        path: "reset-password",
        meta: {
          title: "重置密码",
        },
        component: () => import("views/user/ResetPassword"),
      },
      {
        path: "change-password",
        meta: {
          title: "修改密码",
          auth: true
        },
        component: () => import("views/user/ChangePassword"),
      },
    ]
  },

  {
    path: '/:pathMatch(.*)',
    redirect: "/home/404"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(route => route.meta.auth)) {
    if (!document.cookie.match(/token=(.*?)(;|$)/)) {
      next({path: "/user/login", query: {next: to.path}})
    } else {
      next()
    }
  } else {
    next()
  }
})

router.return = function (path) {
  return (!window.history.state.back && path) ? router.replace(path) : router.back()
}

export default router
