import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import EmployeeList from "@/views/EmployeeList.vue";
import AddEmployee from "@/views/AddEmployee.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/add-employee',
    name: 'AddEmployee',
    component: AddEmployee
  },
  {
    path: '/edit-employee/:id',
    name: 'EditEmployee',
    component: AddEmployee,
    props: true
  },
    ]
});

export default router;