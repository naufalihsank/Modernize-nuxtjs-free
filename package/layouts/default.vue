<script setup lang="ts">
import Topbar from "~/components/layout/full/Topbar.vue";

const title = ref(
  "Catalyst AI"
);
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Catalyst AI`
      : "Catalyst AI";
  },
});
</script>

<template>
  <v-locale-provider>
    <v-app>
      <LayoutFullMain />
      <v-main>
        <v-container fluid class="page-wrapper">
          <div class="maxWidth">
            <NuxtPage />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
