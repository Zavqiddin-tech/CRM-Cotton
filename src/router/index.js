import { createRouter, createWebHistory } from 'vue-router'
import {dashboardMenu} from './menu'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/layout/dashboard.vue'),
        meta: {secure: true},
          children: [
            ...dashboardMenu,
            {
              path: '/workers/:id',
              component: ()=> import('@/dashboard/views/more/workerDetail.vue'),
              meta: {secure: true}
            }
          ]
      }
  ]
})

export default router
