import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/* ----------------------------------------------------------------------------------------------------------------
 * constantRoutes 常量路由：不管用户什么角色都可以看见的路由
 */
export const constantRoutes = [
  {
    path: '/login',
    // 懒加载
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    // 重定向
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]

/* ----------------------------------------------------------------------------------------------------------------
 * asyncRoutes 异步路由：不同用户看见的路由权限不同
 */
export const asyncRoutes = [
  {
    path: '/acl',
    component: Layout,
    name: 'Acl',
    meta: { title: '权限管理', icon: 'el-icon-info' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/acl/user'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/acl/role'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/auth/:id',
        name: 'RoleAuth',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: 'acl/role/index', // /控制激活菜单
          title: '角色授权'
        },
        hidden: true // 未激活时候隐藏
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission'),
        meta: { title: '权限管理' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'trademark',
        name: 'TradeMark',
        component: () => import('@/views/product/tradeMark'),
        // meta:控制侧边栏的菜单名和icon
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
        meta: { title: 'Spu管理' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/product/Sku'),
        meta: { title: 'Sku管理' }
      }
    ]
  },
  {
    path: '/Test',
    component: Layout,
    name: 'Test',
    meta: { title: '测试页面', icon: 'el-icon-edit' },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/test/test1'),
        meta: { title: '测试页面1' }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/test/test2'),
        meta: { title: '测试页面2' }
      }
    ]
  }
]

/* ----------------------------------------------------------------------------------------------------------------
*anyRoutes任意路由:一般用于路径出现错误时的重定向
*/
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
