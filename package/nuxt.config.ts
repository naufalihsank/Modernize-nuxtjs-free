// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  typescript: {
    shim: false
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServerHandlers: [],

  hooks: {
  },
  runtimeConfig: {
    public: {
      USER_API_URL: process.env.USER_API_URL,
      USER_API_SECRET: process.env.USER_API_SECRET
    }
  },

  compatibilityDate: "2025-04-15",
})