// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/mdc",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@samk-dev/nuxt-vcalendar",
    '@vueuse/nuxt',
  ],
  css: ["~/assets/css/base.css"],
  alias: {
    // '@' : resolve(__dirname,'/'),
    // assets:"/<rootDir>/assets",
  },
  runtimeConfig: {
    public: {
      apiBase: "https://sam-baloot-admin.online/zat/dev",
    },
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  ssr: false,
  mdc: {
    components: {
      prose: false, // Disable predefined prose components
    },
  },
  ui: {
    icons: ["mdi", "heroicons", "icon-park"],
  },
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
});