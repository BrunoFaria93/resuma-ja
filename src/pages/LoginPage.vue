<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div
      class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h2 class="text-3xl font-semibold text-center text-blue-700 mb-6">
        Acesse sua conta
      </h2>

      <!-- Formulário de Login -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600"
            >E-mail</label
          >
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Senha</label
          >
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input
              id="remember"
              type="checkbox"
              v-model="rememberMe"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="remember" class="ml-2 text-sm text-gray-600"
              >Lembrar-me</label
            >
          </div>
          <a href="#" class="text-sm text-blue-600 hover:underline"
            >Esqueceu a senha?</a
          >
        </div>

        <button
          type="submit"
          class="w-full py-3 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none"
        >
          Entrar
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Não tem uma conta?
        <button
          @click="handleRegister"
          href="/cadastro"
          class="text-blue-600 hover:underline"
        >
          Cadastre-se
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const router = useRouter();
const handleRegister = () => {
  // Supondo que a autenticação seja feita com sucesso
  // Redireciona o usuário para o Dashboard
  router.push("/client-registration");
};
const handleLogin = () => {
  // Lógica de login
  console.log({
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};
</script>

<style scoped>
/* Estilos específicos para personalizar o layout */
</style>
