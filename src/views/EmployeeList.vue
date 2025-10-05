<script setup>
import { ref, onMounted } from 'vue'
import { employeeAPI } from '../services/api'

const employees = ref([])
const loading = ref(true)
const error = ref(null)

const fetchEmployees = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await employeeAPI.getEmployees()
    console.log('API Response:', response) // Debug log
    employees.value = response.data || []
    console.log('Employees loaded:', employees.value) // Debug log
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Failed to fetch employees'
    console.error('Error fetching employees:', err)
  } finally {
    loading.value = false
  }
}

const deleteEmployee = async (id, employeeName) => {
  if (confirm(`Are you sure you want to delete "${employeeName}"? This action cannot be undone.`)) {
    try {
      await employeeAPI.deleteEmployee(id)
      alert('Employee deleted successfully!')
      await fetchEmployees() // Refresh the list
    } catch (err) {
      console.error('Error deleting employee:', err)
      alert('Error deleting employee. Please try again.')
    }
  }
}

// Refresh the list when component is mounted
onMounted(() => {
  console.log('EmployeeList component mounted') // Debug log
  fetchEmployees()
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Employee List</h1>
      <router-link
        to="/add-employee"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add New Employee
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="text-gray-600 mt-2">Loading employees...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading employees</h3>
          <p class="text-sm text-red-700 mt-1">{{ error }}</p>
        </div>
      </div>
      <button
        @click="fetchEmployees"
        class="mt-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>

    <!-- Success State -->
    <div v-else>
      <div v-if="employees.length === 0" class="text-center py-8 bg-white rounded-lg border border-gray-200">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new employee.</p>
        <div class="mt-6">
          <router-link
            to="/add-employee"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Employee
          </router-link>
        </div>
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <!-- Table Header with Count -->
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <p class="text-sm text-gray-600">
            Showing <strong>{{ employees.length }}</strong> employee{{ employees.length !== 1 ? 's' : '' }}
          </p>
        </div>
        
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ employee.employee_name }}
                </div>
                <div class="text-xs text-gray-500">
                  ID: {{ employee.id }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  ${{ Number(employee.employee_salary).toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ employee.employee_age }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-3">
                  <!-- Edit Button -->
                  <router-link
                    :to="`/edit-employee/${employee.id}`"
                    class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                  </router-link>
                  
                  <!-- Delete Button -->
                  <button
                    @click="deleteEmployee(employee.id, employee.employee_name)"
                    class="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>