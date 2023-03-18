import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* ----------------------------------------------------------------------------------------------------------------
 * constantRoutes 常量路由：不管用户什么角色都可以看见的路由
 */
export const constantRoutes = [
  {
    path: '/login',
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
          activeMenu: 'acl/role/index',
          title: '角色授权'
        },
        hidden: true
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
*anyRoutes任意路由:路径出现错误时的重定向
*/
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
