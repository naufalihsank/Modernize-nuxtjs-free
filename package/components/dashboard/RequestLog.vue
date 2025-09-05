<script setup lang="ts">
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { useTheme } from "vuetify";
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app';

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.secondary;
// Reactive variables for chart
const chartLabels = ref<string[]>([])
const chartData = ref<number[]>([])
const config = useRuntimeConfig()

const areachartOptions = computed(() => ({
  labels: chartLabels.value,
  chart: {
    type: "area",
    height: 60,
    fontFamily: `inherit`,
    foreColor: "#a1aab2",
    toolbar: { show: false },
    sparkline: { enabled: true },
    group: "sparklines",
  },
  colors: [secondary],
  stroke: { curve: "smooth", width: 2 },
  fill: { type: "solid", opacity: 0.05 },
  markers: { size: 0 },
  tooltip: { theme: "light", x: { show: true } },
}))

const areaChart = computed(() => ({
  series: [
    {
      name: "Requests",
      data: chartData.value,
    },
  ],
}))

const totalRequestCount = ref(0);

// Fetch data when component mounts
onMounted(async () => {
  try {
    const requestLog = await axios.get(config.public.USER_API_URL + '/userapi/requestLog');
    console.log("Request Log Response:", requestLog.data);
    if(requestLog.data.success){
      const requestLogData = requestLog.data.data
      totalRequestCount.value = requestLogData.reduce(
        (sum: number, log: any) => sum + Number(log.count),
        0
      );

      // Update reactive refs
      chartLabels.value = requestLogData.map((l: any) => l.day)  // ["30/08","31/08",...]
      chartData.value = requestLogData.map((l: any) => l.count)  // [12, 18, 20,...]
    }
  } catch (error) {
    console.error("Error fetching request log data:", error);
  }
})
</script>

<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">7 Days Request Log</v-card-title>
        <v-btn size="large" icon class="bg-secondary">
          <v-avatar size="large" class="text-white">
            <CurrencyDollarIcon size="25" />
          </v-avatar>
        </v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <div class="mt-2">
            <h3 id="totalRequestCount" class="text-h3">Total : {{ totalRequestCount.toLocaleString() }}</h3>
            <div class="mt-1">
              <v-avatar class="bg-lightsuccess text-accent" size="25">
                <ArrowUpRightIcon size="20" />
              </v-avatar>
              <span class="text-subtitle-1 ml-2 font-weight-bold">+9%</span>
              <span class="text-subtitle-1 text-muted ml-2">last week</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-item>
    <div class="mt-3">
      <apexchart
        type="area"
        height="60"
        :options="areachartOptions"
        :series="areaChart.series"
      >
      </apexchart>
    </div>
  </v-card>
</template>
