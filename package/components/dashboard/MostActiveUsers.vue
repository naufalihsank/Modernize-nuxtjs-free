<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRuntimeConfig } from 'nuxt/app';

interface RecentLog {
  title: string;      // number of requests
  subtitle: string;   // user full name
  textcolor: string;
  boldtext: boolean;
  line: boolean;
  link: string;
  url: string;
}

const recentLogs = ref<RecentLog[]>([]);
const config = useRuntimeConfig()

onMounted(async () => {
  try {
    const res = await axios.get(config.public.USER_API_URL + "/userapi/mostActiveUsers");
    if (res.data.success) {
      recentLogs.value = res.data.data; // assuming API returns array in the same shape
    }
  } catch (error) {
    console.error("Error fetching most active users:", error);
  }
});
</script>

<template>
  <v-card elevation="10" class="withbg">
    <v-card-item class="pb-0">
      <v-card-title class="text-h5 pt-sm-2">Most Active Users (30 Days)</v-card-title>
      <div class="recent-logs mt-10 px-3">
        <div v-for="log in recentLogs" :key="log.title + log.subtitle">
          <v-row class="d-flex mb-4">
            <v-col
              cols="4"
              lg="3"
              md="auto"
              sm="auto"
              class="px-0 pt-0 pb-1 d-flex align-start"
            >
              <h6 class="text-body-1 textSecondary text-no-wrap">
                {{ log.title }}
              </h6>
            </v-col>
            <v-col cols="1" sm="1" class="px-0 text-center pt-0 pb-1">
              <CircleIcon size="13" :class="'text-' + log.textcolor" />
              <div v-if="log.line" class="line mx-auto bg-grey100"></div>
            </v-col>
            <v-col cols="7" sm="8" class="pt-0">
              <h6 v-if="log.boldtext" class="text-body-1 font-weight-bold">
                {{ log.subtitle }}
              </h6>
              <h6 v-else class="text-body-1 textSecondary">
                {{ log.subtitle }}
              </h6>
              <div class="mt-n1">
                <RouterLink
                  :to="log.url"
                  class="text-body-1 text-primary text-decoration-none"
                  v-if="log.link"
                >
                  {{ log.link }}
                </RouterLink>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<style lang="scss">
.recent-logs {
  .line {
    width: 2px;
    height: 35px;
  }
}
</style>