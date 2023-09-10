<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView from "./components/HeaderView.vue";
import Success from './components/modals/success.vue';
</script>

<template>
  <header>
    <HeaderView />
  </header>

  <main>
    <RouterView />

    <div class="modals">
      <Success />
    </div>
  </main>

  <footer>

  </footer>
</template>