import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Register from '@/components/Register'
import test from '@/components/test'
// import NotFound from '@/components/normal-page/NotFound'
Vue.use(Router)

// const normalRoutes = [
//   {
//     path: '/404',
//     name: '页面不存在',
//     component: NotFound
//   }
// {
//   path: '/reject',
//   name: '无权限',
//   component: NoPermission
// },
// {
//   path: '/feedback',
//   name: '反馈页',
//   component: Feedback
// },
// {
//   path: '/doc',
//   name: '文档',
//   component: Doc
// }
// ]

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'index',
      meta: {
        isLogin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/test',
      name: test,
      component: test
    }
    // ...normalRoutes,
    // {
    //   path: '*',
    //   redirect: '/404'
    // }
  ]
})

// router.onError(error => {
//   const pattern = /Loading chunk .* failed/g
//   const isChunkLoadFailed = error.message.match(pattern)
//   const targetPath = router.history.pending.fullPath
//   console.log(isChunkLoadFailed, targetPath, location.origin + targetPath)
//   if (isChunkLoadFailed) {
//     location.href = location.origin + targetPath
//   }
// })

// router.beforeEach(async(to, from, next) => {
// window.document.menuTable = to.meta.menuTable
// next()
// if (!store.state.loginStatus) {
//   await store.dispatch('setLoginStatus')
//   await store.dispatch('setMenus')
// }
// let menuPathList = []
// store.state.menuList.map(item => {
//   if (item.resourceType === 'menu' || item.resourceType === 'page') {
//     menuPathList.push(item.resourceUrl)
//   }
// })
// normalRoutes.map(item => menuPathList.push(item.path))
// if (menuPathList.indexOf(to.path) === -1) {
//   next(`/reject?from=${to.path}`)
// } else {
//   next()
// }
// })
