<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const users = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
  status: i % 5 === 0 ? "Inactive" : "Active",
  createdAt: `2024-07-${(i % 30) + 1}`,
}));

const goToDetail = (id: number) => {
  router.push(`/role-manager/${id}`);
};
</script>

<template>
  <v-container>
    <div class="mb-6">
      <h1 class="text-h4">Role Manager</h1>
      <p class="text-subtitle-1 text-grey-darken-1">
        Manage user roles & permissions. Click on a user to view & edit their
        authorizations.
      </p>
    </div>

    <v-table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <v-chip
              size="small"
              :color="user.status === 'Active' ? 'success' : 'grey'"
              text-color="white"
            >
              {{ user.status }}
            </v-chip>
          </td>
          <td>{{ user.createdAt }}</td>
          <td>
            <v-btn color="primary" size="small" @click="goToDetail(user.id)">
              Detail
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
