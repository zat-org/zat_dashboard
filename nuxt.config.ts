// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@nuxt/ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',],
  css: ["~/assets/css/base.css"],
  alias: {
    // '@' : resolve(__dirname,'/'),
    // assets:"/<rootDir>/assets",

  },
  runtimeConfig: {
    public: {
      apiBase: "https://sam-baloot-admin.online/zat/dev"
    }
  },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  ssr:false,

})
