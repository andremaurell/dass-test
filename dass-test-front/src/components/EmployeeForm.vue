<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center text-blue-600">
        {{ isEdit ? "Edit" : "New" }} Employee
      </h1>
      <form @submit.prevent="saveEmployee" class="flex flex-col space-y-4">
        <input
          v-model="employee.cpf"
          placeholder="CPF"
          required
          class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span v-if="errors.cpf" class="text-red-500 text-sm">{{
          errors.cpf
        }}</span>
        <input
          v-model="employee.name"
          placeholder="Name"
          required
          class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{
          errors.name
        }}</span>
        <input
          v-model="employee.email"
          placeholder="Email"
          type="email"
          required
          class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-model="employee.shirtSize"
          class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
          <option value="XG">XG</option>
        </select>
        <input
          v-model="employee.shoeSize"
          placeholder="Shoe Size (32-48)"
          type="number"
          required
          class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import { cpfSchema, nameSchema } from "../schemas/employeeSchema";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  data() {
    return {
      employee: {
        cpf: "",
        name: "",
        email: "",
        shirtSize: "M",
        shoeSize: "",
      },
      errors: {},
    };
  },
  computed: {
    isEdit() {
      return this.$route.params.id !== undefined;
    },
  },

  methods: {
    fetchEmployee() {
      api.get(`/employees/${this.$route.params.id}`).then((res) => {
        this.employee = res.data;
      });
    },
    saveEmployee() {
      this.errors = {};

      const cpfResult = cpfSchema.safeParse(this.employee.cpf);
      if (!cpfResult.success) {
        this.errors.cpf = cpfResult.error.errors[0].message;
      }

      const nameResult = nameSchema.safeParse(this.employee.name);
      if (!nameResult.success) {
        this.errors.name = nameResult.error.errors[0].message;
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      const apiCall = this.isEdit
        ? api.put(`/employees/${this.$route.params.id}`, this.employee)
        : api.post("/employees", this.employee);

      apiCall
        .then(() => {
          const successMessage = this.isEdit
            ? "Employee edited successfully!"
            : "Employee created successfully!";

          Toastify({
            text: successMessage,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
            stopOnFocus: true,
          }).showToast();

          this.$router.push("/");
        })
        .catch((error) => {
          console.error("API error:", error);

          Toastify({
            text: this.isEdit
              ? "Error editing employee!"
              : "Error creating employee!",
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
};
</script>
