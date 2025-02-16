<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div
      class="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h2 class="text-3xl font-semibold text-center text-blue-700 mb-6">
        Cadastro de Cliente
      </h2>
      <!-- Componente de formulário -->
      <ClientForm />
    </div>
  </div>
</template>

<script setup>
import ClientForm from "@/components/ClientForm.vue"; // Importe o componente de formulário
</script>

<style scoped>
/* Estilos específicos para a página de cadastro */
</style>
