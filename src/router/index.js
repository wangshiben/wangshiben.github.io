import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from "../views/RegisterPage.vue"
import LoginPage from "../views/LoginPage.vue"
import ConnectView from '../views/ConnectView.vue';
import SelectView from '../views/SelectView.vue';
import MenuView  from '../views/MenuView.vue';

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    name: "login",
    path: "/login",
    component: LoginPage
  },
  {
    name: "register",
    path: "/register",
    component: RegisterPage
  },
  {
    path: '/connect',
    name: 'connect',
    component: ConnectView
  },
  {
    path: '/select',
    name: 'select',
    component: SelectView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
