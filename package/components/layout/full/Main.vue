<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue";
import { useDisplay } from 'vuetify';
import sidebarItems from "@/components/layout/full/vertical-sidebar/sidebarItem";
import { Menu2Icon } from "vue-tabler-icons";

const sidebarMenu = shallowRef(sidebarItems);

// Get current display info
const sDrawer = ref(true)
const display = useDisplay()

onMounted(() => {
  console.log("mdAndUp value:", display.mdAndUp.value) // this is boolean
  sDrawer.value = display.mdAndUp.value ? true : false
})

</script>

<template>
  <!------Sidebar-------->
  <v-navigation-drawer
    elevation="0"
    class="leftSidebar"
    v-model="sDrawer"
    width="270"
    :permanent="display.mdAndUp"
    :temporary="!display.mdAndUp"
  >
    <!---Logo part -->
    <div class="pa-5">
      <img src="/images/logos/logo_text.png" alt="Logo" style="width: 150px" />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="pa-6">
          <!---Menu Loop -->
          <template v-for="(item, i) in sidebarMenu">
            <!---Item Sub Header -->
            <LayoutFullVerticalSidebarNavGroup
              :item="item"
              v-if="item.header"
              :key="item.title"
            />

            <!---If Has Child -->
            <LayoutFullVerticalSidebarNavCollapse
              class="leftPadding"
              :item="item"
              :level="0"
              v-else-if="item.children"
            />

            <!---Single Item-->
            <LayoutFullVerticalSidebarNavItem
              :item="item"
              v-else
              class="leftPadding"
            />
            <!---End Single Item-->
          </template>
        </v-list>
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>
  <!------Header-------->
  <v-app-bar elevation="0" height="70" class="top-header">
    <div class="d-flex align-center justify-space-between w-100">
      <div>
        <v-btn
          class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
          @click="sDrawer = !sDrawer"
          icon
          variant="flat"
          size="small"
        >
          <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>
        <!-- Notification -->
        <LayoutFullVerticalHeaderNotificationDD />
      </div>
      <div>
        <!-- Upgrade button -->
        <!-- <v-btn
            class="mr-2 bg-primary"
            href="https://adminmart.com/product/modernize-nuxt-js-admin-dashboard/?ref=56#product-demo-section"
            target="_blank"
            >Check Pro Template</v-btn
          > -->
        <!-- User Profile -->
        <LayoutFullVerticalHeaderProfileDD />
      </div>
    </div>
  </v-app-bar>
</template>
