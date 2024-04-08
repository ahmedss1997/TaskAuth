<template>
  <div class="signin primary fill-height">
    <div class="overlay py-6">
      <v-card
        class="mx-auto mt-12 py-3 px-3"
        elevation="24"
        max-width="500"
        rounded="lg"
      >
        <v-sheet max-width="440" class="mx-auto" color="transparent">
          <h2 class="text-center text-secondary mb-1">Login</h2>

          <v-card-text
            class="pb-3 pt-0 px-0 text-h6 text-center text-secondary"
          >
            Access to our dashboard
          </v-card-text>
          <v-form ref="createAccount">
            <span class="font-weight-bold px-0 my-2 d-block">Email</span>
            <v-text-field
              v-model="userLogin.email"
              label="Email"
              :rules="validationRules.validation.emailRules"
              variant="solo"
            ></v-text-field>
            <div class="d-flex mb-2">
              <span class="font-weight-bold px-0 flex-grow-1 my-2">
                Password
              </span>
              <NuxtLink to="/resetPassword" style="text-decoration: none">
                <div class="px-0 my-1 text-capitalize text-subcolor">
                  Forgot password?
                </div>
              </NuxtLink>
            </div>
            <v-text-field
              v-model="userLogin.password"
              label="Password"
              :rules="validationRules.validation.passowrdRules"
              variant="solo"
            ></v-text-field>
            <v-btn block class="py-6 my-2 font-weight-bold" color="subcolor" @click="login()">
              Login
            </v-btn>
            <v-card-actions class="justify-center">
              <span class="px-0 text-secondary"> Don't have an account ?  </span>
              <NuxtLink to="/register">
                <v-btn class="px-0 text-capitalize text-subcolor">
                  Register
                </v-btn>
              </NuxtLink>
            </v-card-actions>
          </v-form>
        </v-sheet>
      </v-card>
    </div>

    <v-snackbar
      v-model="withError.displayError"
      multi-line
      fixed
      bottom
      color="error"
      elevation="24"
    >
      <div class="text-center">
        <span class="mx-2">Something Went Wrong!</span>
      </div>

      <template v-slot:actions>
        <v-btn @click="withError.displayError = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="dialoges.success"
      :timeout="2000"
      fixed
      bottom
      color="success"
      elevation="24"
    >
      <div class="text-center">
        Saved successfully <v-icon class="mx-2">mdi-check-bold</v-icon>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { ref } from "vue";
import * as validation from "@/code/validation";

const userLogin = ref({
  email: "",
  password: "",
});

const withError = ref({
  displayError: false,
  msg: "",
});

const dialoges = ref({
  success: false,
});

const validationRules = ref(validation);

const login = async () => {
  try {
    const xsrfToken = useCookie("laravel_session");
    console.log(xsrfToken);
    let headers = {
      accept: "application/json",
      /// "X-XSRF-TOKEN": xsrfToken ? xsrfToken.value : "",
    };
    if (process.server) {
      headers = {
        ...headers,
        ...useRequestHeaders(["cookie"]),
      };
    }
    const { data } = await useFetch(
      "https://elkodaa.chd-staging.tech/api/c/auth/login",
      {
        headers,
        credentials: "include",
      }
    )
      .post(userLogin.value)
      .json();
    if (data.value) {
      dialoges.value.success = true;
    } else {
      withError.value.displayError = true;
    }
  } catch (error) {
    withError.value.displayError = true;
  }
};
</script>

<style lang="scss">
.signin {
  /* background: url('@/'); */
  background-size: cover;
  .overlay {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(17, 1, 31, 0.9)
    );
  }
}
</style>

