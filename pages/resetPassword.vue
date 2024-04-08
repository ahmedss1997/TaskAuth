<template>
  <div class="primary fill-height">
    <div class="overlay py-6">
      <v-card class="mx-auto my-12 py-8 px-3" max-width="500">
        <v-sheet max-width="440" class="mx-auto">
          <div class="text-center mb-3" v-if="currentIcon">
            <v-avatar color="success" size="60">
              <v-icon :icon="currentIcon" size="x-large"></v-icon>
            </v-avatar>
          </div>
          <h1 class="text-center text-h6" v-html="currentTitle"></h1>

          <v-card-text class="py-2 px-0 text-subtitle-1 text-center">
            {{ currentPargraph }}
          </v-card-text>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-form ref="formRef">
                <span class="font-weight-bold d-inline-block px-0 ml-3 my-3">
                  Email
                </span>
                <v-text-field
                  aria-required="true"
                  label="Enter Email"
                  variant="solo"
                  v-model="Reset.email"
                  :rules="validationRules.validation.emailRules"
                  class="my-2 px-1"
                ></v-text-field>

                <v-btn block class="py-6" color="subcolor" @click="SendEmail()">
                  Reset Password
                </v-btn>
                <v-card-actions class="justify-center">
                  <span class="px-0 text-secondary"> Already have an account ? </span>
                  <NuxtLink to="/login">
                    <v-btn
                      class="px-0 text-capitalize text-subcolor"
                    >
                      Login
                    </v-btn>
                  </NuxtLink>
                </v-card-actions>
              </v-form>
            </v-window-item>

            <v-window-item :value="2">
              <v-form ref="formRef">
                <v-sheet class="my-2 mx-auto" max-width="80%">
                  <v-otp-input
                    length="6"
                    variant="solo"
                    :hide-details="false"
                    type="number"
                    v-model="Reset.verifyCode"
                    :rules="validationRules.validation.numberRules"
                  ></v-otp-input>
                </v-sheet>

                <v-btn
                  block
                  min-width="50% !important"
                  class="py-6 mx-auto my-3 primary"
                  color="secondary"
                  @click="Verify()"
                >
                  Verify Code
                </v-btn>
                <v-card-actions class="justify-center">
                  <span class="px-0 text-secondary"> Already have an account ? </span>
                  <NuxtLink to="/login">
                    <v-btn
                      class="px-0 text-capitalize text-subcolor"
                    >
                      Login
                    </v-btn>
                  </NuxtLink>
                </v-card-actions>
              </v-form>
            </v-window-item>

            <v-window-item :value="3">
              <v-form ref="formRef">
                <span class="font-weight-bold d-inline-block px-1 my-3">
                  New Password
                </span>
                <v-text-field
                  label="Enter New Password"
                  variant="solo"
                  type="password"
                  class="px-1"
                  v-model="Reset.password"
                  :rules="validationRules.validation.passowrdRules"
                ></v-text-field>
                <span class="font-weight-bold d-inline-block px-1 my-3">
                  Repeat Password
                </span>
                <v-text-field
                  label="Repeat Password"
                  variant="solo"
                  class="px-1"
                  type="password"
                  :rules="validationRules.confirmPassword(Reset.password)"
                ></v-text-field>

                <v-btn block class="py-6" color="subcolor" @click="ChangePassword()">
                  Change Password
                </v-btn>
                <v-card-actions class="justify-center">
                  <span class="px-0 text-secondary">Already have an account?</span>
                  <NuxtLink to="/login">
                    <v-btn
                      class="px-0 text-capitalize"
                      color="subcolor"
                    >
                      Login
                    </v-btn>
                  </NuxtLink>
                </v-card-actions>
              </v-form>
            </v-window-item>
            <v-window-item :value="4">
              <v-form ref="formRef">
                <v-sheet class="my-2 mx-auto" max-width="80%">
                  <NuxtLink to="/login" style="text-decoration: none">
                    <v-btn block class="py-6" color="secondary">
                      Let's go to login
                    </v-btn>
                  </NuxtLink>
                </v-sheet>
                <v-card-actions class="justify-center">
                  <span class="px-0 text-secondary"> Don't have account ? </span>
                  <NuxtLink to="/register">
                    <v-btn color="subcolor" class="px-0 mx-2 text-capitalize">
                      Register
                    </v-btn>
                  </NuxtLink>
                </v-card-actions>
              </v-form>
            </v-window-item>
          </v-window>
        </v-sheet>
      </v-card>

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
        :timeout="2000"
        :value="true"
        fixed
        bottom
        color="success"
        elevation="24"
        v-model="dialoges.success"
      >
        <div class="text-center">
          The Password Changed successfully
          <v-icon class="mx-2">mdi-check-bold</v-icon>
        </div>
      </v-snackbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { ref } from "vue";
import * as validation from "@/code/validation";

const Reset = ref({
  email: "",
  password: "",
  verifyCode: "",
});

const step = ref(1);

const withError = ref({
  displayError: false,
  msg: "",
  errorCode: 0,
});

const dialoges = ref({
  success: false,
});

const formRef = ref<HTMLFormElement | null>(null);

const validationRules = ref(validation);

const currentTitle = computed(() => {
  switch (step.value) {
    case 1:
      return "Forgot Password?";
    case 2:
      return "Verify Code";
    case 3:
      return "Reset Password";
    default:
      return '<div class="text-center">The Password Changed successfully </div>';
  }
});

const currentIcon = computed(() => {
  switch (step.value) {
    case 1:
      return "";
    case 2:
      return "";
    case 3:
      return "";
    default:
      return "mdi-check-bold";
  }
});

const currentPargraph = computed(() => {
  switch (step.value) {
    case 1:
      return "Enter your email to get a password reset link";
    case 2:
      return "Please Enter The Code You Have Received From Email";
    case 3:
      return "Please enter you new password";
    default:
      return "";
  }
});

const SendEmail = async () => {
  formRef.value?.validate().then(async ({ valid: isValid }: any) => {
    if (isValid) {
      try {
        const { data } = await useFetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/forgot-password"
        )
          .post(Reset.value)
          .json();
        if (true) { // data.value
          step.value = 2;
        } else {
          withError.value.displayError = true;
        }
      } catch (error) {
        withError.value.displayError = true;
      }
    }
  });
};

const Verify = async () => {
  formRef.value?.validate().then(async ({ valid: isValid }: any) => {
    if (isValid) {
      try {
        const { data } = await useFetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/forgot-password"
        )
          .post(Reset.value)
          .json();
        step.value = 3;
        // if (true) {
        //   step.value = 3;
        // } else {
        //   withError.value.displayError = true;
        // }
      } catch (error) {
        withError.value.displayError = true;
      }
    }
  });
};

const ChangePassword = async () => {
  formRef.value?.validate().then(async ({ valid: isValid }: any) => {
    if (isValid) {
      try {
        const { data } = await useFetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/forgot-password"
        )
          .post(Reset.value)
          .json();
        if (true) { // data.value
          step.value = 4;
        } else {
          withError.value.displayError = true;
        }
      } catch (error) {
        withError.value.displayError = true;
      }
    }
  });
};

</script>

<style lang="scss">
.overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5),
    rgba(17, 1, 31, 0.9)
  );
}
</style>
