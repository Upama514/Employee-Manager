<template>
  <form @submit.prevent="submitForm" class="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Employee Name *
        </label>
        <input
          v-model="formData.employee_name"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Enter employee name"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Employee Salary *
        </label>
        <input
          v-model="formData.employee_salary"
          type="number"
          required
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Enter salary"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Employee Age *
        </label>
        <input
          v-model="formData.employee_age"
          type="number"
          required
          min="18"
          max="100"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Enter age"
        />
      </div>
    </div>
    
    <div class="mt-8 flex justify-end space-x-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="submitting"
        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="submitting" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isEditing ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>
          {{ isEditing ? 'Update Employee' : 'Create Employee' }}
        </span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { employeeAPI } from '../services/api'

const props = defineProps({
  employee: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['employee-saved', 'cancel'])

const formData = ref({
  employee_name: '',
  employee_salary: '',
  employee_age: ''
})

const submitting = ref(false)

// Watch for employee prop changes (when editing)
watch(() => props.employee, (newEmployee) => {
  if (newEmployee) {
    formData.value = { ...newEmployee }
    // Convert numeric values to strings for input binding
    formData.value.employee_salary = String(newEmployee.employee_salary)
    formData.value.employee_age = String(newEmployee.employee_age)
  }
}, { immediate: true })

const submitForm = async () => {
  if (submitting.value) return

  submitting.value = true
  try {
    // Convert string values back to numbers
    const submitData = {
      ...formData.value,
      employee_salary: Number(formData.value.employee_salary),
      employee_age: Number(formData.value.employee_age)
    }

    if (props.isEditing && props.employee) {
      await employeeAPI.updateEmployee(props.employee.id, submitData)
    } else {
      await employeeAPI.createEmployee(submitData)
    }
    emit('employee-saved')
  } catch (error) {
    console.error('Error saving employee:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Error saving employee. Please try again.'
    alert(errorMessage)
  } finally {
    submitting.value = false
  }
}
</script>