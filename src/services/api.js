import axios from 'axios';

const BASE_URL = 'https://dummy.restapiexample.com/api/v1';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initial mock data
const initialMockEmployees = [
  {
    id: 1,
    employee_name: "Tiger Nixon",
    employee_salary: 320800,
    employee_age: 61,
    profile_image: ""
  },
  {
    id: 2,
    employee_name: "Garrett Winters",
    employee_salary: 170750,
    employee_age: 63,
    profile_image: ""
  },
  {
    id: 3,
    employee_name: "Ashton Cox",
    employee_salary: 86000,
    employee_age: 66,
    profile_image: ""
  },
  {
    id: 4,
    employee_name: "Cedric Kelly",
    employee_salary: 433060,
    employee_age: 22,
    profile_image: ""
  },
  {
    id: 5,
    employee_name: "Airi Satou",
    employee_salary: 162700,
    employee_age: 33,
    profile_image: ""
  }
];

// Helper functions for localStorage
const getEmployeesFromStorage = () => {
  try {
    const stored = localStorage.getItem('employeeManager_employees');
    return stored ? JSON.parse(stored) : initialMockEmployees;
  } catch {
    return initialMockEmployees;
  }
};

const saveEmployeesToStorage = (employees) => {
  try {
    localStorage.setItem('employeeManager_employees', JSON.stringify(employees));
  } catch (error) {
    console.warn('Failed to save employees to localStorage:', error);
  }
};

// Helper function to simulate API delay
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const employeeAPI = {
  // Get all employees with fallback to mock data
  async getEmployees() {
    try {
      console.log('Attempting to fetch employees from API...');
      const response = await api.get('/employees');
      console.log('API response received:', response.data);
      
      // Save API data to localStorage for consistency
      if (response.data && response.data.data) {
        saveEmployeesToStorage(response.data.data);
      }
      
      return response.data;
    } catch (error) {
      console.warn('API request failed, using mock data:', error.message);
      
      // Simulate network delay for realistic experience
      await simulateDelay(1000);
      
      // Return stored data as fallback
      const employees = getEmployeesFromStorage();
      return {
        status: 'success',
        data: employees,
        message: 'Using local data due to API limitations'
      };
    }
  },

  // Create new employee (mock implementation)
  async createEmployee(employeeData) {
    try {
      console.log('Attempting to create employee via API...');
      const response = await api.post('/create', employeeData);
      return response.data;
    } catch (error) {
      console.warn('API request failed, using mock create:', error.message);
      
      await simulateDelay(500);
      
      // Get current employees
      const employees = getEmployeesFromStorage();
      
      // Create new employee with unique ID
      const newEmployee = {
        id: Math.max(...employees.map(e => e.id), 0) + 1,
        ...employeeData,
        profile_image: ""
      };
      
      // Add to employees array
      employees.push(newEmployee);
      
      // Save to localStorage
      saveEmployeesToStorage(employees);
      
      return {
        status: 'success',
        data: newEmployee,
        message: 'Created locally (API unavailable)'
      };
    }
  },

  // Update employee (mock implementation)
  async updateEmployee(id, employeeData) {
    try {
      console.log('Attempting to update employee via API...');
      const response = await api.put(`/update/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.warn('API request failed, using mock update:', error.message);
      
      await simulateDelay(500);
      
      // Get current employees
      const employees = getEmployeesFromStorage();
      
      // Find and update employee
      const index = employees.findIndex(emp => emp.id === parseInt(id));
      if (index !== -1) {
        employees[index] = { 
          ...employees[index], 
          ...employeeData,
          id: employees[index].id // Preserve original ID
        };
        
        // Save to localStorage
        saveEmployeesToStorage(employees);
        
        return {
          status: 'success',
          data: employees[index],
          message: 'Updated locally (API unavailable)'
        };
      }
      
      throw new Error('Employee not found');
    }
  },

  // Delete employee (mock implementation)
  async deleteEmployee(id) {
    try {
      console.log('Attempting to delete employee via API...');
      const response = await api.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API request failed, using mock delete:', error.message);
      
      await simulateDelay(500);
      
      // Get current employees
      const employees = getEmployeesFromStorage();
      
      // Find and delete employee
      const index = employees.findIndex(emp => emp.id === parseInt(id));
      if (index !== -1) {
        const deletedEmployee = employees.splice(index, 1)[0];
        
        // Save to localStorage
        saveEmployeesToStorage(employees);
        
        return {
          status: 'success',
          data: deletedEmployee,
          message: 'Deleted locally (API unavailable)'
        };
      }
      
      throw new Error('Employee not found');
    }
  },

  // Get single employee (mock implementation)
  async getEmployee(id) {
    try {
      console.log('Attempting to fetch employee via API...');
      const response = await api.get(`/employee/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API request failed, using mock employee:', error.message);
      
      await simulateDelay(500);
      
      const employees = getEmployeesFromStorage();
      const employee = employees.find(emp => emp.id === parseInt(id));
      if (employee) {
        return {
          status: 'success',
          data: employee,
          message: 'Using local data (API unavailable)'
        };
      }
      
      throw new Error('Employee not found');
    }
  },

  // Utility function to reset to initial data (for testing)
  resetToInitialData() {
    saveEmployeesToStorage(initialMockEmployees);
    return {
      status: 'success',
      message: 'Reset to initial data'
    };
  }
};