import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      title: "Login"
    }
  },
  {
    path:'/home/',
    name: 'home',
    component: () => import('../views/Home'),
    meta: {
      title: "RifAqui"
    }
  },
  {
    path:'/registrar',
    name: 'Registro',
    component: () => import('../views/SignUp'),
    meta: {
      title: "Criar Conta"
    }
  },
  {
    path:'/esqueci-a-senha/',
    name: 'esqueciSenha',
    component: () => import('../views/EsqueciSenha'),
    meta: {
      title: "RifAqui"
    }
  },
  {
  path:'/reseta-senha/:id?',
    name: 'resetaSenha',
    component: () => import('../views/ResetaSenha'),
    meta: {
      title: "RifAqui"
    }
  },
]


const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
