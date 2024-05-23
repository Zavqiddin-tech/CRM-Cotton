import { createRouter, createWebHistory } from 'vue-router'
import {dashboardMenu} from './menu'
import { useAuthStore } from '@/stores/admin/auth/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/layout/dashboard.vue'),
          children: [
            ...dashboardMenu,
            {
              path: '/workers/:id',
              component: ()=> import('@/dashboard/views/more/workerDetail.vue'),
              meta: {secure: true}
            },
            {
              path: '/regis',
              component: ()=> import('@/dashboard/views/regis.vue'),
            }
          ]
      },
      {
        path: '/login',
        name: 'login',
        component: ()=> import('@/layout/auth.vue')
      }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === "/regis") {
    useAuthStore().checkAdmin()
  }
  if (to.meta.secure) {
    useAuthStore().checkUser()
  }
  next()
})



export default router
