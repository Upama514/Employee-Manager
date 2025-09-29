import axios from 'axios';

const BASE_URL = 'https://dummy.restapiexample.com/api/v1';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  //timeout: 10000, // 10 second timeout
});

// Mock data as fallback
const mockEmployees = [
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

// Helper function to simulate API delay
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const employeeAPI = {
  // Get all employees with fallback to mock data
  async getEmployees() {
    try {
      console.log('Attempting to fetch employees from API...');
      const response = await api.get('/employees');
      console.log('API response received:', response.data);
      return response.data;
    } catch (error) {
      console.warn('API request failed, using mock data:', error.message);
      
      // Simulate network delay for realistic experience
      await simulateDelay(1000);
      
      // Return mock data as fallback
      return {
        status: 'success',
        data: mockEmployees,
        message: 'Using mock data due to API limitations'
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
      
      // Mock successful creation
      const newEmployee = {
        id: Math.max(...mockEmployees.map(e => e.id)) + 1,
        ...employeeData,
        profile_image: ""
      };
      
      mockEmployees.push(newEmployee);
      
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
      
      // Mock update
      const index = mockEmployees.findIndex(emp => emp.id === parseInt(id));
      if (index !== -1) {
        mockEmployees[index] = { ...mockEmployees[index], ...employeeData };
        return {
          status: 'success',
          data: mockEmployees[index],
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
      
      // Mock delete
      const index = mockEmployees.findIndex(emp => emp.id === parseInt(id));
      if (index !== -1) {
        mockEmployees.splice(index, 1);
        return {
          status: 'success',
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
      
      const employee = mockEmployees.find(emp => emp.id === parseInt(id));
      if (employee) {
        return {
          status: 'success',
          data: employee,
          message: 'Using mock data (API unavailable)'
        };
      }
      
      throw new Error('Employee not found');
    }
  }
};