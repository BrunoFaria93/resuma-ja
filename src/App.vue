<template>
  <router-view />
  <!-- Este componente renderiza as páginas baseadas na rota -->
</template>

<script setup>
import "./assets/styles/tailwind.css"; // Certifique-se de que o Tailwind CSS está sendo importado
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
