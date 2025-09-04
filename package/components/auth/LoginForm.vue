<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const checkbox = ref(false);
const username = ref("");
const password = ref("");

const router = useRouter();

async function handleLogin() {
  try {
    const response = await axios.post("https://cb580ea4c281.ngrok-free.app/api/login", {
      username: username.value,
      password: password.value,
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);

      if (checkbox.value) {
        console.log("Remember device: yes");
      }

      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid credentials");
  }
}
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">NIK Telkom/ Username</v-label>
      <v-text-field
        v-model="username"
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