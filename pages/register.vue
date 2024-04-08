<template>
  <div class="signin primary fill-height">
    <div class="overlay py-6">
      <v-card
        class="mx-auto mt-6 py-3 px-3"
        elevation="24"
        max-width="500"
        rounded="xl"
      >
        <v-sheet max-width="440" class="mx-auto">
          <h3 class="text-center text-secondary my-1">Register</h3>
          <v-card-text
            class="pb-3 pt-0 px-0 text-secondary text-h6 text-center"
          >
            Access to our dashboard
          </v-card-text>
          <v-form ref="createAccount">
            <v-text-field
              v-model="newAccount.firstName"
              label="First Name"
              :rules="validationRules.validation.textRules"
              variant="solo"
              rounded
              class="my-2"
            ></v-text-field>
            <v-text-field
              v-model="newAccount.lastName"
              label="Last Name"
              :rules="validationRules.validation.textRules"
              variant="solo"
              rounded
            ></v-text-field>
            <v-text-field
              v-model="newAccount.email"
              label="Email"
              :rules="validationRules.validation.emailRules"
              variant="solo"
              rounded
            ></v-text-field>
            <v-text-field
              v-model="newAccount.password"
              label="Password"
              :rules="validationRules.validation.passowrdRules"
              variant="solo"
              rounded
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="newAccount.repeatPassword"
              label="Repeat Password"
              :rules="validationRules.confirmPassword(newAccount.password)"
              variant="solo"
              rounded
              type="password"
            ></v-text-field>
            <v-btn block rounded class="py-6 mt-2 bg-secondary" @click="register">
              Register
            </v-btn>
            <v-card-actions class="justify-center secondary--text">
              <span class="px-0 text-secondary">Already have an account ?</span>
              <NuxtLink to="/logIn">
                <v-btn color="subcolor" class="px-0 text-body-1 text-capitalize">
                  Login
                </v-btn>
              </NuxtLink>
            </v-card-actions>
          </v-form>
        </v-sheet>
      </v-card>
    </div>

    <v-snackbar v-model="withError.displayError" multi-line>
      <div v-if="withError.errorCode" class="text-center">
        <v-chip color="error" size="20">{{ withError.errorCode }}</v-chip>
        <span class="mx-2">{{ withError.msg }}</span>
      </div>
      <div v-else class="text-center">
        <span class="mx-2">Something Went Wrong!</span>
      </div>
      <template v-slot:actions>
        <v-btn color="red" @click="withError.displayError = false">
          Close
        </v-btn>
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

const newAccount = ref<any>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const withError = ref({
  displayError: false,
  errorCode: null,
  msg: "",
});

const dialoges = ref({
  success: false,
});

const validationRules = ref(validation);

const register = async () => {
  try {
    const { data } = await useFetch<users>(
      "https://elkodaa.chd-staging.tech/api/c/auth/login"
    )
      .post(newAccount.value)
      .json();
    if (data.value) {
      console.log(data);
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
