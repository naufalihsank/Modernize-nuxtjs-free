<script setup lang="ts">
import { ref,nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { importKey, encryptMessage } from '../..//composables/useEncryption'
import { useRuntimeConfig } from 'nuxt/app';
import { useState } from '#imports'

const checkbox = ref(false);
const username = ref("");
const password = ref("");

const config = useRuntimeConfig()

const router = useRouter();
const isSubmitting = ref(false)
const flashAlert = useState<string | null>('flash-alert', () => null)
const flashAlertClass = useState<string | null>('flash-alert-class', () => null)
const showFlashAlert = ref(false)

let flashTimeout: ReturnType<typeof setTimeout> | null = null

async function handleLogin() {
  try {
    isSubmitting.value = true
    showFlashAlert.value = false
    if (flashTimeout) clearTimeout(flashTimeout)

    flashAlert.value = null // 👈 Force reset

    const ldapSecret = config.public.USER_API_SECRET   // server-only secret
    const apiUrl = config.public.USER_API_URL               // server-only or public

    const key = await importKey(ldapSecret)
    const encryptedPassword = await encryptMessage(password.value, key)
    const response = await axios.post(apiUrl+'/userapi/login', {
      username: username.value,
      password: encryptedPassword,
    });

    console.log("response = ",response);

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("employee", JSON.stringify(response.data.employee));

      if (checkbox.value) {
        console.log("Remember device: yes");
      }

    } else {
      if(response.data.message)
        useState('flash-alert').value = response.data.message
      else
      useState('flash-alert').value = 'Login Failed.'
      useState('flash-alert-class').value = 'v-alert v-theme--PurpleTheme bg-error'
      //alert("Invalid credentials");
    }

    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Fatal Error. Try again later.");
  } finally {
    isSubmitting.value = false
  }
}


watch(
  flashAlert,
  (val) => {
    if (val) {
      showFlashAlert.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (flashTimeout) clearTimeout(flashTimeout)

      // Set a fresh timeout
      flashTimeout = setTimeout(() => {
        flashAlert.value = null
        flashAlertClass.value = null
        showFlashAlert.value = false
        flashTimeout = null
      }, 4000)
    }
  },
  { immediate: true }
)
</script>

<template>
  <v-row class="d-flex mb-3">
    <div v-if="showFlashAlert" :class="useState('flash-alert-class').value" class="mb-3 mt-6">
      <span class="ml-4">{{ useState('flash-alert').value }}</span>
    </div>
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
      <v-btn @click="handleLogin" :loading="isSubmitting" :disabled="isSubmitting" color="primary" size="large" block flat>
        Sign in
      </v-btn>
    </v-col>
  </v-row>
</template>