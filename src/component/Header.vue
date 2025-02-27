<template>
  <header>
    <div class="title-container">
      <h1 class="title">My App</h1>
    </div>
    <nav>
      <div v-if="!token">
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="!token">
        <router-link to="/login">Login</router-link>
      </div>
      <router-link to="/admin">Admin</router-link>
      <router-link to="/">User</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const token = ref(localStorage.getItem("token"));
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 10%;
  width: 80%;
  z-index: 1000;
}

.title-container {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.title {
  font-size: 2rem;
}

nav {
  display: flex;
  gap: 1rem;
}
</style>