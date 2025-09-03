<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const telegramId = ref("");
const email = ref("");
const password = ref("");

const router = useRouter();

function handleRegister() {
  localStorage.setItem("token", "dummy_token_value");

  router.push("/");
}
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Full Name</v-label>
      <v-text-field
        v-model="name"
        variant="outlined"
        hide-details
        color="primary"
        placeholder="Enter your name"
      />
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Telegram ID</v-label>
      <v-text-field
        v-model="telegramId"
        variant="outlined"
        hide-details
        color="primary"
        placeholder="Enter your NIK"
      />
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Email Address</v-label>
      <v-text-field
        v-model="email"
        variant="outlined"
        type="email"
        hide-details
        color="primary"
        placeholder="Enter your email"
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
        placeholder="Create a password"
      />
    </v-col>
    <v-col cols="12">
      <v-btn @click="handleRegister" color="primary" size="large" block flat>
        Sign up
      </v-btn>
    </v-col>
  </v-row>
</template>
s
