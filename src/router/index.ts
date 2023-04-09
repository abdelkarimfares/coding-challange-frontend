import { createRouter, createWebHistory } from 'vue-router'
import { authenticated, loadAuthenticatedUser } from '@/middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/Index.vue')
    },
    {
      path: '/users/show/:id',
      name: 'view-user',
      component: () => import('../views/users/Show.vue')
    },
    {
      path: '/users/create',
      name: 'create-user',
      component: () => import('../views/users/Create.vue'),
      beforeEnter: authenticated
    },
    {
      path: '/users/edit/:id',
      name: 'edit-user',
      component: () => import('../views/users/Create.vue'),
      beforeEnter: authenticated
    },
    {
      path: '/account/login',
      name: 'login',
      component: () => import('../views/account/Login.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('../views/groups/Index.vue')
    },
    {
      path: '/groups/create',
      name: 'create-group',
      component: () => import('../views/groups/Create.vue'),
      beforeEnter: authenticated
    },
    {
      path: '/groups/edit/:id',
      name: 'edit-group',
      component: () => import('../views/groups/Create.vue'),
      beforeEnter: authenticated
    },
    {
      path: '/groups/show/:id',
      name: 'show-group',
      component: () => import('../views/groups/Show.vue')
    }
  ]
})

router.beforeEach(loadAuthenticatedUser);

export default router
