<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      {{ isEditing ? 'Edit Employee' : 'Add New Employee' }}
    </h1>
    
    <div v-if="loading && isEditing" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="text-gray-600 mt-2">Loading employee data...</p>
    </div>
    
    <EmployeeForm
      v-else
      :employee="employeeData"
      :is-editing="isEditing"
      @employee-saved="handleEmployeeSaved"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EmployeeForm from '../components/EmployeeForm.vue'
import { employeeAPI } from '../services/api'

const route = useRoute()
const router = useRouter()
const employeeData = ref(null)
const loading = ref(false)

const isEditing = computed(() => !!route.params.id)

// Fetch employee data if editing
onMounted(async () => {
  if (isEditing.value) {
    try {
      loading.value = true
      const response = await employeeAPI.getEmployee(route.params.id)
      employeeData.value = response.data
    } catch (error) {
      console.error('Error fetching employee:', error)
      alert('Error loading employee data')
      router.push('/employees')
    } finally {
      loading.value = false
    }
  }
})

const handleEmployeeSaved = () => {
  // Show success message
  alert('Employee saved successfully!')
  // Redirect to employee list
  router.push('/employees')
}

const handleCancel = () => {
  router.push('/employees')
}
</script>