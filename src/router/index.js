import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Soporte from "@/views/Soporte.vue";
import Anillos from "@/views/Anillos.vue";
import Pulseras from "@/views/Pulseras.vue";




const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/home", component: Home},
  { path:"/soporte", component:Soporte},
  { path: "/anillos", component:Anillos},
  { path: "/pulseras", component:Pulseras}
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


