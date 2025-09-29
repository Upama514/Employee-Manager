<!-- src/views/EmployeesList.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { employeeAPI } from "@/services/api";

// state variables
const employees = ref([]);
const loading = ref(true);
const error = ref(null);
const isDemoMode = ref(false);

// mock data (fallback)
const mockEmployees = [
  { id: 1, employee_name: "John Doe", employee_salary: 50000, employee_age: 30 },
  { id: 2, employee_name: "Jane Smith", employee_salary: 60000, employee_age: 28 },
  { id: 3, employee_name: "Michael Johnson", employee_salary: 70000, employee_age: 35 }
];

// fetch employees
const fetchEmployees = async () => {
  try {
    loading.value = true;
    error.value = null;

    const res = await employeeAPI.getEmployees();

    if (res && Array.isArray(res.data)) {
      employees.value = res.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    console.error("API error:", err.message);

    // যদি rate-limit error বা network error হয়, demo mode
    if (err.response?.status === 429 || err.message.includes("Network")) {
      employees.value = mockEmployees;
      isDemoMode.value = true;
      console.log("⚠️ Demo mode enabled - using mock data");
    } else {
      error.value = "Failed to load employees. Please try again later.";
    }
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEmployees);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Employee List</h1>

    <!-- Demo Notice -->
    <div
      v-if="isDemoMode"
      class="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6"
    >
      <h3 class="text-sm font-medium text-yellow-800">Demo Mode</h3>
      <p class="text-sm text-yellow-700 mt-1">
        Using local mock data due to API rate limits. Changes will not be saved
        to the server.
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <svg
        class="animate-spin h-8 w-8 text-blue-600 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p class="mt-2 text-gray-600">Loading employees...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error && !isDemoMode"
      class="bg-red-50 border border-red-200 rounded-md p-4"
    >
      <h3 class="text-sm font-medium text-red-800">Error</h3>
      <p class="text-sm text-red-700 mt-1">{{ error }}</p>
    </div>

    <!-- Table -->
    <div v-else>
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              ID
            </th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Salary
            </th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="emp in employees"
            :key="emp.id"
            class="border-t border-gray-200 hover:bg-gray-50"
          >
            <td class="py-3 px-4 text-sm text-gray-700">{{ emp.id }}</td>
            <td class="py-3 px-4 text-sm text-gray-700">{{ emp.employee_name }}</td>
            <td class="py-3 px-4 text-sm text-gray-700">
              {{ emp.employee_salary ? emp.employee_salary.toLocaleString() : "N/A" }}
            </td>
            <td class="py-3 px-4 text-sm text-gray-700">
              {{ emp.employee_age || "N/A" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
