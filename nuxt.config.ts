import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  
  app: {
    baseURL: '/TaskAuth/',
    buildAssetsDir: 'assets', 
  },
  build: {
    transpile: ['lodash-es']
  },
  nitro: {
    preset: "netlify",
  },
  modules: ["@vueuse/nuxt", "vuetify-nuxt-module"],

  vuetify: {
    moduleOptions: {
      prefixComposables: true,
      // treeshaking: true
      /* module specific options */
    },
    vuetifyOptions: {
      // labComponents: true,

      // ssr
      // ssr: ,
      theme: {
        defaultTheme: "simple",
        themes: {
          simple: {
            dark: false,
            colors: {
              primary: "#1976D2",
              secondary: "#4E147C",
              subcolor: "#FB3681",
              accent: "#82B1FF",
              error: "#FF5252",
              info: "#2196F3",
              success: "#4CAF50",
              warning: "#FFC107",
            },
          },

          simpleDark: {
            dark: true,
            // dark theme colors
            colors: {},
          },
        },
      },
    },
  },
  runtimeConfig: {
    RS256_PRIVATE_KEY: process.env.RS256_PRIVATE_KEY,
    public: {
      RS256_PUBLIC_KEY: process.env.RS256_PUBLIC_KEY,
    },
  },
});
