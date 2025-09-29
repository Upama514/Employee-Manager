<script setup>
// Composition API - no export needed
</script>
<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">
      Welcome to Employee Manager
    </h1>
    <p class="text-xl text-gray-600 mb-8">
      Manage your employees efficiently with our comprehensive dashboard
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-2">View Employees</h3>
        <p class="text-gray-600 mb-4">Browse through all employee records</p>
        <router-link to="/employees" class="text-blue-600 hover:text-blue-800">
          View All →
        </router-link>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-2">Add Employee</h3>
        <p class="text-gray-600 mb-4">Add new employees to the system</p>
        <router-link to="/add-employee" class="text-blue-600 hover:text-blue-800">
          Add New →
        </router-link>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-2">Manage Data</h3>
        <p class="text-gray-600 mb-4">Update and maintain employee information</p>
        <router-link to="/employees" class="text-blue-600 hover:text-blue-800">
          Manage →
        </router-link>
      </div>
    </div>
  </div>
</template>

