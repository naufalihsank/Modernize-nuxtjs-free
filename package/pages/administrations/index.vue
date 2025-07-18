<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const files = [
  {
    name: "api-docs.md",
    slug: "api-docs",
    lastModified: "2024-07-10",
    size: "12 KB",
    status: "Published",
    statusColor: "success",
  },
  {
    name: "setup-guide.md",
    slug: "setup-guide",
    lastModified: "2024-07-08",
    size: "8 KB",
    status: "Draft",
    statusColor: "warning",
  },
  {
    name: "changelog.md",
    slug: "changelog",
    lastModified: "2024-06-25",
    size: "5 KB",
    status: "Archived",
    statusColor: "grey",
  },
  {
    name: "admin-rules.md",
    slug: "admin-rules",
    lastModified: "2024-05-14",
    size: "20 KB",
    status: "Published",
    statusColor: "success",
  },
];

const goToDetail = (slug: string) => {
  router.push(`/administrations/${slug}`);
};

const editFile = (slug: string) => {
  alert(`Edit: ${slug}`);
};
</script>

<template>
  <v-container>
    <div class="mb-6">
      <h1 class="text-h4">Administration Files</h1>
      <p class="text-subtitle-1 text-grey-darken-1">
        Manage and maintain important system markdown files. View details,
        update content, and track status.
      </p>
    </div>

    <v-table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Last Modified</th>
          <th>Size</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.slug">
          <td>{{ file.name }}</td>
          <td>{{ file.lastModified }}</td>
          <td>{{ file.size }}</td>
          <td>
            <v-chip size="small" :color="file.statusColor" text-color="white">
              {{ file.status }}
            </v-chip>
          </td>
          <td>
            <v-btn color="primary" size="small" @click="goToDetail(file.slug)">
              Detail
            </v-btn>
            <v-btn
              color="secondary"
              size="small"
              class="ml-2"
              @click="editFile(file.slug)"
            >
              Edit
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
