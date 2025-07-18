<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const id = Number(route.params.id);

// Dummy detail for user
const user = {
  id,
  name: `User ${id}`,
  email: `user${id}@example.com`,
  role: id % 3 === 0 ? "Admin" : id % 3 === 1 ? "Editor" : "Viewer",
  status: id % 5 === 0 ? "Inactive" : "Active",
  createdAt: `2024-07-${(id % 30) + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${id}`, // dummy avatar image
  permissions: [
    { name: "View Dashboard", granted: true },
    { name: "Edit Users", granted: id % 3 === 0 },
    { name: "Delete Records", granted: id % 4 === 0 },
    { name: "Manage Settings", granted: id % 2 === 0 },
    { name: "Access Reports", granted: true },
  ],
};

const togglePermission = (perm) => {
  perm.granted = !perm.granted;
};
</script>

<template>
  <v-container>
    <h1 class="text-h4 mb-2">User Detail: {{ user.name }}</h1>
    <p class="text-subtitle-1 mb-6">
      Manage authorizations & permissions for this user.
    </p>

    <v-card>
      <v-card-item>
        <v-row>
          <v-col cols="12" md="4" class="text-center">
            <v-avatar size="120" class="mb-2">
              <v-img :src="user.avatar" :alt="user.name" />
            </v-avatar>
            <h2 class="text-h6">{{ user.name }}</h2>
            <p class="text-subtitle-2">{{ user.email }}</p>
          </v-col>

          <v-col cols="12" md="8">
            <h3 class="text-h6 mb-2">Basic Info</h3>
            <p><strong>Role:</strong> {{ user.role }}</p>
            <p><strong>Status:</strong> {{ user.status }}</p>
            <p><strong>Created At:</strong> {{ user.createdAt }}</p>

            <h3 class="text-h6 mt-6 mb-2">Permissions</h3>
            <v-table>
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="perm in user.permissions" :key="perm.name">
                  <td>{{ perm.name }}</td>
                  <td>
                    <v-switch
                      v-model="perm.granted"
                      inset
                      color="primary"
                      @change="togglePermission(perm)"
                    ></v-switch>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>

    <v-btn class="mt-6" to="/role-manager" color="primary">Back to List</v-btn>
  </v-container>
</template>
