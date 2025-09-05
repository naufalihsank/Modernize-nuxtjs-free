<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { format, isToday, isYesterday } from "date-fns"; // optional, for formatting dates
import { useRuntimeConfig } from 'nuxt/app';

// Reactive array to hold recent requests
const recentRequests = ref([]);
const config = useRuntimeConfig()

// Fetch last 5 requests on mount
onMounted(async () => {
  try {
    const res = await axios.get(config.public.USER_API_URL + "/userapi/lastRequests");
    if (res.data.success) {
      recentRequests.value = res.data.data.slice(0, 5).map((r: any, index: number) => {
        const createdDate = new Date(r.createdAt);
        let displayDate = "";

        if (isToday(createdDate)) {
          displayDate = `today, ${format(createdDate, "H:mm")}`;
        } else if (isYesterday(createdDate)) {
          displayDate = `yesterday, ${format(createdDate, "H:mm")}`;
        } else {
          displayDate = format(createdDate, "d MMM, H:mm"); // e.g., 3 Sep, 19:20
        }

        return {
          id: index + 1,
          name: r.name || "Unknown",
          post: r.userMessage,
          pname: "",
          status: "",
          statuscolor: "primary",
          budget: displayDate,
        };
      });
    }
  } catch (err) {
    console.error("Error fetching recent requests:", err);
  }
});
</script>

<template>
  <v-card elevation="10" class="">
    <v-card-item class="pa-6">
      <v-card-title class="text-h5 pt-sm-2 pb-7">Recent Requests</v-card-title>
      <v-table class="month-table">
        <thead>
          <tr>
            <th class="text-subtitle-1 font-weight-bold">Id</th>
            <th class="text-subtitle-1 font-weight-bold">User</th>
            <th class="text-subtitle-1 font-weight-bold">Message</th>
            <th class="text-subtitle-1 font-weight-bold text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in recentRequests" :key="item.id" class="month-item">
            <td><p class="text-15 font-weight-medium">{{ item.id }}</p></td>
            <td>
              <h6 class="text-subtitle-1 font-weight-bold">{{ item.name }}</h6>
            </td>
            <td>
              <div class="text-13 mt-1 text-muted">{{ item.post }}</div>
            </td>
            <td class="text-right">{{ item.budget }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>