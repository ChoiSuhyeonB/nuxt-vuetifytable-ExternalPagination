import NuxtConfiguration from "@nuxt/config";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "todolist",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
        integrity:
          "sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-infinite-loading.js" },
    { src: "~/plugins/vue-virtual-scroller.js" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false, //내가 하나하나 등록하지 않아도 자동으로 등록된다( 대신 빌드시간이 오래걸린다.) -> 하지만 false로 빌드시간 단축

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", 
  ['cookie-universal-nuxt', {alias:'cookiz'}]
],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  /*
   ** Add server middleware
   ** Nuxt.js uses `connect` module as server
   ** So most of express middleware works with nuxt.js server middleware
   */
  serverMiddleware: [
    // <project root>/api/index.js 모듈을 미들웨어로 추가
    "@/api/index.js"
  ]
};
