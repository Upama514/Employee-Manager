<script setup>
// Composition API - no export needed
</script>

<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <router-link to="/" class="text-xl font-bold">
          Employee Manager
        </router-link>
        <div class="space-x-4">
          <router-link to="/" class="hover:text-blue-200 transition">
            Home
          </router-link>
          <router-link to="/employees" class="hover:text-blue-200 transition">
            Employees
          </router-link>
          <router-link to="/add-employee" class="hover:text-blue-200 transition">
            Add Employee
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

