import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import store from '@/store'

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

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
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
  // 404 page must be placed at the end !!!
]
export const asyncRoutes = [
  // 新路由
  {
    path: '/',
    component: Layout,
    name: 'dataManage',
    redirect: '/dataset',
    meta: {
      title: '数据管理',
      icon: 'sourmanage'
    },
    children: [
      {
        path: 'datasource',
        component: () => import('@/views/data-management/datasource/index'),
        name: 'Datasource',
        meta: { title: '数据源管理', icon: 'savedatasour', affix: true }
      },
      {
        path: 'dataset',
        component: () => import('@/views/data-management/dataset/index'),
        name: 'Dataset',
        meta: { title: '数据集管理', icon: 'dataset', affix: true }
      },
    ]
  },
  // 任务
  {
    path: '/task',
    component: Layout,
    name: 'taskManage',
    redirect: '/task/tasklist',
    meta: {
      title: '任务管理',
      icon: 'tasklist'
    },
    children: [
      {
        path: 'tasklist',
        component: () => import('@/views/task-management/tasklist/index'),
        name: 'Tasklist',
        meta: { title: '任务列表', icon: 'tasklist', affix: true },
        children: []
      },
      {
        path: 'flow-add',
        component: () => import('@/views/flow-management/add.vue'),
        name: 'FlowAdd',
        hidden: true,
        meta: { title: '添加流程图', icon: 'link', affix: true }
      },
      {
        path: 'taskresult',
        component: () => import('@/views/task-management/taskresult/index'),
        name: 'Taskresult',
        hidden: true,
        meta: { title: '任务执行结果2', icon: 'link', affix: true }
      },
      {
        path: 'taskstate',
        component: () => import('@/views/task-management/taskstate/index'),
        name: 'Taskstate',
        hidden: true,
        meta: { title: '任务执行日志', icon: 'datasour', affix: true }
      }, {
        path: 'analysis',
        component: () => import('@/views/analysis/index'),
        name: 'Analysis',
        hidden: true,
        meta: { title: '数据分析', icon: 'count', affix: true }
      },
      {
        path: 'task-flow',
        component: () => import('@/views/flow-management/index'),
        name: 'TaskFlow',
        hidden: true,
        meta: { title: '任务流程', icon: 'count', affix: true }
      },
    ]
  },
  // 我的预料和模型
  {
    path: '/material',
    component: Layout,
    name: 'Material',
    redirect: '/material/corpus',
    meta: {
      title: '语料和模型',
      icon: 'usermanages'
    },
    children: [
      {
        path: 'corpus',
        component: () => import('@/views/material/corpus.vue'),
        name: 'Corpus',
        meta: { title: '语料管理', icon: 'corpus', affix: true },
        children: [],
      },
      {
        path: 'model',
        component: () => import('@/views/material/model.vue'),
        name: 'Model',
        meta: { title: '模型管理', icon: 'model', affix: true },
      }
    ]
  },
   // 文本接口
   {
    path: '/text_api',
    component: Layout,
    name: 'TextApi', 
    redirect: '/text_api/single',
    meta: {
      title: '文本分类接口',
      icon: 'text-type'
    },
    children: [
      {
        path: 'single',
        component: () => import('@/views/text-api/single-text.vue'),
        name: 'SingleText',
        meta: { title: '单文本分类', icon: 'single-text', affix: true },
        children: [],
      },
      {
        path: 'batch',
        component: () => import('@/views/text-api/batch-text.vue'),
        name: 'BatchText',
        meta: { title: '多文本分类', icon: 'batch-text', affix: true },
      }
    ]
  },

  // 用户管理
  {
    path: '/user',
    component: Layout,
    name: 'userManage',
    redirect: '/user/userlist',
    meta: {
      title: '系统管理',
      icon: 'usermanages'
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/user-management/users/index'),
        name: 'Users',
        meta: { title: '用户管理', icon: 'users', affix: true },
        children: [],
      },
      {
        path: 'roles',
        component: () => import('@/views/user-management/roles/index'),
        name: 'Roles',
        meta: { title: '角色管理', icon: 'role', affix: true },
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function addRoutes(routes) {
  let userRoutes = asyncRoutes.filter(route => {
    return routes.some(menu => menu === route.name)
  })
  for (let i = 0; i < userRoutes.length; i++) {
    userRoutes[i].children=userRoutes[i].children.filter(route=>{
      return routes.some(menu => menu === route.name)
    })
  }
  userRoutes.push({ path: '*', redirect: '/404', hidden: true })
  router.options.routes = userRoutes;
  router.addRoutes(userRoutes)
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
