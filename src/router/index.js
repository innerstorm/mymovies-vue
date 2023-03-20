import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
    meta: {
      requiresAuth: false
    }
  },
  
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false
    }

  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresAuth: false
    }
  }, 

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('router | from:', from.name, 'to:', to.name, 'next:', next.name, '\nis logged in:',store.state.isLoggedIn)
  
  // when coming from the login page, we get the movies from firebase to store
  if (from.name == 'Login' && to.name == 'Dashboard') {
    store.commit('setFromLogin', true)
  }

  if (to.name === 'Login') {
    next() // login route is always okay (we could use the requires auth flag below). prevent a redirect loop
  } else if (to.meta && to.meta.requiresAuth === false) {
    next() // requires auth is explicitly set to false
  } else if (store.state.isLoggedIn) {
    next() // i'm logged in. carry on
  } else {
    next({ name: 'Login' }) // always put your redirect as the default case
  }
})

export default router
