<template>
  <v-app>
    <NuxtPage />
  </v-app>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// import jwt_decode from "jwt-decode";

// const tok = ref<any>(null);
const route = useRoute();
const router = useRouter();

// watch(route, (newRoute, oldRoute) => {
//   if (newRoute.meta && newRoute.meta.auth) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwt_decode(token);
//       tok.value = decoded;
//       // Safely access properties of tok.value using optional chaining
//       if (tok.value?.exp) {
//         const tokDate = new Date(tok.value.exp * 1000);
//         const nowDate = new Date();
//         if (nowDate >= tokDate) {
//           console.log("Token expired, redirecting to login");
//           router.push("/login");
//         }
//       } else {
//         console.log("Invalid token, redirecting to login");
//         router.push("/login");
//       }
//     } else {
//       console.log("No token found, redirecting to login");
//       router.push("/login");
//     }
//   }
// }, { immediate: true, deep: true });


</script>