<script setup lang="ts">
/*Call Components*/
import SalesOverview from "@/components/dashboard/SalesOverview.vue";
import YearlyBreakup from "@/components/dashboard/YearlyBreakup.vue";
import MonthlyEarning from "@/components/dashboard/MonthlyEarnings.vue";
import RecentTransaction from "@/components/dashboard/RecentTransaction.vue";
import ProductPerformance from "@/components/dashboard/ProductPerformance.vue";
import ProductCards from "@/components/dashboard/ProductCards.vue";
import { useRouter } from "vue-router";
import { useState } from '#imports'
import { watch } from 'vue'


const router = useRouter();

const flashAlert = useState<string | null>('flash-alert', () => null)
const flashAlertClass = useState<string | null>('flash-alert-class', () => null)
const showFlashAlert = ref(false)

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/auth/login");
  }
});

watch(
  flashAlert,
  (val) => {
    if (val) {
      showFlashAlert.value = false
      showFlashAlert.value = true

      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Automatically reset after showing once
      setTimeout(() => {
        flashAlert.value = null
        flashAlertClass.value = null
        showFlashAlert.value = false
      }, 4000) // 4 seconds, adjust as needed
    }
  },
  { immediate: true }
)

function openTelegramBot() {
  const telegramAppUrl = "tg://resolve?domain=catalyst_TR3_bot"
  const telegramWebUrl = "https://t.me/catalyst_TR3_bot"

  // Try to open Telegram app first
  const iframe = document.createElement("iframe")
  iframe.style.display = "none"
  iframe.src = telegramAppUrl
  document.body.appendChild(iframe)

  // If no Telegram app, fallback after 1s
  setTimeout(() => {
    window.open(telegramWebUrl, "_blank")
    document.body.removeChild(iframe)
  }, 1000)
}
</script>

<template>
<v-row>
  <div v-if="showFlashAlert" :class="useState('flash-alert-class').value" class="mb-3 mt-6">
    {{ useState('flash-alert').value }}
  </div>
</v-row>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Sales overview -->
        <v-col cols="12" lg="8">
        <v-card elevation="10" class="withbg">
          <v-card-item class="d-flex flex-column align-center">
            <v-card-title class="text-h5 text-center">
              Akses Catalyst AI Bot
            </v-card-title>
            <div class="mt-6">
              <img src="/images/logos/catalyst_ai.jpg" width="350" />
            </div>
            <div>
                <v-btn block color="primary" variant="flat" size="large" @click="openTelegramBot">
                    <BrandTelegramIcon class="w-6 h-6 mr-2" /> Go to Catalyst AI BOT
                </v-btn>
            </div>
          </v-card-item>
        </v-card>
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="4">
          <div class="mb-6">
            <YearlyBreakup />
          </div>
          <div>
            <MonthlyEarning />
          </div>
        </v-col>
        <!-- Recent transaction -->
        <v-col cols="12" lg="4">
          <RecentTransaction />
        </v-col>
        <!-- Product performence -->
        <v-col cols="12" lg="8">
          <ProductPerformance />
        </v-col>
        <!-- Product Cards -->
        <!-- <v-col cols="12">
          <ProductCards />
        </v-col> -->
      </v-row>
    </v-col>
    <v-col class="text-center mt-2">
      <p class="text-muted mb-0">
        Design and Developed by
        <a
          href="https://github.com/naufalihsank"
          target="_blank"
          class="pl-1 text-primary"
        >
          Ihsan Naufal K
        </a>
        &
        <a
          href="https://www.linkedin.com/in/mayun-suryatama-5ba0b52a5/"
          target="_blank"
          class="pl-1 text-primary"
        >
          Mayun Suryatama
        </a>
      </p>
    </v-col>
  </v-row>
</template>
