<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useState } from '#imports'
import { useRouter } from "vue-router";
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app';

// Define reactive variables
const fullName = ref('')
const email = ref('') // If you also store email, otherwise leave blank
const nik = ref('')
const subUnit = ref('')
const unit = ref('')
const namaPosisi = ref('')
const kota = ref('')
const teleId = ref('')
const teleUsername = ref('')

const redirectAlert = useState('teleRedirectAlert')
const flashAlert = useState<string | null>('flash-alert', () => null)
const flashAlertClass = useState<string | null>('flash-alert-class', () => null)
const showFlashAlert = ref(false)
const showRedirectAlert = ref(false)
const isSubmitting = ref(false)

const config = useRuntimeConfig()

const router = useRouter();

let flashTimeout: ReturnType<typeof setTimeout> | null = null

const updateProfile = async () => {
    isSubmitting.value = true
  // Collect the form data
  const payload = {
    nik: nik.value,
    fullName: fullName.value,
    email: email.value,
    subUnit: subUnit.value,
    unit: unit.value,
    namaPosisi: namaPosisi.value,
    kota: kota.value,
    teleId: teleId.value,
    teleUsername: teleUsername.value,
  }

  try {
    // Example: send it to your API
    // await $fetch('/api/profile/update', { method: 'POST', body: payload })

    const response = await axios.post(config.public.USER_API_URL as string+'/userapi/updateprofile', payload);
   /*  if (flashTimeout) clearTimeout(flashTimeout)
    flashAlert.value = null // 👈 Force reset */

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("employee", JSON.stringify(response.data.employee));

      useState('flash-alert').value = 'Profile updated successfully!'
      useState('flash-alert-class').value = 'v-alert v-theme--PurpleTheme bg-success'

      await router.push("/");
    } else {
      //alert("Failed to update profile");

      if(response.data.message){
        useState('flash-alert').value = response.data.message
      } else {
        useState('flash-alert').value = 'Failed to update profile. Please try again later.'
      }

      useState('flash-alert-class').value = 'v-alert v-theme--PurpleTheme bg-error'
      
      if (flashTimeout) clearTimeout(flashTimeout)

      showFlashAlert.value = true

      flashTimeout = setTimeout(() => {
        flashAlert.value = null
        flashAlertClass.value = null
        showFlashAlert.value = false
      }, 4000)
      
      await router.push("/auth/profile")
    }

    console.log('Profile submitted', payload)

    //await router.push("/auth/profile")
    window.scrollTo({ top: 0, behavior: 'smooth' })  // Jump to top
    // optionally show a success alert
  } finally{
    isSubmitting.value = false
  }
}

onMounted(async() => {
  // Read employee data from localStorage

  const employee = JSON.parse(localStorage.getItem('employee') || '{}')

  const employeeData = await axios.post(config.public.USER_API_URL as string+'/userapi/getProfile', {nik: employee.nik});
  let employeeDataResult = {}

  if(employeeData.data.success){
    employeeDataResult = employeeData.data.data

    // Fill the reactive variables
    fullName.value = employeeDataResult.nama || ''
    email.value = employeeDataResult.nik+'@telkom.co.id' || '' // make sure you have this in your data
    nik.value = employeeDataResult.nik || ''
    subUnit.value = employeeDataResult.subUnit || ''
    unit.value = employeeDataResult.unit || ''
    namaPosisi.value = employeeDataResult.namaPosisi || ''
    kota.value = employeeDataResult.kota || ''
    teleId.value = employeeDataResult.teleId || ''
    teleUsername.value = employeeDataResult.teleUsername || ''
  } 
})

watch(
  () => redirectAlert.value,
  (val) => {
    if (val) {
      redirectAlert.value = false
      showRedirectAlert.value = true

      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        redirectAlert.value = false
        showRedirectAlert.value = false
      }, 4000) // 4 seconds, adjust as needed
    }
  },
  { immediate: true } // trigger immediately for the current value
)

</script>

<template>
<div>
<h1><UserIcon class="w-12 h-12 text-blue-500" /> User Profile</h1>
<div v-if="showRedirectAlert" class="v-alert v-theme--PurpleTheme bg-error v-alert--density-default v-alert--variant-flat mb-3 mt-6">
    <AlertCircleIcon class="w-6 h-6 text-blue-500" />  
    <span class="pl-2">Anda harus mengisi Username dan ID Telegram untuk dapat mengakses Catalyst AI.</span>
</div>

<div v-if="showFlashAlert" :class="useState('flash-alert-class').value" class="mb-3 mt-6">
  {{ useState('flash-alert').value }}
</div>

<v-divider class="mb-6" />
<v-card elevation="10" class="withbg">
<v-card-item>
    <div>
        <v-card-title class="text-h5 inline-flex items-center gap-2">
            <InfoSquareRoundedIcon class="w-6 h-6 mr-2" /> General Information
        </v-card-title>
    </div>
    <v-divider class="mb-6" />
    <v-row class="d-flex mb-3">
        <v-col cols="12" md="6">
            <v-label class="font-weight-bold mb-1">NIK</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            {{ nik }}
            </div>
            <v-label class="font-weight-bold mb-1">Full Name</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            {{ fullName }}
            </div>
            <v-label class="font-weight-bold mb-1">Email Address</v-label>
            <v-text-field
                variant="outlined"
                type="email"
                hide-details
                color="primary"
                placeholder="Enter your email"
                v-model="email"
            />
            <v-label class="font-weight-bold mb-1">Sub Unit</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            {{ subUnit }}
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="font-weight-bold mb-1">Unit</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            {{ unit }}
            </div>
            <v-label class="font-weight-bold mb-1">Nama Posisi</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            {{ namaPosisi }}
            </div>
            <v-label class="font-weight-bold mb-1">Kota</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            {{ kota }}
            </div>
        </v-col>
       
    </v-row>
</v-card-item>
</v-card>
<v-divider class="mb-6" />
<v-card elevation="10" class="withbg">
<v-card-item>
    <div>
        <v-card-title class="text-h5"><BrandTelegramIcon class="w-6 h-6 mr-2" /> Telegram Details</v-card-title>
    </div>
    <p class="text-subtitle-1 text-grey-darken-1 pt-4">
        Anda harus mengisi Telegram ID dan Username agar dapat mengakses Catalyst AI Bot
    </p>
    <v-divider class="mb-6" />
    <v-row class="d-flex mb-3">
        <v-col cols="12" md="6">
            <v-label class="font-weight-bold mb-1">Telegram ID</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            <v-text-field
                variant="outlined"
                type="email"
                hide-details
                color="primary"
                placeholder="Masukkan Telegram ID"
                v-model="teleId"
            />
            </div>
            <v-label class="font-weight-bold mb-1">Telegram Username</v-label>
            <div class="pa-3 rounded-lg bg-grey-lighten-4">
            <v-text-field
                variant="outlined"
                type="email"
                hide-details
                color="primary"
                placeholder="Masukkan Telegram Username (diawali @)"
                v-model="teleUsername"
            />
            </div>
        </v-col>
    </v-row>
</v-card-item>
</v-card>
<v-divider class="mb-6" />
<v-card elevation="10" class="withbg">
<v-card-item>
    <div>
        <v-btn block color="primary" variant="flat" size="large" 
        :loading="isSubmitting" :disabled="isSubmitting" @click="updateProfile">
            <PencilIcon class="w-6 h-6 mr-2" /> Update Profile
        </v-btn>
    </div>
</v-card-item>
</v-card>
</div>
</template>