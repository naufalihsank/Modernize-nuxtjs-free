<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const checkbox = ref(true);
const telegramId = ref("");
const password = ref("");

const router = useRouter();

function handleLogin() {
  localStorage.setItem("token", "dummy_token_value");

  if (checkbox.value) {
    console.log("Remember device: yes");
  }

  router.push("/");
}
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">NIK Telkom/ Username</v-label>
      <v-text-field
        v-model="telegramId"
        variant="outlined"
        hide-details
        color="primary"
        placeholder="Enter your NIK"
      />
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Password</v-label>
      <v-text-field
        v-model="password"
        variant="outlined"
        type="password"
        hide-details
        color="primary"
        placeholder="Enter your password"
      />
    </v-col>
    <v-col cols="12" class="pt-0">
      <div class="d-flex flex-wrap align-center ml-n2">
        <v-checkbox v-model="checkbox" color="primary" hide-details>
          <template #label>
            <span class="text-body-1">Remember this device</span>
          </template>
        </v-checkbox>
        <div class="ml-sm-auto">
          <NuxtLink
            to="/"
            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
          >
            Forgot Password?
          </NuxtLink>
        </div>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn @click="handleLogin" color="primary" size="large" block flat>
        Sign in
      </v-btn>
    </v-col>
  </v-row>
</template>
