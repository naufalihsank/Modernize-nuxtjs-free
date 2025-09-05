<script setup lang="ts">
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { useTheme } from "vuetify";
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app';

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const lightprimary = theme.current.value.colors.lightprimary;
const secondary = theme.current.value.colors.secondary;
// Reactive variables for chart
const chartLabels = ref<string[]>([])
const chartData = ref<number[]>([])
const config = useRuntimeConfig()

const chartOptions = computed(() => {
  return {
    labels: chartLabels.value,
    chart: {
      type: "donut",
      fontFamily: `inherit`,
      foreColor: "#a1aab2",
      toolbar: {
        show: false,
      },
    },
    colors: [primary, lightprimary],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: { theme: "light", fillSeriesColor: false },
  };
});

// Dummy API call counts (in thousands)
const Chart = computed(() => chartData.value.map(Number));

onMounted(async () => {
  try {
    const requestLog = await axios.get(config.public.USER_API_URL + '/userapi/requestLogMonthly');
    console.log("Request Log Response:", requestLog.data);

    if (requestLog.data.success) {
      const requestLogData = requestLog.data.data;

      chartLabels.value = requestLogData.map((l: any) => l.month);       // ["Aug 2025", "Sep 2025", ...]
      chartData.value = requestLogData.map((l: any) => Number(l.count)); // [166, 182, ...]
    }
  } catch (error) {
    console.error("Error fetching request log data:", error);
  }
});
</script>

<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">Monthly Requests</v-card-title>
      </div>
      <v-row>
        <v-col cols="7" sm="7">
          <div class="mt-6">
            <h3 class="text-h3">315K Calls</h3>
            <div class="mt-1">
              <v-avatar class="bg-lightsuccess text-success" size="25">
                <ArrowUpLeftIcon size="20" />
              </v-avatar>
              <span class="text-subtitle-1 ml-2 font-weight-bold">+10%</span>
              <span class="text-subtitle-1 text-muted ml-2">vs last month</span>
            </div>
            <div class="d-flex align-center mt-sm-10 mt-8">
              <h6 class="text-subtitle-1 text-muted">
                <v-icon
                  icon="mdi mdi-checkbox-blank-circle"
                  class="mr-1"
                  size="10"
                  color="primary"
                ></v-icon>
                August
              </h6>
              <h6 class="text-subtitle-1 text-muted pl-5">
                <v-icon
                  icon="mdi mdi-checkbox-blank-circle"
                  class="mr-1"
                  size="10"
                  color="lightprimary"
                ></v-icon>
                September
              </h6>
            </div>
          </div>
        </v-col>
        <v-col cols="5" sm="5" class="pl-lg-0">
          <div class="d-flex align-center flex-shrink-0">
            <apexchart
              class="pt-6"
              type="donut"
              height="145"
              :options="chartOptions"
              :series="Chart"
            />
          </div>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
