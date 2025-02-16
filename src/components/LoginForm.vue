<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl text-center mb-6">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="w-full p-2 mt-1 border border-gray-300 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Senha</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full p-2 mt-1 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = () => {
  // Supondo que a autenticação seja feita com sucesso
  // Redireciona o usuário para o Dashboard
  router.push("/dashboard");
};
</script>
