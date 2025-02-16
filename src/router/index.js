import { createRouter, createWebHistory } from "vue-router";

// Importando os novos componentes
import LoginPage from "../pages/LoginPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import ClientRegistrationPage from "../pages/ClientRegistrationPage.vue"; // Importando a nova página de cadastro de cliente

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage, // Rota para a página de login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage, // Rota para a página de dashboard
  },
  {
    path: "/client-registration",
    name: "ClientRegistration",
    component: ClientRegistrationPage, // Rota para a página de cadastro de cliente
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
