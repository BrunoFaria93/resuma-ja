<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-blue-800 text-white p-6">
      <h2 class="text-xl font-semibold mb-8">Painel de Controle</h2>
      <ul class="space-y-4">
        <li>
          <a href="#" class="text-sm text-blue-200 hover:text-white">Início</a>
        </li>
        <li>
          <a href="#" class="text-sm text-blue-200 hover:text-white"
            >Relatórios</a
          >
        </li>
        <li>
          <a href="#" class="text-sm text-blue-200 hover:text-white"
            >Configurações</a
          >
        </li>
        <li>
          <a href="#" class="text-sm text-blue-200 hover:text-white">Logout</a>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-8">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">
        Bem-vindo ao Dashboard
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-700">
            Relatório de Vendas
          </h3>
          <p class="text-sm text-gray-500 mt-2">
            Visualize os relatórios de vendas da sua empresa.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-700">Clientes</h3>
          <p class="text-sm text-gray-500 mt-2">
            Gerencie seus clientes e suas informações.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-700">Financeiro</h3>
          <p class="text-sm text-gray-500 mt-2">
            Acompanhe os fluxos financeiros e relatórios contábeis.
          </p>
        </div>
      </div>

      <!-- Formulário de Ação -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Cadastrar Novo Cliente
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label
              for="clientName"
              class="block text-sm font-medium text-gray-600"
              >Nome do Cliente</label
            >
            <input
              id="clientName"
              type="text"
              v-model="clientName"
              class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              for="clientEmail"
              class="block text-sm font-medium text-gray-600"
              >E-mail do Cliente</label
            >
            <input
              id="clientEmail"
              type="email"
              v-model="clientEmail"
              class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              for="clientPhone"
              class="block text-sm font-medium text-gray-600"
              >Telefone</label
            >
            <input
              id="clientPhone"
              type="tel"
              v-model="clientPhone"
              class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              for="clientCNPJ"
              class="block text-sm font-medium text-gray-600"
              >CNPJ</label
            >
            <input
              id="clientCNPJ"
              type="text"
              v-model="clientCNPJ"
              class="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none"
          >
            Salvar Cliente
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const clientName = ref("");
const clientEmail = ref("");
const clientPhone = ref("");
const clientCNPJ = ref("");

const handleSubmit = () => {
  // Lógica para enviar os dados do formulário
  console.log({
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    clientPhone: clientPhone.value,
    clientCNPJ: clientCNPJ.value,
  });
};
</script>

<style scoped>
/* Estilos específicos para o Dashboard */
</style>
