import { createRouter, createWebHistory } from 'vue-router';
import EmployeeList from '../components/EmployeeList.vue';
import EmployeeForm from '../components/EmployeeForm.vue';

const routes = [
  { path: '/', name: 'List', component: EmployeeList },
  { path: '/employees/new', name: 'NewEmployee', component: EmployeeForm },
  { path: '/employees/:id/edit', name: 'EditEmployee', component: EmployeeForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;