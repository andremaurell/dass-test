<template>
  <div class="flex flex-col items-center justify-center gap-6 px-4">
    <div class="flex flex-col items-center justify-center gap-4 w-full max-w-4xl">
      <h1 class="text-lg font-bold sm:text-2xl">Employees</h1>
      <div class="flex flex-col gap-4 sm:flex-row sm:gap-2 w-full">
        <input
          v-model="search"
          placeholder="Search..."
          class="bg-slate-200 border border-blue-600 rounded-2xl p-2 w-full sm:w-1/2"
        />
        <select
          v-model="selectedShirtSize"
          @change="fetchEmployees"
          class="bg-slate-200 border border-blue-500 rounded-md p-2 w-full sm:w-1/4"
        >
          <option value="">All Shirt Sizes</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
          <option value="XG">XG</option>
        </select>
        <input
          v-model="shoeSize"
          type="number"
          placeholder="Shoe Size"
          min="32"
          max="48"
          class="bg-slate-200 border border-blue-500 rounded-md p-2 w-full sm:w-1/4"
          @input="fetchEmployees"
        />
      </div>
    </div>
    <div class="overflow-x-auto w-full max-w-4xl">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md text-sm">
        <thead>
          <tr class="bg-blue-600 text-white">
            <th class="px-2 py-2 text-left font-semibold">CPF</th>
            <th class="px-2 py-2 text-left font-semibold">Name</th>
            <th class="px-2 py-2 text-left font-semibold">Email</th>
            <th class="px-2 py-2 text-left font-semibold">Shirt Size</th>
            <th class="px-2 py-2 text-left font-semibold">Shoe Size</th>
            <th class="px-2 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in filteredEmployees"
            :key="employee.id"
            class="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition"
          >
            <td class="px-2 py-2 border border-gray-300">{{ employee.cpf }}</td>
            <td class="px-2 py-2 border border-gray-300">{{ employee.name }}</td>
            <td class="px-2 py-2 border border-gray-300">{{ employee.email }}</td>
            <td class="px-2 py-2 border border-gray-300">
              {{ employee.shirt_size }}
            </td>
            <td class="px-2 py-2 border border-gray-300">
              {{ employee.shoe_size }}
            </td>
            <td class="px-2 py-2 border border-gray-300">
              <button
                @click="editEmployee(employee.id)"
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                @click="deleteEmployee(employee.id)"
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  data() {
    return {
      employees: [],
      search: "",
      selectedShirtSize: "",
      shoeSize: "",
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter((emp) => {
        const matchesSearch =
          this.search === "" ||
          emp.name.toLowerCase().includes(this.search.toLowerCase()) ||
          emp.cpf.includes(this.search) ||
          emp.email.toLowerCase().includes(this.search.toLowerCase());

        const matchesShirtSize =
          this.selectedShirtSize === "" ||
          emp.shirt_size === this.selectedShirtSize;

        const matchesShoeSize =
          this.shoeSize === "" || emp.shoe_size == this.shoeSize;

        return matchesSearch && matchesShirtSize && matchesShoeSize;
      });
    },
  },
  methods: {
    fetchEmployees() {
      const params = {};
      if (this.search) {
        params.search = this.search;
      }
      if (this.selectedShirtSize) {
        params.shirt_size = this.selectedShirtSize;
      }
      if (this.shoeSize) {
        params.shoe_size = this.shoeSize;
      }

      console.log("Parâmetros enviados:", params);

      api
        .get("/employees", { params })
        .then((res) => {
          this.employees = res.data;
          console.log("Funcionários recebidos:", res.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar funcionários:", error);
        });
    },
    editEmployee(id) {
      this.$router.push({ name: "EditEmployee", params: { id } });
    },
    deleteEmployee(id) {
  api
    .delete(`/employees/${id}`)
    .then(() => {
      // Atualiza a lista de funcionários
      this.fetchEmployees();

      Toastify({
        text: "Employee deleted successfully!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
        stopOnFocus: true,
      }).showToast();
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);

      Toastify({
        text: "Error deleting employee!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336",
        stopOnFocus: true,
      }).showToast();
    });
},
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>
