import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home.vue')
  },
  {
    path: '/verification',
    name: 'Email',
    component: () => import('../views/EmailVerification.vue')
}
  ]
})

export default router
