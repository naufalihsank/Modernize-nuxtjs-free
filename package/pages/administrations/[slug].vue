<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

const slug = route.params.slug as string;

// dummy file content
const content = `
# ${slug}

This is the detail of ${slug}.  
Here you can show the markdown content of the file.
`;
</script>

<template>
  <v-container>
    <h1 class="text-h4 mb-4">Administration Detail: {{ slug }}</h1>
    <v-card>
      <v-card-text>
        <pre>{{ content }}</pre>
      </v-card-text>
    </v-card>
    <v-btn class="mt-4" to="/administrations" color="primary">Back</v-btn>
  </v-container>
</template>
