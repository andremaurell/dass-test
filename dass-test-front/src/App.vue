<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-600 text-white px-4 py-3 relative">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Employee Manager</h1>

        <!-- Hamburger Button -->
        <button
          v-if="!menuOpen"
          @click="toggleMenu"
          class="sm:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <!-- Close Button (X) -->
        <button
          v-if="menuOpen"
          @click="toggleMenu"
          class="absolute top-4 right-4 sm:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Navigation Links -->
        <ul
          :class="[
            'flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 sm:items-center sm:flex',
            menuOpen ? 'flex' : 'hidden',
            'sm:flex',
          ]"
          class="flex"
        >
          <li>
            <router-link
              to="/"
              class="hover:underline"
              active-class="font-semibold underline"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/employees/new"
              class="hover:underline"
              active-class="font-semibold underline"
              >Add Employee</router-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <main class="container mx-auto py-6">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
